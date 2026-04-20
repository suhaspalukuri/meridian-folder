'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
  imageSrc: string
  imageAlt: string
  children: React.ReactNode
}

export default function StickyImageLayout({ imageSrc, imageAlt, children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(true)

  useEffect(() => {
    function onScroll() {
      if (!contentRef.current) return
      const rect = contentRef.current.getBoundingClientRect()
      // When the bottom of the content column reaches the top of the viewport, unpin
      setPinned(rect.bottom > 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="lg:flex lg:items-start">
      {/* LEFT — image, fixed while content is in view */}
      <div
        className="hidden lg:block lg:w-[50%] lg:flex-shrink-0"
        style={{ position: pinned ? 'sticky' : 'relative', top: pinned ? 0 : 'auto' }}
      >
        <div className="pl-14 pt-10">
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
          </div>
        </div>
      </div>

      {/* RIGHT — scrollable content */}
      <div ref={contentRef} className="lg:w-[50%] min-w-0">
        {children}
      </div>
    </div>
  )
}
