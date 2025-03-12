import React from 'react';

interface BlogsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const BlogsLogo: React.FC<BlogsLogoProps> = ({ 
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
      <title>Blogs Logo</title>
      <g id="Blogs-Logo" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        {/* Notepad Shadow */}
        <rect id="notepad-shadow" fill="#e0e0e0" x="7" y="7" width="28" height="30" rx="2"></rect>
        
        {/* Notepad Base */}
        <rect id="notepad-base" stroke="#333333" strokeWidth="2" fill="#f5f5f5" x="5" y="5" width="28" height="30" rx="2"></rect>
        
        {/* Dog-eared Corner */}
        <path d="M28,5 L33,10 L28,10 L28,5 Z" id="dog-ear" fill="#e6e6e6" stroke="#333333" strokeWidth="1"></path>
        
        {/* Text Lines */}
        <line x1="9" y1="12" x2="29" y2="12" id="line-1" stroke="#333333" strokeWidth="1" opacity="0.5"></line>
        <line x1="9" y1="17" x2="29" y2="17" id="line-2" stroke="#333333" strokeWidth="1" opacity="0.5"></line>
        <line x1="9" y1="22" x2="29" y2="22" id="line-3" stroke="#333333" strokeWidth="1" opacity="0.5"></line>
        <line x1="9" y1="27" x2="29" y2="27" id="line-4" stroke="#333333" strokeWidth="1" opacity="0.5"></line>
        
        {/* Circuit Trace */}
        <path d="M5,15 C10,10 15,25 20,15 C25,5 30,20 33,15" id="circuit-trace" stroke="#3eb370" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        
        {/* Pulse Points */}
        <circle id="pulse-1" fill="#3eb370" cx="12" cy="17" r="1.5"></circle>
        <circle id="pulse-2" fill="#3eb370" cx="20" cy="15" r="1.5"></circle>
        <circle id="pulse-3" fill="#3eb370" cx="28" cy="17" r="1.5"></circle>
        
        {/* Text "BLOGS" */}
        <text id="blogs-text" fontFamily="Source Sans Pro, sans-serif" fontSize="20" fontWeight="600" fill="currentColor" x="45" y="25">
            BLOGS
        </text>
      </g>
    </svg>
  );
};

export default BlogsLogo; 