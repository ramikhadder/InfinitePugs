import React from 'react';
import { render } from '@testing-library/react';
import Filter from '../components/Filter/Filter.js';
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

describe('Filter', () => {
  test('renders two filter buttons', async () => {
    const props = { show: true }
    const { container, getByText } = render(<Filter { ...props } />);
    const pugButton = getByText('Pugs');
    const puggleButton = getByText('Puggles')
    expect(pugButton).toBeInTheDocument();
    expect(pugButton.parentElement.type).toBe('button');
    expect(puggleButton).toBeInTheDocument();
    expect(puggleButton.parentElement.type).toBe('button');
    expect(await axe(container)).toHaveNoViolations();
  });

  test('should render active checkmarks', async () => {
    const props = { show: true, active: 'pug' }
    const { container, getByAltText, rerender } = render(<Filter { ...props } />);

    // check for pug checkmark
    const pugCheckmark = getByAltText('Active Pug Checkmark');
    expect(pugCheckmark).toBeInTheDocument();

    // check for puggle checkmark
    props.active = 'puggle';
    rerender(< Filter { ...props} />);
    const puggleCheckmark = getByAltText('Active Puggle Checkmark');
    expect(pugCheckmark).not.toBeInTheDocument();
    expect(puggleCheckmark).toBeInTheDocument();

    // check to make sure they disappear properly
    props.active = null;
    rerender(<Filter { ...props} />);
    expect(pugCheckmark).not.toBeInTheDocument();
    expect(puggleCheckmark).not.toBeInTheDocument();

    expect(await axe(container)).toHaveNoViolations();
  });

});
