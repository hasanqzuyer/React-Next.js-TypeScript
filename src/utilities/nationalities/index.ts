import { DCountries, DLocations } from 'features/users/data';

export const getNationalities = (search: string) => {
  let countries: string[] = [];
  DCountries.forEach((element) => {
    const country = element.name;
    countries.push(country);
  });
  countries.sort();
  if (search) {
    let filterd = countries.filter((location) =>
      location.toLowerCase().includes(search.toLowerCase())
    );
    if (filterd.length > 0) {
      filterd = filterd.slice(0, 10);
    }
    return filterd;
  }
  return countries.slice(0, 10);
};
