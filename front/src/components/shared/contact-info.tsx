'use client';

import React from 'react';

const ContactInfo: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary">İletişim Bilgileri</h2>
      <div className="space-y-4">
        {/* <div>
          <h3 className="text-lg font-semibold text-primary">Adres</h3>
          <p className="text-gray-600">123 Ana Cadde, Şehir, Ülke</p>
        </div> */}
        <div>
          <h3 className="text-lg font-semibold text-primary">Telefon</h3>
          <p className="text-gray-600">+90 539 929 51 00</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">E-posta</h3>
          <p className="text-gray-600">info@sivaspeyzaj.net</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
