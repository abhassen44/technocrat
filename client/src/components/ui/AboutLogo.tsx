import React from 'react';

interface AboutLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const AboutLogo: React.FC<AboutLogoProps> = ({ 
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
      <title>About Logo</title>
      <g id="About-Logo" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        {/* Info Circle Shadow */}
        <circle id="info-shadow" fill="#e0e0e0" cx="22" cy="22" r="15" transform="translate(2, 2)"></circle>
        
        {/* Info Circle Base */}
        <circle id="info-base" stroke="#333333" strokeWidth="2" fill="#f5f5f5" cx="22" cy="22" r="15"></circle>
      
        {/* Circuit Board Pattern */}
        <path id="circuit-horizontal" stroke="#4299e1" strokeWidth="1" strokeDasharray="2,2" d="M7,22 L37,22"></path>
        <path id="circuit-vertical" stroke="#4299e1" strokeWidth="1" strokeDasharray="2,2" d="M22,7 L22,37"></path>
        
        {/* Connection Points */}
        <circle id="point-top" fill="#4299e1" cx="22" cy="7" r="1.5"></circle>
        <circle id="point-right" fill="4299e1" cx="37" cy="22" r="1.5"></circle>
        <circle id="point-bottom" fill="4299e1" cx="22" cy="37" r="1.5"></circle>
        <circle id="point-left" fill="4299e1" cx="7" cy="22" r="1.5"></circle>
        
        {/* Info "i" Symbol */}
        <circle id="info-dot" fill="#4299e1" cx="22" cy="14" r="2"></circle>
        <rect id="info-line" fill="#4299e1" x="20" y="18" width="4" height="12" rx="2"></rect>
        
        {/* Team Icons */}
        <circle id="team-1" stroke="#333333" strokeWidth="1" fill="currentColor" opacity="0.6" cx="15" cy="29" r="3"></circle>
        <circle id="team-2" stroke="#333333" strokeWidth="1" fill="currentColor" opacity="0.6" cx="22" cy="29" r="3"></circle>
        <circle id="team-3" stroke="#333333" strokeWidth="1" fill="currentColor" opacity="0.6" cx="29" cy="29" r="3"></circle>
        
        {/* Text "ABOUT" */}
        <text id="about-text" fontFamily="Montserrat, sans-serif" fontSize="20" fontWeight="600" fill="currentColor" x="45" y="25">
            ABOUT
        </text>
      </g>
    </svg>
  );
};

export default AboutLogo; 