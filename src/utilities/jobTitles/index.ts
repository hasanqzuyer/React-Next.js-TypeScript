import { DJobTitle } from 'features/users/data';

export const getJobTitles = (search: string) => {
  let jobTitles: string[] = [];
  DJobTitle.forEach((element) => {
    const title = element.name;
    jobTitles.push(title);
  });
  return jobTitles;
};
