import React, { useEffect, useState } from "react";
import { BtnFunction, Container, Content, StyledFunctions } from "./styles";
import { Button, EyeIcon, Table } from "../../../../libs/components";
import { ColumnsType } from "antd/es/table";
import { useSearchCVQuery } from "../../services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FilterSearchCV } from "../../components/FilterCV";
import { useFilterCV } from "../../hooks";
import { EMemberTypes } from "../../../../types";
import { useCommonSelector, RootState } from "../../../../libs/common";

import { MdUpgrade } from "react-icons/md";

const CVSearching = () => {
   const tableInstance = Table.useTable();
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const { user } = useCommonSelector((state: RootState) => state.user);

   const [dataSource, setDataSource] = useState<any>([]);

   const { data: dataCVs, isFetching: fetchingCVs } = useSearchCVQuery(
      {
         ...tableInstance.params,
         ...useFilterCV(),
      },
      {
         skip: !searchParams.get("keyword") && !searchParams.get("skillId"),
         refetchOnMountOrArgChange: true,
      }
   );

   const columns: ColumnsType<any> = [
      {
         title: "Tiêu đề",
         dataIndex: "title",
         key: "title",
         render: (item) => <span className="col title">{item || "-"}</span>,
      },
      {
         title: "Chuyên ngành",
         dataIndex: "major",
         key: "major",

         render: (item) => <span className="col">{item}</span>,
      },
      {
         title: "Chuyên môn",
         dataIndex: "specialization",
         key: "specialization",

         render: (item) => <span className="col">{item}</span>,
      },
      {
         title: "Kỹ năng",
         dataIndex: "skill",
         key: "skill",

         render: (item) => <span className="col title">{item || "-"}</span>,
      },

      {
         title: "Actions",
         dataIndex: "id",
         render: (_: string, record: any) => (
            <StyledFunctions>
               <BtnFunction onClick={() => navigate(`${record?.id}`)}>
                  <EyeIcon />
               </BtnFunction>
            </StyledFunctions>
         ),
      },
   ];

   useEffect(() => {
      if (!searchParams.get("keyword")) {
         setDataSource([]);
      }
   }, [searchParams.get("keyword")]);

   useEffect(() => {
      const dataSource = (dataCVs?.listCv ?? [])?.map((item: any) => ({
         ...item,
         key: item?.id,
         major: item?.major?.name,
         specialization: item?.specialization?.name,
         skill: item?.skills?.map((item) => item?.skill?.name)?.join(" - "),
      }));

      setDataSource(dataSource || []);
   }, [dataCVs]);
   return (
      <Container>
         <h1 className="title">Tìm kiếm ứng viên</h1>

         <Content>
            {user?.company?.memberType === EMemberTypes.DEFAULT ? (
               <div className="pay">
                  <span>
                     Nâng cấp tài khoản lên{" "}
                     <span className="premium" onClick={() => navigate("/dashboard/premium")}>
                        Premium
                     </span>{" "}
                     để sử dụng tính năng này
                  </span>

                  <Button className="btn-upgrade" onClick={() => navigate("/dashboard/premium")}>
                     Nâng cấp ngay
                     <MdUpgrade color="white" size={28} />
                  </Button>
               </div>
            ) : (
               <>
                  <FilterSearchCV />
                  <Table
                     columns={columns}
                     dataSource={dataSource}
                     tableInstance={tableInstance}
                     loading={fetchingCVs}
                     totalElements={dataCVs?.totalElements || 0}
                     totalPages={dataCVs?.totalPages || 0}
                     locale={{ emptyText: "Tìm kiếm ứng viên ngay" }}
                  />
               </>
            )}
         </Content>
      </Container>
   );
};

export default CVSearching;
