import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    excerpt: { type: 'string', required: true },
    category: { type: 'string', required: true },
    slug: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (article) => `/articles/${article.slug}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'src/content/articles',
  documentTypes: [Article],
});