import * as React from 'react';
import { SVGProps } from 'react';

const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    style={props.style}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      fill="#e7716a"
      d="m6.516 14.323l-1.49 6.452a.998.998 0 0 0 1.529 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4l4.536-4.082a1 1 0 0 0-.59-1.74l-5.701-.454l-2.467-5.461a.998.998 0 0 0-1.822 0L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107zm2.853-4.326a.998.998 0 0 0 .832-.586L12 5.43l1.799 3.981a.998.998 0 0 0 .832.586l3.972.315l-3.271 2.944c-.284.256-.397.65-.293 1.018l1.253 4.385l-3.736-2.491a.995.995 0 0 0-1.109 0l-3.904 2.603l1.05-4.546a1 1 0 0 0-.276-.94l-3.038-2.962l4.09-.326z"
    />
  </svg>
);

export default StarIcon;
