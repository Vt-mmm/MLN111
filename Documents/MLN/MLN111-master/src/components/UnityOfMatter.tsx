import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const UnityOfMatter: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="text-center py-20 relative">
      <h2 className="text-4xl mb-4">{t('unity.title')}</h2>
      
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Cột 1 */}
          <div>
            <h4 className="font-medium mb-4 text-lg">{t('unity.evidence.title')}:</h4>
            <p className="text-sm">{t('unity.evidence.point1')}</p>
          </div>

          {/* Cột 2 - lùi xuống */}
          <div className="mt-16">
            <h4 className="font-medium mb-4 text-lg">Khoa học tự nhiên:</h4>
            <p className="text-sm">Thiên văn học: Không có thế giới siêu nhiên.</p>
            <p className="text-sm mt-2">Hóa học: Giới hữu cơ phát triển từ vô cơ.</p>
            <p className="text-sm mt-2">{t('unity.evidence.point2')}</p>
            <p className="text-sm mt-2">Vật lý: Định luật bảo toàn và chuyển hóa năng lượng, cơ học lượng tử, thuyết tương đối... cho thấy sự chuyển hóa và tính vô tận của vật chất.</p>
          </div>

          {/* Cột 3 */}
          <div>
            <h4 className="font-medium mb-4 text-lg">Khoa học xã hội:</h4>
            <p className="text-sm">{t('unity.evidence.point3')}</p>
            <p className="text-sm mt-2">Quan hệ vật chất xã hội tồn tại khách quan.</p>
          </div>

          {/* Cột 4 - lùi xuống */}
          <div className="mt-16">
            <h4 className="font-medium mb-4 text-lg">Kết luận (Ph. Ăngghen):</h4>
            <p className="text-sm">"Tính thống nhất thực sự của thế giới là ở tính vật chất của nó..."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnityOfMatter; 