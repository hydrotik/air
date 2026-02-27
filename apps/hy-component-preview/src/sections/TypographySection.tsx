import React from 'react';
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyInlineCode,
  TypographyBlockquote,
  Separator,
} from '@hydrotik/design-system';

export function TypographySection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
      <TypographyH1>The Joke Tax Chronicles</TypographyH1>
      <TypographyLead>
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne.
      </TypographyLead>
      <Separator />
      <TypographyH2>The King&apos;s Plan</TypographyH2>
      <TypographyP>
        The king thought long and hard, and finally came up with a brilliant
        plan: he would tax the jokes.
      </TypographyP>
      <TypographyBlockquote>
        &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke, so it&apos;s only fair
        that they should pay for the privilege.&rdquo;
      </TypographyBlockquote>
      <TypographyH3>The Joke Tax</TypographyH3>
      <TypographyP>
        The king&apos;s subjects were not amused. They grumbled and complained, but the
        king was firm. Use <TypographyInlineCode>npm install joke-tax</TypographyInlineCode> to get started.
      </TypographyP>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <TypographyH4>Heading 4</TypographyH4>
        <TypographyLarge>Large</TypographyLarge>
        <TypographySmall>Small text</TypographySmall>
        <TypographyMuted>Muted text</TypographyMuted>
      </div>
    </div>
  );
}
