import React from 'react';
import { useScramble } from 'use-scramble';
import { useGlitch } from 'react-powerglitch';
import { useSettings } from '../context/SettingsContext';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  color?: 'yellow' | 'red' | 'blue' | 'white';
  variant?: 'solid' | 'outline';
  enableScramble?: boolean;
}

const GlitchText = ({
  text,
  as: Tag = 'h2',
  className = '',
  color = 'yellow',
  variant = 'solid',
  enableScramble = false
}: GlitchTextProps) => {
  const { crtWarp } = useSettings();
  let textColorClass = 'text-white';

  if (variant === 'solid') {
    if (color === 'yellow') textColorClass = 'text-[#fcee0a]';
    if (color === 'red') textColorClass = 'text-[#ff003c]';
    if (color === 'blue') textColorClass = 'text-[#00f0ff]';
  } else {
    if (color === 'yellow') textColorClass = 'text-stroke-cyan text-[#fcee0a]/10';
    if (color === 'red') textColorClass = 'text-stroke-red';
    if (color === 'blue') textColorClass = 'text-stroke-cyan';
    if (color === 'white') textColorClass = 'text-stroke-cyan text-white/10';
  }

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
    playOnMount: enableScramble && !crtWarp,
  });

  const { ref: glitchRef } = useGlitch({
    playMode: crtWarp ? 'hover' : 'always',
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
      velocity: crtWarp ? 0 : 15,
      amplitudeX: crtWarp ? 0 : 0.2,
      amplitudeY: crtWarp ? 0 : 0.1,
    },
    slice: {
      count: crtWarp ? 0 : 6,
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
      <span
        ref={enableScramble && !crtWarp ? scrambleRef : undefined}
      >
        {!enableScramble || crtWarp ? text : null}
      </span>
    </Tag>
  );
};

export default GlitchText;
