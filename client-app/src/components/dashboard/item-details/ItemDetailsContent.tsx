import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import TextEllipsis from "react-text-ellipsis";
import format from "date-fns/format";
import { Badge, Statistic } from "antd";

import { RootStoreContext } from "../../../app/stores/rootStore";
import { IItem } from "../../../app/models/item";
import StarIcon from "../../icons/StarIcon";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";

interface IProps {
	item: IItem;
}

const ItemDetailsContent: React.FC<IProps> = ({ item }) => {
	const rootStore = useContext(RootStoreContext);
	const { deleteItem, starItem, unstarItem, openEditor } = rootStore.itemStore;

	const statusClass = item.isLearned ? "success" : item.totalRepeatsCount > 0 ? "warning" : "default";
	const type = item.type === 10 ? "Word" : "Phrase";
	const starredClass = item.isStarred ? " active" : "";

	const date = format(new Date(item.creationDate.toString().split("T")[0]), "MM.dd.yyyy");

	return (
		<div id="details-container">
			<div className="header-row row">
				<Badge status={statusClass} className="status-badge" />
				<span className="type">{type}</span>
				<StarIcon classNames={starredClass} />
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
				<TextEllipsis lines={4} tag="p" tagClass={"definition"}>
					{item.definition}
				</TextEllipsis>

				<h5 className="definition-origin">{item.definitionOrigin}</h5>
			</div>

			<div className="stats-row row">
				<Statistic title="Total repeats" value={item.totalRepeatsCount} />

				<Statistic title="Correct answers" value={item.correctRepeatsCount} />
			</div>

			<div className="date-row row">
				<span className="date">Added {date}</span>
			</div>

			<div className="actions-row row">
				<button className="btn edit-btn round actions-btn" onClick={openEditor}>
					<EditIcon />
				</button>

				<button className="btn star-btn round actions-btn" onClick={item.isStarred ? unstarItem : starItem}>
					<StarIcon classNames={starredClass} />
				</button>

				<button className="btn delete-btn round actions-btn" onClick={deleteItem}>
					<DeleteIcon />
				</button>
			</div>
		</div>
	);
};

export default observer(ItemDetailsContent);
