function parseFrontmatter(rawFile) {
  const normalized = rawFile.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    throw new Error("Missing opening frontmatter marker.");
  }

  const closingIndex = normalized.indexOf("\n---\n", 4);

  if (closingIndex === -1) {
    throw new Error("Missing closing frontmatter marker.");
  }

  const metadataSection = normalized.slice(4, closingIndex);
  const content = normalized.slice(closingIndex + 5).trim();
  const metadata = {};

  for (const line of metadataSection.split("\n")) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key) {
      metadata[key] = value;
    }
  }

  return {
    metadata,
    content,
  };
}

const markdownFiles = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function createBlogPost(rawFile, sourcePath) {
  try {
    const { metadata, content } = parseFrontmatter(rawFile);

    if (!metadata.title || !metadata.slug) {
      throw new Error("Every article requires a title and slug.");
    }

    return {
      ...metadata,
      content,
      sourcePath,
    };
  } catch (error) {
    console.error(`Unable to load ${sourcePath}:`, error);
    return null;
  }
}

export const publishedBlogPosts = Object.entries(markdownFiles)
  .map(([sourcePath, rawFile]) => {
    return createBlogPost(rawFile, sourcePath);
  })
  .filter(Boolean)
  .filter((post) => post.status === "published")
  .sort((firstPost, secondPost) => {
    return new Date(secondPost.date) - new Date(firstPost.date);
  });

export function findBlogPostBySlug(slug) {
  return publishedBlogPosts.find((post) => post.slug === slug);
}

export function findRelatedPosts(currentPost, limit = 3) {
  return publishedBlogPosts
    .filter((post) => {
      return (
        post.slug !== currentPost.slug &&
        post.category === currentPost.category
      );
    })
    .slice(0, limit);
}