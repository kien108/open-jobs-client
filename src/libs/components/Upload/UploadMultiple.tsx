import React, { useEffect, useState } from "react";
import { UploadProps as UploadAntdProps } from "antd/lib/upload";
import { Controller, useFormContext } from "react-hook-form";
import { Container, StyledDragger } from "./styles";
import type { UploadFile } from "antd/es/upload/interface";
// import { usePostFileStoreMutation } from "../../../../services/FileApp";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CloseIcon } from "../Icons";
import { Download } from "../Download";
import { useTranslation } from "react-i18next";

interface UploadProps extends UploadAntdProps {
   name: string;
   remove?: (index: number) => void;
   label?: string;
   setFile?: any;
   required?: any;
   count?: any;
   files?: any;
   // formReset: boolean;
}

const UploadMultiple = ({
   name,
   remove,
   label,
   files,
   setFile,
   required,
   count,
   ...props
}: UploadProps) => {
   const [fileList, setFileList] = useState<UploadFile[]>([]);
   const { setValue, control, getValues, register, watch } = useFormContext();
   // const [uploadImg] = usePostFileStoreMutation();
   const { t } = useTranslation();

   useEffect(() => {
      const defaultFileList = watch(name)?.map((item: any, index: any) => {
         return {
            key: index.toString(),
            uid: index.toString(),
            name: item,
            url: item,
         };
      });
      setFileList(defaultFileList);
   }, [watch(name)]);

   return (
      <Container typeUpload="multiple" count={count}>
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
               <div className="group-image">
                  <StyledDragger
                     className="upload-list-inline"
                     {...register(name)}
                     fileList={fileList}
                     {...props}
                     {...field}
                     beforeUpload={(file: any) => {
                        return new Promise((resolve, reject) => {
                           const reader = new FileReader();
                           reader.readAsDataURL(file);
                           reader.onload = () => {
                              file.thumbUrl = reader.result;
                              reject(file);
                           };
                        });
                     }}
                     showUploadList={{
                        showRemoveIcon: true,
                        removeIcon: <CloseIcon width={"10px"} height={"10px"} />,
                     }}
                     iconRender={(file) => {
                        return (
                           <>
                              <CheckCircleOutlined style={{ color: "green" }}></CheckCircleOutlined>
                              {/* <Download file={file}></Download> */}
                           </>
                        );
                     }}
                     onChange={(info) => {
                        const data = new FormData();
                        const attachments = getValues(name);
                        setFileList(info.fileList);
                        data.append("file", info.file as unknown as File);
                        data.append("subPath", "employee");
                        data.append("keepSize", "false");
                        data.append("keepName", "false");
                        if (info.file.status === "removed") {
                           // const index = watch(name)?.findIndex((item) => item.uid === info.file.uid);
                           const newList = fileList.filter((item) => item.uid !== info.file.uid);
                           // remove?.(index);
                           setFile(newList);
                        } else {
                           setFile(info.fileList);
                           // uploadImg(data)
                           //    .unwrap()
                           //    .then((value) => {
                           //       setValue(`${name}.${attachments ? attachments.length : 0}`, value);
                           //    });
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
      </Container>
   );
};

export default React.memo(UploadMultiple);
