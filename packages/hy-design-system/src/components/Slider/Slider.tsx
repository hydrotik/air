import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { sliderRoot, sliderTrack, sliderRange, sliderThumb } from './Slider.css';

export const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={[sliderRoot, className].filter(Boolean).join(' ')}
    {...props}
  >
    <SliderPrimitive.Track className={sliderTrack}>
      <SliderPrimitive.Range className={sliderRange} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={sliderThumb} />
  </SliderPrimitive.Root>
));
Slider.displayName = 'Slider';
