import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Gem,
  ImageOff,
  Sparkles,
} from "lucide-react";
import { publishedBlogPosts } from "../utils/blogLoader";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1758272421751-963195322eaa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsZWFuaW5nJTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D";

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

function getReadingTime(post) {
  const directValue = Number(post?.readingTime);

  if (Number.isFinite(directValue) && directValue > 0) {
    return `${Math.ceil(directValue)} min read`;
  }

  const text = [post?.excerpt, post?.content]
    .filter(Boolean)
    .join(" ")
    .replace(/<[^>]*>/g, " ")
    .trim();

  if (!text) return null;

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(wordCount / 220))} min read`;
}

function getPostPath(post) {
  return post?.slug ? `/blog/${post.slug}` : "/blog";
}

function normalizePosts(posts) {
  if (!Array.isArray(posts)) return [];

  return posts
    .filter((post) => post && typeof post === "object" && post.slug && post.title)
    .map((post) => ({
      ...post,
      category: post.category || "Cleaning Guides",
      excerpt:
        post.excerpt ||
        "Practical cleaning advice, checklists, and helpful guidance from Byt Cleaning Services.",
      featuredImage: post.featuredImage || FALLBACK_IMAGE,
      featuredImageAlt:
        post.featuredImageAlt || `${post.title} cleaning guide`,
    }));
}

export default function BlogPage() {
  const reducedMotion = useReducedMotion();

  const posts = useMemo(
    () => normalizePosts(publishedBlogPosts),
    [],
  );

  const [featuredPost, ...remainingPosts] = posts;

  const revealProps = {
    initial: reducedMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.45 },
  };

  return (
    <>
      <Helmet>
        <title>Cleaning Tips and Guides Dubai | Byt Cleaning Services</title>
        <meta
          name="description"
          content="Read practical cleaning tips, deep-cleaning guides, maid-service advice, checklists, and Dubai home-care articles."
        />
        <link
          rel="canonical"
          href="https://lucky-crystal.infinityfree.me/blog/"
        />
      </Helmet>

      <main className="min-h-screen overflow-hidden bg-white pb-24 pt-20">
        <section className="relative isolate overflow-hidden bg-ink">
          <img src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1800&q=85" alt="Cleaning guides and home-care planning" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink/45" />
          <BookOpen className="absolute -bottom-20 -right-10 h-72 w-72 rotate-12 text-white/[0.035]" />

          <div className="container relative mx-auto px-5 py-24 sm:px-6 md:py-32">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.55 }}
              className="mx-auto max-w-4xl text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-mint backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Byt Cleaning Services Blog
              </span>

              <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                Cleaning Tips, Checklists and Dubai Home-Care Guides
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-[var(--line)] sm:text-lg">
                Practical advice for maintaining your home, preparing for
                professional cleaning, and selecting the right cleaning
                service.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-[var(--line)]">
                {[
                  "Home-care guides",
                  "Cleaning checklists",
                  "Dubai service advice",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {featuredPost ? (
          <>
            <section className="relative z-10 -mt-10 px-5 sm:px-6">
              <div className="container mx-auto max-w-6xl">
                <motion.article
                  {...revealProps}
                  className="group grid overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr]"
                >
                  <Link
                    to={getPostPath(featuredPost)}
                    className="relative block min-h-[300px] overflow-hidden bg-[var(--line)] lg:min-h-[430px]"
                    aria-label={`Read ${featuredPost.title}`}
                  >
                    <img
                      src={featuredPost.featuredImage}
                      alt={featuredPost.featuredImageAlt}
                      width="1200"
                      height="760"
                      fetchPriority="high"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-deep backdrop-blur">
                      Featured article
                    </span>
                  </Link>

                  <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-deep">
                      {featuredPost.category}
                    </p>

                    <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                      <Link
                        to={getPostPath(featuredPost)}
                        className="transition hover:text-indigo-deep"
                      >
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-ink-muted">
                      {featuredPost.excerpt}
                    </p>

                    <PostMeta post={featuredPost} />

                    <Link
                      to={getPostPath(featuredPost)}
                      className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-indigo px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
                    >
                      Read featured article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              </div>
            </section>

            <section className="bg-white py-20">
              <div className="container mx-auto max-w-6xl px-5 sm:px-6">
                <motion.div {...revealProps} className="text-center">
                  <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-indigo-deep">
                    Latest guidance
                  </span>
                  <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                    More Cleaning Articles
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink-muted">
                    Explore practical advice for homes, apartments, villas,
                    furniture, moving, and everyday cleaning routines.
                  </p>
                </motion.div>

                {remainingPosts.length > 0 ? (
                  <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                    {/* First remaining post: full-width horizontal feature for visual rhythm */}
                    {remainingPosts[0] && (
                      <div className="md:col-span-2 xl:col-span-3">
                        <BlogCard post={remainingPosts[0]} index={0} reducedMotion={reducedMotion} variant="wide" />
                      </div>
                    )}
                    {/* Remaining posts: denser editorial grid */}
                    {remainingPosts.slice(1).map((post, index) => (
                      <BlogCard
                        key={post.slug}
                        post={post}
                        index={index + 1}
                        reducedMotion={reducedMotion}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-[var(--line)] bg-paper p-8 text-center">
                    <BookOpen className="mx-auto h-10 w-10 text-indigo" />
                    <h3 className="mt-5 text-xl font-bold text-ink">
                      More guides are coming soon
                    </h3>
                    <p className="mt-3 leading-7 text-ink-muted">
                      The featured article is currently the only published post.
                      Additional cleaning guides will appear here automatically.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          <EmptyBlogState />
        )}

        <section className="bg-white px-5 py-10 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-deep via-indigo-deep to-ink px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16">
              <Gem className="absolute -bottom-16 -right-10 h-64 w-64 rotate-12 text-white/[0.05]" />

              <div className="relative mx-auto max-w-3xl">
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                  Need Help Choosing a Cleaning Service?
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-soft sm:text-lg">
                  Tell us about your property and cleaning requirements, and
                  our team will help you select a suitable service.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    to="/quote"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-indigo-deep transition hover:-translate-y-0.5 hover:bg-indigo-soft"
                  >
                    Request a Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/15"
                  >
                    Explore Services
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

function BlogCard({ post, index, reducedMotion, variant }) {
  const wide = variant === "wide";
  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reducedMotion ? 0 : 0.4,
        delay: reducedMotion ? 0 : Math.min(index * 0.05, 0.2),
      }}
      className={`group flex h-full overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-sm transition hover:-translate-y-1 hover:border-indigo/30 hover:shadow-xl ${
        wide ? "flex-col sm:flex-row" : "flex-col"
      }`}
    >
      <Link
        to={getPostPath(post)}
        className={`relative block overflow-hidden bg-[var(--line)] ${
          wide ? "aspect-[16/10] sm:aspect-auto sm:w-1/2" : "aspect-[16/10]"
        }`}
        aria-label={`Read ${post.title}`}
      >
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt}
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

      <div className={`flex flex-1 flex-col ${wide ? "p-7 sm:p-10 lg:p-12" : "p-6"}`}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-deep">
          {post.category}
        </p>

        <h2 className={`mt-3 font-bold leading-snug text-ink ${wide ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          <Link
            to={getPostPath(post)}
            className="transition hover:text-indigo-deep"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-4 flex-1 text-sm leading-6 text-ink-muted">
          {post.excerpt}
        </p>

        <PostMeta post={post} compact />

        <Link
          to={getPostPath(post)}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-deep transition group-hover:text-indigo-deep"
        >
          Read article
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

function PostMeta({ post, compact = false }) {
  const readingTime = getReadingTime(post);

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-muted ${
        compact ? "mt-5 text-xs" : "mt-6 text-sm"
      }`}
    >
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        <time dateTime={post.date || undefined}>{formatDate(post.date)}</time>
      </span>

      {readingTime && (
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-4 w-4" aria-hidden="true" />
          {readingTime}
        </span>
      )}
    </div>
  );
}

function EmptyBlogState() {
  return (
    <section className="bg-white px-5 py-24 sm:px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-[var(--line)] bg-paper p-8 text-center sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-soft text-indigo-deep">
            <ImageOff className="h-8 w-8" />
          </span>

          <h2 className="mt-6 font-display text-3xl font-bold text-ink">
            No Published Articles Yet
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-ink-muted">
            Published blog posts will appear here automatically when they are
            available through the blog loader.
          </p>

          <Link
            to="/services"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-indigo px-6 py-3 font-bold text-white transition hover:bg-indigo-deep"
          >
            Explore Cleaning Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
