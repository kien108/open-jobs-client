import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { Filter, FilterJob } from "../../components";
import { Outlet, useFetcher, useLocation } from "react-router-dom";
import { Header } from "../Jobs/styles";

const Home = () => {
   const [params, setParams] = useState();
   const location = useLocation();

   console.log("home page");

   const handleFilter = () => {};

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
