import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ArticleGrid from '../../components/articles/ArticleGrid';
import { fetchArticles } from '../../lib/api';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    const articles = await fetchArticles(query);
    setResults(articles);
  };

  return (
    <div className="search-page">
      <h1>Search Articles</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for articles..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {results.length > 0 ? (
        <ArticleGrid articles={results} />
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default SearchPage;