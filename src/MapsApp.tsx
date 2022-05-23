import { MapProvider, PlacesProvider } from "./context"
import { HomePage } from "./pages"
import './index.css';

export const MapsApp = () => {
	return (
		<PlacesProvider >
			<MapProvider>
				<HomePage />
			</MapProvider>
		</PlacesProvider>
	)
}
