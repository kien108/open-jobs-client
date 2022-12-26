import React, { FC, useState } from "react";
import EmailVariables from "./../../../../../dashboard/components/EmailVariables/EmailVariables";
import useModal from "./../../../../../../libs/common/hooks/useModal";
import Parser from "html-react-parser";
import { useFormContext } from "react-hook-form";
import { Button, EditIcon } from "../../../../../../libs/components";

interface IProps {
   name: string;
   label?: string;
   required?: boolean;
   toolbar?: boolean;
   data?: string;
   delta?: string;
   editorRef: any;
   message?: string | undefined;
}

import { Container } from "./styles";
import { BtnFunction } from "./../../pages/JobsApplied/styles";

const EditorEdit: FC<IProps> = ({ name, label, data, editorRef }) => {
   const [isEdit, setToggleEdit] = useState<boolean>(false);
   const { getValues } = useFormContext();

   return (
      <Container>
         {isEdit ? (
            <EmailVariables
               data={data || getValues(name)}
               editorRef={editorRef}
               name={name}
               label={label}
            />
         ) : (
            <div className="render-content">
               <div className="header">
                  <span className="label"> {name.toUpperCase()}</span>
                  <BtnFunction className="btn-back" onClick={() => setToggleEdit(true)}>
                     <EditIcon width={20} />
                  </BtnFunction>
                  {/* <Button
                     height={32}
                     className="btn-comment-submit"
                     onClick={() => setToggleEdit((prev) => !prev)}
                  >
                     {isEdit ? "Save" : "Edit"}
                  </Button> */}
               </div>
               {Parser(`${getValues(name)}`)}
            </div>
         )}
         {isEdit && (
            <Button
               height={32}
               className="btn-comment-submit"
               onClick={() => setToggleEdit((prev) => !prev)}
            >
               Save
            </Button>
         )}
      </Container>
   );
};

export default EditorEdit;
