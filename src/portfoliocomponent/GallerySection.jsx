import React from 'react';
import { motion } from 'framer-motion';

// Import images from assets folder
import img1 from '../assets/portfolio/img5.jpg';
import img2 from '../assets/portfolio/img2.jpg';
import img3 from '../assets/portfolio/img3.jpg';
import img4 from '../assets/portfolio/img4.jpg';
import img5 from '../assets/portfolio/photo/x.jpg';
import img6 from '../assets/portfolio/img6.jpg';

const images = [
  { id: 1, src: img5 },
  { id: 2, src: img2 },
  { id: 3, src: img3 },
  { id: 4, src: img4 },
  { id: 5, src: img1 },
  { id: 6, src: img6 },
];



const GallerySection = () => {
  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="container mx-auto px-6">

        <h2
          className="text-3xl sm:text-4xl font-extrabold text-center text-[#111827] mb-12"
        >
          Our Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={image.id}
           
              className="relative overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl"
              style={{
                background: index % 2 === 0
                  ? 'linear-gradient(135deg, #436850, #FBFADA)'
                  : 'linear-gradient(135deg, #FBFADA, #436850)'
              }}
            >
              <img
                src={image.src}
                alt={`Gallery Image ${image.id}`}
                loading="lazy"
                className="w-full h-64 md:h-72 lg:h-80 object-cover rounded-lg"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-all duration-300 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
