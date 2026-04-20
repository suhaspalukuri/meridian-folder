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
        src: 'https://res.cloudinary.com/dhbtx0ajy/image/upload/v1776711825/instagram-post-4_ia1gdd.avif',
        sizes: 'any',
        type: 'image/avif',
      },
    ],
  }
}
