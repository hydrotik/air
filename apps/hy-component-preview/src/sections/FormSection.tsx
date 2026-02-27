import React, { useState } from 'react';
import {
  Input,
  Label,
  FieldMessage,
  Textarea,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider,
} from '@hydrotik/design-system';

export function FormSection() {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px' }}>
      {/* Text inputs row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Jane Smith" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jane@company.com" />
          <FieldMessage variant="default">We&apos;ll never share your email.</FieldMessage>
        </div>
      </div>

      {/* Select */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="role">Role</Label>
        <Select>
          <SelectTrigger id="role" style={{ maxWidth: '300px' }}>
            <SelectValue placeholder="Select role..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Textarea */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
      </div>

      {/* Checkbox & Switch row */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox id="terms" />
          <Label htmlFor="terms" style={{ margin: 0 }}>Accept terms and conditions</Label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Switch id="notifications" />
          <Label htmlFor="notifications" style={{ margin: 0 }}>Enable notifications</Label>
        </div>
      </div>

      {/* Radio group */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Label>Notification preference</Label>
        <RadioGroup defaultValue="email">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RadioGroupItem value="email" id="radio-email" />
            <Label htmlFor="radio-email" style={{ margin: 0 }}>Email</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RadioGroupItem value="sms" id="radio-sms" />
            <Label htmlFor="radio-sms" style={{ margin: 0 }}>SMS</Label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RadioGroupItem value="push" id="radio-push" />
            <Label htmlFor="radio-push" style={{ margin: 0 }}>Push notification</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Label>Price range</Label>
          <span style={{ fontSize: '14px', opacity: 0.7 }}>${sliderValue[0]}</span>
        </div>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          onValueChange={setSliderValue}
          style={{ maxWidth: '300px' }}
        />
      </div>

      {/* Error state example */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '300px' }}>
        <Label htmlFor="errorInput">Password</Label>
        <Input id="errorInput" type="password" placeholder="••••••••" error />
        <FieldMessage variant="error">Password must be at least 8 characters.</FieldMessage>
      </div>
    </div>
  );
}
