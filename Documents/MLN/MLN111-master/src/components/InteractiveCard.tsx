import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface InteractiveCardProps {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  delay?: number;
  className?: string;
  gridClassName?: string; // To control grid placement like lg:col-start-2
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  icon,
  titleKey,
  descKey,
  delay = 0,
  className = '',
  gridClassName = '',
}) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for mouse position relative to the card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the motion values with spring physics for a nicer feel
  const smoothOptions = { damping: 15, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, smoothOptions);
  const smoothMouseY = useSpring(mouseY, smoothOptions);

  // Transform mouse position into rotation values
  // Map mouse Y position (top to bottom) to rotateX (positive to negative)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ['12deg', '-12deg']);
  // Map mouse X position (left to right) to rotateY (negative to positive)
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    // Calculate mouse position relative to the center of the card (from -0.5 to 0.5)
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Reset values when mouse leaves
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`transform-style-preserve-3d ${gridClassName}`} // Add preserve-3d here
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX, // Apply the transformed rotation
        rotateY, // Apply the transformed rotation
        transformPerspective: '1000px' // Keep perspective for child if needed, but parent usually has it
      }}
    >
      <div
         className={`bg-white p-6 rounded-lg shadow-md border border-gray-100/50 h-full transform-style-preserve-3d transition-all duration-300 hover:shadow-xl ${className}`}
         // Add perspective here if you want children to also react in 3D space relative to this card
         // style={{ transformPerspective: '800px' }}
       >
         {/* Content remains visually flat unless transform applied */}
         {/* Add translateZ here if you want content to pop out */}
        <div style={{ transform: 'translateZ(20px)' }}>
            <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-start">
                {icon}
                <span>{t(titleKey)}</span>
            </h3>
            <p className="text-gray-700 pl-9 leading-relaxed text-sm">{t(descKey)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveCard; 