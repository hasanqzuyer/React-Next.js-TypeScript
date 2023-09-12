import { DHouseThemes } from 'features/opportunities/data';

export const getHouseTheme = (search: string) => {
  let themes: string[] = [];
  DHouseThemes.forEach((element) => {
    const theme = element.name;
    themes.push(theme);
  });
  return themes;
};
