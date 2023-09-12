import { DDiet } from 'features/users/data';

export const getDiets = (search: string) => {
  let diets: string[] = [];
  DDiet.forEach((element) => {
    const diet = element.name;
    diets.push(diet);
  });
  return diets;
};
