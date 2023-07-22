import { IGetIntegration } from '../getIntegration';
import { NearbyArenasRequest, NearbyArenasResponse } from './nearbyArenas';

export interface IArena {
  getNearbyArenas: IGetIntegration<NearbyArenasRequest, NearbyArenasResponse[]>;
}