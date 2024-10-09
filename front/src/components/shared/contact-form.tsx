'use client';

import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Response:', result);

      if (response.ok) {
        setStatus('Mesajınız başarıyla gönderilmiştir!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`Hata: ${result.error}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus('Mesaj gönderilemedi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
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
          className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Gönderiliyor...' : 'Mesajı Gönder'}
        </button>
        {status && <p className={`mt-4 ${status.includes('başarıyla') ? 'text-green-500' : 'text-red-500'}`}>{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;

