import React, { FC } from 'react';

const AttachmentIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="feather feather-paperclip">
      <path d="M21.44 11.05L12 20.49c-2.18 2.18-5.71 2.18-7.89 0s-2.18-5.71 0-7.89l9.45-9.45a4 4 0 1 1 5.66 5.66L9.76 18.76a1.5 1.5 0 0 1-2.12-2.12l9.49-9.49"/>
  </svg>
);

export default AttachmentIcon;
