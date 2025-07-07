import React, { useState } from 'react'
import Footer from '../components/Footer'
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'

const UploadMusic = () => {

  const navigate = useNavigate()

  const [songTitle, setSongTitle] = useState('')
  const [artistName, setArtistName] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Console details
    console.log('Form submitted:', {
      songTitle,
      artistName,
      audioFile,
      imageFile
    })
    // Reset form
    setSongTitle('')
    setArtistName('')
    setAudioFile(null)
    setImageFile(null)
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
    <div className="flex flex-col min-h-screen bg-white">

      <div className="flex-1 flex flex-col items-center justify-start px-4 py-4">

        {/* Back Button and Upload Music text */}

        <div className="w-full max-w-md mb-36 flex">
          <button onClick={() => navigate(-1)} className="text-2xl cursor-pointer"><IoArrowBackOutline /></button>
          <h1 className="text-2xl font-semibold mx-auto">Upload Music</h1>
        </div>

        {/* Upload Form */}
        <div className="w-full max-w-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Song Title"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-md outline-none"
              required
            />

            <input
              type="text"
              placeholder="Artist Name"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-md outline-none"
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
                <div className="w-full p-3 text-center font-medium bg-gray-100 rounded-4xl cursor-pointer hover:bg-gray-200">
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
                <div className="w-full p-3 text-center font-medium bg-gray-100 rounded-4xl cursor-pointer hover:bg-gray-200">
                  Upload Image File
                </div>
              </label>

            </div>

            {/* Display selected file names */}
            {audioFile && (
              <p className="text-sm text-gray-600">Audio: {audioFile.name}</p>
            )}
            {imageFile && (
              <p className="text-sm text-gray-600">Image: {imageFile.name}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 text-white bg-black rounded-full hover:bg-gray-900 cursor-pointer"
            >
              Upload Music
            </button>

          </form>
        </div>

      </div>

        {/* Footer */}
        <Footer />

    </div>
  )
}

export default UploadMusic