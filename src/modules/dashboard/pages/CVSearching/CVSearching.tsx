import React, { useEffect, useState } from "react";
import { BtnFunction, Container, Content, StyledFunctions } from "./styles";
import { EyeIcon, Table } from "../../../../libs/components";
import { ColumnsType } from "antd/es/table";
import { useSearchCVQuery } from "../../services";
import { useNavigate } from "react-router-dom";
import { FilterSearchCV } from "../../components/FilterCV";
import { useFilterCV } from "../../hooks";

const CVSearching = () => {
   const tableInstance = Table.useTable();
   const navigate = useNavigate();

   const [dataSource, setDataSource] = useState<any>([]);

   const { data: dataCVs, isFetching: fetchingCVs } = useSearchCVQuery(
      {
         ...tableInstance.params,
         ...useFilterCV(),
      },
      {
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
         title: "Chuyên ngành hẹp",
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
         title: "Status",
         dataIndex: "active",
         key: "active",

         render: (value: string) => (
            <div className={`active ${value ? "true" : "false"}`}>{value ? "Hiện" : "Ẩn"}</div>
         ),
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
            <FilterSearchCV />
            <Table
               columns={columns}
               dataSource={dataSource}
               tableInstance={tableInstance}
               loading={fetchingCVs}
               totalElements={dataCVs?.totalElements || 0}
               totalPages={dataCVs?.totalPages || 0}
               locale={{ emptyText: "Không có hồ sơ" }}
            />
         </Content>
      </Container>
   );
};

export default CVSearching;
