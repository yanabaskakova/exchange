import { SelectProps } from './types';
import BigSelect from './ui/BigSelect';

interface Props<Value extends unknown = string | number> extends SelectProps<Value> {
  ui: 'bigSelect' | 'smallSelect';
  dataTestId?: string;
}

const Select = <Value extends unknown = string | number>({
  ui,
  dataTestId,
  ...selectProps
}: Props<Value>) => {
  if (ui === 'bigSelect')
    return (
      <div data-testid={dataTestId}>
        <BigSelect {...selectProps} />
      </div>
    );

  return (
    <div data-testid={dataTestId}>
      <BigSelect {...selectProps} />
    </div>
  );
};

export default Select;
