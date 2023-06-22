import React from "react";
import { Container } from "./styles";
import { Slider } from "../Slider";
import { HrOutStanding, LatestJobs } from "../../components";
import { Divider } from "antd";

const HomeContent = () => {
   return (
      <Container>
         <div className="company">
            <Slider />
         </div>

         <div className="hr">
            <HrOutStanding />
         </div>

         <div className="jobs-container">
            <LatestJobs />
         </div>
      </Container>
   );
};

export default HomeContent;
