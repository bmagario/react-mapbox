// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map, Marker } from '!mapbox-gl';
import { IMapState } from './MapProvider';

type MapAction = 
	| { type: 'SET_MAP', payload: Map }
	| { type: 'SET_MARKERS', payload: Marker[] }

export const mapReducer = (state: IMapState, action: MapAction): IMapState => {
	switch (action.type) {
		case 'SET_MAP':
			return {
				...state,
				isMapReady: true,
				map: action.payload
			};
		case 'SET_MARKERS':
			return {
				...state,
				markers: action.payload
			};
		default:
				return state;
	}
}