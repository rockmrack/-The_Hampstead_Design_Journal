import React from 'react';
import { Typography } from '../ui/Typography';

interface ComponentProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

const components = {
  h1: (props: ComponentProps) => <Typography variant="h1" {...props} />,
  h2: (props: ComponentProps) => <Typography variant="h2" {...props} />,
  h3: (props: ComponentProps) => <Typography variant="h3" {...props} />,
  p: (props: ComponentProps) => <Typography variant="body" {...props} />,
};

interface ArticleContentProps {
  content: React.ReactNode;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  return (
    <div className="article-content prose prose-lg prose-hampstead max-w-none">
      {content}
    </div>
  );
};

export { components };
export default ArticleContent;