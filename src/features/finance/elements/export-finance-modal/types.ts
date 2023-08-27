import React from 'react';

export type TApplyModalProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
  onApply: () => void;
};

export type TExportFinanceModalProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
};
