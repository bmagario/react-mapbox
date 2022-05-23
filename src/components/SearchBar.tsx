import { ChangeEvent, useContext, useRef, useState } from "react";
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
	const [search, setSearch] = useState("");
	const debounceRef = useRef<NodeJS.Timeout>();
	const { searchPlacesByQuery } = useContext(PlacesContext);

	const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearch(query);
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}
		debounceRef.current = setTimeout(() => {
			searchPlacesByQuery(search);
		}, 1000);
	}

	return (
		<div className='search-container'>
			<input	
				type="text"
				className='form-control' 
				placeholder="Search for a location"
				onChange={ onQueryChange }
			/>
			<SearchResults />
		</div>
	)
}
