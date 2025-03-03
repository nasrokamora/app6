"use client";
import Image from "next/image";
import ImageCloudinaryLoader from "./loader";
import no_image from '../../public/image/no_image4.webp';
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
  priority = true,
  loading = "eager",
  unoptimized,
  draggable = false

}) {

  return (
    <Image
      loader={ImageCloudinaryLoader}
      src={`https://image.tmdb.org/t/p/w500${tmdbPath}` }
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={priority}
      quality={quality}
      style={style}
      fill={fill}
      loading={loading}
      unoptimized={unoptimized}
      draggable={draggable}
    />
  );
}