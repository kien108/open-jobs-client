import styled from "styled-components";

export const Container = styled.div`
   width: 1250px;
   max-width: 100%;
   margin: 0 auto;
   margin-top: 70px;
   padding: 30px 0 50px 0;

   .right {
      padding: 20px 40px;
      background-color: white;
      box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      border: 1px solid #dee2e6;
      .header {
         position: sticky;
         top: 70px;
         padding-bottom: 10px;
         z-index: 1;
         background-color: white;

         .job-title {
            color: #353535;
            font-size: 27px;
         }

         .btn-apply {
            width: 100%;
            margin-top: 20px;
         }
      }

      .content {
         .job-information {
            margin-top: 15px;

            display: flex;
            flex-direction: column;
            gap: 10px;
            font-size: 14px;

            .item {
               display: flex;
               align-items: center;
               gap: 10px;
               color: #373737;

               &:first-child {
                  color: #2557a7;
                  font-weight: 500;
               }
            }
         }
      }
   }

   .left {
      position: sticky;
      top: 77px;
      height: fit-content;
      box-shadow: 0px 6px 32px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      border: 1px solid #dee2e6;
      background-color: white;

      .footer {
         padding: 20px 25px;
         border-radius: 4px;
         position: sticky;
         top: 0;
         box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);

         .header {
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin-bottom: 10px;

            .logo {
               width: 170px;
               height: 170px;
               border: 1px solid #dedede;
               box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
               border-radius: 8px;
               overflow: hidden;

               img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
               }
            }

            .name {
               font-size: 24px;
               font-weight: 500;
               margin-top: 20px;
            }
         }

         .btn-about {
            margin: 0 auto;
            border-radius: 6px;
            border-width: 1px;
            width: 130px !important;
            margin-top: 10px;
            transition: all 0.2s linear;
            &:hover {
               background-color: ${(props) => props.theme.strongBlue};
               color: white;
            }
         }

         .item {
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: ${(props) => props.theme.textDefault};
            font-weight: 400;
         }
      }
   }

   .title {
      font-size: 22px;
      font-weight: 700;
      margin: 30px 0 20px 0;
   }

   .skills {
      display: flex;
      align-items: center;
      gap: 15px;

      .skill {
         color: #414042;
         background-color: #fff;
         border: 1px solid #dedede;
         padding: 4px 10px;
         font-size: 12px;
         border-radius: 20px;
         display: block;
         border: 1px solid ${(props) => props.theme.strongBlue};

         &.invalid {
            background-color: #ccc;
            border-color: transparent;
         }
      }
   }
`;
