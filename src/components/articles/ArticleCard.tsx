import React from 'react';

interface ArticleCardProps {
    title: string;
    excerpt: string;
    thumbnail: string;
    slug: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, excerpt, thumbnail, slug }) => {
    return (
        <div className="article-card">
            <img src={thumbnail} alt={title} className="article-thumbnail" />
            <h2 className="article-title">{title}</h2>
            <p className="article-excerpt">{excerpt}</p>
            <a href={`/articles/${slug}`} className="read-more">Read More</a>
        </div>
    );
};

export default ArticleCard;