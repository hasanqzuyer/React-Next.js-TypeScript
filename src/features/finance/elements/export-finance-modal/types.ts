import React from 'react';

export type TApplyModalProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
  houseId: number;
};

export type TExportFinanceModalProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
};
