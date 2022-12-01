import React from 'react';
import { InfoIcon } from 'components/svg';
import { TNote } from 'components/custom/note/types';
import { NoteMain, NoteText } from 'components/custom/note/style';

const Note = ({ children, ...props }: TNote) => (
  <NoteMain {...props}>
    <InfoIcon />
    <NoteText>{children}</NoteText>
  </NoteMain>
);

export default Note;
