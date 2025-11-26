import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: true },
    category: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    author: { type: 'string', default: 'The Hampstead Design Journal' },
    featured: { type: 'boolean', default: false },
    keywords: { type: 'string', required: false },
    coverImage: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (article) => `/articles/${article.slug}`,
    },
    readingTime: {
      type: 'json',
      resolve: (article) => {
        const wordsPerMinute = 200;
        const wordCount = article.body.raw.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return {
          text: `${readingTime} min read`,
          minutes: readingTime,
          words: wordCount,
        };
      },
    },
    headings: {
      type: 'json',
      resolve: async (article) => {
        const headingRegex = /^(#{2,3})\s+(.+)$/gm;
        const headings: { level: number; text: string; slug: string }[] = [];
        let match;
        while ((match = headingRegex.exec(article.body.raw)) !== null) {
          const text = match[2].trim();
          headings.push({
            level: match[1].length,
            text,
            slug: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          });
        }
        return headings;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'src/content/articles',
  documentTypes: [Article],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});