import { DInterestsAndHobbies } from 'features/users/data';

export const getInterestsAndHobbies = (search: string) => {
  let interests: string[] = [];
  DInterestsAndHobbies.forEach((element) => {
    const interest = element.name;
    interests.push(interest);
  });
  return interests;
};
