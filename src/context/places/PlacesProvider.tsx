import { useEffect, useReducer } from 'react';
import { searchAPI } from '../../apis';
import { getUserLocation } from '../../helpers';
import { Feature, IPlacesResponse } from '../../interfaces/places';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';

interface IPlacesProviderProps {
	children: JSX.Element | JSX.Element[];
}

export interface IPlacesState {
	isLoading: boolean;
	userLocation?: [ number, number ];
	isLoadingPlaces: boolean;
	places: Feature[]
};

const initialState: IPlacesState = {
	isLoading: true,
	userLocation: undefined,
	isLoadingPlaces: false,
	places: []
};

export const PlacesProvider = ({ children }: IPlacesProviderProps) => {
	const [ state, dispatch ] = useReducer(placesReducer, initialState);

	useEffect(() => {
			getUserLocation()
			.then(lngLat => {
				dispatch({
					type: 'SET_USER_LOCATION',
					payload: [ lngLat[1], lngLat[0] ]
				});
			})
	}, []);

	const searchPlacesByQuery = async (query: string): Promise<Feature[]> => {
		if(query.length === 0) { 
			dispatch({ type: 'SET_PLACES', payload: [] });
			return [];
		}

		if(!state.userLocation) {
			throw new Error('There is no user location');
		}

		dispatch({
			type: 'SET_LOADING_PLACES'
		});

		const resp = await searchAPI.get<IPlacesResponse>(`/${query}.json`, {
			params: {
				proximity: state.userLocation.join(',')
			}
		});

		dispatch({
			type: 'SET_PLACES',
			payload: resp.data.features
		});

		return resp.data.features;
	}
	

	return (
		<PlacesContext.Provider value={{
			...state,
			searchPlacesByQuery
		}}>
			{ children }
		</PlacesContext.Provider>
	)
}
