import { splitOnIntegerAndDecimal } from './useNumberInput';

test('splitOnIntegerAndDecimal function', () => {
  const { integer, decimal, pos } = splitOnIntegerAndDecimal('1234.124545', '.', 2);

  expect(integer).toEqual('1234');
  expect(decimal).toEqual('.12');
  expect(pos).toEqual(4);
});

test('splitOnIntegerAndDecimal function with "," separator', () => {
  const { integer, decimal, pos } = splitOnIntegerAndDecimal('1234,124545', ',', 4);

  expect(integer).toEqual('1234');
  expect(decimal).toEqual(',1245');
  expect(pos).toEqual(4);
});
