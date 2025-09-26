import React from 'react';

interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'zigzag';
  flip?: boolean;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  variant = 'wave', 
  flip = false, 
  className = '' 
}) => {
  const getPath = () => {
    switch (variant) {
      case 'wave':
        return "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z";
      case 'curve':
        return "M0,0L1440,0L1440,64C1440,64,1080,32,720,32C360,32,0,64,0,64Z";
      case 'zigzag':
        return "M0,0L24,16L48,0L72,16L96,0L120,16L144,0L168,16L192,0L216,16L240,0L264,16L288,0L312,16L336,0L360,16L384,0L408,16L432,0L456,16L480,0L504,16L528,0L552,16L576,0L600,16L624,0L648,16L672,0L696,16L720,0L744,16L768,0L792,16L816,0L840,16L864,0L888,16L912,0L936,16L960,0L984,16L1008,0L1032,16L1056,0L1080,16L1104,0L1128,16L1152,0L1176,16L1200,0L1224,16L1248,0L1272,16L1296,0L1320,16L1344,0L1368,16L1392,0L1416,16L1440,0L1440,64L0,64Z";
      default:
        return "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z";
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        className={`w-full h-16 ${flip ? 'rotate-180' : ''}`}
        viewBox="0 0 1440 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="divider-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--govisan-navy))" />
            <stop offset="50%" stopColor="hsl(var(--govisan-blue))" />
            <stop offset="100%" stopColor="hsl(var(--govisan-navy))" />
          </linearGradient>
        </defs>
        <path
          d={getPath()}
          fill="url(#divider-gradient)"
          fillOpacity="0.1"
        />
        <path
          d={getPath()}
          fill="none"
          stroke="url(#divider-gradient)"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
      </svg>
    </div>
  );
};

export default SectionDivider;