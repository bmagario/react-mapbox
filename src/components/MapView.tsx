import { useContext, useLayoutEffect, useRef } from 'react';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map } from '!mapbox-gl';
import { PlacesContext, MapContext } from '../context';
import { LoadingMapView } from './LoadingMapView';

export const MapView = () => {
	const { isLoading, userLocation } = useContext(PlacesContext);
	const { setMap } = useContext(MapContext);
	const mapDiv = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if(!isLoading) {
			const map = new Map({
				container: mapDiv.current!, // container ID
				style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
				center: userLocation, // starting position [lng, lat]
				zoom: 14 // starting zoom
			});
			setMap(map);
		}
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	if (isLoading) {
		return (
			<LoadingMapView />
		)
	}

	return (
		<div 
			ref={ mapDiv }
			style={{ 
				backgroundColor: '#f5f5f5',
				height: '100vh',
				left: 0,
				position: 'fixed',
				top: 0,
				width: '100vw'
			}}
		>
			
		</div>
	)
}
