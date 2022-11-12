import { ButtonProps as AntButtonProps } from 'antd';
import { StyledButton } from './styles';

export interface ButtonProps extends AntButtonProps {
  border?: 'default' | 'outline' | 'borderless' | 'cancel';
  height?: number;
}

const Button = ({ border = 'default', ...props }: ButtonProps) => {
  return (
    <StyledButton border={border} {...props}>
      {props.children}
    </StyledButton>
  );
};
export default Button;
