import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Meridian Folder',
    short_name: 'TMF',
    description: 'In-depth stories of founders, creators, and everyday achievers from every corner of the globe.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F4',
    theme_color: '#0E0E0E',
    icons: [
      {
        src: 'https://res.cloudinary.com/dhbtx0ajy/image/upload/w_192,h_192,c_fill,f_png/v1776711825/instagram-post-4_ia1gdd.avif',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://res.cloudinary.com/dhbtx0ajy/image/upload/w_512,h_512,c_fill,f_png/v1776711825/instagram-post-4_ia1gdd.avif',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
