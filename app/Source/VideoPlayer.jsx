// import React from "react";

import Link from "next/link";

export const VideoPlayerSRCTo = ({ movieId }) => {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <iframe
        src={`https://embed.su/embed/movie/${movieId}`}
        width="100%"
        height="500px"
        allowFullScreen
        className="rounded-lg shadow-lg"
      />
    </div>
  )
}

export const VideoPlayerMovies = ({ movieId }) => {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <iframe
        src={`https://vidsrc.dev/embed/movie/${movieId}`}
        width="100%"
        height="500px"
        allowFullScreen
        className="rounded-lg shadow-lg"
      />
    </div>
  )
}

export const VideoPlayerMoviesSRC = ({ movieId }) => {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <iframe
        src={`https://vidsrc.xyz/embed/movie/${movieId}`}
        width="100%"
        height="500px"
        allowFullScreen
        className="rounded-lg shadow-lg"
      />
    </div>
  )
}
