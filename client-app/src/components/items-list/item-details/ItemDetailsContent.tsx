import React, { useContext, Fragment } from "react";
import { observer } from "mobx-react-lite";
import TextEllipsis from "react-text-ellipsis";
import format from "date-fns/format";
import { Badge, Modal } from "antd";
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
import { fireAnalyticsEvent } from "../../../app/common/analytics/analytics";

interface IProps {
	item: IItem;
}

const ItemDetailsContent: React.FC<IProps> = ({ item }) => {
	const rootStore = useContext(RootStoreContext);
	const { deleteItem, starItem, unstarItem, starring, deleting, loadingTarget } = rootStore.itemStore;

	const statusClass = item.isLearned ? "success" : item.correctAnswersToCompletionCount > 0 ? "warning" : "default";
	const type = item.type === ItemType.Word ? "Word" : "Phrase";
	const starredClass = item.isStarred ? " active" : "";

	const totalRepeatsCount =
		item.totalRepeatsCount > 999 ? Math.floor(item.totalRepeatsCount / 1000) + "k" : item.totalRepeatsCount;
	const correctAnswersCount =
		item.correctAnswersCount > 999 ? Math.floor(item.correctAnswersCount / 1000) + "k" : item.correctAnswersCount;

	const date = format(item.creationDate, "MM.dd.yyyy");

	const handleDelete = () => {
		Modal.confirm({
			title: "Confirmation",
			content: (
				<Fragment>
					<span>Are you sure you want to delete this item?</span>
					<span>This can't be undone.</span>
				</Fragment>
			),
			width: "35rem",
			maskClosable: true,
			centered: true,
			okText: "Delete",
			okButtonProps: {
				className: "btn modal-btn confirm-btn delete-btn",
			},
			onOk() {
				deleteItem();
				fireAnalyticsEvent("Items", "Deleted an item");
			},
			cancelButtonProps: {
				className: "btn modal-btn cancel-btn",
			},
		});
	};

	const handleStar = () => {
		if (!item.isLearned) {
			starItem();
			fireAnalyticsEvent("Items", "Starred an item");
			return;
		}

		Modal.confirm({
			title: "Confirmation",
			content: (
				<Fragment>
					<span>Are you sure you want to star this item?</span>
					<span>This item is already learned, therefore its progress will be reset.</span>
				</Fragment>
			),
			width: "35rem",
			maskClosable: true,
			centered: true,
			okText: "Star",
			okButtonProps: {
				className: "btn modal-btn confirm-btn",
			},
			onOk() {
				starItem();
				fireAnalyticsEvent("Items", "Starred an item");
			},
			cancelButtonProps: {
				className: "btn modal-btn cancel-btn",
			},
		});
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
					position="bottom-start"
					theme="light"
				>
					<Badge status={statusClass} className="status-badge" />
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
					<StarIcon className={starredClass} />
				</Tooltip>
			</div>

			<div className="item-row row">
				<div className="original-row text-row">
					<Tooltip text={item.original} position="top">
						<TextEllipsis lines={2} tag="h2" tagClass={"original"}>
							{item.original}
						</TextEllipsis>
					</Tooltip>
				</div>

				<Divider />

				<div className="translation-row text-row">
					<Tooltip text={item.translation} position="bottom">
						<TextEllipsis lines={2} tag="h3" tagClass={"translation"}>
							{item.translation}
						</TextEllipsis>
					</Tooltip>
				</div>
			</div>

			<div className="definition-row row">
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
						onClick={
							item.isStarred
								? () => {
										unstarItem();
										fireAnalyticsEvent("Items", "Unstarred an item");
								  }
								: handleStar
						}
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
