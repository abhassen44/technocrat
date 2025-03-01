import React from 'react';

interface MerchLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const MerchLogo: React.FC<MerchLogoProps> = ({ 
  width = 140, 
  height = 40,
  className = '' 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 140 40" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <title>Merch Logo</title>
      <g id="Merch-Logo" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        {/* T-Shirt Shadow */}
        <path id="tshirt-shadow" fill="#e0e0e0" d="M7,12 L16,7 L28,7 L37,12 L33,15 L33,33 L11,33 L11,15 L7,12 Z" transform="translate(2, 2)"></path>
        
        {/* T-Shirt Base */}
        <path id="tshirt-base" stroke="currentColor" strokeWidth="2" fill="#f5f5f5" d="M7,12 L16,7 L28,7 L37,12 L33,15 L33,33 L11,33 L11,15 L7,12 Z"></path>
        
        {/* Sleeve Left */}
        <path id="sleeve-left" stroke="currentColor" strokeWidth="1" fill="#f0f0f0" d="M7,12 L11,15 L11,17 L5,14 L7,12 Z"></path>
        
        {/* Sleeve Right */}
        <path id="sleeve-right" stroke="currentColor" strokeWidth="1" fill="#f0f0f0" d="M37,12 L33,15 L33,17 L39,14 L37,12 Z"></path>
        
        {/* Collar */}
        <path id="collar" stroke="currentColor" strokeWidth="1" d="M19,7 L22,10 L25,7"></path>
        
        {/* Circuit Pattern */}
        <path id="circuit-1" stroke="#e83e8c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16,15 L22,15 L22,20 L27,20 L27,25"></path>
        <path id="circuit-2" stroke="#e83e8c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16,20 L19,20 L19,25 L23,25 L23,28"></path>
        <path id="circuit-3" stroke="#e83e8c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16,25 L17,25 L17,28 L27,28"></path>
        
        {/* Connection Points */}
        <circle id="point-1" fill="#e83e8c" cx="22" cy="15" r="1.5"></circle>
        <circle id="point-2" fill="#e83e8c" cx="19" cy="20" r="1.5"></circle>
        <circle id="point-3" fill="#e83e8c" cx="27" cy="20" r="1.5"></circle>
        <circle id="point-4" fill="#e83e8c" cx="17" cy="25" r="1.5"></circle>
        <circle id="point-5" fill="#e83e8c" cx="27" cy="25" r="1.5"></circle>
        <circle id="point-6" fill="#e83e8c" cx="23" cy="28" r="1.5"></circle>
        
        {/* Text "MERCH" */}
        <text id="merch-text" fontFamily="Montserrat, sans-serif" fontSize="20" fontWeight="600" fill="currentColor" x="45" y="25">
            MERCH
        </text>
      </g>
    </svg>
  );
};

export default MerchLogo; 