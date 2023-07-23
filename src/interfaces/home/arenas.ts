export type NearbyArenasRequest = {
  latitude: number;
  longitude: number;
};

export type SearchArenasByNameRequest = {
  name: string;
  latitude: number;
  longitude: number;
};

export type ArenaModel = {
  id: string;
  name: string;
  description: string;
  numberStar: number;
  numberAviations: number;
  distance: number;
};
