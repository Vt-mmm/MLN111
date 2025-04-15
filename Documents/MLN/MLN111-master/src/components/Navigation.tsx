import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation = () => {
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-dark shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-sans font-bold">
            {t('site.title')}
          </a>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded border border-dark text-sm hover:bg-dark hover:text-white transition-colors"
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
            ${isOpen ? 'absolute top-full left-0 right-0 bg-white text-dark p-4 shadow-md' : 'hidden'}
            lg:static lg:bg-transparent lg:p-0 lg:shadow-none
          `}>
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-dark hover:text-gray-600 transition-colors block py-2 lg:py-0"
                onClick={() => setIsOpen(false)}
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 