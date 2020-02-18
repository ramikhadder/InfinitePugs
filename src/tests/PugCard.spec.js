import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PugCard from '../components/PugCard/PugCard.js';
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

describe('PugCard', () => {
  test('renders image', async () => {
    const props = { src: 'https://homepages.cae.wisc.edu/~ece533/images/fruits.png', breed: 'fruit', number: 1 };
    const { container, getByAltText } = render(<PugCard { ...props } />);
    const image = getByAltText('fruit 1');
    expect(image.getAttribute('src')).toBe(props.src);
    expect(await axe(container)).toHaveNoViolations();
  });
});
