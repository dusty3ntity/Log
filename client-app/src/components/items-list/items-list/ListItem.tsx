import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../app/stores/rootStore";
import { IItem } from "../../../app/models/item";
import StarIcon from "../../icons/StarIcon";
import Button from "../../common/inputs/Button";
import Tooltip from "../../common/tooltips/Tooltip";
import LearningItemProgress from "../../learning/LearningItemProgress";
import Divider from "../../common/other/Divider";
import ItemProgressBadge from "../../common/other/ItemProgressBadge";
import Checkbox from "../../common/inputs/Checkbox";
import { createConfirmationModal } from "../../../app/common/components/modals";

interface IProps {
	item: IItem;
}

const ListItem: React.FC<IProps> = ({ item }) => {
	const rootStore = useContext(RootStoreContext);
	const { selectItem, starItemById, unstarItemById, activeItem, starring, loadingTarget } = rootStore.itemStore;
	const { goToNextStep } = rootStore.tourStore;
	const { user } = rootStore.userStore;

	const starredClass = item.isStarred ? " active" : "";

	const handleStar = () => {
		if (!item.isLearned) {
			starItemById(item.id);
			return;
		}

		const onOk = () => {
			starItemById(item.id);
		};

		const modalContent = (
			<>
				<span>Are you sure you want to star this item?</span>
				<span>This item is already learned, therefore its progress will be reset.</span>
			</>
		);

		createConfirmationModal(modalContent, "Star", onOk);
	};

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
					<ItemProgressBadge
						status={
							item.isLearned
								? "learned"
								: item.correctAnswersToCompletionCount > 0
								? "in-progress"
								: "no-progress"
						}
						rectangular
					/>
				</Tooltip>
				<Checkbox classNames={["selector"]} />
			</div>

			<button
				className="text-container btn"
				onClick={() => {
					if (!user!.tourCompleted && !user!.itemsTourCompleted) {
						goToNextStep();
					}
					selectItem(item.id);
				}}
			>
				<div className="text-content">
					<Tooltip text={item.original} position="top">
						<span className="fake-text">{item.original}</span>
					</Tooltip>

					<span className="text original">{item.original}</span>
				</div>

				<Divider vertical />

				<div className="text-content">
					<Tooltip text={item.translation} position="top">
						<span className="fake-text">{item.translation}</span>
					</Tooltip>

					<span className="text translation">{item.translation}</span>
				</div>
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
						onClick={item.isStarred ? () => unstarItemById(item.id) : handleStar}
						loading={starring && loadingTarget.includes(item.id)}
					/>
				</Tooltip>
			</div>
		</div>
	);
};

export default observer(ListItem);
