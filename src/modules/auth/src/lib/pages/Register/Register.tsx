import React, { FC, ReactNode, useEffect, useState } from "react";

import {
   Button,
   Checkbox,
   Input,
   Modal,
   openNotification,
   OptionType,
   Select,
   Switch,
} from "../../../../../../libs/components";

import {
   ContainerLogin,
   GroupButton,
   StyledContentConfirm,
   StyledCreateAndEditHr,
   StyledExtendOption,
   StyledForm,
   StyledLogo,
   StyledNotFound,
} from "./styles";

import logo from "../../../../../../assets/img/logo.png";

import { AiFillCheckCircle } from "react-icons/ai";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { Col, Row, Spin } from "antd";
import { useCreateHeadHunterMutation } from "../../services";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Avatar from "react-avatar";

import { v4 as uuidv4 } from "uuid";
import { EMemberTypes } from "../../../../../../types";
import { useModal } from "../../../../../../libs/common";
import { Contact } from "../Login/styles";

const CreateAndEditHr = () => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [searchParams, setSearchParams] = useSearchParams();

   const [message, setMessage] = useState<string | undefined>(undefined);

   const [checked, setChecked] = useState<boolean>(false);

   const { isOpen, handleOpen, handleClose } = useModal();
   const form = useForm({
      mode: "all",
      defaultValues: {
         firstName: "",
         email: "",
         companyName: "",
         position: "",
         phone: "",
         isActive: true,
      },
      resolver: yupResolver(
         yup.object({
            firstName: yup.string().trim().required(t("common:form.required")),
            companyName: yup.string().trim().required(t("common:form.required")),
            email: yup.string().email(t("common:form.email")).required(t("common:form.required")),
            phone: yup.string().required(t("common:form.required")),
            position: yup.string().required(t("common:form.required")),
            isActive: yup.boolean(),
         })
      ),
   });

   const [checkedStatus, setCheckedStatus] = useState<boolean>(form.getValues("isActive"));

   const [createHeadHunter, { isLoading: loadingCreate }] = useCreateHeadHunterMutation();

   const onSubmit = (data: any) => {
      const payload = {
         companyName: data?.companyName,
         email: data.email,
         headHunterName: data.firstName,
         phone: data?.phone,
         position: data?.position,
      };
      createHeadHunter(payload)
         .unwrap()
         .then(() => {
            // openNotification({
            //    type: "success",
            //    message: t("Create head hunter successfully!!!"),
            // });
            // handleClose();
            handleOpen();
         })
         .catch((error) => {
            openNotification({
               type: "error",
               message: t("common:ERRORS.SERVER_ERROR"),
            });
         });
   };

   return (
      <ContainerLogin>
         <StyledForm>
            <span className="title">Đăng ký nhà tuyển dụng</span>

            <StyledCreateAndEditHr>
               <FormProvider {...form}>
                  <Row gutter={[15, 15]}>
                     <Col span={24}>
                        <Input
                           label={"Tên công ty"}
                           name="companyName"
                           required
                           placeholder={t("Nhập tên công ty...")}
                        />
                     </Col>
                     <Col span={12}>
                        <Input
                           required
                           label={"Họ và tên người đại diện"}
                           name="firstName"
                           placeholder={"Nhập họ và tên người đại diện"}
                        />
                     </Col>
                     <Col span={12}>
                        <Input
                           required
                           label="Chức vụ"
                           name="position"
                           placeholder={"Nhập chức vụ"}
                        />
                     </Col>
                     <Col span={12}>
                        <Input
                           label={t("Số điện thoại")}
                           name="phone"
                           required
                           placeholder={t("Nhập số điện thoại")}
                        />
                     </Col>
                     <Col span={12}>
                        <Input
                           label={"Email"}
                           name="email"
                           required
                           placeholder={t("abc@gmail.com")}
                           message={message}
                        />
                     </Col>

                     <Col span={24}>
                        <span className="label">Thỏa thuận người dùng</span>
                        <p className="legacy">
                           <span className="title">THOẢ THUẬN NGƯỜI DÙNG</span>
                           Trước khi sử dụng trang web CareerHub bạn cần đọc kỹ và cẩn thận nội dung
                           thỏa thuận sử dụng của CareerHub. Khi bạn truy cập và sử dụng trang web
                           CareerHub xem như bạn đã chấp nhận thỏa thuận sử dụng. CareerHub được
                           phép hiệu chỉnh các Điều Khoản Thỏa Thuận và có hiệu lực ngay sau khi cập
                           nhật lại trang này. Vì vậy bạn nên truy cập định kỳ vào trang này để cập
                           nhật những Điều Khoản mới của CareerHub. Những thuật ngữ Bạn và Người sử
                           dụng được dùng ở đây đề cập đến tất cả những cá nhân hoặc những tổ chức
                           truy vập vào trang web này với bất kỳ lý do nào.
                           <span className="title">Hợp đồng nguyên tắc</span>1. Nhà Tuyển Dụng sẽ tự
                           tạo một tài khoản với mật khẩu để sử dụng dịch vụ trên trang web
                           CareerHub. Nhà Tuyển Dụng chịu trách nhiệm bảo mật mật khẩu và chỉ sử
                           dụng tài khoản (tên đăng nhập và mật khẩu) của mình cho mục đích tuyển
                           dụng của chính mình. Trong trường hợp Nhà Tuyển Dụng bị mất hoặc quên mật
                           khẩu thì thông báo ngay cho CareerHub để được hỗ trợ kịp thời.
                           <br /> 2. Sau khi Nhà Tuyển Dụng ký kết Hợp Đồng và/hoặc CareerHub đã
                           kích hoạt dịch vụ theo Đơn hàng hoặc Hợp đồng đã ký kết thì Nhà Tuyển
                           Dụng không được thay đổi, đồng thời Nhà Tuyển Dụng phải hoàn toàn chịu
                           trách nhiệm về việc sử dụng dịch vụ của mình.
                           <br /> 3. Nhà Tuyển Dụng sẽ được đăng tải nội dung thông tin đăng tuyển
                           của mình và/hoặc giới thiệu địa chỉ website của mình tại CareerHub. Nhà
                           Tuyển Dụng sẽ hoàn toàn chịu trách nhiệm về tính chính xác và hợp pháp
                           của các nội dung thông tin quảng cáo tuyển dụng của mình đăng tải tại
                           CareerHub hoặc các các nội dung liên quan đến tuyển dụng tại trang web
                           được giới thiệu.
                           <br /> 4. Nhà Tuyển Dụng chỉ được sử dụng khai thác thông tin từ dịch vụ
                           theo Đơn hàng/Hợp đồng đã ký cho mục đích tuyển dụng của mình. Nhà Tuyển
                           Dụng không được tiết lộ, bán các thông tin về ứng viên mà mình thu thập
                           được từ việc sử dụng dịch vụ cho bất kỳ một bên thứ ba nào khác dưới mọi
                           hình thức mà không được sự đồng ý trước bằng văn bản của CareerHub.
                           <br /> 5. Các dịch vụ trong Đơn hàng/Hợp đồng đã ký chỉ được áp dụng cho
                           doanh nghiệp đứng tên trên Đơn hàng/Hợp đồng (không bao gồm các công ty
                           thành viên/công ty liên kết) và nội dung tuyển dụng đúng với lĩnh vực đã
                           đăng ký trong giấy phép kinh doanh của doanh nghiệp.
                           <br /> 6. Trường hợp Nhà Tuyển Dụng vi phạm các quy định trên tại điều
                           này thì CareerHub có quyền gỡ bỏ mọi thông tin hoặc đường dẫn của Nhà
                           Tuyển Dụng và chấm dứt Đơn hàng/Hợp đồng mà không phải trả lại số tiền
                           dịch vụ mà Nhà Tuyển Dụng đã thanh toán nhưng chưa sử dụng hết, đồng thời
                           thông báo việc vi phạm với cơ quan nhà nước có thẩm quyền và buộc Nhà
                           Tuyển Dụng bồi thường thiệt hại phát sinh từ vi phạm của Nhà Tuyển Dụng.
                           <br /> 7. Trường hợp CareerHub nhận thấy Nhà Tuyển Dụng có dấu hiệu vi
                           phạm các quy định trên tại điều này thì CareerHub có quyền tạm thời gỡ bỏ
                           mọi thông tin hoặc đường dẫn của Nhà Tuyển Dụng và gởi thông báo cho Nhà
                           Tuyển Dụng; nếu CareerHub quyết định đơn phương chấm dứt Đơn hàng/Hợp
                           đồng sẽ hoàn trả số tiền dịch vụ mà Nhà Tuyển Dụng đã thanh toán nhưng
                           chưa sử dụng hết.
                           <br /> 8. Thông qua việc ký kết hợp đồng / đơn hàng / biên bản thỏa thuận
                           hợp tác, Nhà tuyển dụng đồng ý cho phép CareerHub sử dụng logo và thương
                           hiệu cho mục đích quảng bá thương hiệu của nhà tuyển dụng đến với ứng
                           viên và người dùng thông qua các chương trình quảng cáo và khảo sát của
                           CareerHub.
                           <br /> 9. Việc sử dụng các tính năng cung cấp trong giải pháp Talent
                           Solution hoặc theo các chương trình trải nghiệm tính năng mới của
                           CareerHub tùy thuộc vào nhu cầu thực tế và quyết định của khách hàng,
                           không mang tính bắt buộc.
                           <br /> 10. Mỗi vị trí/chức danh chỉ được đăng 01 tin và chỉ đăng lại sau
                           30 ngày đăng tuyển khi tin tuyển dụng cũ đã hết hạn. Trong trường hợp Nhà
                           tuyển dụng cần đăng tin tuyển dụng mới cần cho ngừng đăng tin tuyển dụng
                           cũ có nội dung tương tự. CareerHub sẽ kiểm tra và tiến hành ngừng đăng
                           tuyển các vị trí có cùng nội dung mà không báo trước cho Nhà tuyển dụng.
                           <br /> 11. Tất cả các thông tin nhà tuyển dụng đăng tải trên CareerHub và
                           các website liên quan không được phép đề cập/ nói xấu đối thủ cạnh tranh.
                           CareerHub có quyền từ chối đăng hoặc gỡ bỏ các nội dung có liên quan đến
                           vấn đề này.
                           <br /> 12. Được quyền từ chối đăng tuyển hoặc gỡ bỏ thông tin trên
                           CareerHub và hệ thống website đối tác của bên A đối với những việc làm
                           không phù hợp với Pháp luật và luật Lao Động Việt Nam, có nội dung vi
                           phạm thuần phong mỹ tục, phản động, liên quan đến chính trị, không phù
                           hợp với các quy định đăng tuyển, hay nhận được khiếu nại chính đáng của
                           người tìm việc của Bên A.{" "}
                           <span className="title">Qui định đăng quảng cáo tuyển dụng</span> 1. Về
                           tiêu đề công việc/chức danh công việc/mô tả công việc/yêu cầu đăng tuyển:
                           - Không được thay đổi sau khi vị trí đăng tuyển đã được đăng tuyển trên
                           CareerHub. - Mỗi vị trí đăng tuyển chỉ được sử dụng duy nhất 01 (một)
                           tiêu đề đăng tuyển cùng 01 (một) mô tả công việc và yêu cầu công việc
                           tương ứng. - Phải viết hoa chữ cái đầu tiên (ví dụ: Sales Manager, Trưởng
                           Phòng Kinh Doanh…). Đối với các cụm viết tắt, tất cả các chữ cái đều phải
                           được viết hoa (ví dụ: ĐHKK, ERP, CAD, .NET, PCCC…) - Hạn chế sử dụng cùng
                           lúc title tiếng Anh và tiếng Việt. (Kế toán quản trị - Management
                           Accountant, Nhân viên thu mua – Purchasing Staff…) - Không để tiếng Anh
                           và tiếng Việt lẫn lộn sẽ khó cho ứng viên trong quá trình tìm kiếm (Nhân
                           viên Technical máy tính) trừ những trường hợp sau: + Không có từ tiếng
                           Việt thay thế (Nhân viên ERP, chuyên viên ISO, Lập trình viên .NET…), +
                           Cụm tiếng Anh phổ biến (Nhân viên QC, Kỹ sư M&E…) - Các cụm từ như
                           “Tuyển”, “làm việc tại”, “phòng…”; các thông tin như số lượng tuyển, địa
                           điểm làm việc, sản phẩm, đối tượng làm việc, phòng ban, lương, ngôn ngữ,
                           giới tính… cần được xóa khỏi job title và chỉ thể hiện trong mô tả công
                           việc.
                           <br /> 2. Về nội dung công việc: - Job cần có nội dung/thông tin chi
                           tiết, đầy đủ về vị trí cần tuyển dụng: Mô tả công việc, yêu cầu công
                           việc, lợi ích, thông tin khác. - Các yêu cầu được viết tách biệt, không
                           được viết thành đoạn; loại bỏ các cụm như “Chi tiết công việc trao đổi
                           khi phỏng vấn”; “Thông tin chi tiết trong buổi phỏng vấn”…; các đường
                           link. - Không để thông tin liên hệ như số điện thoại, email trong mô tả
                           công việc.
                           <br /> 3. Sản phẩm, hàng hóa, dịch vụ cấm quảng cáo: • Hàng hóa, dịch vụ
                           cấm kinh doanh theo quy định của pháp luật. • Thuốc lá. • Rượu có nồng độ
                           cồn từ 15 độ trở lên. • Sản phẩm sữa thay thế sữa mẹ dùng cho trẻ dưới 24
                           tháng tuổi, sản phẩm dinh dưỡng bổ sung dùng cho trẻ dưới 06 tháng tuổi;
                           bình bú và vú ngậm nhân tạo. • Thuốc kê đơn; thuốc không kê đơn nhưng
                           được cơ quan nhà nước có thẩm quyền khuyến cáo hạn chế sử dụng hoặc sử
                           dụng có sự giám sát của thầy thuốc. • Các loại sản phẩm, hàng hóa có tính
                           chất kích dục. • Súng săn và đạn súng săn, vũ khí thể thao và các loại
                           sản phẩm, hàng hóa có tính chất kích động bạo lực. • Các sản phẩm, hàng
                           hóa, dịch vụ cấm quảng cáo khác do Chính phủ quy định khi có phát sinh
                           trên thực tế. CHÍNH SÁCH BẢO MẬT THÔNG TIN NGƯỜI DÙNG Sự riêng tư của bạn
                           là yếu tố quan trọng đối với CareerHub. Vui lòng đọc kỹ Chính Sách Bảo
                           Mật vì nó là một phần của Điều Khoản Sử Dụng nhằm quản lý việc sử dụng
                           các Dịch vụ trên trang web CareerHub. Thông Báo Chính Sách này giải
                           thích: Loại thông tin cá nhân của bạn được careerhub xử lý khi bạn sử
                           dụng các Dịch vụ của ca. Cách thức CareerHub xử lý thông tin cá nhân của
                           bạn khi bạn sử dụng các Dịch vụ của CareerHub. Mục đích CareerHub thu
                           thập và xử lý thông tin cá nhân của bạn. Quyền truy cập và chỉnh sửa
                           thông tin cá nhân của bạn. Các bên thứ ba mà CareerHub có thể công bố
                           thông tin cá nhân của bạn. Tính bắt buộc hoặc tự nguyện đối với việc cung
                           cấp thông tin cá nhân và hậu quả khi bạn từ chối cung cấp thông tin cá
                           nhân trong trường hợp bắt buộc. Cách thức CareerHub giữ gìn sự bảo mật và
                           an ninh về thông tin cá nhân của bạn. Những thay đổi này sẽ áp dụng cho
                           việc sử dụng các Dịch vụ của CareerHub sau khi CareerHub đã gửi thông báo
                           cho bạn. Nếu bạn không muốn chấp nhận các Điều khoản mới, bạn không nên
                           tiếp tục sử dụng các Dịch vụ của CareerHub.{" "}
                           <span className="title">
                              Nếu bạn tiếp tục sử dụng Dịch vụ của CareerHub sau khi các thay đổi có
                              hiệu lực, bạn đã thể hiện sự đồng ý đối với các ràng buộc tại các Điều
                              khoản mới.
                           </span>{" "}
                           1. THU THẬP THÔNG TIN CÁ NHÂN Khi đăng ký Dịch vụ của CareerHub Khi đăng
                           ký bất cứ Dịch vụ của CareerHub, bạn sẽ được yêu cầu cung cấp một số
                           thông tin cá nhân nhất định để thiết lập tài khoản của bạn, để xác thực
                           danh tính theo quy định của pháp luật hiện hành. Bất cứ thông tin cá nhân
                           nào do CareerHub yêu cầu được đánh dấu “Bắt buộc”, bạn phải cung cấp và
                           đồng ý để CareerHub xử lý thông tin này. Nếu bạn không đồng ý cung cấp
                           thông tin cá nhân này và/hoặc không đồng ý để chúng tôi xử lý thông tin
                           theo quy định tại Thông Báo Chính Sách này, CareerHub sẽ không thể cung
                           cấp các dịch vụ liên quan và việc đăng ký dịch vụ của bạn sẽ bị từ chối.
                           Từ việc sử dụng các Dịch vụ của CareerHub của bạn Chúng tôi thu thập
                           thông tin cá nhân trực tiếp từ bạn khi bạn chọn lựa tham gia vào bất kỳ
                           Dịch vụ nào của CareerHub. Dưới đây là các ví dụ về thông tin cá nhân mà
                           CareerHub có thể thu thập trực tiếp từ bạn: tuổi, ngày sinh, điện thoại
                           cố định hoặc số điện thoại di động, hình ảnh cá nhân, học vấn, sở thích
                           cá nhân, kinh nghiệm làm việc, các thông tin khác liên quan đến Hồ sơ
                           việc làm (CV) của bạn: + Nếu bạn lựa chọn để thêm người giới thiệu trong
                           hồ sơ, CareerHub sẽ yêu cầu tên, số điện thoại, email, vị trí công việc
                           và các thông tin cụ thể khác của những người này. Thông tin này sẽ được
                           đính kèm trong hồ sơ xin việc của bạn và nhà tuyển dụng có thể liên lạc
                           họ để lấy thông tin tham khảo cho hồ sơ xin việc của bạn. + Nếu bạn muốn
                           CareerHub ngưng xử lý thông tin cá nhân của bạn, CareerHub sẽ không thể
                           cung cấp các dịch vụ liên quan cho bạn. Khi bạn truy cập các Dịch vụ của
                           CareerHub Khi bạn truy cập bất cứ trang web nào thuộc hệ thống CareerHub,
                           máy chủ trang web của chúng tôi sẽ tự động thu thập thông tin truy cập
                           của bạn tại các trang web này, bao gồm địa chỉ IP, thời gian, ngày và
                           thời lượng truy cập. Địa chỉ IP của bạn là thiết bị định dạng duy nhất
                           cho máy tính của bạn hoặc các thiệt bị truy cập khác. CareerHub có thể
                           theo dõi quá trình truy cập của bạn tại bất cứ trang web nào thuộc hệ
                           thống CareerHub, bằng cách cài đặt một “cookie” trong máy tính của bạn
                           hoặc các thiết bị truy cập khác khi bạn đăng nhập. Cookies là các tập tin
                           văn bản nhỏ được đặt trên máy tính của bạn hoặc thiết bị truy cập khác
                           bởi các trang web mà bạn truy cập. Chúng được sử dụng rộng rãi để làm cho
                           trang web hoạt động, hoặc hoạt động hiệu quả hơn, cũng như cung cấp thông
                           tin cho chủ sở hữu của các trang web. Cookies cho phép CareerHub lưu lại
                           các trạng thái dữ liệu của bạn để bạn sẽ không phải đăng nhập lại trong
                           lần truy cập sau. Cookies cũng giúp CareerHub thu thập luồng dữ liệu truy
                           cập ẩn danh để theo dõi xu hướng và mẫu người dùng. CareerHub có thể sử
                           dụng luồng dữ liệu truy cập ẩn danh để giúp các nhà quảng cáo cung cấp
                           quảng cáo nhắm tới mục tiêu tốt hơn. Bạn có thể gỡ bỏ Cookies bằng cách
                           làm theo các hướng dẫn được cung cấp trong tập tin “giúp đỡ” trình duyệt
                           Internet của bạn. Bạn nên hiểu rằng một số nội dung của một số trang web
                           nhất định sẽ không hiển thị nếu bạn cài đặt trình duyệt Internet của bạn
                           không chấp nhập cookies. CareerHub cũng sử dụng các mã ghi rõ ràng trong
                           email định dạng HTML để xác định các email nào đã được mở bởi người nhận.
                           Điều này cho phép CareerHub đánh giá tính hiệu quả của các phương tiện
                           truyền thông nhất định và hiệu quả của các chiến lược tiếp thị của công
                           ty. 2. MỤC ĐÍCH THU THẬP VÀ SỬ DỤNG THÔNG TIN CÁ NHÂN Mục đích CareerHub
                           xử lý thông tin cá nhân của bạn như sau: Xác định danh tính của bạn. Đánh
                           giá và/hoặc xác định khả năng làm việc và mức độ tín nhiệm của bạn. Cung
                           cấp một trong các Dịch vụ của CareerHub mà bạn đã yêu cầu. Điều hành và
                           quản lý các Dịch vụ của CareerHub đã cung cấp cho bạn. Liên lạc với bạn
                           các vấn đề liên quan đến việc sử dụng Dịch vụ của CareerHub. Cải thiện
                           các cơ hội thay đổi công việc của bạn hoặc sắp xếp các dịch vụ cụ thể cho
                           bạn. Xác minh trình độ học vấn và nghề nghiệp của bạn bằng việc liên lạc
                           trường học/cao đẳng/đại học/viện nghiên cứu/các cơ quan chuyên môn. Xử lý
                           đơn yêu cầu trong quá trình sử dụng Dịch vụ của CareerHub mà bạn đã yêu
                           cầu. Điều tra và giải quyết các khiếu nại hoặc thắc mắc khác mà bạn gửi
                           đến CareerHub liên quan đến các Dịch vụ của CareerHub. Giám sát và cải
                           thiện việc thực hiện các Dịch vụ của CareerHub. Duy trì và phát triển các
                           Dịch vụ của CareerHub. Am hiểu về các nhu cầu thông tin và liên lạc của
                           bạn để CareerHub nâng cao và điều chỉnh các Dịch vụ của CareerHub. Tiến
                           hành nghiên cứu và phát triển và phân tích thống kê liên quan đến các
                           Dịch vụ của CareerHub để xác định xu hướng và phát triển các dịch vụ mới
                           đáp ứng ứng sự quan tâm của bạn. Hỗ trợ CareerHub am hiểu các lựa chọn
                           duyệt thông tin ưu tiên của bạn để CareerHub có thể điều chỉnh nội dung
                           phù hợp. Phát hiện và ngăn chặn hoạt động gian lận, lừa đảo, vi phạm pháp
                           luật. Bạn không thể hạn chế việc xử lý thông tin cá nhân của bạn cho các
                           mục đích quy định tại Khoản 2.1 nêu trên. Nếu bạn không đồng ý để
                           CareerHub xử lý thông tin cá nhân của bạn cho các mục đích trên, bạn phải
                           chấm dứt thỏa thuận liên quan của bạn với CareerHub cho các Dịch vụ của
                           CareerHub và ngừng sử dụng các Dịch vụ do CareerHub cung cấp. CareerHub
                           sẽ yêu cầu sự đồng ý của bạn trước khi xử lý thông tin cá nhân ngoài các
                           mục quy định tại Khoản 2.1. Ngoài ra, CareerHub có thể sử dụng thông tin
                           cá nhân của bạn cho các mục đích sau: Thúc đẩy và giới thiệu đến bạn: -
                           Các Dịch vụ khác của CareerHub như: Giới thiệu việc làm, Giới thiệu khóa
                           học, sự kiện, tin tức, Kết nối nhà tuyển dụng,… - Các dịch vụ của các bên
                           thứ ba mà CareerHub thấy phù hợp với sự quan tâm của bạn. Gửi đến bạn các
                           tin nhắn chúc mừng và/hoặc tin nhắn thông báo lỗi trên các trang Web
                           CareerHub và/hoặc các thông tin Dịch vụ của CareerHub. Gửi đến bạn các
                           hướng dẫn, lời khuyên và thông tin khảo sát để tối đa hóa sự phát triển
                           nghề nghiệp của bạn bao gồm nhưng không giới hạn đối với việc sử dụng các
                           Dịch vụ của CareerHub. 3. QUYỀN CỦA BẠN ĐỐI VỚI CƠ SỞ DỮ LIỆU CareerHub
                           trao cho bạn sự chọn lựa để CV của mình trong Cơ Sở Dữ Liệu Hồ Sơ
                           CareerHub. Có hai cách để thực hiện: Bạn có thể lưu trữ hồ sơ của bạn
                           trong Cơ Sở Dữ Liệu Hồ Sơ CareerHub, nhưng không cho phép hồ sơ này được
                           tìm kiếm bởi Nhà tuyển dụng hoặc các Đơn vị quảng cáo hoặc các Chủ sở hữu
                           tài khoản CareerHub Partner. Không cho phép hồ sơ của bạn được tìm kiếm
                           có nghĩa là bạn có thể sử dụng nó để nộp đơn xin việc trực tuyến, nhưng
                           Nhà tuyển dụng hoặc các Đơn vị quảng cáo hoặc các Chủ sở hữu tài khoản
                           CareerHub Partner sẽ không có quyền truy cập để tìm kiếm thông qua cơ sở
                           dữ liệu Cơ Sở Dữ Liệu Hồ Sơ CareerHub. Bạn có thể cho phép hồ sơ của bạn
                           được tìm kiếm bởi những Nhà tuyển dụng hoặc các Đơn vị quảng cáo hoặc các
                           Chủ sở hữu tài khoản CareerHub Partner . Khi bạn lựa chọn để hồ sơ của
                           mình được tìm kiếm, toàn bộ thông tin lý lịch và thông tin cá nhân của
                           bạn sẽ hiển thị đối với các Nhà tuyển dụng hoặc các Đơn vị quảng cáo hoặc
                           các Chủ sở hữu tài khoản CareerHub Partner khi họ tải xuống qua Cơ Sở Dữ
                           Liệu Hồ Sơ CareerHub. CareerHub nỗ lực hạn chế quyền truy cập vào Cơ Sở
                           Dữ Liệu Hồ Sơ CareerHub mà chỉ dành cho những người đã đăng ký với các
                           Dịch vụ của CareerHub, những người này có thể giữ lại một bản sao của hồ
                           sơ của bạn trong các tập tin hoặc cơ sở dữ liệu riêng của họ. CareerHub
                           sẽ thực hiện các bước hợp lý để các bên chưa được đề cập ở trên sẽ không
                           đạt được quyền truy cập vào Cơ Sở Dữ Liệu Hồ Sơ CareerHub, khi chưa có sự
                           đồng ý của CareerHub. Tuy nhiên, CareerHub không chịu trách nhiệm đối với
                           việc lưu giữ, sử dụng hoặc tính bảo mật của hồ sơ của bất kỳ bên thứ ba
                           nào. Mặc dù quy định tại Khoản 3.1, CareerHub có quyền truy cập đầy đủ
                           đến hồ sơ của bạn cho mục đích quy định tại Khoản 2.1 để thực hiện các
                           Dịch vụ CareerHub. 4 .LỰA CHỌN VÀ TRUY CẬP THÔNG TIN CÁ NHÂN Bạn có thể
                           có những quan tâm về quyền bảo mật khác nhau. Mục tiêu của CareerHub là
                           làm rõ các thông tin mà chúng tôi thu thập, để bạn có thể có các lựa chọn
                           ý nghĩa về cách sử dụng. Ví dụ: - Bạn có thể kiểm soát người mà bạn muốn
                           chia sẻ thông tin cá nhân. - Bạn có thể xem lại và kiểm soát việc đăng ký
                           của bạn đối với các lựa chọn tiếp thị khác nhau, các Dịch vụ CareerHub.
                           Bạn có thể xem, chỉnh sửa hoặc xóa thông tin cá nhân và các mục ưa thích
                           bất cứ lúc nào. - Bạn có thể lựa chọn không tiếp nhận bất cứ tài liệu
                           tiếp thị nào từ CareerHub. - Bạn cũng có thể đăng ký các Dịch vụ
                           CareerHub bổ sung bằng cách đăng nhập vào tài khoản của bạn trên trang
                           chủ của chúng tôi. Bạn có thể xóa tài khoản của mình bất cứ lúc nào và
                           khi đó CareerHub sẽ hủy tất cả quyền truy cập đến tài khoản và hồ sơ
                           trong cơ sở dữ liệu. Việc xóa tài khoản của bạn sẽ không ảnh hưởng đến
                           những hồ sơ mà bạn đã gửi đến các Nhà tuyển dụng hoặc được lưu xuống bởi
                           các Nhà tuyển dụng, Chủ sở hữu tài khoản (muốn có CV). 5. LƯU TRỮ THÔNG
                           TIN CÁ NHÂN CareerHub sẽ lưu trữ thông tin cá nhân của bạn trong khoảng
                           thời gian cần thiết để đáp ứng các mục đích quy định tại Khoản 2 bên trên
                           và cho bất cứ mục đích pháp lý hoặc kinh doanh nào. Sau khi chấm dứt hoặc
                           vô hiệu hóa tài khoản của bạn, CareerHub, Chi nhánh hoặc Nhà cung cấp
                           dịch vụ của CareerHub có thể giữ lại thông tin (bao gồm thông tin trang
                           cá nhân của bạn) và Nội dung của người dùng trong khoảng thời gian hợp lý
                           về mặt thương mại cho các mục đích sao lưu, lưu trữ và/hoặc kiểm tra theo
                           quy định của pháp luật Việt Nam. 6. BẢO MẬT THÔNG TIN CÁ NHÂN CareerHub
                           cam kết bảo mật thông tin cá nhân của bạn. CareerHub có quy trình kỹ
                           thuật, hành chính và vật chất thích hợp để chống mất mát, trộm cắp và lạm
                           dụng, cũng như chống lại việc truy cập trái phép, tiết lộ, thay đổi và
                           tiêu hủy thông tin. Thông tin nhạy cảm (như là số thẻ ngân hàng, thẻ tín
                           dụng) được nhập vào các dịch vụ cổng thanh toán của chúng tôi hoặc đối
                           tác thanh toán sẽ được mã hóa trong quá trình truyền tải thông tin bằng
                           cách sử dụng công nghệ SSL. Tuy nhiên, không có phương pháp truyền tải
                           qua Internet hoặc phương pháp lưu trữ điện tử nào là an toàn 100%. Do đó,
                           chúng tôi không thể đảm bảo bảo mật tuyệt đối. Nếu bạn có bất kỳ câu hỏi
                           nào về việc bảo mật trên CareerHub, bạn có thể liên hệ với chúng tôi qua
                           email hotro@CareerHub.vn. 7. NHỮNG BÊN THỨ BA ĐƯỢC SỬ DỤNG THÔNG TIN
                           Thông tin cá nhân đề cập ở Khoản 1 trên đây có thể được công bố/sử dụng
                           bởi các bên thứ ba sau đây nhằm kết nối các Dịch vụ của CareerHub và bạn
                           đến các cơ hội phù hợp: Các Nhà tuyển dụng / Doanh nghiệp đang có nhu cầu
                           tuyển dụng nhân sự Các bên thứ ba ký hợp đồng với CareerHub để hỗ trợ
                           CareerHub thực hiện tất cả hoặc một phần các Dịch vụ CareerHub cho bạn,
                           bao gồm nhưng không giới hạn, các dịch vụ sau: - Dịch vụ hồ sơ/đánh giá.-
                           Dịch vụ nghiên cứu thị trường và phân tích sử dụng trang web. - Cung cấp
                           các thông tin, khóa học, sự kiện phù hợp Các đối tác chiến lược làm việc
                           với CareerHub để cung cấp một trong các Dịch vụ của CareerHub hoặc để hỗ
                           trợ tiếp thị và giới thiệu tới người dùng CareerHub. Trường học/cao
                           đẳng/đại học/viện nghiên cứu mà bạn đã theo học hoặc người giới thiệu để
                           xác minh trình độ học vấn của bạn. Các cơ quan chuyên môn nơi bạn được
                           công nhận trình độ chuyên môn. Các tư vấn chuyên nghiệp của CareerHub khi
                           có nhu cầu tìm hiểu cơ bản với mục đích tư vấn cho CareerHub. Bất cứ bên
                           thứ ba nào sở hữu một phần hoặc tất cả tài sản hoặc việc kinh doanh của
                           CareerHub (bao gồm các khách hàng và các khoản phải thu thương mại) nhằm
                           mục đích hỗ trợ bên thứ ba tiếp tục cung cấp một phần hoặc toàn bộ các
                           Dịch vụ CareerHub mà họ sở hữu. Các trường hợp khác được cho phép theo
                           quy định pháp luật về bảo mật dữ liệu. Ngoài những trường hợp ở trên, bạn
                           sẽ được thông báo khi thông tin cá nhân của bạn có thể đi đến các bên thứ
                           ba, và bạn sẽ có cơ hội lựa chọn không chia sẻ thông tin này. CareerHub
                           không cho phép bất kỳ bên thứ ba nào được phép chia sẻ lại thông tin đã
                           được cung cấp cho một bên khác hoặc sử dụng không đúng mục đích đã được
                           ký kết trong hợp đồng với CareerHub. 8. NGHĨA VỤ CỦA BẠN ĐỐI VỚI THÔNG
                           TIN CÁ NHÂN CỦA MÌNH Bạn có trách nhiệm cung cấp cho CareerHub các thông
                           tin của bạn và cá nhân của người nào mà bạn cung cấp cho chúng tôi một
                           cách chính xác, không gây nhầm lẫn, đầy đủ và gần nhất, và có trách nhiệm
                           cập nhật thông tin cá nhân này khi có sự sai lệch, nhầm lẫn, không đầy đủ
                           và lỗi thời bằng cách liên lạc với CareerHub qua email
                           hotro@CareerHub.vn. Trong trường hợp bạn có nhu cầu cung cấp thông tin cá
                           nhân của một người nào đó cho CareerHub mà không phải là thông tin của
                           bạn (ví dụ, người giới thiệu hoặc người bảo lãnh). Trong trường hợp này,
                           bạn nên thông báo những người này về việc cung cấp thông tin cá nhân của
                           họ cho CareerHub, nhằm đảm bảo sự đồng ý của họ cho việc cung cấp thông
                           tin và để họ biết địa chỉ để tìm Thông Báo Chính Sách này (tại mục Chính
                           Sách Bảo Mật trên trang web của chúng tôi). 9. CHUYỂN THÔNG TIN CÁ NHÂN
                           NGOÀI PHẠM VI ĐỊA PHƯƠNG CỦA BẠN CareerHub có thể cần chuyển thông tin cá
                           nhân của bạn ra ngoài phạm vi địa phương của bạn nếu có bất kỳ nhà cung
                           cấp dịch vụ hoặc các đối tác chiến lược (“các công ty nước ngoài”) tham
                           gia cung cấp một phần của một trong các Dịch vụ của CareerHub. 10. CÁC
                           TRANG LIÊN KẾT Các trang web thuộc CareerHub có thể chứa các liên kết đến
                           các trang của bên thứ ba. CareerHub không chịu trách nhiệm đối với các
                           trang web của các bên thứ ba này. Bất cứ thông tin cá nhân nào của bạn
                           sẵn có trên các trang đó sẽ không được hưởng lợi từ Chính Sách Bảo Mật
                           này và sẽ phụ thuộc vào chính sách bảo mật của bên thứ ba liên quan (nếu
                           có). Chúng tôi không chịu trách nhiệm đối với những thực tiễn được triển
                           khai bởi bất kỳ trang web hoặc dịch vụ nào được liên kết đến hoặc từ Dịch
                           vụ của chúng tôi, bao gồm thông tin hoặc nội dung có trong đó. Xin lưu ý
                           rằng khi bạn sử dụng liên kết để đi từ Dịch vụ của chúng tôi đến trang
                           web hoặc dịch vụ khác, Chính sách bảo mật của chúng tôi không áp dụng đối
                           với những trang web hoặc dịch vụ bên thứ ba đó. Quá trình duyệt web và
                           tương tác của bạn trên bất kỳ trang web hoặc dịch vụ của bên thứ ba nào,
                           bao gồm trang web hoặc dịch vụ có liên kết trên trang web của chúng tôi,
                           phải tuân theo các quy định và chính sách của riêng bên thứ ba đó. Ngoài
                           ra, bạn đồng ý rằng chúng tôi không có trách nhiệm và không có quyền kiểm
                           soát đối với bất kỳ bên thứ ba nào mà bạn cho phép truy cập vào Nội dung
                           của người dùng của mình. Nếu bạn đang sử dụng trang web hoặc dịch vụ bên
                           thứ ba và bạn cho phép trang web hoặc dịch vụ đó truy cập vào Nội dung
                           của người dùng của mình, bạn phải tự chịu rủi ro khi thực hiện việc đó.
                           Bạn có thể truy cập vào trang của chúng tôi bằng cách sử dụng dịch vụ
                           đăng nhập như là Facebook Connect. Dịch vụ này sẽ xác thực danh tính của
                           bạn và cung cấp cho bạn các tùy chọn để chia sẻ thông tin cá nhân nhất
                           định với chúng tôi như tên và địa chỉ email để nhập trước vào mẫu đăng ký
                           của chúng tôi. Các dịch vụ như Facebook Connect cung cấp cho bạn các tùy
                           chọn để đăng thông tin về các hoạt động của bạn trên trang web này trên
                           trang hồ sơ cá nhân của bạn để chia sẻ với những người khác trong mạng
                           lưới của bạn. Trang web của chúng tôi bao gồm các Tính năng Truyền thông
                           Xã hội, chẳng hạn như các widget và nút like/share/comment Facebook, hoặc
                           các chương trình tương tác mini chạy trên trang web của chúng tôi. Những
                           tính năng này có thể thu thập địa chỉ IP của bạn, trang mà bạn đang truy
                           cập trên trang web của chúng tôi, và có thể cài đặt cookies để kích hoạt
                           các Tính năng hoạt động tốt. Các Tính năng Truyền thông Xã hội và các
                           widget được cung cấp bởi bên thứ ba hoặc cung cấp trực tiếp trên trang
                           web của chúng tôi. Sự tương tác của bạn với những Tính năng này được quản
                           lý bởi chính sách bảo mật của bên cung cấp. 11. SỰ ĐỒNG Ý CỦA BẠN Khi sử
                           dụng các Dịch vụ của CareerHub, bạn đồng ý với việc thu thập và sử dụng
                           thông tin cá nhân của CareerHub như được mô tả ở phần trên (có thể thay
                           đổi theo thời gian) trừ khi và cho đến khi bạn thông báo điều ngược lại
                           với CareerHub qua email hotro@CareerHub.vn. Bên cạnh đó, bạn đồng ý với
                           việc người giới thiệu, các trường học/cao đẳng/đại học/ học viện mà bạn
                           đã theo học, các cơ quan chuyên môn nơi bạn được công nhận trình độ
                           chuyên môn và các Nhà tuyển dụng công bố thông tin các nhân của bạn với
                           CareerHub. 12. QUYỀN RIÊNG TƯ CỦA TRẺ EM CareerHub không chủ định thu
                           thập hoặc yêu cầu bất kỳ thông tin nào từ bất kỳ ai dưới 13 tuổi hoặc
                           không chủ ý cho phép những người đó đăng ký Dịch vụ. Dịch vụ và nội dung
                           của Dịch vụ không nhắm tới trẻ em dưới 13 tuổi. Trong trường hợp chúng
                           tôi biết rằng mình đã thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi
                           mà không có sự chấp thuận của cha mẹ, chúng tôi sẽ xóa thông tin đó nhanh
                           nhất có thể. Nếu bạn cho rằng chúng tôi có thể có thông tin từ hoặc về
                           trẻ dưới 13 tuổi, vui lòng liên hệ với chúng tôi. THÔNG TIN LIÊN LẠC Nếu
                           bạn có câu hỏi về Thông Báo Chính Sách này, vui lòng gửi email tới địa
                           chỉ hotro@CareerHub.vn để được giải đáp nhanh nhất. QUY TRÌNH GIẢI QUYẾT
                           TRANH CHẤP Khi phát sinh tranh chấp, CareerHub đề cao giải pháp thương
                           lượng, hòa giải giữa các bên nhằm duy trì sự tin cậy của thành viên vào
                           chất lượng dịch vụ của Công ty và thực hiện theo các bước sau: + Bước 1:
                           Thành viên phản ánh về dịch vụ website cung cấp, trả thông tin đăng tải
                           về việc làm không chính xác... qua email. Nếu thành viên là Sinh viên
                           trường gửi email về địa chỉ: ero@hcmute.edu.vn Nếu thành viên là Doanh
                           nghiệp/Đối tác gửi email về địa chỉ: pr@hcmute.edu.vn + Bước 2: Bộ phận
                           phụ trách của phòng Quan hệ Doanh nghiệp sẽ tiếp nhận các phản ánh của
                           thành viên. Bộ phận này chủ động giải quyết nhanh chóng và trả lời kết
                           quả giải quyết các khiếu nại trên cơ sở các Chính sách mà nền tảng đã
                           công bố. + Bước 3: Tùy theo mức độ sai phạm Quản trị viên sẽ đưa ra biện
                           pháp xử lý phù hợp.Trong trường hợp 2 bên không đi đến được tiếng nói
                           chung qua thương lượng. Thời gian giải quyết khiếu nại trong vòng 3 ngày
                           kể từ ngày nhận được khiếu nại. CareerHub tôn trọng và nghiêm túc thực
                           hiện các quy định của pháp luật về bảo vệ quyền lợi của người tìm việc.
                           Vì vậy, đề nghị các thành viên đăng tin tuyển dụng trên sàn cung cấp đầy
                           đủ, chính xác, trung thực và chi tiết các thông tin liên quan đến nội
                           dung công việc. Mọi hành vi lừa đảo, gian lận đều bị lên án và phải chịu
                           hoàn toàn trách nhiệm trước pháp luật. Các bên bao gồm người tìm việc,
                           người tuyển dụng sẽ phải có vai trò trách nhiệm trong việc tích cực giải
                           quyết vấn đề. Đối với người tuyển dụng cần có trách nhiệm cung cấp văn
                           bản giấy tờ chứng thực thông tin liên quan đến sự việc đang gây mâu thuẫu
                           với người tìm việc. Đối với CareerHub sẽ có trách cung cấp những thông
                           tin liên quan đến người tìm việc và người tuyển dụng nếu được một trong
                           hai bên (liên quan đến tranh chấp đó) yêu cầu. Sau khi người tìm việc,
                           người tuyển dụng đã giải quyết xong tranh chấp phải có trách nhiệm báo
                           lại cho ban quản trị CareerHub. Trong trường hợp giao dịch phát sinh mâu
                           thuẫn mà lỗi thuộc về người tuyển dụng: CareerHub sẽ có biện pháp cảnh
                           cáo, khóa tài khoản hoặc chuyển cho cơ quan pháp luật có thẩm quyền tùy
                           theo mức độ của sai phạm. CareerHub sẽ chấm dứt và gỡ bỏ toàn bộ tin bài
                           về nội dung công việc của người tuyển dụng đó trên CareerHub. Nếu thông
                           qua hình thức thỏa thuận mà vẫn không thể giải quyết được mâu thuẫn phát
                           sinh từ giao dịch giữa 2 bên người tìm việc, người tuyển dụng, thì một
                           trong hai bên sẽ có quyền nhờ đến cơ quan pháp luật có thẩm quyền can
                           thiệp nhằm đảm bảo lợi ích hợp pháp của các bên.
                        </p>
                     </Col>

                     <Col span={24}>
                        <Checkbox onChange={(e) => setChecked(e.target.checked)} checked={checked}>
                           Tôi đồng ý với Điều khoản và Điều kiện trên
                        </Checkbox>
                     </Col>
                  </Row>
                  <GroupButton>
                     <Button
                        disabled={!checked}
                        loading={loadingCreate}
                        onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           form.handleSubmit(onSubmit)();
                        }}
                     >
                        Đăng ký
                     </Button>
                  </GroupButton>
                  <Contact className="register">
                     Đã có tài khoản.{" "}
                     <Link className="redirect" to="/auth/login">
                        Đăng nhập ngay!
                     </Link>
                  </Contact>
               </FormProvider>
            </StyledCreateAndEditHr>

            <Modal
               visible={isOpen}
               onCancel={() => {
                  handleClose();
                  form.reset({});
                  setChecked(false);
               }}
               destroyOnClose
               type="confirm"
               confirmIcon={<AiFillCheckCircle style={{ color: "green" }} size={80} />}
            >
               <StyledContentConfirm>
                  <span className="title">Đăng ký thành công !</span>
                  <span className="sub-title">
                     Chúng tôi sẽ xem xét đơn đăng ký của bạn và sẽ gửi thông báo thông qua email đã
                     đăng ký.
                  </span>

                  <Button
                     onClick={() => {
                        handleClose();
                        form.reset({});
                        setChecked(false);
                        navigate("/overview/welcome");
                     }}
                     className="btn-ok"
                  >
                     Đồng ý
                  </Button>
               </StyledContentConfirm>
            </Modal>
         </StyledForm>
      </ContainerLogin>
   );
};

export default CreateAndEditHr;
