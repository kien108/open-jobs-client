import { Layout, Menu, MenuProps, Space, Tooltip as AntTooltip } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { OptionType } from "../Select/types";
import { theme } from "../../common";

import {
   Image,
   Input,
   Switch,
   Paragraph,
   Text,
   Title,
   Button,
   Select,
   DateRangePicker,
   DatePicker,
   Checkbox,
   openNotification,
   Table,
   Tabs,
   Tag2,
   Tooltip,
   Modal,
   EyePwIcon,
   EyeIcon,
   EditIcon,
   DeleteIcon,
   CheckIcon,
   MinimizeIcon,
   ContentCopyIcon,
   HumanResourceIcon,
   KnowledgeBaseIcon,
   MyTimeIcon,
   OverviewIcon,
   PlusIcon,
   NotificationIcon,
   LanguageIcon,
   NotificationOffIcon,
   LockOpenIcon,
   GradeIcon,
   SettingIcon,
   SchoolIcon,
   WorkOutlineIcon,
   TripOriginIcon,
   MoreHorizIcon,
   CloseIcon,
   SearchIcon,
   ChevronRightIcon,
   PlaceIcon,
   AdminIcon,
} from "../../components";

import { useState } from "react";

const Common = () => {
   // ----------------------- Setting UI ----------------------- //
   const { Header, Content, Footer, Sider } = Layout;
   const items: MenuProps["items"] = [
      "Color",
      "Typograpy",
      "Switch",
      "Tag",
      "Tooltip",
      "Input",
      "Button",
      "Select",
      "DatePicker",
      "DateTimePicker",
      "Checkbox",
      "Notification",
      "Avatar",
      "Tabs",
      "Table",
      "Modal",
      "Icons",
   ].map((item, index) => ({
      key: String(index + 1),
      label: <a href={`common/#${item}`}>{item}</a>,
   }));
   // ----------------------- End Setting UI ----------------------- //

   // ----------------------- Use with component ----------------------- //
   const [isOpenModal, setIsOpenModal] = useState(false);
   const form = useForm({
      defaultValues: {
         username: "",
         copy: "Copy",
         nolabel: "No label",
         subLabel: "",
         month: "",
         month1: "August",
         status: "",
         status1: ["123", "456"],
         search: "",
         datepicker: "",
      },
      resolver: yupResolver(
         yup.object({
            username: yup.string().required(),
            month: yup.string().required("This field month is required!"),
            status: yup.array().required("This field status is required!"),
            datepicker: yup.date().required("This field datepicker is required!"),
            search: yup
               .string()
               .required("This field search is required!")
               .min(6, "This field is at least 6 charaters!"),
         })
      ),
   });

   const options: OptionType[] = [
      { key: 0, label: "January", value: "January", render: () => <p>January</p> },
      { key: 1, label: "February", value: "February", render: () => <p>February</p> },
      { key: 2, label: "March", value: "March", render: () => <p>March</p> },
   ];

   const searchForUser: OptionType[] = [
      { key: 0, label: "Nguyen Van B", value: "Nguyen Van B", render: () => <p>Nguyen Van B</p> },
      { key: 1, label: "Le Thi C", value: "Le Thi C", render: () => <p>Le Thi C</p> },
      { key: 2, label: "Dao Quoc D", value: "Dao Quoc D", render: () => <p>Dao Quoc D</p> },
      { key: 3, label: "Test", value: "Test", render: () => <p>Test</p> },
   ];

   const optionsTag = [
      {
         key: 0,
         label: "App",
         value: "App",
         type: "app",
         render: () => <p>App</p>,
      },
      {
         key: 1,
         label: "Waiting",
         value: "Waitingpppppppppp",
         type: "waiting",
         render: () => <p>Waitingpppppppp</p>,
      },
      { key: 2, label: "Data", value: "Data", type: "default", render: () => <p>Data</p> },
      { key: 3, label: "Test", value: "Test", type: "default", render: () => <p>Test</p> },
   ];

   const optionsTagIcon = [
      {
         key: 0,
         label: "App",
         value: "Detete icon",
         type: "app",
         render: () => (
            <div style={{ display: "flex" }}>
               <div>
                  <DeleteIcon style={{ color: "red" }} />
               </div>
               <div>
                  <p> Detete icon </p>
               </div>
            </div>
         ),
      },
      {
         key: 1,
         label: "Waiting",
         value: "Check icon",
         type: "waiting",
         render: () => (
            <div style={{ display: "flex" }}>
               <div>
                  <CheckIcon />
               </div>
               <div>
                  <p>Check icon </p>
               </div>
            </div>
         ),
      },
   ];

   const onSubmit = (data: any) => {};

   const optionsTagIconNoDiplay = [
      {
         key: 0,
         label: "App",
         value: "Detete icon",
         type: "app",
         render: () => (
            <div style={{ display: "flex" }}>
               <div className="dnone">
                  <DeleteIcon style={{ color: "red" }} />
               </div>
               <div>
                  <p>Detete icon </p>
               </div>
            </div>
         ),
      },
      {
         key: 1,
         label: "Waiting",
         value: "Check icon",
         type: "waiting",
         render: () => (
            <div style={{ display: "flex" }}>
               <div className="dnone">
                  <CheckIcon />
               </div>
               <div>
                  <p>Check icon </p>
               </div>
            </div>
         ),
      },
   ];

   const [selectedItems, setSelectedItems] = useState(["134", "456"]);

   const handleOnChange = (value: any, name: any) => {
      form.setValue(name, value);
   };

   const dataSource = [
      {
         key: "1",
         name: "Mike",
         age: 32,
         address: "10 Downing Street",
      },
      {
         key: "2",
         name: "John",
         age: 42,
         address: "10 Downing Street",
      },
   ];

   const columns = [
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Age",
         dataIndex: "age",
         key: "age",
      },
      {
         title: "Address",
         dataIndex: "address",
         key: "address",
      },
   ];

   const tabsNotifiContent = [
      {
         id: 1,
         title: "notification.new",
      },
      {
         id: 2,
         title: "notification.requestSubmission",
      },
   ];

   const handleChangeValueSelect = (value: any, name: any) => {
      setSelectedItems(["0"]);
   };

   // ----------------------- Get Components ----------------------- //
   const UIComponents = () => (
      <>
         {/* ----------------------- Color ----------------------- */}
         <Property id="Color">
            <Title level={2} color={"red"}>
               # Color
            </Title>
            <PropertyGroup>
               {Object.entries(theme).map((item) => (
                  <StyledColor key={item[0]} bg={item[1]}>
                     <span>{item[0]}</span> <span>{item[1]}</span>
                  </StyledColor>
               ))}
            </PropertyGroup>
         </Property>

         {/* ----------------------- Typograpy ----------------------- */}
         <Property id="Typograpy">
            <Title level={2} color={"red"}>
               # Typograpy
            </Title>
            <PropertyGroup>
               <Title>Title - type(level = 1)</Title>
               <Title level={2}>Title - type(level = 2)</Title>
               <Title level={3}>Title - type(level = 3)</Title>
               <Title level={4}>Title - type(level = 4)</Title>
               <Title level={5}>Title - type(level = 5)</Title>
               <Space direction="vertical">
                  <Text>Text - type(default)</Text>
                  <Text type="secondary">Text - (secondary)</Text>
                  <Text type="success">Text - (success)</Text>
                  <Text type="warning">Text - (warning)</Text>
                  <Text type="danger">Text - (danger)</Text>
                  <Text disabled>Text - (disabled)</Text>
                  <Text mark>Text - (mark)</Text>
                  <Text code>Text - (code)</Text>
                  <Text keyboard>Text - (keyboard)</Text>
                  <Text underline>Text - (underline)</Text>
                  <Text delete>Text - (delete)</Text>
                  <Text strong>Text - (strong)</Text>
                  <Text italic>Text - (italic)</Text>
               </Space>
               <Paragraph>
                  <Text strong>Paragraph</Text>: "In the process of internal desktop applications
                  development, many different design specs and implementations would be involved,
                  which might cause designers and developers difficulties and duplication and reduce
                  the efficiency of development."
               </Paragraph>
            </PropertyGroup>
         </Property>

         {/* ----------------------- Switch ----------------------- */}
         <Property id="Switch">
            <Title level={2} color="red">
               # Switch
            </Title>
            <PropertyGroup>
               <p>checkedLabel="active" unCheckedLabel="inactive"</p>
               <Switch checkedLabel="active" unCheckedLabel="inactive" />
            </PropertyGroup>
         </Property>

         {/* ----------------------- Tag ----------------------- */}
         <Property id="Tag">
            <Title level={2} color="red">
               # Tag
            </Title>
            <PropertyGroup>
               <Tag2>employee</Tag2>
               <Tag2>previousStatus</Tag2>
            </PropertyGroup>
         </Property>

         {/* ----------------------- Tooltip ----------------------- */}
         <Property id="Tooltip">
            <Title level={2} color="red">
               # Tooltip
            </Title>
            <PropertyGroup>
               <Tooltip placement="bottomRight" title="Employee's name">
                  <Tag2>employee</Tag2>
               </Tooltip>
               <Tooltip placement="bottomRight" title="Previous status in workflow">
                  <Tag2>previousStatus</Tag2>
               </Tooltip>
            </PropertyGroup>
         </Property>

         {/* ----------------------- Input ----------------------- */}
         <Property id="Input">
            <Title level={2} color="red">
               # Input
            </Title>
            <PropertyGroup>
               <FormProvider {...form}>
                  <Input name="nolabel" />
                  <Input label="Input Default:" name="username" />
                  <Input
                     label="Input Password: (type='password')"
                     name="username"
                     type="password"
                  />
                  <Input
                     label="Input Textarea: (type='textarea')"
                     name="username"
                     type="textarea"
                  />
                  <Input
                     label="Input Icons: (icons={ReactNode}, subLabel: '')"
                     name="subLabel"
                     subLabel="Sub label"
                     icons={<DeleteIcon />}
                  />
                  <Input label="Input Copy: (type='copy')" name="copy" type="copy" />
               </FormProvider>
            </PropertyGroup>
         </Property>

         {/* ----------------------- Button ----------------------- */}
         <Property id="Button">
            <Title level={2} color="red">
               # Button
            </Title>
            <PropertyGroup>
               <Button>Default Button</Button> <br />
               <Button border="outline">border="outline"</Button> <br />
               <Button border="borderless">border="borderlesss"</Button> <br />
               <Button icon={<PlusIcon />}>(icon=ReactNode)</Button> <br />
               <Button height={40}>height=number</Button> <br />
            </PropertyGroup>
         </Property>

         {/* ----------------------- Select ----------------------- */}
         <Property id="Select">
            <Title level={2} color="red">
               # Select
            </Title>
            <PropertyGroup>
               <FormProvider {...form}>
                  <Select label="Month has popover is loading" name="month" options={[]} />
                  <Select label="Month" name="month1" options={options} defaultValue="August" />

                  <DatePicker name="datepicker" placeholder="placeholder" />

                  <Button key="submit" onClick={() => form.handleSubmit(onSubmit)()}>
                     Submit
                  </Button>

                  <Select
                     required
                     showSearch
                     name="search"
                     title="Search for user has label"
                     label="Label"
                     options={searchForUser}
                  />

                  <Select
                     required
                     showSearch
                     name="search1"
                     title="Search for user not label"
                     options={searchForUser}
                     placeholder="Enter your name..."
                  />

                  <Select
                     required
                     showSearch
                     name="search1"
                     title="not options"
                     options={[]}
                     placeholder="Enter your name..."
                  />

                  <Select
                     label="Status has label"
                     name="status"
                     mode="multiple"
                     filter
                     options={optionsTag}
                     placeholder="Find status..."
                  />

                  <Select
                     title="Status not label"
                     required
                     name="status1"
                     mode="multiple"
                     filter
                     options={optionsTag}
                     placeholder="Find status..."
                     defaultValue={["123", "345"]}
                  />

                  <Select
                     title="Status has icon"
                     required
                     label="Ok"
                     name="status2"
                     mode="multiple"
                     options={optionsTagIcon}
                     placeholder="Find status..."
                  />

                  <Select
                     title="Status has icon at popup but not display at select"
                     required
                     filter
                     label="Ok"
                     name="status3"
                     mode="multiple"
                     options={optionsTagIconNoDiplay}
                     placeholder="Find status..."
                  />
               </FormProvider>
            </PropertyGroup>
         </Property>

         {/* ----------------------- DatePicker ----------------------- */}
         <Property id="DatePicker">
            <Title level={2} color="red">
               # DatePicker
            </Title>
            <PropertyGroup>
               <DateRangePicker />
            </PropertyGroup>
         </Property>

         {/* ----------------------- Checkbox ----------------------- */}
         <Property id="Checkbox">
            <Title level={2} color="red">
               # Checkbox
            </Title>
            <PropertyGroup>
               <Checkbox />
               <Checkbox readonly />
            </PropertyGroup>
         </Property>

         {/* ----------------------- Notification ----------------------- */}
         <Property id="Notification">
            <Title level={2} color="red">
               # Notification
            </Title>
            <PropertyGroup>
               <Button
                  onClick={() =>
                     openNotification({
                        type: "error",
                        message: "Cập nhật không thành công!",
                     })
                  }
               >
                  Open Notification type(error)
               </Button>
               <br />
               <Button
                  onClick={() =>
                     openNotification({
                        type: "success",
                        message: "Cập nhật thành công!",
                     })
                  }
               >
                  Open Notification type(success)
               </Button>
               <br />
               <Button
                  onClick={() =>
                     openNotification({
                        type: "warning",
                        message: "Cập nhật thành công!",
                     })
                  }
               >
                  Open Notification type(warning)
               </Button>
            </PropertyGroup>
         </Property>

         {/* ----------------------- Avatar ----------------------- */}
         <Property id="Avatar">
            <Title level={2} color={"red"}>
               # Avatar
            </Title>
            <PropertyGroup>
               <Image
                  width="50"
                  src="data:image/png;base64,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"
               />
            </PropertyGroup>
         </Property>

         {/* ----------------------- Table ----------------------- */}
         <Property id="Table">
            <Title level={2} color={"red"}>
               # Table
            </Title>
            {/*<PropertyGroup>*/}
            {/*  <Table*/}
            {/*    dataSource={dataSource}*/}
            {/*    columns={columns}*/}
            {/*    totalElements={dataSource.length}*/}
            {/*    sizes={8}*/}
            {/*    page={1}*/}
            {/*    totalPages={Math.floor(dataSource.length / 8)}*/}
            {/*    loading={false}*/}
            {/*    setCurrentPage={() => {}}*/}
            {/*    setPageSize={function (pageSize: number): void {*/}
            {/*      throw new Error('Function not implemented.');*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</PropertyGroup>*/}
         </Property>

         {/* ----------------------- Tabs ----------------------- */}
         <Property id="Tabs">
            <Title level={2} color={"red"}>
               # Tabs
            </Title>
            <PropertyGroup>
               <Tabs contentCommon={tabsNotifiContent} />
            </PropertyGroup>
         </Property>

         {/* ----------------------- Modal ----------------------- */}
         <Property id="Modal">
            <Title level={2} color={"red"}>
               # Modal
            </Title>
            <PropertyGroup>
               <Button onClick={() => setIsOpenModal(true)}>Open Modal</Button>
            </PropertyGroup>
            <Modal visible={isOpenModal} onCancel={() => setIsOpenModal(false)}>
               Modal content
            </Modal>
         </Property>

         {/* ----------------------- Icons ----------------------- */}
         <Property id="Icons">
            <Title level={2} color={"red"}>
               # Icons
            </Title>
            <PropertyGroup>
               Click copy text <br /> <br />
               <StyledIcons>
                  {[
                     { icons: <EyePwIcon />, text: "EyePwIcon" },
                     { icons: <EyeIcon />, text: "EyeIcon" },
                     { icons: <EditIcon />, text: "EditIcon" },
                     { icons: <DeleteIcon />, text: "DeleteIcon" },
                     { icons: <CheckIcon />, text: "CheckIcon" },
                     { icons: <MinimizeIcon />, text: "MinimizeIcon" },
                     { icons: <ContentCopyIcon />, text: "ContentCopyIcon" },
                     { icons: <HumanResourceIcon />, text: "HumanResourceIcon" },
                     { icons: <KnowledgeBaseIcon />, text: "KnowledgeBaseIcon" },
                     { icons: <MyTimeIcon />, text: "MyTimeIcon" },
                     { icons: <OverviewIcon />, text: "OverviewIcon" },
                     { icons: <PlusIcon />, text: "PlusIcon" },
                     { icons: <NotificationIcon />, text: "NotificationIcon" },
                     { icons: <LanguageIcon />, text: "LanguageIcon" },
                     { icons: <NotificationOffIcon />, text: "NotificationOffIcon" },
                     { icons: <LockOpenIcon />, text: "LockOpenIcon" },
                     { icons: <GradeIcon />, text: "GradeIcon" },
                     { icons: <SettingIcon />, text: "SettingIcon" },
                     { icons: <SchoolIcon />, text: "SchoolIcon" },
                     { icons: <WorkOutlineIcon />, text: "WorkOutlineIcon" },
                     { icons: <TripOriginIcon />, text: "TripOriginIcon" },
                     { icons: <MoreHorizIcon />, text: "MoreHorizIcon" },
                     { icons: <CloseIcon />, text: "CloseIcon" },
                     { icons: <SearchIcon />, text: "SearchIcon" },
                     { icons: <ChevronRightIcon />, text: "ChevronRightIcon" },
                     { icons: <PlaceIcon />, text: "PlaceIcon" },
                     { icons: <AdminIcon />, text: "AdminIcon" },
                  ].map((item) => (
                     <AntTooltip key={item.text} title={item.text}>
                        <span onClick={() => navigator.clipboard.writeText(item.text)}>
                           {item.icons}
                        </span>
                     </AntTooltip>
                  ))}
               </StyledIcons>
            </PropertyGroup>
         </Property>
      </>
   );
   // ----------------------- End Get Components ----------------------- //

   return (
      <Container>
         <Layout hasSider>
            <Sider
               style={{
                  overflow: "auto",
                  height: "100vh",
                  position: "fixed",
                  left: 0,
                  top: 0,
                  bottom: 0,
               }}
            >
               <div className="logo">Components</div>
               <Menu theme="dark" mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
               <Header className="site-layout-background" style={{ padding: 0 }} />
               <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                  <div className="site-layout-background" style={{ padding: 24 }}>
                     <UIComponents />
                  </div>
               </Content>
               <Footer style={{ textAlign: "center" }}>Components</Footer>
            </Layout>
         </Layout>
      </Container>
   );
};

