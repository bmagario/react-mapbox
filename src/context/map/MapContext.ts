import { createContext } from 'react';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map, Marker } from '!mapbox-gl';

export interface IMapContextProps {
	isMapReady: boolean;
	map?: Map;
	markers: Marker[];
	setMap: (map: Map) => void;
	getRouteBetweenPoints: (start: [number, number], end:[number, number]) => Promise<void>;
}

export const MapContext = createContext<IMapContextProps>({} as IMapContextProps);