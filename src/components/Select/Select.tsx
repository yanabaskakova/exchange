import { SelectProps } from './types';
import BigSelect from './ui/BigSelect';

interface Props<Value extends unknown = string | number> extends SelectProps<Value> {
  ui: 'bigSelect' | 'smallSelect';
}

const Select = <Value extends unknown = string | number>({ ui, ...selectProps }: Props<Value>) => {
  if (ui === 'bigSelect') return <BigSelect {...selectProps} />;

  return <BigSelect {...selectProps} />;
};

export default Select;
