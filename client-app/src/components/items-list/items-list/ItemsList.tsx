import React, { useContext, Fragment } from "react";
import { observer } from "mobx-react-lite";
import SimpleBar from "simplebar-react";
import InfiniteScroll from "react-infinite-scroller";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemFilters from "../item-filters/ItemFilters";
import ListItem from "./ListItem";
import TopPanel from "./TopPanel";
import LoadingScreen from "../../common/loading/LoadingScreen";
import Empty from "../../common/other/Empty";
import { getRelativeDate } from "../../../app/common/util/dates";
import LoadingIndicator from "../../common/loading/LoadingIndicator";
import Drawer from "../../common/other/Drawer";
import ItemDetails from "../item-details/ItemDetails";

const ItemsList: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const {
		loadItems,
		loadingInitial,
		itemsByDate,
		setPage,
		page,
		totalPages,
		loadingNext,
		filtersDrawerVisible,
		hideFiltersDrawer,
		hideDetailsDrawer,
		detailsDrawerVisible,
	} = rootStore.itemStore;

	const handleGetNext = () => {
		setPage(page + 1);
		loadItems();
	};

	return (
		<div id="items-list" {...props}>
			<TopPanel />

			<div id="content-container">
				<ItemFilters />

				<div id="list-container" tour-step="1-1">
					<Drawer
						id="item-filters-drawer"
						placement="left"
						onClose={hideFiltersDrawer}
						visible={filtersDrawerVisible}
					>
						<ItemFilters in-drawer="true" />
					</Drawer>

					{loadingInitial && <LoadingScreen size={2} />}

					{!loadingInitial && itemsByDate.length > 0 && (
						<SimpleBar
							style={{ height: "100%" }}
							autoHide={false}
							forceVisible="y"
							scrollbarMinSize={36}
							scrollableNodeProps={{ id: "scrollable-node" }}
						>
							<InfiniteScroll
								pageStart={0}
								loadMore={handleGetNext}
								hasMore={!loadingNext && page + 1 < totalPages}
								initialLoad={false}
								threshold={50}
								useWindow={false}
								getScrollParent={() => {
									return document.getElementById("scrollable-node") as HTMLElement;
								}}
							>
								<div id="list">
									{itemsByDate.map(([date, items]) => (
										<Fragment key={date}>
											<span className="date-badge">{getRelativeDate(date)}</span>

											{items.map((item) => (
												<ListItem key={item.id} item={item} />
											))}
										</Fragment>
									))}

									{loadingNext && <LoadingIndicator className="scroll-loader" type="small" />}
								</div>
							</InfiniteScroll>
						</SimpleBar>
					)}

					{!loadingInitial && itemsByDate.length === 0 && <Empty text="No items found" size={10} />}

					<Drawer id="item-details-drawer" onClose={hideDetailsDrawer} visible={detailsDrawerVisible}>
						<ItemDetails in-drawer="true" tour-step="1-2-1" />
					</Drawer>
				</div>
			</div>
		</div>
	);
};

export default observer(ItemsList);
