'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
}

const images: GalleryImage[] = [
  { src: '/images/1742790421461.jpeg', alt: 'Event 1' },
  { src: '/images/1742968013027.jpeg', alt: 'Event 2' },
  { src: '/images/1742968014819.jpeg', alt: 'Event 3' },
  { src: '/images/1752521548568.jpeg', alt: 'Event 4' },
  { src: '/images/1752521548705.jpeg', alt: 'Event 5' },
  { src: '/images/1752521560961.jpeg', alt: 'Event 6' },
  { src: '/images/1752521568478.jpeg', alt: 'Event 7' },
  { src: '/images/1754576629784.jpeg', alt: 'Event 8' },
  { src: '/images/1755588610251.jpeg', alt: 'Event 9' },
  { src: '/images/1755954269421.jpeg', alt: 'Event 10' },
  { src: '/images/1755954276984.jpeg', alt: 'Event 11' },
  { src: '/images/1756039330335.jpeg', alt: 'Event 12' },
  { src: '/images/1756039330808.jpeg', alt: 'Event 13' },
  { src: '/images/1756091083131.jpeg', alt: 'Event 14' },
  { src: '/images/1756800054277.jpeg', alt: 'Event 15' },
  { src: '/images/1757333781247.jpeg', alt: 'Event 16' },
  { src: '/images/1757347672504.jpeg', alt: 'Event 17' },
  { src: '/images/1757599685915.jpeg', alt: 'Event 18' },
  { src: '/images/1757599685948.jpeg', alt: 'Event 19' },
  { src: '/images/1758510070221.jpeg', alt: 'Event 20' },
  { src: '/images/1758510078094.jpeg', alt: 'Event 21' },
  { src: '/images/1763436697715.jpeg', alt: 'Award 1' },
  { src: '/images/1763436698489.jpeg', alt: 'Award 2' },
  { src: '/images/1763436701030.jpeg', alt: 'Award 3' },
  { src: '/images/1763436706045.jpeg', alt: 'Award 4' },
  { src: '/images/1763436708476.jpeg', alt: 'Award 5' },
  { src: '/images/1763436708879.jpeg', alt: 'Award 6' },
  { src: '/images/1765389815194.jpeg', alt: 'Award 7' },
  { src: '/images/1766060835012.jpeg', alt: 'Event 22' },
  { src: '/images/1766060837411.jpeg', alt: 'Event 23' },
  { src: '/images/1766060837411_1.jpeg', alt: 'Event 24' },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(image, index)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-line-2 bg-panel transition-all duration-300 hover:border-gold"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
              <div className="opacity-0 transition-opacity group-hover:opacity-100">
                <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closeLightbox}>
          <div className="relative flex max-h-[90vh] max-w-4xl items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-gold hover:text-cream transition-colors"
            >
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative aspect-auto max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-lg">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-gold hover:bg-black/70 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-gold hover:bg-black/70 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
              <p className="text-sm text-muted">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
