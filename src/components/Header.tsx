import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import backgroundImage from '../img/1.jpg';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { href: '#intro', text: t('nav.intro') },
    { href: '#history-idealism', text: t('nav.history') },
    { href: '#marxist-view-simplified', text: t('nav.marxist') },
    { href: '#existence-simplified', text: t('nav.existence') },
    { href: '#unity-simplified', text: t('nav.unity') },
    { href: '#conclusion', text: t('nav.conclusion') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    <header className="bg-dark text-white" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {/* Navigation */}
      <nav className="relative">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-sans font-bold">
              {t('site.title')}
            </a>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded border border-white text-sm hover:bg-white hover:text-dark transition-colors"
              >
                {language === 'vi' ? 'EN' : 'VI'}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            <div className={`
              lg:flex items-center space-x-8
              ${isOpen ? 'absolute top-20 left-0 right-0 bg-dark p-4' : 'hidden'}
              lg:static lg:bg-transparent
            `}>
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-gray-300 transition-colors block py-2 lg:py-0"
                  onClick={() => setIsOpen(false)}
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-sans font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl font-body text-gray-300 mb-8">
            {t('hero.subtitle')}
          </p>
          <a
            href="#intro"
            className="inline-block bg-white text-dark hover:bg-gray-200 px-8 py-3 rounded-full transition-colors duration-300"
          >
            {t('hero.cta')}
          </a>
        </motion.div>
      </div>
    </header>
  );
};

export default Header; 