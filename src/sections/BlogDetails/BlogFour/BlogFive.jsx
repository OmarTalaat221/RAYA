"use client";
import Link from "next/link";
import { useEffect, Suspense } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

// ============ المحتوى الثابت ============

const blogContents = {
  blog1: {
    ar: `
      <h2>ماتريكس vs الورش التقليدية 🪵</h2>
      <p>عند اختيار مصنع الأخشاب، الجودة هي الأساس. <strong>مصنع ماتريكس</strong> يتميز بـ:</p>
      <ul>
        <li>استخدام أحدث ماكينات CNC الأوروبية</li>
        <li>معالجة كيميائية وحرارية للأخشاب</li>
        <li>فريق مهندسين متخصصين</li>
        <li>ضمان حقيقي على المنتجات</li>
      </ul>
      <p><strong>الورش التقليدية</strong> تعتمد على العمل اليدوي فقط مع استخدام خامات اقتصادية.</p>
      <h3>لماذا ماتريكس؟</h3>
      <ul>
        <li>✅ أخشاب طبيعية 100%</li>
        <li>📐 دقة تصنيع عالية</li>
        <li>✨ تشطيبات فاخرة</li>
        <li>👷 فريق محترف</li>
      </ul>
      <p><strong>النتيجة:</strong> منتجات تدوم للأجيال وليست حلول مؤقتة.</p>
    `,
    en: `
      <h2>Matrix vs Traditional Workshops 🪵</h2>
      <p>When choosing a wood factory, quality is key. <strong>Matrix Factory</strong> features:</p>
      <ul>
        <li>Latest European CNC machines</li>
        <li>Chemical & thermal wood treatment</li>
        <li>Specialized engineering team</li>
        <li>Real product warranty</li>
      </ul>
      <p><strong>Traditional workshops</strong> rely on manual work with economical materials.</p>
      <h3>Why Matrix?</h3>
      <ul>
        <li>✅ 100% Natural wood</li>
        <li>📐 High precision manufacturing</li>
        <li>✨ Luxury finishing</li>
        <li>👷 Professional team</li>
      </ul>
      <p><strong>Result:</strong> Products that last generations, not temporary solutions.</p>
    `,
  },
  blog2: {
    ar: `
      <h2>كيف تحافظ على أثاثك الخشبي؟</h2>
      <p>الصيانة الصحيحة تطيل عمر الأثاث لعقود:</p>
      <ul>
        <li><strong>التنظيف:</strong> استخدم قماش ميكروفايبر جاف</li>
        <li><strong>التلميع:</strong> كل 3 أشهر بملمع خشب عالي الجودة</li>
        <li><strong>الرطوبة:</strong> حافظ على نسبة 40-60%</li>
        <li><strong>الحماية:</strong> استخدم واقيات من الحرارة</li>
      </ul>
      <p>اتبع هذه النصائح وسيبقى أثاثك جديداً لسنوات!</p>
    `,
    en: `
      <h2>How to Maintain Your Wooden Furniture?</h2>
      <p>Proper maintenance extends furniture life for decades:</p>
      <ul>
        <li><strong>Cleaning:</strong> Use dry microfiber cloth</li>
        <li><strong>Polishing:</strong> Every 3 months with quality polish</li>
        <li><strong>Humidity:</strong> Keep at 40-60%</li>
        <li><strong>Protection:</strong> Use heat protectors</li>
      </ul>
      <p>Follow these tips and your furniture stays new for years!</p>
    `,
  },
  blog3: {
    ar: `
      <h2>اتجاهات الديكور الخشبي 2024 ✨</h2>
      <p>هذا العام يركز على:</p>
      <ul>
        <li><strong>الأثاث الطبيعي:</strong> حواف خشبية غير مصقولة</li>
        <li><strong>المزج:</strong> خشب + معدن + زجاج</li>
        <li><strong>الألوان:</strong> درجات فاتحة على الطراز الاسكندنافي</li>
        <li><strong>الاستدامة:</strong> خشب معاد تدويره</li>
      </ul>
      <p>البساطة مع الجودة العالية هي المفتاح!</p>
    `,
    en: `
      <h2>Wood Decor Trends 2024 ✨</h2>
      <p>This year focuses on:</p>
      <ul>
        <li><strong>Natural Furniture:</strong> Live edge wood</li>
        <li><strong>Mixing:</strong> Wood + Metal + Glass</li>
        <li><strong>Colors:</strong> Light Scandinavian tones</li>
        <li><strong>Sustainability:</strong> Reclaimed wood</li>
      </ul>
      <p>Simplicity with high quality is the key!</p>
    `,
  },
  blog4: {
    ar: `
      <h2>ثورة CNC في صناعة الأخشاب 🔧</h2>
      <p>تقنية CNC غيّرت كل شيء:</p>
      <ul>
        <li>دقة مستحيلة بالطرق التقليدية</li>
        <li>أنماط معقدة ونقوش ثلاثية الأبعاد</li>
        <li>تقليل الهدر بنسبة 30%</li>
        <li>تصاميم مخصصة بأسعار معقولة</li>
      </ul>
      <p>في <strong>ماتريكس</strong> نستخدم أحدث ماكينات CNC الأوروبية!</p>
    `,
    en: `
      <h2>CNC Revolution in Woodworking 🔧</h2>
      <p>CNC technology changed everything:</p>
      <ul>
        <li>Precision impossible with traditional methods</li>
        <li>Complex patterns and 3D carvings</li>
        <li>30% waste reduction</li>
        <li>Custom designs at affordable prices</li>
      </ul>
      <p>At <strong>Matrix</strong> we use the latest European CNC machines!</p>
    `,
  },
  blog5: {
    ar: `
      <h2>الأخشاب المستدامة 🌲</h2>
      <p>للحفاظ على البيئة، اختر:</p>
      <ul>
        <li>أخشاب بشهادة FSC أو PEFC</li>
        <li>أنواع محلية لتقليل الانبعاثات</li>
        <li>الخيزران كبديل صديق للبيئة</li>
        <li>الخشب المعاد تدويره</li>
      </ul>
      <p>الاستدامة = جودة + مسؤولية بيئية</p>
    `,
    en: `
      <h2>Sustainable Wood 🌲</h2>
      <p>To protect the environment, choose:</p>
      <ul>
        <li>FSC or PEFC certified wood</li>
        <li>Local species to reduce emissions</li>
        <li>Bamboo as eco-friendly alternative</li>
        <li>Reclaimed wood</li>
      </ul>
      <p>Sustainability = Quality + Environmental responsibility</p>
    `,
  },
  blog6: {
    ar: `
      <h2>اختيار الخشب بذكاء 💰</h2>
      <p>وفّر المال دون التضحية بالجودة:</p>
      <ul>
        <li>اشترِ في غير الموسم</li>
        <li>امزج الخشب الفاخر مع الاقتصادي</li>
        <li>اشترِ مباشرة من المصنع</li>
        <li>افهم درجات جودة الخشب</li>
      </ul>
      <p>التخطيط الجيد يوفر 30-40% من التكاليف!</p>
    `,
    en: `
      <h2>Smart Wood Selection 💰</h2>
      <p>Save money without sacrificing quality:</p>
      <ul>
        <li>Buy off-season</li>
        <li>Mix premium with economical wood</li>
        <li>Buy directly from factory</li>
        <li>Understand wood quality grades</li>
      </ul>
      <p>Good planning saves 30-40% of costs!</p>
    `,
  },
};

