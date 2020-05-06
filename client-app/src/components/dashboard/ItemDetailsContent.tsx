import React, { useContext, Fragment } from "react";
import { Row, Space, Divider } from "antd";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { IItem } from "../../app/models/item";

interface IProps {
	item: IItem;
}

const ItemDetailsContent: React.FC<IProps> = ({ item }) => {
	const rootStore = useContext(RootStoreContext);
	const { deleteItem, starItem, unstarItem, openEditor } = rootStore.itemStore;

	return (
		<Fragment>
			<div id="details-container">
				<Row id="header-row" align="middle" justify="center">
					{item.isStarred && <div>Starred</div>}
				</Row>

				<Row id="item-row" align="middle" justify="center">
					<h2 className="original">{item.original}</h2>
					<span className="type">Word</span>
					<Divider />
					<h3 className="translation">{item.translation}</h3>
					{item.description && <p className="description">{item.description}</p>}
					{/* <span className="description-origin">Cambridge Dictionary</span> */}
				</Row>

				<Row id="stats-row" align="middle" justify="center"></Row>

				<Row id="actions-row" align="middle" justify="center">
					<Space size="large">
						<button id="edit-btn" className="actions-btn" onClick={openEditor}>
							<i id="edit-icon" className="material-icons actions-icon">
								edit
							</i>
						</button>

						<button
							id="star-btn"
							className="actions-btn"
							onClick={item.isStarred ? unstarItem : starItem}
						>
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
