import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";
import { Feature } from '../interfaces/places';

export const SearchResults = () => {
	const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
	const { map, getRouteBetweenPoints  } = useContext(MapContext);

	const flyToDirection = (coordinates: number[]) => {
		if(map) {
			const [lng, lat] = coordinates;
			map.flyTo({
				center: [lng, lat],
				zoom: 14
			});
		}
	}

	const getRoute = (place: Feature) => {
		if(!userLocation) return;

		const { center } = place;
		const [lngEnd, latEnd] = center;
		getRouteBetweenPoints(userLocation, [lngEnd, latEnd]);
	}

	return (
		<ul className="list-group mt-3">
			{
				!isLoadingPlaces && places.map((place: Feature) => (
					<li 
						key={ place.id }
						className='li-map list-group-item list-group-item-action'
						onClick={ () => flyToDirection(place.center) }
					>
						<h6>{ place.place_name }</h6>
						<button
							className="btn btn-primary"
							onClick={ () => getRoute(place) }
						>
							Directions
						</button>
					</li>
				))
			}

		</ul>
	)
}
