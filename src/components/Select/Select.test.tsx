import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';

import Select from './Select';
import { Option } from './types';

const options = [
  {
    id: 1,
    label: 'item 1',
    value: 'item-1',
  },
  {
    id: 2,
    label: 'item 2',
    value: 'item-2',
  },
];

const onChangeSpy = jest.fn();

const Wrapper = () => {
  const [state, setState] = useState<Option<string>>(options[0]);
  return (
    <Select
      options={options}
      onChange={(val) => {
        setState(val);
        onChangeSpy(val);
      }}
      ui="bigSelect"
      selectedOptions={state ? [state] : undefined}
    />
  );
};

beforeEach(() => {
  render(<Wrapper />);
});

test('open dropdown on click', async () => {
  const select = await waitFor(() => screen.getByText('item 1'));

  fireEvent.click(select);

  const dropdown = screen.getByTestId('dropdown-list');
  expect(dropdown).toBeInTheDocument();
});

test('select a new item of select', async () => {
  const select = screen.getByText('item 1');
  fireEvent.click(select);

  const dropdown = screen.getByTestId('dropdown-list');
  expect(dropdown).toBeInTheDocument();

  const item2 = screen.getByText('item 2');
  fireEvent.click(item2);
  fireEvent.click(document);

  const selectedItem = screen.getByText('item 2');
  expect(selectedItem).toBeInTheDocument();
  expect(onChangeSpy).toBeCalledTimes(1);
});
