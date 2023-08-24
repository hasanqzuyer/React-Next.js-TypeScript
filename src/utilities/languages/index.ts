import { DCountries } from "features/users/data";

export const getLanguages = (search: string) => {
  let languages: string[] = [];
  DCountries.forEach(element => {
    const language = element.language.name;
    if (!languages.includes(language))
      languages.push(language);
  });
  languages.sort()
  if (search) {
    let filterd = languages.filter((location) => location.toLowerCase().includes(search.toLowerCase()));
    if (filterd.length > 0) {
      filterd = filterd.slice(0, 10);
    }
    return filterd
  }
  return languages.slice(0, 10);
};
