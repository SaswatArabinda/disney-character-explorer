export interface Character {
  _id: string;
  name: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  imageUrl?: string;
  sourceUrl?: string;
}

export interface FilterCriteria {
  franchise:
    | keyof Pick<
        Character,
        "films" | "shortFilms" | "tvShows" | "videoGames" | "parkAttractions"
      >
    | "";
  role: string;
  era: string;
}
