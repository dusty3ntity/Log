import React, { useContext, Fragment } from "react";
import { Row, Space, Divider, Col, Badge, Statistic } from "antd";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { IItem } from "../../app/models/item";
import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO'

interface IProps {
	item: IItem;
}

const ItemDetailsContent: React.FC<IProps> = ({ item }) => {
	const rootStore = useContext(RootStoreContext);
	const { deleteItem, starItem, unstarItem, openEditor } = rootStore.itemStore;

	const status = item.isLearned ? "success" : item.totalRepeatsCount > 0 ? "warning" : "default";
	const type = item.type === 10 ? "Word" : "Phrase";
	const isStarred = item.isStarred ? " active" : "";

	const date = format(new Date(item.creationDate.toString().split("T")[0]), "MM.dd.yyyy");

	return (
		<Fragment>
			<div id="details-container">
				<Row id="header-row" align="top">
						<Col span={8}><Badge status={status} className="status"/></Col>
						<Col span={8}><p className="type">{type}</p></Col>
						<Col span={8}>
							<i className={`material-icons starred-icon${isStarred}`}>
								star
							</i>
						</Col>
				</Row>

				<Row id="item-row" align="top" justify="center">
					<h2 className="original">{item.original}</h2>
					<Divider />
					<h3 className="translation">{item.translation}</h3>
					{item.description && <p className="description">{item.description}</p>}
					{/* <span className="description-origin">Cambridge Dictionary</span> */}
				</Row>

				<Row id="stats-row" align="middle" justify="center" gutter={32}>
					<Col span={12}>
						<Statistic title="Total repeats" value={item.totalRepeatsCount} />
					</Col>

					<Col span={12}>
						<Statistic title="Correct answers" value={item.correctRepeatsCount} />
					</Col>
				</Row>

				<Row id="date-row" align="bottom" justify="center">
					<span id="date">Added {date}</span>
				</Row>

				<Row id="actions-row" align="bottom" justify="center">
					<Space size="large">
						<button id="edit-btn" className="actions-btn" onClick={openEditor}>
							<i id="edit-icon" className="material-icons actions-icon">
								edit
							</i>
						</button>

						<button id="star-btn" className="actions-btn" onClick={item.isStarred ? unstarItem : starItem}>
							<i id="star-icon" className="material-icons actions-icon">
								star
							</i>
						</button>

						<button id="delete-btn" className="actions-btn" onClick={deleteItem}>
							<i id="delete-icon" className="material-icons actions-icon">
								delete
							</i>
						</button>
					</Space>
				</Row>
			</div>
		</Fragment>
	);
};

export default observer(ItemDetailsContent);
