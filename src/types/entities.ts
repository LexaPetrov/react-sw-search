export type Character = {
  "birth_year": string;
  "eye_color": string;
  "films": string[];
  "gender": string;
  "hair_color": string;
  "height": string;
  "homeworld": string;
  "mass": string;
  "name": string;
  "skin_color": string;
  "created": string;
  "edited": string;
  "species": string[];
  "starships": string[];
  "url": string;
  "vehicles": string[];
};

export type Planet = {
  "climate": string;
  "diameter": string;
  "gravity": string;
  "name": string;
  "orbital_period": string;
  "population": string;
  "residents": string[];
  "rotation_period": string;
  "surface_water": string;
  "terrain": string;
  "url": string;
};

export type Film = {
  "characters": string[];
  "created": string;
  "director": string;
  "edited": string;
  "episode_id": number;
  "opening_crawl": string;
  "planets": string[];
  "producer": string;
  "release_date": string;
  "species": string[];
  "starships": string[];
  "title": string;
  "url": string;
  "vehicles": string[];
};

export type ResponseData<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
