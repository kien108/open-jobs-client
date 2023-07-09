import { InputProps, Popover } from "antd";
import { TextAreaProps } from "antd/lib/input";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ContentCopyIcon, EyeIcon, EyePwIcon } from "../../components";

import {
   Container,
   ContainerInput,
   InputMessageStyled,
   Label,
   StyledIconDefault,
   StyledIconInput,
   StyledInput,
   StyledInputNumber,
   StyledInputTextarea,
   SubLabel,
} from "./style";
import "./style.scss";
import { get } from "lodash";

interface IInput extends InputProps {
   type?: "password" | "textarea" | "copy" | "macAddress" | "time" | "number" | "numberFloat";
   label?: string;
   height?: string;
   message?: string;
   icons?: ReactNode;
   subLabel?: string;
   inputType?: string;
   decimal?: number;
   minimum?: number;
   maximum?: number;
   placementicon?: "left" | "right";
   isFieldArray?: boolean;
   parentName?: string;
}

const Input: FC<IInput & TextAreaProps> = ({
   type,
   label,
   height,
   message,
   icons,
   subLabel,
   inputType,
   decimal,
   minimum,
   placementicon,
   maximum,
   isFieldArray,
   parentName,
   ...props
}) => {
   const { t } = useTranslation();
   const [show, setShow] = useState(false);
   const [isShowSubLabel, setIsShowSubLabel] = useState(false);
   const [isCopy, setIsCopy] = useState("copy");
   const inputNumberRef = useRef(null as any);
   const {
      control,
      register,
      getValues,
      watch,
      formState: { errors },
   } = useFormContext();

   let errorMessage: any = "";
   if (isFieldArray && parentName) {
      console.log(errors);
      errorMessage =
         message || (errors && props.name ? get(errors, `${props.name}.message`, undefined) : "");
   } else {
      errorMessage = message || (errors && props.name ? errors[props.name]?.message : "");
   }

   const maskCPF = (value: string) => {
      return value
         .toUpperCase()
         .replace(/[^A-F0-9]/gi, "")
         .replace(/([A-F0-9]{2})([A-F0-9])/, "$1-$2")
         .replace(/([A-F0-9]{2})([A-F0-9])/, "$1-$2")
         .replace(/([A-F0-9]{2})([A-F0-9])/, "$1-$2")
         .replace(/([A-F0-9]{2})([A-F0-9])/, "$1-$2")
         .replace(/([A-F0-9]{2})([A-F0-9])/, "$1-$2")
         .replace(/(-[A-F0-9]{2})[A-F0-9]+?$/, "$1");
   };

   const timeCPF = (value: string) => {
      const regexH = /^([0-1]?[0-9]|2[0-3])$/;
      const regexM = /^[0-5]?[0-9]$/;

      const hh = Number(value.slice(0, 1)) > 2 ? `0${value.slice(0, 1)}` : value.slice(0, 2);
      const mm =
         Number(value.slice(2, 3)) > 5 ? `0${value.slice(2, 3)}` : value.slice(2).replace(":", "");

      let curValue = "";

      if (regexH.test(hh)) {
         curValue += hh;
         if (regexM.test(mm)) {
            curValue += mm;
         } else {
            curValue += mm.slice(0, mm.length - 1);
         }
      } else {
         curValue += hh.slice(0, hh.length - 1);
      }

      const result = curValue
         .replace(/\D/g, "")
         .replace(/(\d{2})(\d)/, "$1:$2")
         .replace(/(\d{2})(\d)/, "$1");

      return result;
   };

   useEffect(() => {
      if (type === "number") {
         const input = inputNumberRef.current.getElementsByTagName("input")[0];
         if (input) {
            input.addEventListener("keydown", (e) => {
               if (e.keyCode !== 8) {
                  if ((e.keyCode < 47 || e.keyCode > 57) && (e.keyCode > 105 || e.keyCode < 95)) {
                     e.preventDefault();
                  }

                  if (e.shiftKey) {
                     e.preventDefault();
                  }
               }
            });

            input.addEventListener("keyup", (e) => {
               if (e.keyCode !== 8) {
                  if (
                     (e.keyCode < 47 || e.keyCode > 57) &&
                     (e.keyCode > 105 || e.keyCode < 95) &&
                     e.keyCode < 109
                  ) {
                     e.preventDefault();
                  }

                  if (e.shiftKey) {
                     e.preventDefault();
                  }
               }
            });
         }
      }
   }, [type, inputNumberRef.current]);
   return (
      <Container className="container-input">
         {label && (
            <Label>
               {label}
               {props.required ? <span className="required-mark">*</span> : null}
            </Label>
         )}
         <ContainerInput ref={inputNumberRef}>
            {type === "textarea" ? (
               <Controller
                  name={`${props.name}`}
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                     <StyledInputTextarea
                        {...field}
                        {...register(`${props.name}`)}
                        value={getValues(`${props.name}`)}
                        height={height}
                        error={errorMessage}
                        onChange={(e: any) => {
                           onChange(e.target.value);
                           props.onChange;
                        }}
                        {...props}
                     />
                  )}
               />
            ) : type === "password" ? (
               <>
                  <Controller
                     name={`${props.name}`}
                     control={control}
                     render={({ field: { value, onChange, ...field } }) => (
                        <StyledInput
                           {...field}
                           {...register(`${props.name}`)}
                           value={getValues(`${props.name}`)}
                           height={height}
                           type={!show ? "password" : "text"}
                           error={errorMessage}
                           style={{ paddingRight: "50px" }}
                           onChange={(e: any) => {
                              onChange(e.target.value);
                              props.onChange;
                           }}
                           {...props}
                        />
                     )}
                  />
                  <Popover
                     placement="bottomRight"
                     overlayClassName="popup-password"
                     content={!show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                     <StyledIconInput className="icon-password" onClick={() => setShow(!show)}>
                        {!show ? <EyePwIcon /> : <EyeIcon />}
                     </StyledIconInput>
                  </Popover>
               </>
            ) : type === "copy" ? (
               <>
                  <Controller
                     name={`${props.name}`}
                     control={control}
                     render={({ field: { value, onChange, ...field } }) => (
                        <StyledInput
                           {...field}
                           {...register(`${props.name}`)}
                           value={getValues(`${props.name}`)}
                           height={height}
                           type="text"
                           error={errorMessage}
                           readOnly
                           style={{ paddingRight: "50px" }}
                           className="input-copy"
                           onChange={(e: any) => {
                              onChange(e.target.value);
                              props.onChange;
                           }}
                           {...props}
                        />
                     )}
                  />
                  <Popover
                     placement="bottomRight"
                     overlayClassName="popup-copy"
                     content={t(isCopy)}
                  >
                     <StyledIconInput
                        onClick={() => {
                           navigator.clipboard.writeText(getValues(`${props.name}`));
                           setIsCopy("Copied");
                        }}
                     >
                        {<ContentCopyIcon />}
                     </StyledIconInput>
                  </Popover>
               </>
            ) : type === "macAddress" ? (
               <>
                  {icons && (
                     <StyledIconDefault placementicon={placementicon}>{icons}</StyledIconDefault>
                  )}
                  <Controller
                     name={`${props.name}`}
                     control={control}
                     render={({ field: { value, onChange, ...field } }) => (
                        <StyledInput
                           {...field}
                           {...register(`${props.name}`)}
                           value={getValues(`${props.name}`)}
                           icons={icons}
                           height={height}
                           error={errorMessage}
                           onFocus={() => setIsShowSubLabel(true)}
                           onBlur={() => setIsShowSubLabel(false)}
                           on={subLabel}
                           placementicon={placementicon}
                           onChange={(e: any) => {
                              onChange(maskCPF(e.target.value));
                              props.onChange;
                           }}
                           {...props}
                        />
                     )}
                  />

                  {subLabel && (
                     <SubLabel
                        className="sub-label"
                        icons={icons}
                        isShow={getValues(`${props.name}`) || isShowSubLabel}
                        placementicon={placementicon}
                     >
                        {subLabel}
                     </SubLabel>
                  )}
               </>
            ) : type === "number" ? (
               <>
                  {icons && (
                     <StyledIconDefault placementicon={placementicon}>{icons}</StyledIconDefault>
                  )}
                  <Controller
                     name={`${props.name}`}
                     control={control}
                     render={({ field: { value, onChange, ...field } }) => (
                        <StyledInputNumber
                           className="input-number"
                           {...field}
                           {...register(`${props.name}`)}
                           value={getValues(`${props.name}`)}
                           icons={icons}
                           height={height}
                           error={errorMessage}
                           onFocus={() => setIsShowSubLabel(true)}
                           onBlur={() => setIsShowSubLabel(false)}
                           on={subLabel}
                           placementicon={placementicon}
                           onChange={(value: number) => {
                              onChange(value);
                              props.onChange;
                           }}
                           {...props}
                        />
                     )}
                  />

                  {subLabel && (
                     <SubLabel
                        className="sub-label"
                        icons={icons}
                        isShow={getValues(`${props.name}`) || isShowSubLabel}
                        placementicon={placementicon}
                     >
                        {subLabel}
                     </SubLabel>
                  )}
               </>
            ) : type === "time" ? (
               <>
                  {icons && (
                     <StyledIconDefault className="input-time" placementicon={placementicon}>
                        {icons}
                     </StyledIconDefault>
                  )}
                  <Controller
                     name={`${props.name}`}
                     control={control}
                     render={({ field: { value, onChange, ...field } }) => (
                        <StyledInput
                           {...field}
                           {...register(`${props.name}`)}
                           value={watch(`${props.name}`)}
                           pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                           placeholder="HH:MM"
                           icons={icons}
                           height={height}
                           error={errorMessage}
                           onFocus={() => setIsShowSubLabel(true)}
                           onBlur={() => setIsShowSubLabel(false)}
                           on={subLabel}
                           placementicon={placementicon}
                           onChange={({ target: { value } }) => {
                              onChange(timeCPF(value));
                              props.onChange;
                           }}
                           {...props}
                        />
                     )}
                  />

                  {subLabel && (
                     <SubLabel
                        className="sub-label"
                        icons={icons}
                        isShow={watch(`${props.name}`) || isShowSubLabel}
                        placementicon={placementicon}
                     >
                        {subLabel}
                     </SubLabel>
                  )}
               </>
            ) : type === "numberFloat" ? (
               <>
                  {icons && (
                     <StyledIconDefault placementicon={placementicon}>{icons}</StyledIconDefault>
                  )}
                  <Controller
                     name={`${props.name}`}
                     control={control}
                     render={({ field: { value, onChange, ...field } }) => (
                        <StyledInput
                           {...field}
                           {...register(`${props.name}`)}
                           value={getValues(`${props.name}`)}
                           icons={icons}
                           height={height}
                           error={errorMessage}
                           onFocus={() => setIsShowSubLabel(true)}
                           onBlur={(e) => {
                              const value = e.target.value;
                              const min = minimum ? minimum : 0;
                              const max = maximum ? maximum : Infinity;
                              if (min && parseFloat(value) < min) {
                                 onChange(min);
                              } else if (parseFloat(value) > max) {
                                 onChange(max);
                              } else if (!value) {
                                 onChange(min);
                              }
                              setIsShowSubLabel(false);
                           }}
                           type={inputType}
                           on={subLabel}
                           placementicon={placementicon}
                           onChange={(e: any) => {
                              let value = e.target.value.replace(",", ".");
                              if (decimal) {
                                 value = value.replace(/[^0-9.]/g, "");
                                 if (value[0] === ".") {
                                    value = "0" + value;
                                 }
                              } else {
                                 value = value.replace(/[^0-9]/g, "");
                              }
                              if (value[0] === "0" && value.length > 1 && value[1] !== ".") {
                                 value = value.substring(1);
                              }

                              if (value.split(".").length < 3) {
                                 const dec = value.split(".")[1];
                                 const float = decimal ? Math.pow(10, decimal) : 0;
                                 if (!dec || parseInt(dec) < float) {
                                    onChange(value);
                                 }
                              } else if (!value) {
                                 onChange(value);
                              }

                              props.onChange;
                           }}
                           {...props}
                        />
                     )}
                  />

                  {subLabel && (
                     <SubLabel
                        className="sub-label"
                        icons={icons}
                        isShow={getValues(`${props.name}`) || isShowSubLabel}
                        placementicon={placementicon}
                     >
                        {subLabel}
                     </SubLabel>
                  )}
               </>
            ) : (
               <>
                  {icons && (
                     <StyledIconDefault placementicon={placementicon}>{icons}</StyledIconDefault>
                  )}
                  <Controller
                     name={`${props.name}`}
                     control={control}
                     render={({ field: { value, onChange, ...field } }) => (
                        <StyledInput
                           {...field}
                           {...register(`${props.name}`)}
                           value={getValues(`${props.name}`)}
                           icons={icons}
                           height={height}
                           error={errorMessage}
                           onFocus={() => setIsShowSubLabel(true)}
                           onBlur={() => setIsShowSubLabel(false)}
                           type={inputType}
                           on={subLabel}
                           placementicon={placementicon}
                           onChange={(e: any) => {
                              onChange(e.target.value);
                              props.onChange;
                           }}
                           {...props}
                        />
                     )}
                  />

                  {subLabel && (
                     <SubLabel
                        className="sub-label"
                        icons={icons}
                        isShow={getValues(`${props.name}`) || isShowSubLabel}
                        placementicon={placementicon}
                     >
                        {subLabel}
                     </SubLabel>
                  )}
               </>
            )}
         </ContainerInput>
         {errorMessage && <InputMessageStyled>{errorMessage}</InputMessageStyled>}
      </Container>
   );
};

export default Input;
