import React from 'react';

const Map: React.FC = () => {
  return (
    <div className="w-full h-64 mt-8">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.305496721043!2d-122.4244556846822!3d37.77492967975919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809e9b5b5a2f%3A0x1a6c8c7b8ec4a37!2sThe%20Walt%20Disney%20Family%20Museum!5e0!3m2!1sen!2sus!4v1642695832407!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        title="Map"
      ></iframe>
    </div>
  );
};

export default Map;
