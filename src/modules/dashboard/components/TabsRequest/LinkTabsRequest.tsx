export const navLinks = (openLink: string) => {
   switch (openLink) {
      case "jobs":
         return [
            {
               path: "cv-matched",
               display: "CV Matched",
               key: "cv-matched",
            },
            {
               path: "cv-applied",
               display: "CV Applied",
               key: "cv-applied",
            },
         ];

      default:
         return [];
   }
};
