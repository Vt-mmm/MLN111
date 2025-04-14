import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import backgroundImage from '../img/1.jpg';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-dark text-white" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 42%',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-32">
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