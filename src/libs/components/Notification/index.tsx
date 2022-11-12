import { notification } from 'antd';
import { CloseIcon } from '../Icons';
import { Title } from '../Typography';
import './styles.scss';

interface INotificationType {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  width?: number;
  duration?: number;
}

export const openNotification = ({ type, message, width, duration }: INotificationType) => {
  notification[type]({
    message: <Title level={5}>{message}</Title>,
    closeIcon: <CloseIcon width={12} height={12} />,
    className: 'custom-notification',
    placement: 'bottomLeft',
    duration: duration || 2,

    style: {
      width: width
    }
  });

  return null;
};
