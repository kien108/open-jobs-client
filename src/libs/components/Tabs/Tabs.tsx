import React from 'react';
import { StyledTabs } from './styles';
import { NavLink, useLocation } from 'react-router-dom';
import { Tabs as TabsAntd, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { TabsCommonContentType, TabsNavContentType } from '@nexthcm/common';
import { TabsProps as AntTabsProps } from 'antd/lib/tabs';

const { TabPane } = TabsAntd;
const { Text } = Typography;

export interface TabsProps extends AntTabsProps {
  contentsNav?: TabsNavContentType[];
  contentCommon?: TabsCommonContentType[];
  onChange?: (key: string) => void;
}

const Tabs = ({ contentsNav, contentCommon, onChange, ...props }: TabsProps) => {
  const { t } = useTranslation();

  const location = useLocation();
  const key = contentsNav?.find((content) => location.pathname.includes(content.path));

  return (
    <>
      {contentsNav && (
        <StyledTabs {...props} activeKey={key ? key.id.toString() : '1'}>
          {contentsNav.map((content: TabsNavContentType) => (
            <React.Fragment key={content.id}>
              {!content.disable && (
                <TabPane
                  key={content.id}
                  tab={
                    <NavLink to={content.path}>
                      <Text>
                        {content.icon} {t(content.title)}
                      </Text>
                    </NavLink>
                  }
                ></TabPane>
              )}
            </React.Fragment>
          ))}
        </StyledTabs>
      )}
      {contentCommon && (
        <StyledTabs {...props} onChange={onChange}>
          {contentCommon.map((content: TabsCommonContentType) => (
            <React.Fragment key={content.id}>
              {!content.disable && (
                <TabPane
                  key={content.id}
                  tab={
                    <Text>
                      {content.icon}
                      {t(content.title)}
                    </Text>
                  }
                ></TabPane>
              )}
            </React.Fragment>
          ))}
        </StyledTabs>
      )}
    </>
  );
};

export default Tabs;
