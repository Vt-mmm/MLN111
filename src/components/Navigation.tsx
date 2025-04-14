import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'intro', title: 'Giới thiệu' },
    { id: 'history', title: 'Lịch sử' },
    { id: 'marxist-view', title: 'Quan điểm Mác-Lênin' },
    { id: 'existence', title: 'Phương thức tồn tại' },
    { id: 'unity', title: 'Tính thống nhất' },
    { id: 'conclusion', title: 'Kết luận' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const current = sections.find(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current?.id || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            className="sm:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`
            sm:flex items-center space-x-8
            ${isOpen ? 'absolute top-16 left-0 right-0 bg-white p-4 shadow-md' : 'hidden'}
            sm:static sm:shadow-none
          `}>
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`
                  block py-2 sm:py-0
                  ${activeSection === section.id ? 'text-accent' : 'text-gray-600 hover:text-accent'}
                  transition-colors duration-200
                `}
                onClick={() => setIsOpen(false)}
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 