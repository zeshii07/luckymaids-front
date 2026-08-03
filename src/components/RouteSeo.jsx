import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.luckycrystalmaids.com";
const DEFAULT_DESCRIPTION = "Professional cleaning and maid services for homes and businesses across Dubai. Book flexible residential, deep, commercial, furniture, and move cleaning services.";
const noIndexPaths = new Set(["/checkout", "/booking-confirmation"]);

export default function RouteSeo() {
  const { pathname } = useLocation();
  const canonicalPath = pathname === "/" ? "/" : `${pathname.replace(/\/+$/, "")}/`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      <meta name="description" content={DEFAULT_DESCRIPTION} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noIndexPaths.has(pathname) ? "noindex,follow" : "index,follow"} />
      <meta property="og:site_name" content="Lucky Crystal Maids" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:description" content={DEFAULT_DESCRIPTION} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
    </Helmet>
  );
}
