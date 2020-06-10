import React, { useContext } from "react";
import { Space, Divider, Badge, Statistic, Button } from "antd";
import { observer } from "mobx-react-lite";
import format from "date-fns/format";

import TextEllipsis from "react-text-ellipsis";

import { RootStoreContext } from "../../../app/stores/rootStore";
import { IItem } from "../../../app/models/item";

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
				<i className={"material-icons starred-icon" + starredClass}>star</i>
			</div>

			<div className="item-row row">
				<div className="original-row text-row">
					<TextEllipsis lines={2} tag="h2" tagClass={"original"}>
						{item.original}
					</TextEllipsis>
				</div>

				<Divider />

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
				<Space size="large" className="actions-space">
					<Button className="edit-btn actions-btn" onClick={openEditor}>
						<i className="material-icons">edit</i>
					</Button>

					<Button className="star-btn actions-btn" onClick={item.isStarred ? unstarItem : starItem}>
						<i className={"material-icons" + starredClass}>star</i>
					</Button>

					<Button className="delete-btn actions-btn" onClick={deleteItem}>
						<i className="material-icons">delete</i>
					</Button>
				</Space>
			</div>
		</div>
	);
};

export default observer(ItemDetailsContent);
