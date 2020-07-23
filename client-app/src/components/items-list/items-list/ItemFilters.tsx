import React, { useContext } from "react";
import { Checkbox, Badge } from "antd";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../app/stores/rootStore";
import Divider from "../../common/other/Divider";
import { fireAnalyticsEvent } from "../../../app/common/analytics/analytics";

interface IProps {
	classNames: string;
}

const ItemFilters: React.FC<IProps> = ({ classNames }) => {
	const rootStore = useContext(RootStoreContext);
	const { predicate, setPredicate, loadingInitial } = rootStore.itemStore;

	const handleCheckboxClick = (name: string) => {
		if (predicate.get(name)) {
			setPredicate(name, undefined);
			fireAnalyticsEvent("Items", "Disabled an item filter", name);
		} else {
			setPredicate(name, true);
			fireAnalyticsEvent("Items", "Enabled an item filter", name);
		}
	};

	return (
		<div id="item-filters" className={classNames}>
			<div className="filters-container">
				<div className="filters-category">
					<h2 className="category-title">Type</h2>
					<Checkbox
						className="filters-item"
						checked={!!predicate.get("words")}
						disabled={loadingInitial}
						onClick={() => handleCheckboxClick("words")}
					>
						<span className="item-name">Words</span>
					</Checkbox>
					<Checkbox
						className="filters-item"
						checked={!!predicate.get("phrases")}
						disabled={loadingInitial}
						onClick={() => handleCheckboxClick("phrases")}
					>
						<span className="item-name">Phrases</span>
					</Checkbox>
				</div>

				<Divider />

				<div className="filters-category">
					<h2 className="category-title">Progress</h2>
					<Checkbox
						className="filters-item"
						checked={!!predicate.get("learned")}
						disabled={loadingInitial}
						onClick={() => handleCheckboxClick("learned")}
					>
						<span className="item-name">Learned</span>
						<Badge status="success" />
					</Checkbox>

					<Checkbox
						className="filters-item"
						checked={!!predicate.get("inProgress")}
						disabled={loadingInitial}
						onClick={() => handleCheckboxClick("inProgress")}
					>
						<span className="item-name">In progress</span>
						<Badge status="warning" />
					</Checkbox>

					<Checkbox
						className="filters-item"
						checked={!!predicate.get("noProgress")}
						disabled={loadingInitial}
						onClick={() => handleCheckboxClick("noProgress")}
					>
						<span className="item-name">No progress</span>
						<Badge status="default" />
					</Checkbox>
				</div>
			</div>
		</div>
	);
};

export default observer(ItemFilters);
