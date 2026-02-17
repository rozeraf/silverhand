import React from 'react';
import { useScramble } from 'use-scramble';
import { useGlitch } from 'react-powerglitch';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  color?: 'yellow' | 'red' | 'blue' | 'white';
  variant?: 'solid' | 'outline';
  enableScramble?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  as: Tag = 'h2', 
  className = '', 
  color = 'yellow',
  variant = 'solid',
  enableScramble = false
}) => {
  let textColorClass = 'text-white';
  
  if (variant === 'solid') {
    if (color === 'yellow') textColorClass = 'text-[#fcee0a]';
    if (color === 'red') textColorClass = 'text-[#ff003c]';
    if (color === 'blue') textColorClass = 'text-[#00f0ff]';
  } else {
    // Outline variants
    if (color === 'yellow') textColorClass = 'text-stroke-cyan text-[#fcee0a]/10'; // slight tint fill
    if (color === 'red') textColorClass = 'text-stroke-red';
    if (color === 'blue') textColorClass = 'text-stroke-cyan';
    if (color === 'white') textColorClass = 'text-stroke-cyan text-white/10';
  }

  // Scramble effect (decoding text animation on mount)
  const { ref: scrambleRef } = useScramble({
    text: text,
    speed: 0.4,
    tick: 1,
    step: 5,
    scramble: 10,
    seed: 3,
    chance: 1,
    overdrive: false,
    overflow: true,
    playOnMount: enableScramble,
  });

  // PowerGlitch effect (automatic and intense)
  const { ref: glitchRef } = useGlitch({
    playMode: 'always',
    createContainers: true,
    hideOverflow: false,
    timing: {
      duration: 3500,
      iterations: Infinity,
      easing: 'ease-in-out',
    },
    glitchTimeSpan: {
      start: 0.6, 
      end: 0.7, 
    },
    shake: {
      velocity: 15,
      amplitudeX: 0.2,
      amplitudeY: 0.1,
    },
    slice: {
      count: 6,
      velocity: 20,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
    },
  });

  return (
    <Tag 
      ref={glitchRef} 
      className={`${className} ${textColorClass} inline-block`}
      style={{ lineHeight: 1.1, position: 'relative' }}
    >
      <span ref={enableScramble ? scrambleRef : undefined}>
        {!enableScramble ? text : null}
      </span>
    </Tag>
  );
};

export default GlitchText;