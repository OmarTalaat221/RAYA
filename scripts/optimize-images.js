/**
 * Image Optimization Script
 * Converts all PNG/JPG/JPEG images in /public to WebP using sharp.
 * Usage: npm run images:optimize
 */

const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const QUALITY = 82;
const SKIP_DIRS = ["node_modules", ".next", ".git"];

async function walkDir(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) continue;
      const nested = await walkDir(fullPath);
      files.push(...nested);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function convertImage(inputPath) {
  const ext = path.extname(inputPath);
  const outputPath = inputPath.replace(new RegExp(`${ext}$`, "i"), ".webp");

  try {
    try {
      const [inputStat, outputStat] = await Promise.all([
        fs.stat(inputPath),
        fs.stat(outputPath),
      ]);
      if (outputStat.mtimeMs >= inputStat.mtimeMs) {
        console.log(
          `⏭  Skipped (up-to-date): ${path.relative(
            process.cwd(),
            outputPath,
          )}`,
        );
        return { skipped: true };
      }
    } catch {
      /* outputPath doesn't exist — continue */
    }

    const inputBuffer = await fs.readFile(inputPath);
    const inputSize = inputBuffer.length;

    await sharp(inputBuffer)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);

    const outputStat = await fs.stat(outputPath);
    const savedKB = ((inputSize - outputStat.size) / 1024).toFixed(1);
    const savedPct = (
      ((inputSize - outputStat.size) / inputSize) *
      100
    ).toFixed(1);

    console.log(
      `✅ ${path.relative(process.cwd(), outputPath)}  ` +
        `(${(outputStat.size / 1024).toFixed(
          1,
        )} KB, -${savedKB} KB, -${savedPct}%)`,
    );

    return { converted: true, saved: inputSize - outputStat.size };
  } catch (error) {
    console.error(`❌ Failed: ${inputPath}`, error.message);
    return { failed: true };
  }
}

async function main() {
  console.log("🖼   Scanning images in /public ...\n");

  const files = await walkDir(PUBLIC_DIR);

  if (files.length === 0) {
    console.log("No images found.");
    return;
  }

  console.log(`Found ${files.length} image(s).\n`);

  let converted = 0;
  let skipped = 0;
  let failed = 0;
  let totalSaved = 0;

  for (const file of files) {
    const result = await convertImage(file);
    if (result.converted) {
      converted++;
      totalSaved += result.saved || 0;
    }
    if (result.skipped) skipped++;
    if (result.failed) failed++;
  }

  console.log("\n────────────────────────────");
  console.log(`✨ Done!`);
  console.log(`   Converted: ${converted}`);
  console.log(`   Skipped:   ${skipped}`);
  console.log(`   Failed:    ${failed}`);
  console.log(`   Saved:     ${(totalSaved / 1024).toFixed(1)} KB`);
  console.log("────────────────────────────\n");
}

main().catch(console.error);
