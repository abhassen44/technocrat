import React from 'react';

interface ProjectsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const ProjectsLogo: React.FC<ProjectsLogoProps> = ({ 
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
      <title>Projects Logo</title>
      <g id="Projects-Logo" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        {/* Gear Shadow */}
        <circle id="gear-shadow" fill="#e0e0e0" cx="22" cy="22" r="16" transform="translate(2, 2)"></circle>
        
        {/* Gear Base */}
        <path d="M22,6 L24,6 L25,10 C26.5,10.5 28,11.2 29.3,12.1 L33,10 L34.5,11.5 L32.4,15.2 C33.3,16.5 34,18 34.5,19.5 L38.5,20.5 L38.5,22.5 L34.5,23.5 C34,25 33.3,26.5 32.4,27.8 L34.5,31.5 L33,33 L29.3,30.9 C28,31.8 26.5,32.5 25,33 L24,37 L22,37 L21,33 C19.5,32.5 18,31.8 16.7,30.9 L13,33 L11.5,31.5 L13.6,27.8 C12.7,26.5 12,25 11.5,23.5 L7.5,22.5 L7.5,20.5 L11.5,19.5 C12,18 12.7,16.5 13.6,15.2 L11.5,11.5 L13,10 L16.7,12.1 C18,11.2 19.5,10.5 21,10 L22,6 Z" id="gear-base" stroke="currentColor" strokeWidth="1.5" fill="#e6e6e6"></path>
        
        {/* Gear Inner Circle */}
        <circle id="gear-inner" stroke="currentColor" strokeWidth="1" fill="#f5f5f5" cx="22" cy="22" r="10"></circle>
        
        {/* Chip */}
        <rect id="chip" stroke="currentColor" strokeWidth="1" fill="#8a4fff" x="17" y="17" width="10" height="10" rx="1"></rect>
        
        {/* Chip Pins */}
        <line x1="19" y1="17" x2="19" y2="15" id="pin-1" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        <line x1="22" y1="17" x2="22" y2="15" id="pin-2" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        <line x1="25" y1="17" x2="25" y2="15" id="pin-3" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        
        <line x1="19" y1="27" x2="19" y2="29" id="pin-4" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        <line x1="22" y1="27" x2="22" y2="29" id="pin-5" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        <line x1="25" y1="27" x2="25" y2="29" id="pin-6" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        
        <line x1="17" y1="19" x2="15" y2="19" id="pin-7" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        <line x1="17" y1="22" x2="15" y2="22" id="pin-8" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        <line x1="17" y1="25" x2="15" y2="25" id="pin-9" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        
        <line x1="27" y1="19" x2="29" y2="19" id="pin-10" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        <line x1="27" y1="22" x2="29" y2="22" id="pin-11" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        <line x1="27" y1="25" x2="29" y2="25" id="pin-12" stroke="#8a4fff" strokeWidth="1.5" strokeLinecap="round"></line>
        
        {/* Text "PROJECTS" */}
        <text id="projects-text" fontFamily="Montserrat, sans-serif" fontSize="20" fontWeight="600" fill="currentColor" x="45" y="25">
            PROJECTS
        </text>
      </g>
    </svg>
  );
};

export default ProjectsLogo; 