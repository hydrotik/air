import React from 'react';
import {
  Card, CardContent, Checkbox, Label,
  Pagination, PaginationContent, PaginationItem, PaginationLink,
} from '@hydrotik/design-system';

export function TermsCard() {
  return (
    <Card>
      <CardContent style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Checkbox id="agree-terms" />
            <Label htmlFor="agree-terms" style={{ margin: 0 }}>I agree to the terms and conditions</Label>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
