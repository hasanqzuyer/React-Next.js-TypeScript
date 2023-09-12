import { DFieldOfStudy } from 'features/users/data';

export const getFieldOfStudies = (search: string) => {
  let fields: string[] = [];
  DFieldOfStudy.forEach((element) => {
    const field = element.name;
    fields.push(field);
  });
  fields.sort();
  return fields;
};
