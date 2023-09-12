import { DSocialMedia } from 'features/users/data';

export const getSocialMedias = (search: string) => {
  let medias: string[] = [];
  DSocialMedia.forEach((element) => {
    const media = element.name;
    medias.push(media);
  });
  return medias;
};
