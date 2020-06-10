import React, { useContext } from "react";
import { Divider, Checkbox, Button } from "antd";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../app/stores/rootStore";
import { IItem } from "../../../app/models/item";

interface IProps {
	item: IItem;
}

const ListItem: React.FC<IProps> = ({ item }) => {
	const rootStore = useContext(RootStoreContext);
	const { selectItem, starItemById, unstarItemById, activeItem } = rootStore.itemStore;

	const progressClass = item.isLearned ? "learned" : item.totalRepeatsCount > 0 ? "in-progress" : "untouched";
	const starredClass = item.isStarred ? " active" : "";
	const focusClass = item === activeItem ? " active" : "";

	return (
			<div className={"list-item" + focusClass}>
				<div className="selector-col col">
					<div className={"progress-bar " + progressClass}>‌‌</div>
					<Checkbox className="selector" />
				</div>

				<a className="text-container" onClick={() => selectItem(item.id)}>
					<div className="text-col col original">{item.original}</div>

					<div className="divider-col col">
						<Divider type="vertical" />
					</div>

					<div className="text-col col translation">{item.translation}</div>
				</a>

				<div className="actions-col col">
					<Button
						className="star-btn actions-btn"
						onClick={item.isStarred ? () => unstarItemById(item.id) : () => starItemById(item.id)}
					>
						<i className={"material-icons star-icon" + starredClass}>star</i>
					</Button>
				</div>
			</div>
	);
};

export default observer(ListItem);
