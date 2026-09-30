export interface GarlicGrade {
  id: string;
  name: string;
  image: string;
  description: string;
  bestFor: string;
}

export const garlicGrades: GarlicGrade[] = [
  {
    id: "jumbo-table-grade",
    name: "Jumbo Table Grade",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAazymcVUYok1VWwrs-vZHLTAaXvk2Fp7dbnv6mcsdhocp7GAEp4KDyud6m6azd17gI1lJlroNZlO84AqvCun65B2aY2BQxgGsUUeUuU87SQfi0vysLLQeB7kQ4G2FcNM4AeckhbBZGakXT9e6bVc2OuQuSJFgYuTQzByO9sDzKaO2m8Nxj1EklbAyO5S_PBRr_kDBOLd0Vk7wE-lMJcdg9546xy4NmWCsnVfstkbGhod_XIr6q6_6mGaqAE0HlnM9lOA",
    description: "Plump, uniform cloves designed for fine-dining roasting, garnishing, and visual whole-clove plate presentations.",
    bestFor: "Fine Dining & Steakhouses",
  },
  {
    id: "dum-biriyani-special",
    name: "Dum Biriyani Special",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPQb_cy4Ct-zNmnLcmmDRGq0HDxhIXhwC-x8y9xboq2Tpf3LheFsqyxeld7wL-I8OiIs6BIOt_1mk4xyXXh2ZtzO8BNLSyjnX0R1lhQxLqeSBCv-uEUvqsf6lGNwHmlvOSFoZGUT4sixsZH4esVa6N1fKSrXsSzPEMWN4zIxZauOxtBNOKt7BEmvd28IOJJ3dfGLkjKKL1z1Q2eZZGMdtVJm2QhrQGHNROg_yt0Hi-qjf7ySMNBn8ApqlBSUzjhy5UtA",
    description: "High natural pungent allicin profile that holds intense aroma inside sealed handi steam and heavy gravies.",
    bestFor: "Mughlai, Biriyani & Curries",
  },
  {
    id: "cloud-kitchen-crate",
    name: "Cloud Kitchen Crate",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBL5zlJCxO1gJwOGZLL038yiOJIE7XpzOeQGtgwSpod783sAjYSKkDSmOHG-qLjD_hSHVr9cbsSUiY4kEB9QxIeXf0Y7Sz7oHQlIaUy_6uhxowmBMUN-SjgttlOiD3W1JOqNOgm2WxAQD022TCaqgaDqZBvAk1xSHEm3SxGVUTH6yRihaUojseHsAeF4I8qMGWEyWL8yD7719hCNyNQZuYqzCGBuoFyp4-bkw3IceBm0Tef4q8R4pLzZikMPitZxA35tg",
    description: "Medium-sized cloves optimized for rapid wok tosses, fast-food sautéing, and high-cadence evening rush prep.",
    bestFor: "Indo-Chinese & QSR Outlets",
  },
  {
    id: "pure-puree-blend",
    name: "Pure Puree & Paste Blend",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa2FKZG9p5GJ38BpJzUcAfCJ3pyH-UNfzBPRf_srmAL6tfxJoPe7pbmHa35QHuSB4KgSWoWVfedzxrG1yBk9HiBqa-M-i4UgiASBFiQycVrzdgcnhLCuWPL2KewRSxHngBu5lGFMzbqmvyv_wroLqYR4IPJYqJhwPb0gKaXzKyn00J-I1xsu6GR4d83kOiuMfDcGd9G4N69bvPIqmTWuUTfOiYi6ZVJpbTK6OJla95ABFNwKrSLjUQJ2Bsr3QlhWyfqw",
    description: "Zero moisture surface tension for smooth blending into restaurant-standard ginger-garlic master batches.",
    bestFor: "Commercial Processing Hubs",
  },
];
