import React, { useState } from "react";

import Button from "./Button";
import SearchIcon from "../../icons/SearchIcon";

interface IProps {
	onSearch: (value: string) => void;
	loading?: boolean;
	defaultValue: string;
	placeholder?: string;
}

const SearchInput: React.FC<IProps> = ({ onSearch, loading, defaultValue, placeholder }) => {
	const [searchValue, setSearchValue] = useState(defaultValue);

	const handleSearch = () => {
		onSearch(searchValue);
	};

	return (
		<div className="search-input">
			<input
				type="text"
				autoComplete="off"
				placeholder={placeholder || ""}
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				onKeyPress={(e) => {
					if (e.key === "Enter") handleSearch();
				}}
			/>
			<Button icon={<SearchIcon />} className="search-btn" onClick={handleSearch} loading={loading} />
		</div>
	);
};

export default SearchInput;
