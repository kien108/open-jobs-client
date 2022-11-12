import * as React from 'react';
import { SVGProps } from 'react';

const OverviewIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 23"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    focusable="false"
    {...props}
  >
    <path
      d="M18.8469 2.07692C20.5306 2.07692 21.8775 3.36923 21.8775 4.98462C21.8775 6.6 20.5306 7.89231 18.8469 7.89231C17.1632 7.89231 15.8163 6.6 15.8163 4.98462C15.8163 3.36923 17.1632 2.07692 18.8469 2.07692ZM18.8469 1C16.602 1 14.6938 2.72308 14.6938 4.98462C14.6938 7.13846 16.4898 8.96923 18.8469 8.96923C21.2041 8.96923 23 7.24615 23 4.98462C23 2.72308 21.0918 1 18.8469 1Z"
      fill="#888C90"
    />
    <path
      d="M19.5205 10.8V19.4154C19.5205 20.4923 18.6225 21.4615 17.3878 21.4615H3.69393C2.57148 21.4615 1.56128 20.6 1.56128 19.4154V6.16923C1.56128 5.09231 2.45924 4.12308 3.69393 4.12308H12.5613"
      stroke="#888C90"
      strokeMiterlimit="10"
    />
    <path
      d="M4.92847 17.1538L8.18357 13.6L12.3366 16.4L16.2652 11.6615"
      stroke="#888C90"
      strokeMiterlimit="10"
    />
  </svg>
);

export default OverviewIcon;
