import { DSkills } from 'features/users/data';

export const getSkillsOfOthers = (search: string) => {
  let skills: string[] = [];
  DSkills.forEach((element) => {
    const skill = element.name;
    skills.push(skill);
  });

  return skills;
};
