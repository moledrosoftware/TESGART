'use client';

import { Container } from '@/components/shared/container';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
  
    try {
      const response = await fetch('http://localhost:5000/contact', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setStatus('Mesajınız başarıyla gönderilmiştir!');
        setFormData({ name: '', email: '', message: '' }); // Очистка формы
      } else {
        const result = await response.json();
        setStatus(result.message || 'Mesaj gönderilemedi.');
      }
    } catch (error) {
      console.error('Mesaj gönderilken hata oluşturdu:', error);
      setStatus('Mesaj gönderilemedi.');
    }
  };
  

  return (
    <Container className="bg-[#093558] w-full h-[100vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.7 }}
        className="bg-muted border shadow-lg rounded-lg p-8 max-w-2xl w-full mx-auto mt-12"
      >
        <h2 className="text-2xl font-extrabold mb-6 text-primary">Bizimle İletişime Geçin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary">Adınız</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 bg-[#e6efff] text-primary placeholder-gray-600"
              placeholder="Adınızı girin"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary">E-posta</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 bg-[#e6efff] text-primary placeholder-gray-600"
              placeholder="E-postanızı girin"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-primary">Mesaj</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 bg-[#e6efff] text-primary placeholder-gray-600"
              rows={4}
              placeholder="Mesajınızı girin"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            Mesajı Gönder
          </button>
          {status && <p className={`mt-4 ${status.includes('başarıyla') ? 'text-green-500' : 'text-red-500'}`}>{status}</p>}
        </form>
      </motion.div>
    </Container>
  );
};

export default Contact;
