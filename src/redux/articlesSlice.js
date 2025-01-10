import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch Articles from API
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await fetch('http://localhost:5000/api/articles'); // Backend URL
    return response.json();
  }
);

// Create a new article (POST request to save the article)
export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (newArticle) => {
    const response = await fetch('http://localhost:5000/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle),
    });
    return response.json(); // Return the created article with its ID
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.list.push(action.payload); // Add the new article to the list
      });
  },
});

export default articlesSlice.reducer;
