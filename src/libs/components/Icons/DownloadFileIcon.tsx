import * as React from 'react';
import { SVGProps } from 'react';

const DownloadFileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={21}
    height={22}
    viewBox="0 0 21 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.625 8.25h-3.5v-5.5h-5.25v5.5h-3.5l6.125 6.417 6.125-6.417Zm-7 1.833v-5.5h1.75v5.5h1.024l-1.899 1.99-1.899-1.99h1.024ZM4.375 16.5h12.25v1.833H4.375V16.5Z"
      fill="#2068D3"
    />
  </svg>
);

export default DownloadFileIcon;
