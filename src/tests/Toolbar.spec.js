import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Toolbar from '../components/Toolbar/Toolbar.js';
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

describe('Toolbar', () => {
  test('renders toolbar title and filter button', async () => {
    const { container, getByText } = render(<Toolbar />);
    const toolbarTitle = getByText('Infinite Pugs!');
    const toolbarFilterButton = getByText('Filter');
    expect(toolbarTitle).toBeInTheDocument();
    expect(toolbarFilterButton).toBeInTheDocument();
    expect(toolbarFilterButton.parentElement.type).toBe('button');
    expect(await axe(container)).toHaveNoViolations();
  });

  test('clicking filter button should call onActionClick', async () => {
    const props = { onActionClick: jest.fn() };
    const { container, getByText } = render(<Toolbar { ...props } />);
    const toolbarFilterButton = getByText('Filter');
    fireEvent.click(toolbarFilterButton);
    expect(props.onActionClick).toBeCalled();
    expect(await axe(container)).toHaveNoViolations();
  })
});
