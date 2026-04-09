export const CategoriesAPI = {
  Food: "food",
  Others: "others",
  Services: "services",
  Transport: "transport",
  Accommodation: "accomodation"
} as const;

export type CategoriesAPIEnum = typeof CategoriesAPI[keyof typeof CategoriesAPI];
