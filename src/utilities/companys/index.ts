import { DCompany } from 'features/users/data';

export const getCompanys = (search: string) => {
  let companys: string[] = [];
  let filters: any[] = [];
  if (search) {
    filters = DCompany.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    if (DCompany.length > 10) {
      filters = DCompany.slice(0, 10);
    } else {
      filters = DCompany
    }
  }
  filters.forEach((element) => {
    const company = element.name;
    companys.push(company);
  });
  companys.sort();
  if (companys.length > 0) {
    companys = companys.slice(0, 10);
  }
  return companys;
};
