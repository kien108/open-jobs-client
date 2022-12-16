import { HeaderWrapper, StyledHeader } from "./styles";
import { AccountType, LanguageType } from "./types";
import { RightHeader } from "./components/RightHeader";
import LeftHeader from "./components/LeftHeader/LeftHeader";

const languages: LanguageType[] = [
   {
      id: 1,
      title: "English",
      code: "en",
   },
   {
      id: 2,
      title: "Tiếng Việt",
      code: "vi",
   },
];

const accounts: AccountType[] = [
   {
      id: 1,
      title: "header.profile",
      path: "/overview/profile",
   },
   {
      id: 2,
      title: "header.jobApplied",
      path: "/overview/jobs-applied",
   },

   {
      id: 3,
      title: "header.signOut",
      path: "/auth",
   },
];

const Header = () => {
   return (
      <StyledHeader>
         <HeaderWrapper>
            <LeftHeader />
            <RightHeader languages={languages} accounts={accounts} />
         </HeaderWrapper>
      </StyledHeader>
   );
};

export default Header;
