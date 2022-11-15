import React, { FC, useEffect, useState } from "react";

import { Tag2, Tooltip } from "../../../../libs/components";

import { Label, StyledEmailVariables, StyledErrorMessage, StyledVariablesContent } from "./styles";

import { QuillEditor } from "../QuillEditor";
import { Quill } from "react-quill";

// import { useGetTempVariablesQuery } from '../../services/AccountApp';
import { useTranslation } from "react-i18next";

import { Controller, useFormContext } from "react-hook-form";

interface IEmailVariables {
   name: string;
   label?: string;
   required?: boolean;
   toolbar?: boolean;
   data?: string;
   delta?: string;
   editorRef: any;
   message?: string | undefined;
}

const BlockEmbed = Quill.import("blots/embed");

const EmailVariables: FC<IEmailVariables> = (props) => {
   const { label, name, required, toolbar, data, delta, editorRef } = props;

   const {
      control,
      register,
      setValue,
      getValues,
      formState: { errors },
   } = useFormContext();

   const errorMessage: any =
      (props.message && props.message) ||
      (errors && props.name ? errors[props.name]?.["message"] : "");

   const { t } = useTranslation();
   const [content, setContent] = useState("");

   const [curIndex, setCurIndex] = useState("");

   useEffect(() => {
      setContent(data as any);
   }, [data]);
   useEffect(() => {
      const quill = editorRef.current.getEditor();

      quill.on("selection-change", function (delta: any, oldDelta: any, source: any) {
         if (!delta) return;

         setCurIndex(delta.index);
      });

      quill.on("text-change", function (delta: any, oldDelta: any, source: any) {
         setCurIndex(() => (delta.ops[0]?.retain ? delta.ops[0]?.retain + 1 : 1));
      });
   }, []);

   return (
      <StyledEmailVariables>
         {label && (
            <Label>
               {label}
               {required ? <span className="required-mark">*</span> : null}
            </Label>
         )}

         <Controller
            name={name}
            control={control}
            render={({ field: { onChange, ...field } }) => (
               <QuillEditor
                  {...field}
                  {...register(`${name}`)}
                  editorRef={editorRef}
                  value={content}
                  onChange={(content) => {
                     onChange(content);
                     setContent(content);
                  }}
                  toolbar={toolbar}
               />
            )}
         />
         {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
      </StyledEmailVariables>
   );
};

export default EmailVariables;
