'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { Title } from "@/components/shared/title";
import { Container } from "@/components/shared/container";
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'; // ShadCN Carousel bileşенleri
import { SquareArrowLeft, SquareArrowRight } from "lucide-react";

// Интерфейс для описания продукта
interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

// Компонент для открытия изображения в новой вкладке
const ProductImage = ({ src, alt }: { src: string, alt: string }) => {
  const openImageInNewWindow = () => {
    window.open(src, '_blank');
  };

  return (
    <div className="relative group cursor-pointer transition-transform transform hover:scale-135" onClick={openImageInNewWindow}>
      <Image
        src={src}
        alt={alt}
        role="presentation" //for the best visibility w,h=500
        width={500}
        height={500}
        className="object-cover rounded-lg shadow-md transition-shadow duration-300 group-hover:shadow-xl"
      />
    </div>
  );
};

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]); // Типизация состояния для продуктов
  const [currentIndex, setCurrentIndex] = useState(0);

  // Загружаем товары с сервера при монтировании компонента
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products'); // Запрос на сервер
        const data: Product[] = await response.json();
        setProducts(data); // Обновляем состояние с данными товаров
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Получить три изображения: предыдущее, текущее и следующее
  const getVisibleImages = () => {
    if (products.length === 0) return [];
    const prevImage = products[(currentIndex - 1 + products.length) % products.length];
    const currentImage = products[currentIndex];
    const nextImage = products[(currentIndex + 1) % products.length];

    return [prevImage, currentImage, nextImage];
  };

  const visibleImages = getVisibleImages();

  return (
    <Container className="flex flex-col items-center px-4 py-8 bg-[#093558]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full mb-8"
      >
        <Title text="Ürün Kataloğu" className="text-5xl lg:text-6xl text-center font-extrabold mb-8 text-[#F0F8FF]" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full mb-8"
        > 
        </motion.div>
      </motion.div>

      {/* Carousel Slider */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full max-w-6xl"
      >
        <div className="flex items-center justify-center space-x-4">
          <button onClick={prevSlide} className="prev-button text-white bg-[#093558] px-4 py-2 rounded">
          <SquareArrowLeft className="w-7 h-7 ml-4"/>
          </button>

          {/* Carousel content */}
          <Carousel>
            <CarouselContent>
              {visibleImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/3">
                  <ProductImage src={`http://localhost:5000${image.image_url}`} alt={image.name} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <button onClick={nextSlide} className="next-button text-white bg-[#093558] px-4 py-2 rounded">
             <SquareArrowRight className="w-7 h-7 ml-4"/>
          </button>
        </div>
      </motion.div>
    </Container>
  );
};

export default Page;
