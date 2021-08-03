import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { mock } from 'services/rates';
import { store } from 'store';

import { format, splitOnIntegerAndDecimal } from 'components/NumberInput/useNumberInput';
import Exchange from 'pages/Exchange';

const server = setupServer(
  rest.get('https://openexchangerates.org/api/latest.json', (req, res, ctx) => {
    return res(ctx.json(mock));
  })
);

beforeAll(() => server.listen());
beforeEach(() => {
  render(
    <Provider store={store}>
      <Exchange />
    </Provider>
  );
  server.resetHandlers();
});
afterAll(() => server.close());

test('Exchange button should be disabled on first load', async () => {
  const btn = await waitFor(() => screen.getByRole('button'));

  expect(btn).toBeDisabled();
});

test('Exchange button should be enabled when to and from are filled', async () => {
  const fromInput = await waitFor(() => screen.getByTestId('from-input'));
  const toInput = screen.getByTestId('to-input');

  act(() => {
    fireEvent.change(fromInput, { target: { value: '1' } });
  });

  expect(fromInput).toHaveValue('1');
  expect(toInput).toHaveValue();

  const btn = await waitFor(() => screen.getByRole('button'));

  expect(btn).not.toBeDisabled();
});

test('Value "to" changes on "from" change', async () => {
  const fromInput = await waitFor(() => screen.getByTestId('from-input'));
  const toInput = screen.getByTestId('to-input');

  fireEvent.change(fromInput, { target: { value: '1' } });

  expect(fromInput).toHaveValue('1');
  act(() => {
    fireEvent.change(toInput, { target: { value: '10' } });
  });
  expect(fromInput).not.toHaveValue('1');
});

test('history updates after clicking on Exchange', async () => {
  let state = store.getState().main;
  const initialHistoryLength = state.history.length;

  const fromInput = await waitFor(() => screen.getByTestId('from-input'));
  fireEvent.change(fromInput, { target: { value: '1' } });

  const btn = screen.getByRole('button');
  act(() => {
    fireEvent.click(btn);
  });

  state = store.getState().main;

  expect(state.history.length).toEqual(initialHistoryLength + 1);
  expect(state.history[initialHistoryLength].sourceAmount).toEqual('1');
});

test('can`t insert value more than balance', async () => {
  let state = store.getState().main;
  const activeAccountBalance = new BigNumber(state.activeAccount.balance);
  const ten = new BigNumber(10);

  const fromInput = await waitFor(() => screen.getByTestId('from-input'));
  expect(fromInput).toHaveValue('');

  act(() => {
    fireEvent.change(fromInput, { target: { value: activeAccountBalance.plus(ten).toString() } });
  });
  expect(fromInput).toHaveValue('');
});

test('can insert value less than balance', async () => {
  let state = store.getState().main;

  const activeAccountBalance = new BigNumber(state.activeAccount.balance);
  const ten = new BigNumber(10);
  const newValue = activeAccountBalance.minus(ten).toString();

  const { integer, decimal } = splitOnIntegerAndDecimal(newValue, '.', 2);
  const formatted = format(integer, decimal);

  const fromInput = await waitFor(() => screen.getByTestId('from-input'));
  expect(fromInput).toHaveValue('');

  act(() => {
    fireEvent.change(fromInput, { target: { value: newValue } });
  });

  expect(fromInput).toHaveValue(formatted);
});

test('value is reset after exchange', async () => {
  const fromInput = await waitFor(() => screen.getByTestId('from-input'));
  const toInput = await waitFor(() => screen.getByTestId('to-input'));

  expect(fromInput).toHaveValue('');

  act(() => {
    fireEvent.change(fromInput, { target: { value: '10' } });
  });

  const btn = await waitFor(() => screen.getByRole('button'));
  fireEvent.click(btn);

  expect(fromInput).toHaveValue('');
  expect(toInput).toHaveValue('');
});
