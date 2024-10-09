'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type ImageProps = {
  src: string;
  alt: string;
};

const images: ImageProps[] = [
  { src: "/catalog1.jpeg", alt: "Catalog 1" },
  { src: "/catalog2.jpeg", alt: "Catalog 2" },
  { src: "/catalog3.jpeg", alt: "Catalog 3" },
];

const Catalog: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4">
      {images.map(({ src, alt }, index) => (
        <motion.div
          key={index}
          className={`relative overflow-hidden rounded-lg cursor-pointer ${
            index === 1 ? 'w-80 h-120' : 'w-64 h-96'
          }`}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.open(src, '_blank')}
        >
          <Image
            src={src}
            alt={alt}
            role = "presentation"
            className="object-cover w-full h-full"
            width={500} 
            height={index === 1 ? (500 * 480 / 320) : (500 * 384 / 256)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Catalog;
