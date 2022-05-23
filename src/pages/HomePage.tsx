import { ButtonMyLocation, FuxLogo, MapView, SearchBar } from "../components"

export const HomePage = () => {
 
	return (
		<div>
			<MapView />
			<ButtonMyLocation />
			<FuxLogo />
			<SearchBar />
		</div>
	)
}
