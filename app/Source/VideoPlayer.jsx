// import React from "react";

import Link from "next/link";

const VideoPlayer = ({ movieId }) => {
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
  );
};

export default VideoPlayer;



export const VideoPlayerMovies = ({ movieId }) => {
    return(
        <div className="w-full flex justify-center items-center py-10">
            <Link href={`/Source`} >


          VidSrc.to
          </Link>
      </div>
    )
}
