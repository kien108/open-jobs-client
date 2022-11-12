export const navLinks = (openLink: string) => {
   switch (openLink) {
      case "company": {
         return [
            {
               path: "/company/companies",
               display: "Companies",
               key: "/company/companies",
            },
         ];
      }
      case "settings": {
         return [
            {
               path: "/settings/default",
               display: "Settings",
               key: "/settings/default",
            },
            {
               path: "/settings/email-templates",
               display: "Email Templates",
               key: "/settings/email-templates",
            },
         ];
      }
      case "jobs": {
         return [
            {
               path: "/jobs/majors",
               display: "Majors",
               key: "/jobs/majors",
            },
            {
               path: "/jobs/specializations",
               display: "Specializations",
               key: "/jobs/specializations",
            },
            {
               path: "/jobs/skills-invalidate",
               display: "Invalidate skill",
               key: "/jobs/skills-invalidate",
            },
         ];
      }

      default:
         return [];
   }
};
