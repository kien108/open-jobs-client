import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LinkType } from '../../types/link';
import { navLinks } from './linkHeader';
import { StyledContainerLink, StyledLeftHeader, StyledLink } from './styles';

const LeftHeader = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [openLink, setOpenLink] = useState('/');
  const [openKey, setOpenKey] = useState('/');

  useEffect(() => {
    const paths = pathname.split('/');
    if (pathname.includes('admin')) {
      setOpenLink(paths.slice(1, 3).join('/'));
      setOpenKey(paths.slice(0, 4).join('/'));
    } else {
      setOpenLink(paths[1]);
      setOpenKey(paths.slice(0, 3).join('/'));
    }
  }, [pathname]);

  return (
    <StyledLeftHeader>
      <StyledContainerLink tabBarGutter={24} activeKey={openKey}>
        {navLinks(openLink).length > 0 &&
          navLinks(openLink).map((item: LinkType) => (
            <StyledLink
              key={item.key}
              tab={
                <Link className="custom-link-header" to={item.path}>
                  {t(item.display)}
                </Link>
              }
            />
          ))}
      </StyledContainerLink>
    </StyledLeftHeader>
  );
};

export default LeftHeader;
