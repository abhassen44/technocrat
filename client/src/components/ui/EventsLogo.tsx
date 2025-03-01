import React from 'react';

interface EventsLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const EventsLogo: React.FC<EventsLogoProps> = ({ 
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
      <title>Events Logo</title>
      <g id="Events-Logo" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        {/* Calendar Shadow (for depth) */}
        <rect id="calendar-shadow" fill="#e0e0e0" x="7" y="7" width="30" height="30" rx="2"></rect>
        
        {/* Calendar Base */}
        <rect id="calendar-base" stroke="currentColor" strokeWidth="2" fill="#f5f5f5" x="5" y="5" width="30" height="30" rx="2"></rect>
        
        {/* Page Fold */}
        <path d="M30,5 L35,10 L30,10 L30,5 Z" id="page-fold" fill="#e6e6e6" stroke="currentColor" strokeWidth="1"></path>
        
        {/* Calendar Top Bar */}
        <rect id="calendar-header" fill="#ff6b6b" x="5" y="5" width="30" height="6" rx="2"></rect>
        
        {/* Calendar Month Indicator */}
        <rect id="month-highlight" fill="#ff8c8c" x="10" y="7" width="20" height="2" rx="1"></rect>
        
        {/* Calendar Grid Lines */}
        <line x1="15" y1="15" x2="15" y2="33" id="vertical-line-1" stroke="currentColor" strokeWidth="1" opacity="0.3"></line>
        <line x1="25" y1="15" x2="25" y2="33" id="vertical-line-2" stroke="currentColor" strokeWidth="1" opacity="0.3"></line>
        <line x1="6" y1="19" x2="34" y2="19" id="horizontal-line-1" stroke="currentColor" strokeWidth="1" opacity="0.3"></line>
        <line x1="6" y1="26" x2="34" y2="26" id="horizontal-line-2" stroke="currentColor" strokeWidth="1" opacity="0.3"></line>
        
        {/* Signal Wave (more dynamic) */}
        <path d="M8,22 C10,22 12,14 14,14 C16,14 18,30 20,30 C22,30 24,18 26,18 C28,18 30,25 32,25" id="signal-wave" stroke="#ff6b6b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
        
        {/* Event Dots */}
        <circle id="event-dot-1" fill="#ff6b6b" cx="14" cy="14" r="2.5"></circle>
        <circle id="event-dot-2" fill="#ff6b6b" cx="20" cy="30" r="2.5"></circle>
        <circle id="event-dot-3" fill="#ff6b6b" cx="26" cy="18" r="2.5"></circle>
        
        {/* Text "EVENTS" */}
        <text id="events-text" fontFamily="Montserrat, sans-serif" fontSize="20" fontWeight="600" fill="currentColor" x="45" y="25">
            EVENTS
        </text>
      </g>
    </svg>
  );
};

export default EventsLogo; 