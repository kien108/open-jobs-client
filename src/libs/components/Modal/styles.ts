import { Modal } from 'antd';
import styled, { css, StyledComponent } from 'styled-components';
import { ModalProps } from './Modal';

const StyledModal: StyledComponent<any, any> = styled(Modal)<ModalProps>`
  ${(props) => {
    switch (props.type) {
      case 'confirm':
        return css`
          .ant-modal-content {
            margin: 0 auto;
            max-width: 512px;
            width: 100%;
            border-radius: 5px !important;
            text-align: center;
          }

          .modal-confirm__icon {
            display: flex;
            border-color: #c9dae1;

            div {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 16px auto 0;
              width: 88px;
              height: 88px;
              border: 4px solid #c9dae1;
              border-radius: 50%;
              color: #87adbd;
              font-family: inherit;
              font-size: 48px;
              line-height: 5em;
              cursor: default;
              animation: rotateIcon 0.8s;
            }
          }

          .modal-confirm__title {
            margin-top: 20px !important;
          }

          @keyframes rotateIcon {
            0% {
              transform: rotateY(-360deg);
            }

            100% {
              transform: rotateY(0);
            }
          }
        `;

      default:
        return css`
          &.ant-modal {
            position: static;
            padding: 40px;
            max-width: 880px !important;
            width: ${props.width ? props.width : '100%'} !important;

            @media screen and (max-width: 768px) {
              padding: 0;
              margin: -8px 0;
            }

            .modal-confirm__title {
              font-size: 36px;
            }

            .ant-modal-content {
              position: static;
              padding: 24px;
              border-radius: 16px;
              /* overflow: hidden; */

              @media screen and (max-width: 768px) {
                top: -8px;
                bottom: -8px;
                border-radius: 0;
              }
            }

            .ant-modal-header,
            .ant-modal-body,
            .ant-modal-footer {
              padding: 0;
              position: unset;
            }

            .ant-modal-header {
              border-bottom: none;

              .ant-modal-title {
                font-size: 26px;
                font-weight: 700;
              }
            }

            .ant-modal-footer {
              display: flex;
              border-top: none;
            }

            .ant-modal-close {
              position: fixed;
              top: 40px;
              right: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: rgba(104, 104, 104, 0.96);
              color: white;
              transform: translate(50%, -50%);
              transition: all 300ms ease-in-out;

              &:hover {
                background: rgba(159, 159, 159, 0.86);

                @media screen and (max-width: 768px) {
                  background-color: transparent;
                }
              }

              .ant-modal-close-x {
                display: flex;
                justify-content: center;
                align-items: center;

                svg {
                  width: 10px;
                  height: 10px;
                }
              }

              @media screen and (max-width: 768px) {
                top: 16px;
                right: 16px;
                background-color: transparent;
                color: #959595;
              }
            }
          }
        `;
    }
  }}
`;

export default StyledModal;
