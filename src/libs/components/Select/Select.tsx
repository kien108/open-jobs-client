import { Select as AntSelect, SelectProps } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
   Container,
   InputMessageStyle,
   StyledLabelSelect,
   StyledSelect,
   StyledTitleSelect,
} from "./styles";
import "./styles.scss";
import DownArrowSvgComponent from "./SvgSelect/DownArrowSvgComponent";
import { NOTHING_FOUND, OptionType } from "./types";
import { CheckIcon } from "../Icons";
import { get } from "lodash";

export interface CustomSelectProps extends SelectProps {
   options?: OptionType[];
   name: string;
   message?: string;
   label?: string;
   title?: string;
   required?: boolean;
   selectedItems?: Array<string | number>;
   setSelectedItems?: any;
   item?: string;
   filter?: boolean;
   onChange?: (value: any, name: DefaultOptionType | DefaultOptionType[]) => void;
}

const Select = ({
   options = [],
   message,
   name,
   placeholder,
   onChange,
   selectedItems,
   setSelectedItems,
   filter = false,
   value,
   ...props
}: CustomSelectProps) => {
   const {
      control,
      register,
      setValue,
      getValues,
      formState: { errors },
   } = useFormContext();

   const errorMessage =
      message || (errors && name ? get(errors, `${name}.message`, undefined) : "");

   const { t } = useTranslation();

   const [isMoveText, setIsMoveText] = useState(
      getValues(name) ? false : props.label ? true : false
   );
   const [hasValueSelect, setHasValueSelect] = useState(false);
   const isLabel = useMemo(() => props.mode && !props.label, []);
   const [itemList, setItemList] = useState<Array<string | number>>(getValues(name) || []);
   const optionRef = useRef(null);

   useEffect(() => {
      setItemList(getValues(name));
   }, [getValues(name)]);

   const filteredOptions = props.mode
      ? options?.filter((option) =>
           selectedItems
              ? !selectedItems?.includes(option.value)
              : !itemList?.includes(option.value)
        )
      : [];
   const hanleOnChange = (value: any, nameSelect: DefaultOptionType | DefaultOptionType[]) => {
      if (getValues(name)) {
         setHasValueSelect(true);
         setIsMoveText(false);
      }

      if (!getValues(name) || !value) {
         setHasValueSelect(false);
      }

      if (getValues(name) && !props.mode) {
         optionRef.current && (optionRef.current as HTMLElement).blur();
         setIsMoveText(false);
      }

      onChange && onChange(value, nameSelect);

      if (props.mode) {
         setSelectedItems ? (setSelectedItems(value) as unknown) : setItemList(value);
      }
   };

   const handleOnFocusSelect = () => {
      setIsMoveText(false);
   };

   const handleOnBlurSelect = () => {
      if (hasValueSelect || getValues(name)) {
         setIsMoveText(false);
      } else {
         setIsMoveText(true);
      }
   };

   useEffect(() => {
      if (!value) return;

      setValue(name, value, { shouldValidate: true });
   }, [value]);

   return (
      <Container>
         {props.title && (
            <StyledTitleSelect>
               {props.title}
               {props.required && <span className="required-mark">*</span>}
            </StyledTitleSelect>
         )}
         {props.label && (
            <StyledLabelSelect ismovetext={`${isMoveText}`}>{props.label}</StyledLabelSelect>
         )}
         <Container isError={Boolean(errorMessage)}>
            {!props.mode && (
               <Controller
                  name={name}
                  control={control}
                  render={({ field: { value, onChange, ref, onBlur, ...field } }) => (
                     <div id={`demo-select-${name}`} style={{ position: "relative" }}>
                        <StyledSelect
                           {...register(name)}
                           ref={optionRef}
                           onChange={(value: string | Array<string | number>) => {
                              onChange(value);
                              hanleOnChange(
                                 value,
                                 name as unknown as DefaultOptionType | DefaultOptionType[]
                              );
                           }}
                           value={getValues(name)}
                           popupClassName="dropdown-style"
                           placeholder={placeholder}
                           optionFilterProp="children"
                           status={errorMessage && "error"}
                           suffixIcon={<DownArrowSvgComponent />}
                           filterOption={(input: string, option: any) =>
                              option!.value?.toLowerCase().includes(input?.toLowerCase())
                           }
                           onFocus={handleOnFocusSelect}
                           onBlur={handleOnBlurSelect}
                           notFoundContent={<p>{t("common:notification.nothingFound")}</p>}
                           allowClear
                           // getPopupContainer={() => document.querySelector(`#demo-select-${name}`)}
                           item={props.label ? "false" : "true"}
                           {...field}
                           {...props}
                        >
                           {options.map((item: any) => (
                              <AntSelect.Option
                                 key={item.key}
                                 value={item.value}
                                 label={item.label}
                                 disabled={item?.disabled}
                              >
                                 {item.render()}
                              </AntSelect.Option>
                           ))}
                        </StyledSelect>
                     </div>
                  )}
               />
            )}

            {props.mode && (
               <Controller
                  name={name}
                  control={control}
                  render={({ field: { value, onChange, onBlur, ...field } }) => (
                     <div id={`demo-select-${name}`} style={{ position: "relative" }}>
                        <StyledSelect
                           {...register(name)}
                           onChange={(value: string | Array<string | number>) => {
                              onChange(value);
                              hanleOnChange(
                                 value,
                                 name as unknown as DefaultOptionType | DefaultOptionType[]
                              );
                           }}
                           value={selectedItems ? selectedItems : itemList}
                           status={errorMessage && "error"}
                           mode={props.mode}
                           dropdownClassName="dropdown-style"
                           placeholder={
                              selectedItems?.length === 0
                                 ? placeholder
                                 : isMoveText
                                 ? ""
                                 : placeholder
                           }
                           suffixIcon={<DownArrowSvgComponent />}
                           onFocus={handleOnFocusSelect}
                           onBlur={handleOnBlurSelect}
                           notFoundContent={<p>{t("common:notification.nothingFound")}</p>}
                           allowClear
                           showArrow
                           getPopupContainer={() => document.querySelector(`#demo-select-${name}`)}
                           item={`${isLabel}`}
                           {...props}
                           {...field}
                        >
                           {(filter ? filteredOptions : options)?.map((item) => (
                              <AntSelect.Option
                                 key={item.key}
                                 value={item.value}
                                 label={item.label}
                                 className={`status-${item.type}`}
                                 disabled={item.disabled}
                              >
                                 {item.render()}
                              </AntSelect.Option>
                           ))}
                        </StyledSelect>
                     </div>
                  )}
               />
            )}
            <InputMessageStyle error={Boolean(errorMessage)}>
               {errorMessage && <>{errorMessage}</>}
            </InputMessageStyle>
         </Container>
      </Container>
   );
};

export default Select;
