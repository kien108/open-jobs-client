import React, { FC } from "react";
import { Container } from "./styles";
import { Row } from "antd";

interface IProps {
   jobs?: any;
}
const JobSlide: FC<IProps> = ({ jobs }) => {
   console.log({ jobs });
   return (
      <Container>
         {jobs.map((item) => (
            <div className="content">
               <span className="company">123</span>
               <span className="title">123asdfaf</span>

               <span className="salary">123</span>
            </div>
         ))}
      </Container>
   );
};

export default JobSlide;
