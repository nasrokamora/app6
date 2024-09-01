"use client"

export const ImageLoader  = ({src, width})=>{
    return `https://image.tmdb.org/t/p/original/${src}?w=${width}`
}