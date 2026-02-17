import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

const RevealOnScroll: React.FC<RevealProps> = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  let transformStyle = '';
  if (!isVisible) {
    if (direction === 'up') transformStyle = 'translate-y-12 opacity-0';
    if (direction === 'left') transformStyle = '-translate-x-12 opacity-0';
    if (direction === 'right') transformStyle = 'translate-x-12 opacity-0';
  } else {
    transformStyle = 'translate-y-0 translate-x-0 opacity-100';
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${transformStyle} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;