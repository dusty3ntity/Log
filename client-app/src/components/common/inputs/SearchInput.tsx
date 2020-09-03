import React, { useState } from "react";

import Button from "./Button";
import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";
import SearchIcon from "../icons/SearchIcon";

export interface ISearchInputProps extends IComponentProps {
	onSearch: (value: string) => void;
	loading?: boolean;
	defaultValue?: string;
	placeholder?: string;
}

const SearchInput: React.FC<ISearchInputProps> = ({
	id,
	className,
	onSearch,
	loading,
	defaultValue,
	placeholder,
	...props
}) => {
	const [searchValue, setSearchValue] = useState(defaultValue || "");

	const handleSearch = () => {
		onSearch(searchValue);
	};

	return (
		<div id={id} className={combineClassNames("search-input", className)} {...props}>
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
