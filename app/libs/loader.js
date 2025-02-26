


export default function ImageCloudinaryLoader({ src, width, quality }) {
  const params = ['f_auto', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/fetch/${params.join('_')}${src}`;
}