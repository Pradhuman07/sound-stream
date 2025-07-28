import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../config/api'

// Async thunk for fetching songs
export const fetchSongs = createAsyncThunk(
  'music/fetchSongs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/song')  // Changed to match backend route
      if (response.data?.songs) {
        // Sort songs by createdAt in descending order (newest first)
        const sortedSongs = [...response.data.songs].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        return sortedSongs;
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

// Get last played song from localStorage if available
const lastPlayedSong = localStorage.getItem('lastPlayedSong') 
  ? JSON.parse(localStorage.getItem('lastPlayedSong')) 
  : null;

const initialState = {
  songs: [],
  loading: false,
  error: null,
  currentSong: lastPlayedSong, // Initialize with last played song
  isPlaying: false
}

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload
      // Save to localStorage whenever current song changes
      if (action.payload) {
        localStorage.setItem('lastPlayedSong', JSON.stringify(action.payload))
      }
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying
    },
    resetMusicState: (state) => {
      state.currentSong = null
      state.isPlaying = false
      state.songs = []
      state.loading = false
      state.error = null
      // Clear last played song from localStorage
      localStorage.removeItem('lastPlayedSong')
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

export const { setCurrentSong, togglePlayPause, resetMusicState } = musicSlice.actions
export default musicSlice.reducer