import { ReactNode } from 'react';

export interface OptionType {
  key: string | number;
  value: string | number;
  type?: string;
  label: string;
  disabled?: boolean;
  render: (value?: string) => ReactNode;
}

export const NOTHING_FOUND = 'nothingFound';
