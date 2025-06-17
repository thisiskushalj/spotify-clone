import React, { useEffect, useRef } from 'react'
import DisplayHome from './DisplayHome'
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayAlbum from './DisplayAlbum';
import { albumsData } from '../assets/assets';

const Display = () => {

  const displayRef = useRef(); // Ref to the div to change background color
  const location = useLocation(); // Get current URL info
  const isAlbum = location.pathname.includes("album") // Check if URL includes 'album'
  const albumId = isAlbum ? location.pathname.slice(-1) : ""; // Extract album ID from URL (last character)
  const bgColor = albumsData[Number(albumId)].bgColor; // Extract album ID from URL (last character)

  // Set background based on album route
  useEffect(()=>{
    if(isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`
    }
    else {
      displayRef.current.style.background = `#121212`
    }
  })

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes> {/* DisplayHome or DisplayAlbumb is shown based on routes */}
            <Route path='/' element={<DisplayHome/>} />
            <Route path='/album/:id' element={<DisplayAlbum/>} />
        </Routes>
    </div>
  )
}

export default Display
