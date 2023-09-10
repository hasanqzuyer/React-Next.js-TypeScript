import { DHouseThemes } from 'features/opportunities/data';

export const getHouseTheme = (search: string) => {
  let themes: string[] = [];
  let filters: any[] = [];
  if (search) {
    filters = DHouseThemes.filter((theme) =>
      theme.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    if (DHouseThemes.length > 10) {
      filters = DHouseThemes.slice(0, 10);
    } else {
      filters = DHouseThemes;
    }
  }
  DHouseThemes.forEach((element) => {
    const theme = element.name;
    themes.push(theme);
  });
  themes.sort();
  // if (themes.length > 0) {
  //   themes = themes.slice(0, 10);
  // }
  return themes;
};
