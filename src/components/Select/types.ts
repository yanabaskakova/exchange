export type Option<Value extends unknown = string | number> = {
  id: string | number;
  label: React.ReactNode;
  value: Value;
  groupId?: string;
};

export type Groups = Record<string | number, string>;

export interface HookOptions<Value extends unknown = string | number> {
  defaultSelectedOptions?: Option<Value>[];
  selectedOptions?: Option<Value>[];

  isMulti?: boolean;

  defaultOpen?: boolean;
  disabled?: boolean;

  valid?: boolean | null;
  rules?: ((option: Option<Value>) => boolean)[];

  onChange: (option: Option<Value>) => void;
}

export interface SelectProps<Value extends unknown = string | number> extends HookOptions<Value> {
  className?: string;

  options: Option<Value>[];
  pinnedOptions?: Option<Value>[];
  groups?: Groups;

  loading?: boolean;

  showArrow?: boolean;
}
