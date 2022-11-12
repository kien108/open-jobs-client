import React, { FC } from 'react';
import { TooltipProps, Tooltip as AntToolTip } from 'antd';

import './style.scss';

// type TProps = {};
export type Props = TooltipProps;

export const Tooltip: FC<Props> = (props) => {
  return (
    <AntToolTip {...props} overlayClassName="custom-tooltip">
      {props.children}
    </AntToolTip>
  );
};

export default Tooltip;
