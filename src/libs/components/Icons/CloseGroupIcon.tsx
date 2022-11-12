import * as React from 'react';
import { SVGProps } from 'react';

const CloseGroupIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={20} cy={20} r={20} fill="#0038A8" />
    <path d="M10 20h20" stroke="#fff" strokeWidth={3} />
  </svg>
);

export default CloseGroupIcon;
