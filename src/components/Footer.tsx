import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gray-800 text-gray-300 py-8 mt-auto" // mt-auto pushes footer down if content is short
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">
          &copy; {currentYear} {t('site.title')}. {t('footer.rights')}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Hội ĐỒNG BIÊN SOẠN GIÁO TRÌNH MÔN TRIẾT HỌC MÁC- LÊ NIN <br /> GT.TS.Phạm Văn Đức ( chủ biên)  - Hà Nội 2019
        </p>
        {/* Optional: Add more links or info here */}
        {/* Example: Link back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-4 text-sm text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none"
        >
          {t('footer.backToTop')}
        </button>
      </div>
    </motion.footer>
  );
};

export default Footer; 