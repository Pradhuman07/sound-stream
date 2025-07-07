import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  songs: [
{ title: 'Ho Hey', artist: 'The Lumineers', image: 'https://images.unsplash.com/photo-1591992326744-e11ed5993bcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Fix You', artist: 'Coldplay', image: 'https://images.unsplash.com/photo-1525098434707-6ce12d833c63?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Shape of You', artist: 'Ed Sheeran', image: 'https://images.unsplash.com/photo-1692248796805-59de5e7760d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Rolling in the Deep', artist: 'Adele', image: 'https://images.unsplash.com/photo-1571706782046-0ffc7fcb055c?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Believer', artist: 'Imagine Dragons', image: 'https://images.unsplash.com/photo-1750688650545-d9e2a060dfe8?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Sugar', artist: 'Maroon 5', image: 'https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Shake It Off', artist: 'Taylor Swift', image: 'https://images.unsplash.com/photo-1751315039431-86ad38f1b046?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Sorry', artist: 'Justin Bieber', image: 'https://images.unsplash.com/photo-1750797636255-8c939940bcad?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Midnight Serenade', artist: 'Luna', image: 'https://images.unsplash.com/photo-1743708899853-db41b532b299?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ],
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
  }
})

export const { setCurrentSong, togglePlayPause } = musicSlice.actions
export default musicSlice.reducer