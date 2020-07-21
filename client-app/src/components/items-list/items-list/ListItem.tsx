import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Checkbox } from "antd";

import { RootStoreContext } from "../../../app/stores/rootStore";
import { IItem } from "../../../app/models/item";
import StarIcon from "../../icons/StarIcon";
import Button from "../../common/inputs/Button";
import Divider from "../../common/other/Divider";

interface IProps {
	item: IItem;
}

const ListItem: React.FC<IProps> = ({ item }) => {
	const rootStore = useContext(RootStoreContext);
	const { selectItem, starItemById, unstarItemById, activeItem, starring, loadingTarget } = rootStore.itemStore;

	const progressClass = item.isLearned
		? "learned"
		: item.correctAnswersToCompletionCount > 0
		? "in-progress"
		: "untouched";
	const starredClass = item.isStarred ? " active" : "";

	return (
		<div className={`list-item + ${item.id === activeItem?.id ? "active" : ""}`}>
			<div className="selector-col col">
				<div className={"progress-bar " + progressClass}>‌‌</div>
				<Checkbox className="selector" />
			</div>

			<button className="text-container btn" onClick={() => selectItem(item.id)}>
				<div className="text original">{item.original}</div>

				<Divider vertical />

				<div className="text translation">{item.translation}</div>
			</button>

			<div className="actions-col col">
				<Button
					className="star-btn actions-btn"
					icon={<StarIcon className={starredClass} />}
					onClick={item.isStarred ? () => unstarItemById(item.id) : () => starItemById(item.id)}
					loading={starring && loadingTarget.includes(item.id)}
				/>
			</div>
		</div>
	);
};

export default observer(ListItem);
