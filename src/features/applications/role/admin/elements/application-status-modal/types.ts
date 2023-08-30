import React from 'react';

export type TApplicationStatusProps = React.HTMLAttributes<HTMLDivElement> & {
  applicationId: number;
  reload: any;
};
