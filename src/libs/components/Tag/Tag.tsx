import { Tag as AntTag, TagProps } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

const Tag: FC<TagProps> = (props) => {
  return <StyledTag {...props} />;
};

export default Tag;

const StyledTag = styled(AntTag)`
  border-radius: 8px;
  padding: 2px 10px;
`;
