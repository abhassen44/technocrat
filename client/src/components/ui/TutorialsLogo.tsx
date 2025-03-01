import React from 'react';

interface TutorialsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const TutorialsLogo: React.FC<TutorialsLogoProps> = ({ 
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
      <title>Tutorials Logo</title>
      <g id="Tutorials-Logo" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        {/* Microcontroller Board Shadow */}
        <rect id="board-shadow" fill="#e0e0e0" x="7" y="7" width="30" height="30" rx="2"></rect>
        
        {/* Microcontroller Board Base */}
        <rect id="board-base" stroke="#333333" strokeWidth="2" fill="#f5f5f5" x="5" y="5" width="30" height="30" rx="2"></rect>
        
        {/* Processor Chip */}
        <rect id="processor" stroke="#333333" strokeWidth="1" fill="#FF7E00" x="13" y="13" width="14" height="14" rx="1"></rect>
        
        {/* Pin Headers - Left */}
        <rect id="pins-left-1" fill="#333333" x="7" y="10" width="2" height="2"></rect>
        <rect id="pins-left-2" fill="#333333" x="7" y="15" width="2" height="2"></rect>
        <rect id="pins-left-3" fill="#333333" x="7" y="20" width="2" height="2"></rect>
        <rect id="pins-left-4" fill="#333333" x="7" y="25" width="2" height="2"></rect>
        
        {/* Pin Headers - Right */}
        <rect id="pins-right-1" fill="#333333" x="31" y="10" width="2" height="2"></rect>
        <rect id="pins-right-2" fill="#333333" x="31" y="15" width="2" height="2"></rect>
        <rect id="pins-right-3" fill="#333333" x="31" y="20" width="2" height="2"></rect>
        <rect id="pins-right-4" fill="#333333" x="31" y="25" width="2" height="2"></rect>
        
        {/* LED Indicators */}
        <circle id="led-1" fill="#FF7E00" cx="10" cy="30" r="1.5"></circle>
        <circle id="led-2" fill="#005bbb" cx="15" cy="30" r="1.5"></circle>
        
        {/* Circuit Traces */}
        <path d="M9,10 L13,13" id="trace-1" stroke="#FF7E00" strokeWidth="1" strokeLinecap="round"></path>
        <path d="M9,20 L13,20" id="trace-2" stroke="#FF7E00" strokeWidth="1" strokeLinecap="round"></path>
        <path d="M27,15 L31,15" id="trace-3" stroke="#FF7E00" strokeWidth="1" strokeLinecap="round"></path>
        <path d="M27,25 L31,25" id="trace-4" stroke="#FF7E00" strokeWidth="1" strokeLinecap="round"></path>
        <path d="M20,27 L20,30 L15,30" id="trace-5" stroke="#005bbb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M15,27 L15,28 L10,28 L10,30" id="trace-6" stroke="#FF7E00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
        
        {/* Text "TUTORIALS" */}
        <text id="tutorials-text" fontFamily="Roboto Mono, monospace" fontSize="18" fontWeight="600" fill="#333333" x="45" y="25">
            TUTORIALS
        </text>
      </g>
    </svg>
  );
};

export default TutorialsLogo; 