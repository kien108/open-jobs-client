import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { Filter, FilterJob } from "../../components";
import { Outlet, useFetcher, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../Jobs/styles";
import { RootState, getToken, useCommonSelector, useModal } from "../../../../../../libs/common";
import { Button, Modal, OverviewIcon } from "../../../../../../libs/components";

const Home = () => {
   const [params, setParams] = useState();
   const { user } = useCommonSelector((state: RootState) => state.user);
   const navigate = useNavigate();

   const { isOpen, handleOpen, handleClose } = useModal();

   const handleFilter = () => {};

   console.log({ user });
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
