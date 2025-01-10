import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../redux/articlesSlice';
import ArticleCard from '../homePage/ArticleCard';
import SearchBar from '../header/SearchBar';
import FilterPills from '../header/FilterPills';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  padding: 20px;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const ArticleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Loading = styled.p`
  text-align: center;
  font-size: 1.2rem;
`;

function HomePage() {
  const dispatch = useDispatch();
  const { list: articles, status } = useSelector((state) => state.articles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All'); // Default filter
  const [filters, setFilters] = useState(['All', 'Technology', 'Health', 'Science']); // Example filters

  useEffect(() => {
    dispatch(fetchArticles()); // Fetch articles on page load
  }, [dispatch]);

  // Handle search input changes
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Handle filter selection
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    console.log('Selected filter:', filter); // Log selected filter for debugging
  };

  // Filter articles based on search term and selected filter
  const filteredArticles = articles
    .filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((article) =>
      selectedFilter === 'All' || (article.category && article.category.toLowerCase() === selectedFilter.toLowerCase())
    );

  if (status === 'loading') return <Loading>Loading articles...</Loading>;
  if (status === 'failed') return <Loading>Error fetching articles.</Loading>;

  return (
    <HomePageContainer>
      <h2>📰 Latest Articles</h2>
      <ControlsContainer>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <FilterPills
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterSelect={handleFilterSelect}
        />
      </ControlsContainer>
      <ArticleGrid>
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ArticleGrid>
    </HomePageContainer>
  );
}

export default HomePage;
