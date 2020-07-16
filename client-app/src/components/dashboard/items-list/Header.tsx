import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Search from "antd/lib/input/Search";

import { RootStoreContext } from "../../../app/stores/rootStore";
import FilterIcon from "../../icons/FilterIcon";
import LoadingIndicator from "../../common/loading/LoadingIndicator";

const Header = () => {
	const rootStore = useContext(RootStoreContext);
	const { showFiltersDrawer, filtersDrawerVisible, itemRegistry, loadingInitial, loadingNext } = rootStore.itemStore;

	return (
		<div id="header-container">
			<div className="items-list-title">
				<span className="title">Items</span>
				<span className="items-counter">
					{!loadingInitial && !loadingNext && <span className="text">{itemRegistry.size}</span>}
					{(loadingInitial || loadingNext) && <LoadingIndicator type="small" />}
				</span>
			</div>

			<div className="buttons-container">
				<button
					className="btn header-btn filters-btn xl-hidden"
					onClick={showFiltersDrawer}
					disabled={filtersDrawerVisible}
				>
					<FilterIcon />
					<span>Filters</span>
				</button>

				<Search id="item-search" placeholder="item..." />
			</div>
		</div>
	);
};

export default observer(Header);
