import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const UnityEvidence: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-8">
        {/* Cột 1 */}
        <div>
          <h4 className="font-bold mb-4 text-lg">Thực tiễn:</h4>
          <p className="text-sm">{t('unity.evidence.point1')}</p>
        </div>

        {/* Cột 2 */}
        <div>
          <h4 className="font-bold mb-4 text-lg">Khoa học tự nhiên:</h4>
          <p className="text-sm">Thiên văn học: Không có thế giới siêu nhiên.</p>
          <p className="text-sm mt-2">Hóa học: Giới hữu cơ phát triển từ vô cơ.</p>
          <p className="text-sm mt-2">{t('unity.evidence.point2')}</p>
          <p className="text-sm mt-2">Vật lý: Định luật bảo toàn và chuyển hóa năng lượng, cơ học lượng tử, thuyết tương đối... cho thấy sự chuyển hóa và tính vô tận của vật chất.</p>
        </div>

        {/* Cột 3 */}
        <div>
          <h4 className="font-bold mb-4 text-lg">Khoa học xã hội:</h4>
          <p className="text-sm">{t('unity.evidence.point3')}</p>
          <p className="text-sm mt-2">Quan hệ vật chất xã hội tồn tại khách quan.</p>
        </div>

        {/* Cột 4 */}
        <div>
          <h4 className="font-bold mb-4 text-lg">Kết luận (Ph. Ăngghen):</h4>
          <p className="text-sm">"Tính thống nhất thực sự của thế giới là ở tính vật chất của nó..."</p>
        </div>
      </div>

      {/* Phần kết luận */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{t('conclusion.intro')}</h3>
        <ul className="list-disc pl-6 space-y-3">
          <li>{t('conclusion.point1')}</li>
          <li>{t('conclusion.point2')}</li>
          <li>{t('conclusion.point3')}</li>
        </ul>
        <p className="mt-4 text-gray-700">{t('conclusion.summary')}</p>
      </div>
    </div>
  );
};

export default UnityEvidence; 