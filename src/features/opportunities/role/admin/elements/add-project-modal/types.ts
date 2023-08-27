import { IHouse } from 'api/houses/types';
import React from 'react';

export type TAddHousesModalProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
  refresh: () => void;
};

export type TEditHousesModalProps = React.HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
  refresh: () => void;
  houseId: number;
};

export type THouseImage = {
  url: string;
  type: string;
  name: string;
  id: number;
  presignedUrl?: any;
};
