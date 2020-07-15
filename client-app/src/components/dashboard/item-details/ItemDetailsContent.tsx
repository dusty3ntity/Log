import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import TextEllipsis from "react-text-ellipsis";
import format from "date-fns/format";
import { Badge } from "antd";
import { Link } from "react-router-dom";

import { RootStoreContext } from "../../../app/stores/rootStore";
import { IItem, ItemType } from "../../../app/models/item";
import StarIcon from "../../icons/StarIcon";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import Button from "../../common/inputs/Button";

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

	return (
		<div id="details-container">
			<div className="header-row row">
				<Badge status={statusClass} className="status-badge" />
				<span className="type">{type}</span>
				<StarIcon className={starredClass} />
			</div>

			<div className="item-row row">
				<div className="original-row text-row">
					<TextEllipsis lines={2} tag="h2" tagClass={"original"}>
						{item.original}
					</TextEllipsis>
				</div>

				<div className="divider" />

				<div className="translation-row text-row">
					<TextEllipsis lines={2} tag="h3" tagClass={"translation"}>
						{item.translation}
					</TextEllipsis>
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
				<span className="date">Added {date}</span>
			</div>

			<div className="actions-row row">
				<Link className="btn edit-btn round actions-btn" to="/edit-item">
					<EditIcon />
				</Link>

				<Button
					className="star-btn actions-btn"
					onClick={item.isStarred ? unstarItem : starItem}
					icon={<StarIcon className={starredClass} />}
					loading={starring && loadingTarget.includes(item.id)}
				/>

				<Button
					className="delete-btn actions-btn"
					onClick={deleteItem}
					icon={<DeleteIcon />}
					loading={deleting}
				/>
			</div>
		</div>
	);
};

export default observer(ItemDetailsContent);
