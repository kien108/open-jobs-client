import React, { FC } from 'react';

import { TagProps } from 'antd';

import { StyledTag } from './styles';
import { ICommon } from './types';

export interface Props extends TagProps, ICommon {
  bordered?: boolean;
}

const Tag: FC<Props> = ({ bordered = false, ...props }) => {
  return <StyledTag {...props} />;
};

export default Tag;
