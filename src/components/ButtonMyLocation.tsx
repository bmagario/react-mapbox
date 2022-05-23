import { useContext } from "react"
import { MapContext, PlacesContext } from "../context";

export const ButtonMyLocation = () => {
	const { map, isMapReady } = useContext(MapContext);
	const { userLocation } = useContext(PlacesContext);

	const goToMyLocation = () => {
		if (isMapReady && userLocation) {
			map?.flyTo({
				center: userLocation,
				zoom: 14
			});
		}
	} 

	return (
		<button
			className='btn btn-primary'
			style={{
				position: 'fixed',
				top: '20px',
				right: '20px',
				zIndex: 999
			}}
			onClick={ goToMyLocation }
		>
			My Location
		</button>
	)
}
