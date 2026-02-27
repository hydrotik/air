import React from 'react';
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  RadioGroup, RadioGroupItem, Label,
} from '@hydrotik/design-system';

const options = ['Social Media', 'Search Engine', 'Referral', 'Other'];

export function SurveyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ fontSize: '14px' }}>How did you hear about us?</CardTitle>
        <CardDescription>Select the option that best describes how you heard about us.</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="social-media">
          {options.map((opt) => {
            const val = opt.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RadioGroupItem value={val} id={`survey-${val}`} />
                <Label htmlFor={`survey-${val}`} style={{ margin: 0 }}>{opt}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
