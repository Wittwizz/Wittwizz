import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  duration?: number;
  delay?: number;
}

export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className = "",
  cursorClassName = "",
  duration = 0.1,
  delay = 0.5,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (isDeleting) {
      // Deleting effect
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, duration * 50);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      // Typing effect
      if (currentText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, duration * 100);
        return () => clearTimeout(timeout);
      } else {
        // Wait before starting to delete
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delay * 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, isDeleting, currentWordIndex, words, duration, delay]);

  // Find the longest word to set fixed dimensions
  const longestWord = words.reduce((longest, current) => 
    current.length > longest.length ? current : longest, ""
  );

  return (
    <span className={`inline-block ${className}`}>
      {/* Fixed width container to prevent horizontal shifts */}
      <span 
        className="inline-block"
        style={{ 
          minWidth: `${longestWord.length * 0.6}em`,
          textAlign: 'left'
        }}
      >
        {currentText}
        {/* Animated cursor */}
        <motion.span
          className={`ml-1 ${cursorClassName}`}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      </span>
    </span>
  );
};
