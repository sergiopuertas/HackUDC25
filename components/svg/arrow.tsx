import * as React from "react";
const Arrow = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" {...props}>
    <path
      fill="none"
      stroke="hsl(0, 0%, 0%)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
      markerEnd="url(#a)"
      d="M286.002 286q-1 198 228 228"
      transform="rotate(-33 322.921 443.267)"
    />
    <defs>
      <marker
        id="a"
        markerHeight={5}
        markerWidth={5}
        orient="auto"
        refX={2.5}
        refY={2.5}
        viewBox="0 0 5 5"
      >
        <path fill="hsl(0, 0%, 0%)" d="m0 5 1.667-2.5L0 0l5 2.5z" />
      </marker>
    </defs>
  </svg>
);
export default Arrow;
