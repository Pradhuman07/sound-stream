import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../config/api'

// Async thunk for fetching songs
export const fetchSongs = createAsyncThunk(
  'music/fetchSongs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/song')  // Changed to match backend route
      if (response.data?.songs) {
        return response.data.songs
      } else {
        return rejectWithValue('No songs found')
      }
    } catch (error) {
      console.error('Error fetching songs:', error.response || error)
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to fetch songs. Please try again later.'
      )
    }
  }
)

const initialState = {
  songs: [],
  loading: false,
  error: null,
  currentSong: null,
  isPlaying: false
}

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false
        state.songs = action.payload
        state.error = null
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { setCurrentSong, togglePlayPause } = musicSlice.actions
export default musicSlice.reducer