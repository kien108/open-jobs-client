import React from 'react';
import './style.scss';
import { StyledPopover } from './styles';
import { PopoverProps } from 'antd';

const PopoverCustom = ({
  overlayClassName,
  trigger,
  children,
  content,
  visible,
  onVisibleChange
}: PopoverProps) => {
  return (
    <StyledPopover
      overlayClassName={overlayClassName}
      visible={visible}
      onVisibleChange={onVisibleChange}
      trigger={trigger}
      content={content}
      placement="bottomRight"
    >
      <div>{children}</div>
    </StyledPopover>
  );
};

export default PopoverCustom;