// ============ Component ============

const BlogDetailContent = () => {
  const t = useTranslations("blogPage");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();

  const blogId = searchParams?.get("id") || "blog1";

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const blogs = [
    {
      id: "blog1",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1769957558/jennifer-salavarrieta-FN1XoGL68-I-unsplash_nyu4jy.jpg",
      day: "17",
      month: t("months.jun"),
      year: "2024",
    },
    {
      id: "blog2",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1769957506/jeriden-villegas-VLPUm5wP5Z0-unsplash_hrmeus.jpg",
      day: "06",
      month: t("months.jul"),
      year: "2024",
    },
    {
      id: "blog3",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1769957531/samuel-cruz-cVB7mVf5_KA-unsplash_bckukl.jpg",
      day: "12",
      month: t("months.aug"),
      year: "2024",
    },
    {
      id: "blog4",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1769957916/javad-esmaeili-lIrl53eeWmE-unsplash_e1q6dm.jpg",
      day: "05",
      month: t("months.sep"),
      year: "2024",
    },
    {
      id: "blog5",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1770294374/pexels-cottonbro-7492877_zwuyua.jpg",
      day: "15",
      month: t("months.oct"),
      year: "2024",
    },
    {
      id: "blog6",
      image:
        "https://res.cloudinary.com/dkc5klynm/image/upload/v1770294439/pexels-mikael-blomkvist-8961334_qjzeic.jpg",
      day: "24",
      month: t("months.nov"),
      year: "2024",
    },
  ];

  const currentBlog = blogs.find((blog) => blog.id === blogId) || blogs[0];
  const recentPosts = blogs.filter((blog) => blog.id !== blogId).slice(0, 4);

  // الحصول على المحتوى حسب اللغة
  const content = blogContents[blogId]?.[locale] || blogContents.blog1[locale];

  return (
    <section
      className="blog-area space-top space-extra-bottom"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container">
        <div className="row gx-60">
          {/* Main Blog Content */}
          <div className="col-xxl-8 col-lg-7">
            <div className="blog-single" data-aos="fade-up">
              {/* Blog Image */}
              <div className="blog-img" data-aos="zoom-in" data-aos-delay="100">
                <img
                  src={currentBlog.image}
                  alt={t(`blogs.${blogId}.title`)}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="blog-date">
                  <Link href="/blog">
                    <span>{currentBlog.day}</span>
                    {currentBlog.month}
                  </Link>
                  <div className="year">{currentBlog.year}</div>
                </div>
              </div>

              {/* Blog Content */}
              <div className="blog-content">
                {/* Meta */}
                <div
                  className="blog-meta"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <Link href="/blog">{t(`blogs.${blogId}.author`)}</Link>
                  <Link href="/blog">{t(`blogs.${blogId}.category`)}</Link>
                </div>

                {/* Title */}
                <h3
                  className="blog-title"
                  data-aos="fade-up"
                  data-aos-delay="250"
                >
                  {t(`blogs.${blogId}.title`)}
                </h3>

                {/* Rich Text Content */}
                <div
                  className="blog-rich-content"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Social Share */}
                <div
                  className="share-links clearfix mt-50"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="row justify-content-between">
                    <div className="col-md-auto">
                      <div className="tagcloud">
                        <Link href="/blog">
                          {t(`blogs.${blogId}.category`)}
                        </Link>
                        <Link href="/blog">{isRTL ? "أخشاب" : "Wood"}</Link>
                        <Link href="/blog">
                          {isRTL ? "تصنيع" : "Manufacturing"}
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-auto text-xl-end">
                      <div className="social-btn style3">
                        <Link href="https://www.twitter.com/">
                          <i className="ri-twitter-x-line"></i>
                        </Link>
                        <Link href="https://instagram.com/">
                          <i className="ri-instagram-line"></i>
                        </Link>
                        <Link href="https://facebook.com/">
                          <i className="ri-facebook-fill"></i>
                        </Link>
                        <Link href="https://linkedin.com/">
                          <i className="ri-linkedin-fill"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-xxl-4 col-lg-5">
            <aside
              className="sidebar-area"
              style={{
                position: "sticky",
                top: "100px",
                alignSelf: "flex-start",
              }}
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="widget">
                <h3 className="widget_title">
                  {isRTL ? "أحدث المقالات" : "Recent Posts"}
                </h3>
                <div className="recent-post-wrap">
                  {recentPosts.map((post, index) => (
                    <div
                      className="recent-post"
                      key={post.id}
                      data-aos="fade-up"
                      data-aos-delay={100 + index * 50}
                    >
                      <div className="media-img">
                        <Link href={`/blog-details?id=${post.id}`}>
                          <img
                            src={post.image}
                            alt={t(`blogs.${post.id}.title`)}
                            style={{
                              width: "100px",
                              height: "80px",
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                        </Link>
                      </div>
                      <div className="media-body">
                        <h4 className="post-title">
                          <Link
                            className="text-inherit"
                            href={`/blog-details?id=${post.id}`}
                          >
                            {t(`blogs.${post.id}.title`)}
                          </Link>
                        </h4>
                        <div className="recent-post-meta">
                          <Link href="/blog">
                            {t(`blogs.${post.id}.author`)}
                          </Link>
                          <Link href="/blog">
                            {post.day} {post.month} {post.year}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogDetailLoading = () => (
  <div className="blog-area space-top space-extra-bottom">
    <div className="container">
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
);

const BlogDetail = () => (
  <Suspense fallback={<BlogDetailLoading />}>
    <BlogDetailContent />
  </Suspense>
);

export default BlogDetail;
