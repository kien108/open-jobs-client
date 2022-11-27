import styled from "styled-components";

export interface ImageProps {
   type?: string;
   src?: string;
   alt?: string;
   width: string;
   height?: string;
   borderRadius?: string;
   margin?: string;
}

const ImageThumbnailStyled = styled.img<ImageProps>`
   border-radius: ${(props) => (props.type === "circle" ? "100%" : props.borderRadius || "0")};
   object-fit: cover;
   width: 100%;
   height: 100%;
   border: 1px solid #ccc;
`;

const Image = ({ type, src, width, height, borderRadius, alt = "image", margin }: ImageProps) => {
   return (
      <>
         <ImageThumbnailStyled
            type={type}
            src={src}
            alt={alt}
            width={width}
            height={height}
            borderRadius={borderRadius}
            margin={margin}
         />
      </>
   );
};

export default Image;
