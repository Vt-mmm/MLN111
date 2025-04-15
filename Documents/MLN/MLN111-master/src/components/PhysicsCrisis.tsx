import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const PhysicsCrisis: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="text-center py-20 relative">
      <h2 className="text-4xl mb-4">{t('physics_crisis.title')}</h2>
      <h3 className="text-2xl mb-16">{t('physics_crisis.subtitle')}</h3>
      
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Cột 1 */}
          <div>
            <h4 className="font-medium mb-4 text-lg">{t('physics_crisis.revolution.title')}</h4>
            <p className="text-sm">{t('physics_crisis.revolution.point1')}</p>
            <p className="text-sm mt-2">{t('physics_crisis.revolution.point2')}</p>
          </div>

          {/* Cột 2 - lùi xuống */}
          <div className="mt-16">
            <h4 className="font-medium mb-4 text-lg">{t('physics_crisis.consequences.title')}</h4>
            <p className="text-sm">{t('physics_crisis.consequences.point1')}</p>
            <p className="text-sm mt-2">{t('physics_crisis.consequences.point2')}</p>
            <p className="text-sm mt-2">{t('physics_crisis.consequences.point3')}</p>
          </div>

          {/* Cột 3 */}
          <div>
            <h4 className="font-medium mb-4 text-lg">{t('physics_crisis.worldview_crisis.title')}</h4>
            <p className="text-sm">{t('physics_crisis.worldview_crisis.point1')}</p>
            <p className="text-sm mt-2">{t('physics_crisis.worldview_crisis.point2')}</p>
          </div>

          {/* Cột 4 - lùi xuống */}
          <div className="mt-16">
            <h4 className="font-medium mb-4 text-lg">{t('physics_crisis.solution.title')}</h4>
            <p className="text-sm">{t('physics_crisis.solution.point1')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhysicsCrisis; 