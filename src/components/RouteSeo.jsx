import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://lucky-crystal.infinityfree.me";
const SITE_NAME = "Byte Cleaning Services";
const DEFAULT_DESCRIPTION =
  "Byte Cleaning Services offers professional residential, deep, commercial, furniture, move-in/move-out, and maid cleaning services across Dubai. Book online or request a free quote today.";

// Pages that should never be indexed (transactional / private flows).
const noIndexPaths = new Set(["/checkout", "/booking-confirmation"]);

// Organization + WebSite structured data, injected on every route so search
// engines have a consistent site-wide identity. The per-page LocalBusiness
// schema lives in index.html.
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: "bytalhryacleaning@gmail.com",
      telephone: "+971553730702",
      areaServed: { "@type": "City", name: "Dubai" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/blog/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RouteSeo() {
  const { pathname } = useLocation();
  const canonicalPath = pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const isNoIndex = noIndexPaths.has(pathname);

  return (
    <Helmet>
      <meta name="description" content={DEFAULT_DESCRIPTION} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={isNoIndex ? "noindex, follow" : "index, follow"}
      />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_AE" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:description" content={DEFAULT_DESCRIPTION} />
      <meta
        property="og:image"
        content={`${SITE_URL}/android-chrome-512x512.png`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
      <meta
        name="twitter:image"
        content={`${SITE_URL}/android-chrome-512x512.png`}
      />
      <script type="application/ld+json">{JSON.stringify(ORG_SCHEMA)}</script>
    </Helmet>
  );
}
