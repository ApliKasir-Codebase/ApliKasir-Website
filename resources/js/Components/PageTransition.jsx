import React, { useState, useEffect } from 'react';

export default function PageTransition({ children, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10); // Small delay to ensure DOM is ready
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={`
        transition-all duration-500 ease-in-out 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
