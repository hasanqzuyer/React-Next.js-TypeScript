import { DSchoolAndUniversity } from 'features/users/data';

export const getSchoolsAndUniversities = (search: string) => {
  let schools: string[] = [];
  let filters: any[] = [];
  if (search) {
    filters = DSchoolAndUniversity.filter((school) =>
      school.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    if (DSchoolAndUniversity.length > 10) {
      filters = DSchoolAndUniversity.slice(0, 10);
    } else {
      filters = DSchoolAndUniversity;
    }
  }
  filters.forEach((element) => {
    const school = element.name;
    schools.push(school);
  });
  schools.sort();
  if (schools.length > 0) {
    schools = schools.slice(0, 10);
  }
  return schools;
};
