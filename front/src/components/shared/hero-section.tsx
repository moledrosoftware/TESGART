'use client';

import React from 'react';
import Link from 'next/link';
import { Title } from './title';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-[100vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      {/* Overlay for darker background effect */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content inside the hero section */}
      <div className="container mx-auto relative z-10 text-white px-4 lg:flex lg:justify-between lg:items-center">
        
        {/* Left Section (Text and CTA) */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg uppercase tracking-widest">TESGART'a</p>
          <Title text="Hoş Geldiniz!" className="text-5xl lg:text-6xl font-bold mb-5" />
          <p className="pb-6 text-lg lg:text-xl text-gray-300 xl:pb-10">
          TESGART - Su Pompalarında Güvenilir Çözüm Ortağınız          </p>
          <Link href="/about-us" passHref>
            <Button className="bg-primary text-white px-8 py-3 rounded-md shadow-lg hover:bg-opacity-90" id="about-section">
              Hakkımızda <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Right Section (Product Image or Visual Element) */}
        <motion.div
          className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image src="/img1.png" alt="product1" width={150} height={150} className="w-full h-auto object-cover" />
          <Image src="/img2.png" alt="product2" width={150} height={150} className="w-full h-auto object-cover" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
