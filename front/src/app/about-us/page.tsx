'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Устанавливаем isVisible в true сразу после монтирования компонента
    setIsVisible(true);
  }, []);

  return (
    <div
      className="p-6 bg-white shadow-md rounded-lg space-y-8"
      style={{
        backgroundImage: "url('/bg-about.png')",
      }}
    >
      {/* İlk Kısım */}
      <motion.div
        id="about-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl lg:text-6xl font-extrabold mb-10 text-center text-[#F9F9F9]">
          Tesgart Hakkında
        </h1>
        <p className="font-bold text-lg text-center text-[#D1D1D1]">
        TESGART, su pompaları alanında kalite ve güvenilirlik prensiplerini benimseyerek, sektördeki yerini sağlamlaştırmış bir şirkettir. Deneyimli ekibimiz ve yenilikçi yaklaşımımızla, size en uygun su pompası çözümlerini sunmayı hedefliyoruz.          
        </p>
      </motion.div>
   
      {/* İkinci Kısım */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -100 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <h2 className="text-3xl font-semibold text-secondary">Misyonumuz</h2>
        <p className="text-[#D1D1D1] p-4">
        TESGART olarak, su pompaları sektöründe en yüksek kalite standartlarını sunmak, müşterilerimizin ihtiyaçlarını en verimli ve sürdürülebilir şekilde karşılamak misyonumuzdur. Amacımız, yalnızca ürünlerimizle değil, sunduğumuz hizmetlerle de sektörde fark yaratmak ve müşteri memnuniyetini en üst seviyede tutmaktır. Doğal kaynakların verimli kullanımını destekleyen yenilikçi çözümler geliştirerek, topluma ve çevreye karşı sorumluluğumuzu yerine getirmeyi öncelikli hedefimiz olarak belirliyoruz.        </p>
      </motion.div>

      {/* Üçüncü Kısım */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-secondary">Portföyümüzde</h2>
        <p className="text-[#D1D1D1] p-4">
        Tarım, inşaat, endüstriyel ve evsel kullanımlar için ideal su pompaları sunan geniş bir ürün yelpazesi bulunuyor. Su pompaları, dalgıç pompalar, yangın pompaları, su motorları, santrifüj pompalar, hidroforlar ve paslanmaz pompalar gibi ana ürün gruplarımızla, elektrik motorları ve panoları konusunda pazarlama, satış ve satış sonrası destek hizmetleri sunuyoruz. Ürünlerimiz dayanıklılığı ve uzun ömürlülüğü ile sektörde fark yaratmaktadır.        </p>
        <p className="text-[#D1D1D1] mt-4 p-4">
        Bu başarılar, işletmemizin gelişimi için sadece bir başlangıçtır. Sürekli değişen dünya ekonomisi karşısında rekabet ve gelişmeyi yakından takip ediyoruz. "Better Quality For Earth" prensibi doğrultusunda, müşterilerimize daha kaliteli ürünler ve mükemmel hizmetler sunarak aydınlık yarınlar için işbirliği yapmayı sürdürüyoruz. </p>
      </motion.div>

      {/* Dördüncü Kısım */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <h2 className="text-3xl font-semibold text-secondary">Geleceğe Bakış</h2>
        <p className="text-[#D1D1D1] p-4">
        Gelecekteki hedeflerimiz arasında, ürün çeşitliliğimizi artırmak, yeni pazarlara açılmak ve sürdürülebilir çözümler sunarak sektörde lider konumda yer almak bulunuyor. Müşterilerimizin beklentilerini aşan çözümler sunarak uzun vadeli iş ortaklıkları kurmayı ve her zaman güvenilir bir iş ortağı olarak anılmayı hedefliyoruz.        </p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
