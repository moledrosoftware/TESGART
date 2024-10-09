'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronsRight } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { Title } from './title';

const FeatureSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Запускается только один раз
    threshold: 0.2, // Процент видимости, при котором сработает анимация
  });

  return (
    <div
      className="relative flex w-full h-[100vh] items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg1.png')" }}
    >
      <p className="absolute top-0 left-1/2 transform -translate-x-1/2 text-5xl lg:text-6xl font-extrabold text-center text-white pt-4">
        Özellikler:
      </p>

      {/* Left Section (Image) */}
      <div className="relative z-10 flex-col items-center justify-center lg:w-1/2 ml-8">
        <Image
          src="/bg2.png"
          alt="Background Image"
          width={400}
          height={400}
          className="object-contain"
        />
        <Link href="/products" passHref>
          <Button className="bg-primary text-white px-8 py-3 rounded-md shadow-lg hover:bg-opacity-90 ml-8 mt-4">
            Kataloğumuz<ChevronsRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Right Section (Text and CTA) */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 text-gray-300 lg:w-1/2 px-4 pt-4 text-center gap-10"
      >
        <Title
          text="Yüksek Verimlilik:"
          className="text-3xl lg:text-4xl font-bold mb-5"
        />
        <p className="pb-6 text-lg lg:text-xl text-muted-foreground xl:pb-5">
          Tüm pompalarımız, yüksek performans ve enerji verimliliği sağlamak üzere
          tasarlanmıştır.
        </p>

        <Title
          text="Dayanıklı Yapı:"
          className="text-3xl lg:text-4xl font-bold mb-5"
        />
        <p className="pb-6 text-lg lg:text-xl text-muted-foreground xl:pb-5">
          Paslanmaz çelik ve diğer dayanıklı malzemeler kullanılarak üretilen pompalarımız,
          uzun ömürlü kullanım sunar.
        </p>

        <Title
          text="Geniş Ürün Çeşitliliği:"
          className="text-3xl lg:text-4xl font-bold mb-5"
        />
        <p className="pb-6 text-lg lg:text-xl text-muted-foreground xl:pb-5">
          Farklı ihtiyaçlara uygun olarak çeşitli debi ve basınç kapasitelerine sahip pompalar
          mevcuttur.
        </p>
      </motion.div>
    </div>
  );
};

export default FeatureSection;
