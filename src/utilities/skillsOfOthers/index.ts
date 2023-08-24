import { DSkillsOfOthers } from 'features/users/data';

export const getSkillsOfOthers = (search: string) => {
  let skills: string[] = [];
  let filters: any[] = [];
  if (search) {
    filters = DSkillsOfOthers.filter((skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    if (DSkillsOfOthers.length > 10) {
      filters = DSkillsOfOthers.slice(0, 10);
    } else {
      filters = DSkillsOfOthers
    }
  }
  filters.forEach((element) => {
    const skill = element.name;
    skills.push(skill);
  });
  skills.sort();
  if (skills.length > 0) {
    skills = skills.slice(0, 10);
  }
  return skills;
};
