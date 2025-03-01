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
  alt = "",
  fill,
  priority = false,
  unoptimized

}) {

  return (
    <Image
      loader={ImageCloudinaryLoader}
      src={`https://image.tmdb.org/t/p/w500${tmdbPath}`}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={priority}
      quality={quality}
      style={style}
      fill={fill}
      unoptimized={unoptimized}
    />
  );
}