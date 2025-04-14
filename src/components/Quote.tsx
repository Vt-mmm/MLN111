import React from 'react';

interface QuoteProps {
  text: string;
  author?: string;
  className?: string;
}

const Quote: React.FC<QuoteProps> = ({ text, author, className = '' }) => {
  return (
    <blockquote className={`p-4 my-4 border-l-4 border-gray-300 bg-gray-50 ${className}`}>
      <p className="text-xl italic font-medium leading-relaxed text-gray-900">
        "{text}"
      </p>
      {author && (
        <footer className="mt-2 text-sm text-gray-600">
          — {author}
        </footer>
      )}
    </blockquote>
  );
};

export default Quote;
