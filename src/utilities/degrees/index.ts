import { DDegrees } from 'features/users/data';

export const getDegrees = (search: string) => {
  let degrees: string[] = [];
  DDegrees.forEach((element) => {
    const degree = element.name;
    degrees.push(degree);
  });
  return degrees;
};
