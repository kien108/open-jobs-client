import React, { useEffect, useState } from "react";
import { UploadProps as UploadAntdProps } from "antd/lib/upload";
import { Controller, useFormContext } from "react-hook-form";
import { Container, StyledDragger } from "./styles";
import type { UploadFile } from "antd/es/upload/interface";
// import { useGetFileStoreQuery, usePostFileStoreMutation } from "../../../../services/FileApp";
import { CloseIcon } from "../Icons";
import { useTranslation } from "react-i18next";
import { watch } from "fs";
import { Form } from "react-router-dom";

interface UploadProps extends UploadAntdProps {
   name: string;
   setFile?: any;
   label?: string;
   files?: any;
   required?: string;
   // formReset: boolean;
}

const UploadSingle = ({ name, setFile, label, files, required, ...props }: UploadProps) => {
   const { t } = useTranslation();
   const [fileList, setFileList] = useState<UploadFile[]>([]);
   const { setValue, getValues, control, register, watch } = useFormContext();
   //  const [uploadImg] = usePostFileStoreMutation();
   const [error, setError] = useState(false);

   useEffect(() => {
      const defaultFileList: UploadFile = {
         uid: "1",
         name: "image",
         url: watch(name),
      };

      setFileList(watch(name) ? [defaultFileList] : []);
   }, [watch(name)]);

   return (
      <Container error={error}>
         {label && (
            <div className="label-container">
               <span className="label">{label}</span>
               {required && <span className="required">*</span>}
            </div>
         )}
         <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
               <div>
                  <StyledDragger
                     className="upload-list-inline-single"
                     {...register(name)}
                     fileList={fileList}
                     maxCount={1}
                     listType={"picture"}
                     {...props}
                     {...field}
                     beforeUpload={() => {
                        return false;
                     }}
                     showUploadList={{
                        showRemoveIcon: true,
                        removeIcon: <CloseIcon width={"10px"} height={"10px"} />,
                     }}
                     onChange={(info) => {
                        const isError =
                           props.accept && !info.file.type?.includes(props.accept.split("/")[0]);
                        setFileList(info.fileList);
                        if (!isError || !info.file.type) {
                           setError(false);
                           const data = new FormData();
                           data.append("file", info.file as unknown as File);
                           data.append("subPath", "employee");
                           data.append("keepSize", "false");
                           data.append("keepName", "false");
                           if (info.file.status === "removed") {
                              setValue(name, "");
                           } else {
                              setFile(info.fileList);
                           }
                        } else {
                           if (info.file.status !== "removed") {
                              setError(true);
                           } else {
                              setError(false);
                           }
                        }
                     }}
                     {...props}
                  >
                     <div className="info-subtext">
                        <div className="text">Chọn tệp</div>{" "}
                        <div className="sub-text">hoặc Kéo thả tại đây</div>
                     </div>
                     <label htmlFor="info-text" />
                  </StyledDragger>
               </div>
            )}
         />
         {error && <div className="error">{t("wrongFileType")}</div>}
      </Container>
   );
};

export default React.memo(UploadSingle);
