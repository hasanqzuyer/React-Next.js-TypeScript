import React from 'react';

const EditIcon = ({ ...props }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}
  >
    <svg
      width="21"
      height="21"
      viewBox="0 0 20 20"
      style={{ verticalAlign: 'middle' }}
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_9_1008)">
        <path d="M18.75 16.25H1.25V17.5H18.75V16.25Z" fill="currentColor" />
        <path
          d="M15.875 5.625C16.375 5.125 16.375 4.375 15.875 3.875L13.625 1.625C13.125 1.125 12.375 1.125 11.875 1.625L2.5 11V15H6.5L15.875 5.625ZM12.75 2.5L15 4.75L13.125 6.625L10.875 4.375L12.75 2.5ZM3.75 13.75V11.5L10 5.25L12.25 7.5L6 13.75H3.75Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_9_1008">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
);

export default EditIcon;
