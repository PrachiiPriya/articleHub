import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createArticle } from '../../redux/articlesSlice'; // Import the createArticle action
import { useNavigate } from 'react-router-dom';
import { fetchArticles } from '../../redux/articlesSlice'; // Import fetchArticles to refresh the list

const EditorPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState({
    technology: false,
    science: false,
    health: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to calculate reading time based on word count
  const calculateReadingTime = (text) => {
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / 200); // Assume 200 words per minute
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newArticle = {
      title,
      content,
      readingTime: calculateReadingTime(content),
      lastEdited: new Date().toISOString(),
      categories: Object.keys(categories).filter((key) => categories[key]),
    };

    console.log('New Article Data:', newArticle);

    // Dispatch action to save the article
    dispatch(createArticle(newArticle)).then(() => {
      // After article creation, refresh the articles list
      dispatch(fetchArticles());
      // Navigate back to the homepage or article list
      navigate('/');
    });
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setCategories((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div style={styles.container}>
      <h1>Create New Article</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Title Input */}
        <div style={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* Content Input */}
        <div style={styles.formGroup}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>

        {/* Categories */}
        <div style={styles.formGroup}>
          <label>Categories:</label>
          <div>
            {Object.keys(categories).map((category) => (
              <label key={category} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name={category}
                  checked={categories[category]}
                  onChange={handleCategoryChange}
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.submitButton}>
          Create Article
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '5px',
  },
  textarea: {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    height: '150px',
    resize: 'vertical',
    marginTop: '5px',
  },
  checkboxLabel: {
    display: 'block',
    marginTop: '5px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
  },
};

export default EditorPage;
