import styled, { StyledComponent } from 'styled-components';
import { IEditProps } from './QuillEditor';

export const EditorContainer: StyledComponent<any, any> = styled.div<IEditProps>`
  .quill {
    display: block;
    border-width: 1px;
    box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
    transition: 0.3s ease-in-out;
    transition-property: box-shadow, background;
    background: ${(props) => props.theme.secondaryText};
    border-radius: 10px;

    &.focused .ql-container {
      border-width: 2px;
      box-shadow: none;
      border-color: ${(props) => props.theme.strongBlue};
    }

    &.focused .ql-toolbar {
      border-width: 2px;
      box-shadow: none;
      border-color: ${(props) => props.theme.strongBlue};
    }
  }

  .ql-toolbar {
    border-radius: 10px 10px 0 0;
    border-color: ${(props) => props.theme.baseGray};
    box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
  }

  .ql-container {
    font-size: 14px;
    border-radius: ${(props) => (props.toolbar ? '0 0 10px 10px' : '10px')};
    border-color: ${(props) => props.theme.baseGray};
    height: ${(props) => (props.toolbar ? '155px' : 'auto')};
    overflow: hidden;

    .ql-editor {
      padding: 12px 15px;

      p {
        font-family: 'Helvetica', 'Arial', 'sans-serif' !important;
        color: ${(props) => props.theme.black};
      }

      .marker {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        font-size: 12px;
        line-height: 12px;
        background: rgba(219, 234, 254, 1);
        border-radius: 20px;
        color: ${(props) => props.theme.black};

        span {
          font-family: 'Helvetica', 'Arial', 'sans-serif' !important;
          font-weight: 500;
        }
      }
    }
  }
`;
