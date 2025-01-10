import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../redux/articlesSlice';
import ArticleCard from '../homePage/ArticleCard';
import SearchBar from '../header/SearchBar';
import FilterPills from '../header/FilterPills'; // Make sure this is implemented

const HomePage = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.articles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // Store selected filter

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchArticles());
    }
  }, [dispatch, status]);

  // Filtering articles using useMemo to avoid re-filtering on each render
  const filteredArticles = useMemo(() => {
    let filtered = list;

    // Debugging: Log selectedFilter and article categories
    console.log("Selected Filter:", selectedFilter);
    console.log("Article Categories:", list.map((article) => article.categories));

    // Filter by selected category if it's not 'all'
    if (selectedFilter !== 'all') {
      filtered = list.filter((article) => {
        // Normalize both selectedFilter and article categories to lowercase
        const normalizedCategories = article.categories.map(category => category.toLowerCase());
        const normalizedFilter = selectedFilter.toLowerCase();

        console.log("Filtering article:", article.title, "Categories:", normalizedCategories);

        return normalizedCategories.includes(normalizedFilter);
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [list, selectedFilter, searchTerm]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <FilterPills 
        filters={['all', 'technology', 'health', 'science']} // Add all categories
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter} // Update selected filter
      />
      <div className="article-list">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
