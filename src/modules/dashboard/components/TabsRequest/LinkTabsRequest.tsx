export const navLinks = (openLink: string) => {
   switch (openLink) {
      case "jobs":
         return [
            {
               path: "cv-matched",
               display: "Hồ sơ phù hợp (VIP)",
               key: "cv-matched",
            },
            {
               path: "cv-applied",
               display: "Hồ sơ ứng tuyển",
               key: "cv-applied",
            },
         ];

      default:
         return [];
   }
};
