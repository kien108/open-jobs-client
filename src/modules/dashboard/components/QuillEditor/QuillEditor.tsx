import React, { FC, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import { EditorContainer } from './styles';

export interface IEditProps {
  onChange: (e: string) => void;
  placeholder?: string;
  toolbar?: boolean;
  value?: any;
  editorRef: any;
}

const QuillEditor: FC<IEditProps> = (props) => {
  const { onChange, toolbar, value, editorRef } = props;

  const [focusedEditor, setFocused] = useState<boolean>(false);

  const modules = toolbar
    ? {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          ['link', 'image'],
          ['clean']
        ]
      }
    : {
        toolbar: null
      };

  return (
    <EditorContainer {...props}>
      <ReactQuill
        ref={editorRef}
        className={`${focusedEditor ? 'focused' : ''}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        theme="snow"
        modules={modules}
        value={value}
        onChange={onChange}
        placeholder={props.placeholder ? props.placeholder : ''}
      />
    </EditorContainer>
  );
};

QuillEditor.defaultProps = {
  toolbar: true
};

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
