import React from 'react';
import { render, screen } from '@testing-library/react';
import { {{componentName}} } from './{{componentName}}';

describe('{{componentName}}', () => {
  it('renders without crashing', () => {
    render(<{{componentName}} />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  it('renders with correct HTML tag', () => {
    render(<{{componentName}} />);
    const element = screen.getByRole('generic');
    expect(element.tagName.toLowerCase()).toBe('{{htmlTag}}');
  });

  // Add your tests here
  // Example:
  // it('should display the correct text', () => {
  //   render(<{{componentName}}>Hello World</{{componentName}}>);
  //   expect(screen.getByText('Hello World')).toBeInTheDocument();
  // });
}); 