export default Common;

const Container = styled.div`
   padding-bottom: 100px;

   .ant-typography + h1.ant-typography,
   .ant-typography + h2.ant-typography,
   .ant-typography + h3.ant-typography,
   .ant-typography + h4.ant-typography,
   .ant-typography + h5.ant-typography {
      margin-top: unset;
   }

   .ant-space.ant-space-vertical {
      gap: 0 !important;
   }

   .logo {
      height: 32px;
      margin: 16px;
      background: rgba(255, 255, 255, 0.2);
      text-align: center;
      padding-top: 5px;
      color: #fff;
      text-transform: uppercase;
   }

   .site-layout .site-layout-background {
      background: #fff;
   }
`;

const Property = styled.div`
   position: relative;
   margin-bottom: 20px;
   border-bottom: 2px dotted #000;
   padding-bottom: 10px;
`;

const PropertyGroup = styled.div`
   padding-left: 20px;
   padding-right: 20px;
   padding-top: 10px;
`;

const StyledColor = styled.div<{ bg: string }>`
   background-color: ${(props) => props.bg};
   display: flex;
   justify-content: space-between;
   padding: 3px 10px;

   span {
      background-color: #fff;
      border: 1px dotted #000;
      padding-left: 5px;
      padding-right: 5px;
   }
`;

const StyledIcons = styled.div`
   display: flex;
   gap: 15px;

   span {
      cursor: pointer;
   }
`;
