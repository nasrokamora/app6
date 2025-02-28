"use client";
import Image from "next/image";
import ImageCloudinaryLoader from "./loader";

export default function ImagePosterPath({
  index,
  tmdbPath,
  width,
  height,
  className = "",
  quality,
  style,

}) {

  return (
    <Image
      loader={ImageCloudinaryLoader}
      src={`https://image.tmdb.org/t/p/w500${tmdbPath}`}
      width={width}
      height={height}
      alt="Movie Poster"
      className={className}
      priority={index === 6}
      quality={quality}
      style={style}
    />
  );
}