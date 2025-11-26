export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: Date;
  author: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  author: string;
  url: string;
}