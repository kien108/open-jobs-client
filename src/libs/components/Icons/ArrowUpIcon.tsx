import * as React from 'react';

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.7256 4.25L11.7256 19.25"
        stroke="#130F26"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.70124 10.2998L11.7252 4.2498L17.7502 10.2998"
        stroke="#130F26"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(ArrowUpIcon);
export default MemoSvgComponent;
