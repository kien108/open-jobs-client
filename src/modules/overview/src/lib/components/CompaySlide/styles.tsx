import styled from "styled-components";

export const Container = styled.div`
   /* border: 2px solid #ccc;
   border-radius: 10px; */
   padding: 0px 4px;

   .img {
      width: 100%;
      object-fit: cover;
      height: 280px;

      img {
         width: 100%;
         height: 100%;
      }
   }

   .content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;

      .title {
         font-size: 20px;
         color: ${(props) => props.theme.strongBlue};
         font-weight: 700;
         cursor: pointer;
         transition: all 0.2s linear;

         &:hover {
            opacity: 0.8;
         }
      }
      .des {
         font-size: 14px;
         margin-bottom: 8px;
         display: -webkit-box;
         -webkit-box-orient: vertical;
         -webkit-line-clamp: 4;
         overflow: hidden;
         text-overflow: ellipsis;
      }

      .address {
         position: absolute;
         bottom: 0;
      }
   }
`;
