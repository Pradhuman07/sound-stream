import React, { useState } from 'react'
import Footer from '../components/Footer'
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import api from '../config/api'
import { useDispatch } from 'react-redux'
import { fetchSongs } from '../store/musicSlice'
import SecurityPinModal from '../components/SecurityPinModal'

const UploadMusic = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [songTitle, setSongTitle] = useState('')
  const [artistName, setArtistName] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showPinModal, setShowPinModal] = useState(false)
  const [formData, setFormData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Store form data and show pin modal
    setFormData(new FormData())
    setShowPinModal(true)
  }

  const handleUploadWithPin = async (pin) => {
    setIsUploading(true)
    setShowPinModal(false)
    
    try {
      formData.append('title', songTitle)
      formData.append('artist', artistName)
      formData.append('audio', audioFile)
      formData.append('poster', imageFile)
      formData.append('securityPin', pin)

      await api.post('/song/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('Upload Progress:', percentCompleted + '%');
        }
      })

      // Refresh songs list
      dispatch(fetchSongs())

      // Reset form
      setSongTitle('')
      setArtistName('')
      setAudioFile(null)
      setImageFile(null)

      // Navigate back to home
      navigate('/')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload song')
      setIsUploading(false)
    }
  }

  const handleAudioUpload = (e) => {
    const file = e.target.files[0]
    setAudioFile(file)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
  }

  return (
    <div className="flex flex-col min-h-screen theme-bg-primary">

      <div className="flex-1 flex flex-col items-center justify-start px-4 py-4">

        {/* Back Button and Upload Music text */}

        <div className="w-full max-w-md mb-36 flex">
          <button onClick={() => navigate(-1)} className="text-2xl cursor-pointer text-indigo-300"><IoArrowBackOutline /></button>
          <h1 className="text-2xl font-semibold mx-auto bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">Upload Music</h1>
        </div>

        {/* Upload Form */}
        <div className="w-full max-w-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Song Title"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="w-full p-3 theme-input-bg theme-text-primary placeholder-gray-500 rounded-md outline-none"
              required
            />

            <input
              type="text"
              placeholder="Artist Name"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="w-full p-3 theme-input-bg theme-text-primary placeholder-gray-500 rounded-md outline-none"
              required
            />

            <div className="flex gap-4">

              <label className="flex-1">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                  required
                />
                <div className="w-full p-3 text-center font-medium theme-input-bg theme-text-secondary rounded-4xl cursor-pointer hover:opacity-80 active:opacity-60">
                  Upload Audio File
                </div>
              </label>

              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
                <div className="w-full p-3 text-center font-medium theme-input-bg theme-text-secondary rounded-4xl cursor-pointer hover:opacity-80 active:opacity-60">
                  Upload Image File
                </div>
              </label>

            </div>

            {/* Display selected file names */}
            {audioFile && (
              <p className="text-sm theme-text-tertiary ml-4">Audio: {audioFile.name}</p>
            )}
            {imageFile && (
              <p className="text-sm theme-text-tertiary ml-4">Image: {imageFile.name}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full p-3 text-white bg-indigo-500 rounded-full ${
                isUploading 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'hover:bg-indigo-800 cursor-pointer'
              }`}
            >
              {isUploading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </div>
              ) : (
                'Upload Music'
              )}
            </button>

          </form>
        </div>

      </div>

        {/* Security Pin Modal */}
        <SecurityPinModal
          isOpen={showPinModal}
          onClose={() => setShowPinModal(false)}
          onConfirm={handleUploadWithPin}
          className="bg-red"
        />

        {/* Footer */}
        <Footer />

    </div>
  )
}

export default UploadMusic