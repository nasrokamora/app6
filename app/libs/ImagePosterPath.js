"use client";
import Image from "next/image";
import ImageCloudinaryLoader from "./loader";

export default function ImagePosterPath({
  index,
  tmdbPath,
  width,
  height,
  className = "",
}) {

  const originalTMDBUrl = `https://image.tmdb.org/t/p/original/${tmdbPath}`;

  return (
    <Image
      loader={ImageCloudinaryLoader}
      src={`https://image.tmdb.org/t/p/original${tmdbPath}`}
      width={200}
      height={200}
      alt="Movie Poster"
      className={className}
      priority={index === 6}
    />
  );
}