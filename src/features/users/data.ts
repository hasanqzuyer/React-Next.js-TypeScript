export const DUsersFilters = () => ({
  search: '',
  location: null,
  nationality: null,
  age: {
    min: '',
    max: '',
  },
  language: null,
  applications: {
    min: '',
    max: '',
  },
  invested: {
    min: '',
    max: '',
  },
  socialMedia: null,

  jobTitle: null,
  company: null,
  workExperienceLocation: null,
  currentlyEmployed: null,
  skills: null,

  school: null,
  degree: null,
  fieldOfStudy: null,

  theme: null,
  skillsOfOthers: null,
  houseLocation: null,
  houseLanguage: null,
  monthlyRent: {
    min: '',
    max: '',
  },
  houseAge: {
    min: '',
    max: '',
  },
  tenantsPerHouse: {
    min: '',
    max: '',
  },
  interestsAndHobbies: {
    min: '',
    max: '',
  },
  diet: null,
});

export const DUsersHead = [
  {
    reference: 'name',
    label: 'Name',
    visible: true,
  },
  {
    reference: 'location',
    label: 'Location',
    visible: true,
  },
  {
    reference: 'nationality',
    label: 'Nationality',
    visible: true,
  },
  {
    reference: 'age',
    label: 'Age',
    visible: true,
  },
  {
    reference: 'applications',
    label: 'Applications',
    visible: true,
  },
  {
    reference: 'invested',
    label: 'Invested',
    visible: true,
  },
  {
    reference: 'actions',
    label: 'Actions',
    visible: true,
  },
];
