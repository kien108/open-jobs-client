import { Text } from "../../components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledTextEllipsis } from "./styles";

interface TextEllipsisProps {
   data: string;
   length?: number;
   haveShowMore?: boolean;
   className?: string;
}

const TextEllipsis = (props: TextEllipsisProps) => {
   const { data, length = 180, haveShowMore = true } = props;

   const { t } = useTranslation();
   const [isShowMore, setIsShowMore] = useState<boolean>(true);

   if (data?.length < length) {
      return <Text className={props.className}> {data}</Text>;
   } else {
      return (
         <StyledTextEllipsis>
            {isShowMore ? (
               <>
                  <Text className={props.className}>
                     {data?.slice(0, length)}
                     {!haveShowMore && <span>...</span>}
                  </Text>
                  {haveShowMore && (
                     <button
                        className="btnShow"
                        onClick={() => {
                           setIsShowMore(false);
                        }}
                     >
                        {t("common:buttonAction.showMore")}
                     </button>
                  )}
               </>
            ) : (
               <>
                  <Text className={props.className}>{data}</Text>
                  <button
                     className="btnShow"
                     onClick={() => {
                        setIsShowMore(true);
                     }}
                  >
                     {t("common:buttonAction.showLess")}
                  </button>
               </>
            )}
         </StyledTextEllipsis>
      );
   }
};

export default TextEllipsis;
