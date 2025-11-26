import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Typography } from '../ui/Typography';

const components = {
  h1: (props) => <Typography variant="h1" {...props} />,
  h2: (props) => <Typography variant="h2" {...props} />,
  h3: (props) => <Typography variant="h3" {...props} />,
  p: (props) => <Typography variant="body" {...props} />,
  // Add more custom components as needed
};

const ArticleContent = ({ content }) => {
  return (
    <MDXProvider components={components}>
      <div className="article-content">
        {content}
      </div>
    </MDXProvider>
  );
};

export default ArticleContent;