import { motion } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SectionProps {
  title?: string;
  children: ReactNode;
  id: string;
  className?: string;
  imageUrl?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ title, children, id, className = '', imageUrl }, ref) => {
    const { t } = useLanguage();

    return (
      <motion.section
        ref={ref}
        id={id}
        className={`py-12 md:py-20 ${className}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {imageUrl && (
              <div className="mb-12">
                <img 
                  src={imageUrl} 
                  alt={title ? t(title) : id}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
            
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 30, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-sans font-light mb-10 md:mb-16 text-center text-gray-800"
              >
                {t(title)}
              </motion.h2>
            )}

            {children}
          </div>
        </div>
      </motion.section>
    );
  }
);

Section.displayName = 'Section';

export default Section; 