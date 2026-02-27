import React from 'react';
import * as styles from './Typography.css';

function createTypographyComponent<T extends keyof JSX.IntrinsicElements>(
  tag: T,
  styleClass: string,
  displayName: string,
) {
  const Component = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
  >(({ className, ...props }, ref) =>
    React.createElement(tag, {
      ref,
      className: [styleClass, className].filter(Boolean).join(' '),
      ...props,
    }),
  );
  Component.displayName = displayName;
  return Component;
}

export const TypographyH1 = createTypographyComponent('h1', styles.h1, 'TypographyH1');
export const TypographyH2 = createTypographyComponent('h2', styles.h2, 'TypographyH2');
export const TypographyH3 = createTypographyComponent('h3', styles.h3, 'TypographyH3');
export const TypographyH4 = createTypographyComponent('h4', styles.h4, 'TypographyH4');
export const TypographyP = createTypographyComponent('p', styles.p, 'TypographyP');
export const TypographyLead = createTypographyComponent('p', styles.lead, 'TypographyLead');
export const TypographyLarge = createTypographyComponent('div', styles.large, 'TypographyLarge');
export const TypographySmall = createTypographyComponent('small', styles.small, 'TypographySmall');
export const TypographyMuted = createTypographyComponent('p', styles.muted, 'TypographyMuted');
export const TypographyInlineCode = createTypographyComponent('code', styles.inlineCode, 'TypographyInlineCode');
export const TypographyBlockquote = createTypographyComponent('blockquote', styles.blockquote, 'TypographyBlockquote');
export const TypographyUl = createTypographyComponent('ul', styles.ul, 'TypographyUl');
export const TypographyOl = createTypographyComponent('ol', styles.ol, 'TypographyOl');
export const TypographyHr = createTypographyComponent('hr', styles.hr, 'TypographyHr');
