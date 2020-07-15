import React, { useContext, Fragment, useRef } from "react";
import { observer } from "mobx-react-lite";
import SimpleBar from "simplebar-react";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemFilters from "./ItemFilters";
import ListItem from "./ListItem";
import ItemFiltersDrawer from "../drawers/ItemFiltersDrawer";
import ItemDetailsDrawer from "../drawers/ItemDetailsDrawer";
import Header from "./Header";
import LoadingScreen from "../../common/loading/LoadingScreen";
import Empty from "../../common/other/Empty";
import { getRelativeDate } from "../../../app/common/util/dates";
import InfiniteScroll from "react-infinite-scroller";
import LoadingIndicator from "../../common/loading/LoadingIndicator";

const ItemsList = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadItems, loadingInitial, itemsByDate, setPage, page, totalPages, loadingNext } = rootStore.itemStore;

	const handleGetNext = () => {
		setPage(page + 1);
		loadItems();
	};

	const scrollableNodeRef = useRef(null);

	return (
		<div id="items-list">
			<Header />

			<div id="content-container">
				<ItemFilters classNames="xl-visible" />

				<div id="list-container">
					<ItemFiltersDrawer />

					{loadingInitial && <LoadingScreen size={2} />}

					{!loadingInitial && itemsByDate.length > 0 && (
						<SimpleBar
							style={{ height: "100%" }}
							autoHide={false}
							forceVisible="y"
							scrollbarMinSize={36}
							scrollableNodeProps={{ ref: scrollableNodeRef }}
						>
							<InfiniteScroll
								pageStart={0}
								loadMore={handleGetNext}
								hasMore={!loadingNext && page + 1 < totalPages}
								useWindow={false}
								getScrollParent={() => scrollableNodeRef.current}
							>
								<div id="list" ref={scrollableNodeRef}>
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

					<ItemDetailsDrawer />
				</div>
			</div>
		</div>
	);
};

export default observer(ItemsList);
