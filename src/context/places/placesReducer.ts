import { Feature } from '../../interfaces/places';
import { IPlacesState } from './PlacesProvider';

type PlaceAction =
	| { type: 'SET_USER_LOCATION', payload: [ number, number ] }
	| { type: 'SET_LOADING_PLACES' }
	| { type: 'SET_PLACES', payload: Feature[] }
;

export const placesReducer = (state: IPlacesState, action: PlaceAction): IPlacesState => {
	switch (action.type) {
		case 'SET_USER_LOCATION':
			return {
				...state,
				isLoading: false,
				userLocation: action.payload
			};
		case 'SET_LOADING_PLACES':
			return {
				...state,
				isLoadingPlaces: true,
				places: []
			};
		case 'SET_PLACES':
			return {
				...state,
				isLoadingPlaces: false,
				places: action.payload
			};
		default:
				return state;
	}
}