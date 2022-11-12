import React from 'react';
import { useTranslation } from 'react-i18next';
import { FooterStyled } from './styles';

interface FooterProps {
  tabsContent: string;
}

const Footer = ({ tabsContent }: FooterProps) => {
  const { t } = useTranslation();
  return (
    <FooterStyled>
      <button>
        <span>{t('notification.markAllAsRead')} </span>
      </button>
      {tabsContent !== 'new' && (
        <button>
          <span>{t('notification.requestManagement')} </span>
        </button>
      )}
    </FooterStyled>
  );
};

export default Footer;
