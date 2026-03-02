import React from 'react';
import { typingContainer, cursorStyle } from './TypingAnimation.css';

export interface TypingAnimationProps {
  /** Full text to type out */
  text: string;
  /** Callback when typing completes */
  onComplete?: () => void;
  /** Base delay between words in ms (default: 100) */
  speed?: number;
  /** Show blinking cursor (default: true) */
  showCursor?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Word-by-word typing animation — simulates LLM streaming output.
 * Types out text progressively with a blinking cursor.
 */
export const TypingAnimation = React.forwardRef<HTMLDivElement, TypingAnimationProps>(
  ({ text, onComplete, speed = 100, showCursor = true, className }, ref) => {
    const [displayedText, setDisplayedText] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(true);

    React.useEffect(() => {
      setDisplayedText('');
      setIsTyping(true);
      let currentIndex = 0;
      const words = text.split(' ');

      const typeWord = () => {
        if (currentIndex < words.length) {
          setDisplayedText((prev) => (prev ? `${prev} ${words[currentIndex]}` : words[currentIndex]));
          currentIndex++;
          // Random delay variation to simulate thinking
          const delay = Math.random() < 0.8 ? speed : speed * 3;
          setTimeout(typeWord, delay);
        } else {
          setIsTyping(false);
          onComplete?.();
        }
      };

      const timer = setTimeout(typeWord, speed);
      return () => clearTimeout(timer);
    }, [text, speed, onComplete]);

    return (
      <div ref={ref} className={[typingContainer, className].filter(Boolean).join(' ')}>
        {displayedText}
        {showCursor && isTyping && <span className={cursorStyle}>|</span>}
      </div>
    );
  },
);
TypingAnimation.displayName = 'TypingAnimation';
