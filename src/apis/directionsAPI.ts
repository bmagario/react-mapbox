import axios from "axios";

const directionsAPI = axios.create({
	baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
	params: {
		alternatives: false,
		geometries: 'geojson',
		overview: 'simplified',
		steps: false,
		access_token: 'pk.eyJ1IjoiYm1hZ2FyaW8iLCJhIjoiY2wzZXg1YXp0MDAycTNjcnhlbDJ1NGJlbSJ9.wvs1mlgQ-KZcpcO8RuJb3Q'
	}
});

export default directionsAPI;