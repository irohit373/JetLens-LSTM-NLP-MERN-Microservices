import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PromotionalBanner = ({ 
  imageSrc, 
  imageAlt = "Promotional image", 
  headline, 
  highlightedText, 
  endText, 
  subheading, 
  buttonText, 
  buttonLink 
}) => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden shadow-md my-8">
      <div className="flex flex-col md:flex-row">
        {/* Image Section - Left side on desktop, top on mobile */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image 
            src={imageSrc}
            alt={imageAlt}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        
        {/* Content Section - Right side on desktop, bottom on mobile */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {headline} 
            <span className="text-red-600">{highlightedText}</span> 
            {endText}
          </h2>
          
          <p className="text-gray-600 mb-6">{subheading}</p>
          
          <Link href={buttonLink}>
            <span className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 text-center">
              {buttonText}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
