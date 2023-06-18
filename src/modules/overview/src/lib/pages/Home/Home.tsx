import React, { useState } from "react";
import { Container } from "./styles";
import { Filter, FilterJob } from "../../components";
import { Outlet } from "react-router-dom";
import { Header } from "../Jobs/styles";

const Home = () => {
   const [params, setParams] = useState();

   console.log("home page");
   return (
      <Container>
         <Header>
            <FilterJob setParams={setParams} />
         </Header>

         <Outlet />
      </Container>
   );
};

export default Home;
