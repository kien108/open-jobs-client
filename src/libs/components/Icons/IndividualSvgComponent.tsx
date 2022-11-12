import * as React from 'react';
import { SVGProps } from 'react';

const IndividualSvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Zm0 9c2.7 0 5.8 1.29 6 2v1H2v-.99C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4Z"
      fill="#323232"
    />
  </svg>
);

export default IndividualSvgComponent;
