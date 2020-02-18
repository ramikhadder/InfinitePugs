import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import App from '../App';
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

describe('App', () => {
  test('renders ten pug images initially', async () => {
    const { container, findAllByAltText } = render(<App />);
    const images = await findAllByAltText(/pug(.*?) ([0-9]+)/i);

    expect(images.length).toBe(10);
    expect(await axe(container)).toHaveNoViolations();
  });

  test('scrolling should render more pugs', async () => {
    const { container, findAllByAltText } = render(<App />);
    await findAllByAltText(/Pug ([0-9]+)/i);
    fireEvent.scroll(window, { target: { scrollY: 100 } })
    await waitForDomChange(container)
    const images = await findAllByAltText(/pug(gle)*? ([0-9]+)/i);

    expect(images.length).toBeGreaterThan(10);
    expect(await axe(container)).toHaveNoViolations();
  });

  test('clicking the Filter button should show the Filter component', async () => {
    const { container, getByText } = render(<App />);
    const filterButton = getByText('Filter');
    fireEvent.click(filterButton);
    await waitForDomChange();
    const pugButton = getByText('Pugs');
    const puggleButton = getByText('Puggles');
    expect(pugButton).toBeInTheDocument();
    expect(pugButton.parentElement.type).toBe('button');
    expect(puggleButton).toBeInTheDocument();
    expect(puggleButton.parentElement.type).toBe('button');
    expect(await axe(container)).toHaveNoViolations();
  });

  test('filter by pugs or puggles', async () => {
    const { container, getByText, findAllByAltText, queryAllByAltText } = render(<App />);
    await findAllByAltText(/pug(gle)*? ([0-9]+)/i);
    const filterButton = getByText('Filter');
    fireEvent.click(filterButton);
    const pugButton = getByText('Pugs');
    const puggleButton = getByText('Puggles')

    fireEvent.click(puggleButton)
    let images = await queryAllByAltText(/pug(gle)*? ([0-9]+)/i);
    expect(images.length).toBeLessThan(10);

    fireEvent.click(puggleButton)
    images = await findAllByAltText(/pug(gle)*? ([0-9]+)/i);
    expect(images.length).toBe(10);

    fireEvent.click(pugButton)
    images = await queryAllByAltText(/pug(gle)*? ([0-9]+)/i);
    expect(images.length).toBeLessThan(10);

    fireEvent.click(pugButton)
    images = await findAllByAltText(/pug(gle)*? ([0-9]+)/i);
    expect(images.length).toBe(10);

    expect(await axe(container)).toHaveNoViolations();
  });

  test('renders the toolbar and filter button', async () => {
    const { container, getByText } = render(<App />);
    const toolbarTitle = getByText('Infinite Pugs!');
    const filterButton = getByText('Filter');
    expect(toolbarTitle).toBeInTheDocument();
    expect(filterButton.parentElement.type).toBe('button');
    expect(await axe(container)).toHaveNoViolations();
  });
});
