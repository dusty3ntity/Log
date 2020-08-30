import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../app/stores/rootStore";
import Divider from "../../common/other/Divider";
import { fireAnalyticsEvent } from "../../../app/common/analytics/analytics";
import StarIcon from "../../icons/StarIcon";
import ItemProgressBadge from "../../common/other/ItemProgressBadge";
import Checkbox from "../../common/inputs/Checkbox";

interface IProps {
	classNames?: string;
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
						classNames={["filters-item"]}
						checked={!!predicate.get("words")}
						disabled={loadingInitial}
						onChange={() => handleCheckboxClick("words")}
					>
						<span className="item-name">Words</span>
					</Checkbox>

					<Checkbox
						classNames={["filters-item"]}
						checked={!!predicate.get("phrases")}
						disabled={loadingInitial}
						onChange={() => handleCheckboxClick("phrases")}
					>
						<span className="item-name">Phrases</span>
					</Checkbox>
				</div>

				<Divider />

				<div className="filters-category">
					<h2 className="category-title">Progress</h2>

					<Checkbox
						classNames={["filters-item"]}
						checked={!!predicate.get("learned")}
						disabled={loadingInitial}
						onChange={() => handleCheckboxClick("learned")}
					>
						<span className="item-name">Learned</span>
						<ItemProgressBadge status="learned" />
					</Checkbox>

					<Checkbox
						classNames={["filters-item"]}
						checked={!!predicate.get("inProgress")}
						disabled={loadingInitial}
						onChange={() => handleCheckboxClick("inProgress")}
					>
						<span className="item-name">In progress</span>
						<ItemProgressBadge status="in-progress" />
					</Checkbox>

					<Checkbox
						classNames={["filters-item"]}
						checked={!!predicate.get("noProgress")}
						disabled={loadingInitial}
						onChange={() => handleCheckboxClick("noProgress")}
					>
						<span className="item-name">No progress</span>
						<ItemProgressBadge status="no-progress" />
					</Checkbox>
				</div>

				<Divider />

				<div className="filters-category">
					<h2 className="category-title">Priority</h2>

					<Checkbox
						classNames={["filters-item"]}
						checked={!!predicate.get("starred")}
						disabled={loadingInitial}
						onChange={() => handleCheckboxClick("starred")}
					>
						<span className="item-name">Starred</span>
						<StarIcon className="label-icon" active />
					</Checkbox>

					<Checkbox
						classNames={["filters-item"]}
						checked={!!predicate.get("unstarred")}
						disabled={loadingInitial}
						onChange={() => handleCheckboxClick("unstarred")}
					>
						<span className="item-name">Unstarred</span>
						<StarIcon className="label-icon" />
					</Checkbox>
				</div>
			</div>
		</div>
	);
};

export default observer(ItemFilters);
