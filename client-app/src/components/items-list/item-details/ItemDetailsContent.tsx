import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import TextEllipsis from "react-text-ellipsis";
import format from "date-fns/format";
import { Link } from "react-router-dom";

import { RootStoreContext } from "../../../app/stores/rootStore";
import { IItem, ItemType } from "../../../app/models/item";
import StarIcon from "../../icons/StarIcon";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import Button from "../../common/inputs/Button";
import Tooltip from "../../common/tooltips/Tooltip";
import LearningItemProgress from "../../learning/LearningItemProgress";
import Divider from "../../common/other/Divider";
import ItemProgressBadge from "../../common/other/ItemProgressBadge";
import { createConfirmationModal } from "../../../app/common/components/modals";

interface IProps {
	item: IItem;
}

const ItemDetailsContent: React.FC<IProps> = ({ item }) => {
	const rootStore = useContext(RootStoreContext);
	const { deleteItem, starItem, unstarItem, starring, deleting, loadingTarget } = rootStore.itemStore;
	const { goToNextStep } = rootStore.tourStore;
	const { user } = rootStore.userStore;

	const type = item.type === ItemType.Word ? "Word" : "Phrase";
	const starredClass = item.isStarred ? " active" : "";

	const totalRepeatsCount =
		item.totalRepeatsCount > 999 ? Math.floor(item.totalRepeatsCount / 1000) + "k" : item.totalRepeatsCount;
	const correctAnswersCount =
		item.correctAnswersCount > 999 ? Math.floor(item.correctAnswersCount / 1000) + "k" : item.correctAnswersCount;

	const date = format(item.creationDate, "MM.dd.yyyy");

	const handleDelete = () => {
		const onOk = () => {
			deleteItem();
			if (!user!.tourCompleted && !user!.itemsTourCompleted) {
				goToNextStep();
			}
		};

		const modalContent = (
			<>
				<span>Are you sure you want to delete this item?</span>
				<span>This can't be undone.</span>
			</>
		);

		createConfirmationModal(modalContent, "Delete", onOk);
	};

	const handleStar = () => {
		if (!item.isLearned) {
			starItem();
			return;
		}

		const modalContent = (
			<>
				<span>Are you sure you want to star this item?</span>
				<span>This item is already learned, therefore its progress will be reset.</span>
			</>
		);

		createConfirmationModal(modalContent, "Star", starItem);
	};

	return (
		<div id="details-container">
			<div className="header-row row">
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
						tour-step="1-3"
					/>
				</Tooltip>

				<span className="type">{type}</span>

				<Tooltip
					text={
						item.isStarred
							? "This item will be present in every single training until it is learned."
							: "Starred items are present in every single training until they are learned. This one is not starred."
					}
					position="top-end"
				>
					<StarIcon className={starredClass} tourStep="1-4" />
				</Tooltip>
			</div>

			<div className="item-row row">
				<div className="original-row text-row" tour-step="1-5">
					<Tooltip text={item.original} position="top">
						<TextEllipsis lines={2} tag="h2" tagClass={"original"}>
							{item.original}
						</TextEllipsis>
					</Tooltip>
				</div>

				<Divider />

				<div className="translation-row text-row" tour-step="1-6">
					<Tooltip text={item.translation} position="bottom">
						<TextEllipsis lines={2} tag="h3" tagClass={"translation"}>
							{item.translation}
						</TextEllipsis>
					</Tooltip>
				</div>
			</div>

			<div className="definition-row row" tour-step="1-7">
				<TextEllipsis lines={3} tag="p" tagClass={"definition"}>
					{item.definition}
				</TextEllipsis>

				<h5 className="definition-origin">{item.definitionOrigin}</h5>
			</div>

			<div className="stats-row row">
				<div className="statistic">
					<div className="title">Total repeats</div>
					<div className="counter">{totalRepeatsCount}</div>
				</div>

				<div className="statistic">
					<div className="title">Correct answers</div>
					<div className="counter">{correctAnswersCount}</div>
				</div>
			</div>

			<div className="date-row row">
				<span className="date">Added on {date}</span>
			</div>

			<div className="actions-row row">
				<Link className="btn edit-btn round actions-btn" to="/edit-item">
					<EditIcon />
				</Link>

				<Tooltip
					text={
						item.isStarred
							? "This item will be present in every single training until it is learned."
							: "Starred items are present in every single training until they are learned. This one is not starred."
					}
					position="top"
				>
					<Button
						className="star-btn actions-btn"
						onClick={item.isStarred ? unstarItem : handleStar}
						icon={<StarIcon className={starredClass} />}
						loading={starring && loadingTarget.includes(item.id)}
					/>
				</Tooltip>

				<Button
					className="delete-btn actions-btn"
					onClick={handleDelete}
					icon={<DeleteIcon />}
					loading={deleting}
				/>
			</div>
		</div>
	);
};

export default observer(ItemDetailsContent);
