// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl';
import { useContext, useEffect, useReducer } from 'react';
import { directionsAPI } from '../../apis';
import { IDirectionsResponse } from '../../interfaces/directions';
import { PlacesContext } from '../places/PlacesContext';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';

interface IMapProviderProps {
	children: JSX.Element | JSX.Element[];
}

export interface IMapState {
	isMapReady: boolean;
	map?: Map;
	markers: Marker[];
};

const initialState: IMapState = {
	isMapReady: false,
	map: undefined,
	markers: []
};

export const MapProvider = ({ children }: IMapProviderProps) => {
	const [ state, dispatch ] = useReducer(mapReducer, initialState);
	const { places } = useContext(PlacesContext);

	useEffect(() => {
		state.markers.forEach(marker => marker.remove());
		const markers: Marker[] = [];
		for (const place of places) {
			const [lng, lat] = place.center;
			const myLocationPopUp = new Popup()
			.setHTML(`
				<h4>${place.text_es}</h4>
				<p>${place.place_name_es}</p>
			`);

			markers.push(
				new Marker({
					color: '#ff0000',

				})
				.setLngLat([lng, lat])
				.setPopup(myLocationPopUp)
				.addTo(state.map!)
			);
		}

		dispatch({
			type: 'SET_MARKERS',
			payload: markers
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [places])
	

	const setMap = (map: Map) => {
		const myLocationPopUp = new Popup()
		.setHTML(`
			<h4>Here I am</h4>
			<p>Visiting new places</p>
		`);

		new Marker({
			color: '#ff0000'
		})
		.setLngLat(map.getCenter())
		.setPopup(myLocationPopUp)
		.addTo(map);

		dispatch({
			type: 'SET_MAP',
			payload: map
		});
	}

	const getRouteBetweenPoints = async(start: [number, number], end:[number, number]) => {
		const resp = await directionsAPI.get<IDirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
		const { distance, duration, geometry } = resp.data.routes[0];
		const { coordinates: coords } = geometry;
		let kms = distance / 1000;
				kms = Math.round(kms * 100);
				kms /= 100;
		let minutes = Math.floor(duration / 60);

		const bounds = new LngLatBounds(start, start);
		
		for (const coord of coords) {
			const newCoord: [number, number] = [coord[0], coord[1]];
			bounds.extend(newCoord);
		}

		state.map?.fitBounds(bounds, { padding: 200});

		const sourceData: AnySourceData = {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						properties: {} as any,
						geometry: {
							type: 'LineString',
							coordinates: coords
						}
					}
				]
			}
		};

		if(state?.map?.getLayer('route')) {
			state.map?.removeLayer('route');
			state.map?.removeSource('route');
		}
		state.map?.addSource('route', sourceData);
		state.map?.addLayer({
			id: 'route',
			type: 'line',
			source: 'route',
			layout: {
				'line-join': 'round',
				'line-cap': 'round'
			},
			paint: {
				'line-color': '#ff0000',
				'line-width': 3,
				'line-opacity': 0.8
			}
		});

		// dispatch({
		// 	type: 'SET_ROUTE',
		// 	payload: resp.data.routes[0]
		// });
	}

	return (
		<MapContext.Provider value={{
			...state,
			setMap,
			getRouteBetweenPoints
		}}>
			{ children }
		</MapContext.Provider>
	)
}
