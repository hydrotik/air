import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@hydrotik/design-system';

const faqs = [
  {
    value: 'item-1',
    question: 'Is it accessible?',
    answer: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    question: 'Is it styled?',
    answer: 'Yes. It comes with default styles that matches the other components\u2019 aesthetic.',
  },
  {
    value: 'item-3',
    question: 'Is it animated?',
    answer: 'Yes. It\u2019s animated by default, but you can disable it if you prefer.',
  },
  {
    value: 'item-4',
    question: 'Can I customize it?',
    answer: 'Yes. You can customize every part of it using vanilla-extract tokens and style overrides.',
  },
];

export function AccordionSection() {
  return (
    <Accordion type="single" collapsible style={{ maxWidth: '520px' }}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
