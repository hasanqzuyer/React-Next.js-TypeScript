import { DSkills } from 'features/users/data';

export const getSkills = (search: string) => {
  let skills: string[] = [];
  DSkills.forEach((element) => {
    const skill = element.name;
    skills.push(skill);
  });
  return skills;
};
