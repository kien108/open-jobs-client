import { StyledCheckbox } from './styles';
import { CheckboxProps as AntCheckboxProps } from 'antd';

// import './style.scss';

export interface CheckboxProps extends AntCheckboxProps {
  readonly?: boolean;
}

const Checkbox = ({ ...props }: CheckboxProps) => {
  return <StyledCheckbox {...props} />;
};

export default Checkbox;
