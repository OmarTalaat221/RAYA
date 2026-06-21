/**
 * Replace Image Extensions Script
 * Replaces all .png / .jpg / .jpeg references in source files with .webp
 * Usage: npm run images:replace-refs
 */

const fs = require("fs/promises");
const path = require("path");

const ROOT_DIR = process.cwd();

// الفولدرات اللي هنشتغل فيها
const SCAN_DIRS = [
  "app",
  "src",
  "components",
  "pages",
  "messages",
  "lib",
  "sections",
  "utils",
  "hooks",
  "context",
  "store",
  "styles",
];

// امتدادات الملفات اللي هنبص فيها
const SOURCE_EXTENSIONS = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".css",
  ".scss",
  ".md",
  ".mdx",
  ".html",
];

// فولدرات نتجاهلها
const SKIP_DIRS = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "public",
  "scripts",
];

// Regex بيلاقي أي path لصورة .png/.jpg/.jpeg
// بيدعم: "..." و '...' و `...`
const IMAGE_REGEX = /(["'`])([^"'`\s]+?\.(png|jpe?g))(["'`])/gi;

async function walkDir(dir) {
  const files = [];
  let entries;

  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) continue;
      const nested = await walkDir(fullPath);
      files.push(...nested);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SOURCE_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function processFile(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  let replacements = 0;

  const newContent = content.replace(
    IMAGE_REGEX,
    (match, openQuote, pathStr, ext, closeQuote) => {
      // تجاهل الـ URLs الخارجية (http/https)
      if (/^https?:\/\//i.test(pathStr)) return match;

      // تجاهل لو الملف فيه placeholder متغير زي ${var}
      if (pathStr.includes("${")) return match;

      replacements++;
      const newPath = pathStr.replace(/\.(png|jpe?g)$/i, ".webp");
      return `${openQuote}${newPath}${closeQuote}`;
    },
  );

  if (replacements > 0) {
    await fs.writeFile(filePath, newContent, "utf8");
    console.log(
      `✅ ${path.relative(ROOT_DIR, filePath)} — ${replacements} replacement(s)`,
    );
    return replacements;
  }

  return 0;
}

async function main() {
  console.log("🔄 Scanning source files for image references...\n");

  // اجمع كل الملفات من كل الفولدرات
  let allFiles = [];
  for (const dir of SCAN_DIRS) {
    const fullDir = path.join(ROOT_DIR, dir);
    try {
      await fs.access(fullDir);
      const files = await walkDir(fullDir);
      allFiles.push(...files);
    } catch {
      // الفولدر مش موجود — تجاهله
    }
  }

  if (allFiles.length === 0) {
    console.log("No source files found.");
    return;
  }

  console.log(`Found ${allFiles.length} source file(s).\n`);

  let totalReplacements = 0;
  let filesChanged = 0;

  for (const file of allFiles) {
    const count = await processFile(file);
    if (count > 0) {
      filesChanged++;
      totalReplacements += count;
    }
  }

  console.log("\n────────────────────────────");
  console.log(`✨ Done!`);
  console.log(`   Files changed:       ${filesChanged}`);
  console.log(`   Total replacements:  ${totalReplacements}`);
  console.log("────────────────────────────\n");
}

main().catch(console.error);
