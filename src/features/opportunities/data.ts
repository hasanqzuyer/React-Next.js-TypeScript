export const DSecondaryMarketFilters = () => ({
  country: null,
  city: null,
  type: null,
  previouslyInvested: null,
  capRate: {
    min: '',
    max: '',
  },
  pricePerSqm: {
    min: '',
    max: '',
  },
  price: {
    min: '',
    max: '',
  },
});

export const DMarketOffersHead = [
  {
    reference: 'property',
    label: 'Property',
    visible: true,
  },
  {
    reference: 'location',
    label: 'Location',
    visible: true,
  },
  {
    reference: 'capRate',
    label: 'Cap Rate',
    visible: true,
  },
  {
    reference: 'pricePerSqm',
    label: 'Price per sqm',
    visible: true,
  },
  {
    reference: 'squareMeters',
    label: 'Square Meters',
    visible: true,
  },
  {
    reference: 'price',
    label: 'Price',
    visible: true,
  },
];

export const DHouseThemes = [
  { name: 'E-commerce House' },
  { name: 'Fitness House' },
  { name: 'Influencer House' },
  { name: 'Marketing House' },
  { name: 'Real Estate House' },
  { name: 'Software Development House' },
  { name: 'Startup House' },
  { name: 'Trading House' },
];
