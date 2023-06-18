export const convertPrice = (value: any) => {
   return value
      .toString()
      .replaceAll(".", "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const revertPrice = (value: any) => {
   return value.replaceAll(".", "");
};
