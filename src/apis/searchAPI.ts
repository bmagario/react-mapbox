import axios from "axios";

const searchAPI = axios.create({
	baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
	params: {
		limit: 5,
		language: 'es',
		access_token: 'pk.eyJ1IjoiYm1hZ2FyaW8iLCJhIjoiY2wzZXg1YXp0MDAycTNjcnhlbDJ1NGJlbSJ9.wvs1mlgQ-KZcpcO8RuJb3Q'
	}
});

export default searchAPI;