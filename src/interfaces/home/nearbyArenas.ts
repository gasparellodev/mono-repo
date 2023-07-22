export type NearbyArenasRequest = {
  latitude: number;
  longitude: number;
}

export type NearbyArenasResponse = {
  id: string;
  name: string;
  description: string;
  numberStar: number;
  numberAviations: number;
  distance: number;
};
