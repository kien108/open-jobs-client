import React from "react";
import { Container } from "./styles";
import { Slider } from "../Slider";
import { HrOutStanding } from "../../components";

const HomeContent = () => {
   return (
      <Container>
         <Slider />

         <HrOutStanding />
      </Container>
   );
};

export default HomeContent;
