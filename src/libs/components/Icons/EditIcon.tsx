import * as React from 'react';

function EditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
    //   <path
    //     d="m16.5 2.762 3 3-2.287 2.288-3-3L16.5 2.762ZM4.5 14.75v3h3l8.299-8.287-3-3L4.5 14.75Zm0 6h16v2h-16v-2Z"
    //     fill="#074ABD"
    //   />
    // </svg>

    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_3_7784)">
        <path
          d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z"
          fill="#074ABD"
        />
      </g>
      <defs>
        <clipPath id="clip0_3_7784">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoSvgComponent = React.memo(EditIcon);
export default MemoSvgComponent;
