import { motion } from 'framer-motion';
import Section from './Section';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <Section id="about" title="about.title">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src="/images/mac-lenin.jpg"
            alt="Mac Lenin"
            className="rounded-lg shadow-lg w-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <p className="text-lg">{t('about.description1')}</p>
          <p className="text-lg">{t('about.description2')}</p>
          <p className="text-lg">{t('about.description3')}</p>
        </motion.div>
      </div>
    </Section>
  );
};

export default About; 