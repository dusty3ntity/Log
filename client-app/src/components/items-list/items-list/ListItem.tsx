import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Checkbox } from "antd";

import { RootStoreContext } from "../../../app/stores/rootStore";
import { IItem } from "../../../app/models/item";
import StarIcon from "../../icons/StarIcon";
import Button from "../../common/inputs/Button";
import Tooltip from "../../common/tooltips/Tooltip";
import LearningItemProgress from "../../learning/LearningItemProgress";

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
				<Tooltip
					content={
						<LearningItemProgress
							total={rootStore.dictionaryStore.activeDictionary.correctAnswersToItemCompletion}
							checked={item.correctAnswersToCompletionCount}
							secondTraining={false}
						/>
					}
					interactive
					position="top-start"
					theme="light"
				>
					<div className={"progress-bar " + progressClass} />
				</Tooltip>
				<Checkbox className="selector" />
			</div>

			<button className="text-container btn" onClick={() => selectItem(item.id)}>
				<Tooltip text={item.original} position="top">
					<div className="text original">{item.original}</div>
				</Tooltip>

				<div className="divider vertical" />
				<Tooltip text={item.translation} position="top">
					<div className="text translation">{item.translation}</div>
				</Tooltip>
			</button>

			<div className="actions-col col">
				<Tooltip
					text={
						item.isStarred
							? "This item will be present in every single training until it is learned."
							: "Starred items are present in every single training until they are learned. This one is not starred."
					}
					position="top-end"
				>
					<Button
						className="star-btn actions-btn"
						icon={<StarIcon className={starredClass} />}
						onClick={item.isStarred ? () => unstarItemById(item.id) : () => starItemById(item.id)}
						loading={starring && loadingTarget.includes(item.id)}
					/>
				</Tooltip>
			</div>
		</div>
	);
};

export default observer(ListItem);
