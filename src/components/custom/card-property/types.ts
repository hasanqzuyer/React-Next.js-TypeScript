import { IHouse } from 'api/houses/types';
import { TImage } from 'api/images/types';
import React from 'react';

export type TPropertyCardProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  image: TImage | undefined;
  link: string;
  house: IHouse;
  label?: string;
  dropdown?: boolean;
  completed?: boolean;
  refresh: () => void;
};
