import React from 'react';
import mockupImage from "../../assets/image_copy.png";

export default function DashboardIllustration() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={mockupImage}
        alt="Dashboard UI Mockup"
        className="w-full max-w-none h-auto object-contain object-right mix-blend-multiply transform -translate-x-2"
        style={{ filter: "brightness(1.05) contrast(1.12)" }}
      />
    </div>
  );
}
