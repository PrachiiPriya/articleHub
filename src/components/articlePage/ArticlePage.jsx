import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ArticlePage = () => {
  const { id } = useParams(); // Get the article ID from the URL params
  const [article, setArticle] = useState(null); // Store a single article
  const [fontSize, setFontSize] = useState(16); // Font size state
  const [progress, setProgress] = useState(0); // Scroll progress
  const navigate = useNavigate(); // For redirection

  // Fetch article on initial load
  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => setArticle(data)); // Set article data
  }, [id]);

  // Update reading progress based on scroll position
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollProgress = (scrollTop / (docHeight - winHeight)) * 100;
    setProgress(scrollProgress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Increase or decrease font size
  const changeFontSize = (operation) => {
    if (operation === 'increase') {
      setFontSize(fontSize + 2);
    } else if (operation === 'decrease') {
      setFontSize(fontSize - 2);
    }
  };

  // Handle editing the article
  const handleEditClick = () => {
    navigate(`/edit-article/${id}`); // Redirect to the edit page
  };

  // If article is not loaded yet, show a loading message
  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      {/* Sticky Header */}
      <div style={styles.stickyHeader}>
        <h1>{article.title}</h1>
        <p>Last edited on {new Date(article.lastEdited).toLocaleDateString()}</p>
        <p style={styles.readingTime}>{article.readingTime} min read</p>
      </div>

      {/* Scroll Progress */}
      <div style={styles.progressContainer}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
      </div>

      {/* Font Size Controls */}
      <div style={styles.fontSizeControls}>
        <button onClick={() => changeFontSize('decrease')}>A-</button>
        <button onClick={() => changeFontSize('increase')}>A+</button>
      </div>

      {/* Article Content */}
      <div style={{ ...styles.articleContent, fontSize: `${fontSize}px` }}>
        <div>{article.content}</div>
      </div>

      {/* Edit Button */}
      <button onClick={handleEditClick} style={styles.editButton}>
        Edit Article
      </button>
    </div>
  );
};

// Basic styling
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
  },
  readingTime: {
    fontStyle: 'italic',
    color: '#888',
  },
  progressContainer: {
    width: '100%',
    height: '5px',
    backgroundColor: '#ddd',
    margin: '10px 0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  fontSizeControls: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  articleContent: {
    lineHeight: '1.8',
    fontFamily: 'Arial, sans-serif',
    marginTop: '20px',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default ArticlePage;
