import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Gem,
  Home,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  findBlogPostBySlug,
  findRelatedPosts,
} from "../utils/blogLoader";

const SITE_URL = "https://luckycrystalmaids.com";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1758272421751-963195322eaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsZWFuaW5nJTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D";

function calculateReadingTime(content) {
  const normalizedContent =
    typeof content === "string"
      ? content.replace(/[#_*>\-[\]()`]/g, " ").trim()
      : "";

  if (!normalizedContent) return 1;

  const wordCount = normalizedContent.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function toAbsoluteUrl(value) {
  if (!value) return FALLBACK_IMAGE;

  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return FALLBACK_IMAGE;
  }
}

function normalizePost(post) {
  if (!post) return null;

  return {
    ...post,
    title: post.title || "Untitled Article",
    excerpt:
      post.excerpt ||
      "Practical cleaning advice and guidance from Lucky Crystal Maids.",
    category: post.category || "Cleaning Guides",
    author: post.author || "Lucky Crystal Maids",
    content: typeof post.content === "string" ? post.content : "",
    featuredImage: post.featuredImage || FALLBACK_IMAGE,
    featuredImageAlt:
      post.featuredImageAlt || `${post.title || "Cleaning"} article image`,
  };
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const reducedMotion = useReducedMotion();

  const post = useMemo(
    () => normalizePost(findBlogPostBySlug(slug)),
    [slug],
  );

  const relatedPosts = useMemo(() => {
    if (!post) return [];

    const posts = findRelatedPosts(post);

    return Array.isArray(posts)
      ? posts
          .filter((item) => item?.slug && item?.title)
          .slice(0, 3)
      : [];
  }, [post]);

  if (!post) {
    return <ArticleNotFound />;
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}/`;
  const imageUrl = toAbsoluteUrl(post.featuredImage);
  const readingTime = calculateReadingTime(post.content);
  const metaTitle = post.metaTitle || `${post.title} | Lucky Crystal Maids`;
  const metaDescription = post.metaDescription || post.excerpt;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: metaDescription,
    image: [imageUrl],
    datePublished: post.date || undefined,
    dateModified: post.updatedDate || post.date || undefined,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Lucky Crystal Maids",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Lucky Crystal Maids" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={post.featuredImageAlt} />
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={imageUrl} />

        {post.date && (
          <meta property="article:published_time" content={post.date} />
        )}
        {(post.updatedDate || post.date) && (
          <meta
            property="article:modified_time"
            content={post.updatedDate || post.date}
          />
        )}

        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <main className="min-h-screen overflow-hidden bg-white pb-24 pt-20">
        <article>
          <header className="relative isolate overflow-hidden bg-gray-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_34%)]" />
            <BookOpen className="absolute -bottom-20 -right-12 h-72 w-72 rotate-12 text-white/[0.035]" />

            <div className="container relative mx-auto px-5 py-20 sm:px-6 md:py-28">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.55 }}
                className="mx-auto max-w-4xl"
              >
                <nav
                  aria-label="Breadcrumb"
                  className="flex flex-wrap items-center gap-2 text-sm text-gray-400"
                >
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 transition hover:text-white"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <span aria-hidden="true">/</span>
                  <Link
                    to="/blog"
                    className="transition hover:text-white"
                  >
                    Blog
                  </Link>
                  <span aria-hidden="true">/</span>
                  <span
                    className="max-w-full truncate text-gray-300"
                    aria-current="page"
                  >
                    {post.title}
                  </span>
                </nav>

                <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-crystal-300">
                  {post.category}
                </p>

                <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                  {post.title}
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-7 text-gray-300 sm:text-lg">
                  {post.excerpt}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-400">
                  <span className="inline-flex items-center gap-2">
                    <UserRound className="h-4 w-4" />
                    {post.author}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <time dateTime={post.date || undefined}>
                      {formatDate(post.date)}
                    </time>
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {readingTime} min read
                  </span>
                </div>
              </motion.div>
            </div>
          </header>

          <div className="relative z-10 -mt-10 px-5 sm:px-6">
            <div className="container mx-auto max-w-6xl">
              <motion.figure
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.5 }}
                className="overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-100 shadow-2xl"
              >
                <img
                  src={post.featuredImage}
                  alt={post.featuredImageAlt}
                  width="1600"
                  height="900"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[16/9] h-auto w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              </motion.figure>
            </div>
          </div>

          <section className="bg-white py-16 sm:py-20">
            <div className="container mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div
                className={[
                  "prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-gray-900",
                  "prose-p:leading-8 prose-p:text-gray-700 prose-a:font-semibold prose-a:text-crystal-600 prose-a:no-underline hover:prose-a:underline",
                  "prose-strong:text-gray-900 prose-li:text-gray-700 prose-blockquote:border-crystal-400 prose-blockquote:bg-crystal-50 prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:text-gray-700",
                  "prose-img:rounded-2xl prose-hr:border-gray-200 prose-table:overflow-hidden prose-th:bg-gray-100 prose-th:p-3 prose-td:p-3",
                ].join(" ")}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children, ...props }) => {
                      const isInternal =
                        typeof href === "string" && href.startsWith("/");

                      if (isInternal) {
                        return (
                          <Link to={href} {...props}>
                            {children}
                          </Link>
                        );
                      }

                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props}
                        >
                          {children}
                        </a>
                      );
                    },
                    img: ({ src, alt, ...props }) => (
                      <img
                        src={src || FALLBACK_IMAGE}
                        alt={alt || ""}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                          event.currentTarget.src = FALLBACK_IMAGE;
                        }}
                        {...props}
                      />
                    ),
                    h2: ({ children, ...props }) => (
                      <h2
                        className="scroll-mt-28"
                        {...props}
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({ children, ...props }) => (
                      <h3
                        className="scroll-mt-28"
                        {...props}
                      >
                        {children}
                      </h3>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                  <Gem className="h-7 w-7 text-crystal-500" />
                  <h2 className="mt-5 text-xl font-bold text-gray-900">
                    Article Summary
                  </h2>
                  <dl className="mt-5 space-y-4 text-sm">
                    <MetaRow label="Category" value={post.category} />
                    <MetaRow label="Published" value={formatDate(post.date)} />
                    <MetaRow
                      label="Reading time"
                      value={`${readingTime} minutes`}
                    />
                  </dl>
                </div>

                <div className="rounded-3xl bg-gray-950 p-6 text-white shadow-xl">
                  <Sparkles className="h-7 w-7 text-crystal-300" />
                  <h2 className="mt-5 text-xl font-bold">
                    Need Professional Cleaning?
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    Explore flexible maid services, residential cleaning, and
                    detailed deep-cleaning solutions across Dubai.
                  </p>
                  <Link
                    to="/quote"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-crystal-300 transition hover:text-white"
                  >
                    Request a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </aside>
            </div>
          </section>
        </article>

        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-20">
            <div className="container mx-auto max-w-6xl px-5 sm:px-6">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: reducedMotion ? 0 : 0.45 }}
                className="text-center"
              >
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-crystal-600">
                  Continue reading
                </span>
                <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
                  Related Articles
                </h2>
              </motion.div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost, index) => (
                  <RelatedPostCard
                    key={relatedPost.slug}
                    post={relatedPost}
                    index={index}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-white px-5 py-10 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-crystal-600 via-crystal-700 to-gray-950 px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16">
              <BookOpen className="absolute -bottom-16 -right-10 h-64 w-64 rotate-12 text-white/[0.05]" />

              <div className="relative mx-auto max-w-3xl">
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  Explore More Cleaning Advice
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-crystal-100 sm:text-lg">
                  Browse more practical cleaning guides or speak with our team
                  about a service for your home or business.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    to="/blog"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-crystal-700 transition hover:-translate-y-0.5 hover:bg-crystal-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                  </Link>
                  <Link
                    to="/quote"
                    className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/15"
                  >
                    Request a Free Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
      <dt className="text-xs font-bold uppercase tracking-wider text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-gray-900">{value}</dd>
    </div>
  );
}

function RelatedPostCard({ post, index, reducedMotion }) {
  const image = post.featuredImage || FALLBACK_IMAGE;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reducedMotion ? 0 : 0.4,
        delay: reducedMotion ? 0 : Math.min(index * 0.06, 0.18),
      }}
      className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-crystal-200 hover:shadow-xl"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block aspect-[16/10] overflow-hidden bg-gray-100"
        aria-label={`Read ${post.title}`}
      >
        <img
          src={image}
          alt={post.featuredImageAlt || post.title}
          width="640"
          height="400"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </Link>

      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-crystal-600">
          {post.category || "Cleaning Guides"}
        </p>

        <h3 className="mt-3 text-xl font-bold leading-snug text-gray-900">
          <Link
            to={`/blog/${post.slug}`}
            className="transition hover:text-crystal-600"
          >
            {post.title}
          </Link>
        </h3>

        <p className="mt-4 text-sm leading-6 text-gray-600">
          {post.excerpt ||
            "Read more practical cleaning advice from Lucky Crystal Maids."}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-crystal-600"
        >
          Read article
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

function ArticleNotFound() {
  return (
    <>
      <Helmet>
        <title>Article Not Found | Lucky Crystal Maids</title>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Helmet>

      <main className="min-h-screen bg-gray-50 px-5 pb-24 pt-36 sm:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-crystal-100 text-crystal-600">
              <BookOpen className="h-8 w-8" />
            </span>

            <h1 className="mt-6 font-display text-4xl font-bold text-gray-900">
              Article Not Found
            </h1>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
              This article is unavailable, unpublished, or may have been
              removed.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-crystal-500 px-6 py-3 font-bold text-white transition hover:bg-crystal-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Blog
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-bold text-gray-700 transition hover:border-crystal-200 hover:text-crystal-600"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}