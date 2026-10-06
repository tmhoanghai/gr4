import React, { useState, useEffect } from 'react';

interface Props {
  enabled: boolean;
  spotlightMode?: boolean;
}

export const LaserPointer: React.FC<Props> = ({ enabled, spotlightMode = false }) => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  if (!enabled || !visible) return null;

  if (spotlightMode) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-75"
        style={{
          background: `radial-gradient(circle 160px at ${pos.x}px ${pos.y}px, transparent 0%, rgba(0, 0, 0, 0.75) 100%)`
        }}
      />
    );
  }

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Laser Red Glowing Dot */}
      <div className="relative flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_15px_6px_rgba(239,68,68,0.85)] animate-pulse" />
        <div className="w-1.5 h-1.5 rounded-full bg-white absolute" />
      </div>
    </div>
  );
};
