import React, { useContext, Fragment } from "react";
import { Row, Space, Divider } from "antd";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const ItemDetailsContent = () => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem, deleteItem, starItem, unstarItem } = rootStore.itemStore;

	return (
		<Fragment>
			<div id="details-container">
				<Row id="header-row" align="middle" justify="center">
					{activeItem!.isStarred && <div>Starred</div>}
				</Row>

				<Row id="item-row" align="middle" justify="center">
					<h2 id="original">{activeItem!.original}</h2>
					<span id="type">Word</span>
					<Divider />
					<h3 id="translation">{activeItem!.translation}</h3>
					{activeItem?.description && <p id="description">{activeItem.description}</p>}
					{/* <span id="description-origin">Cambridge Dictionary</span> */}
				</Row>

				<Row id="stats-row" align="middle" justify="center"></Row>

				<Row id="actions-row" align="middle" justify="center">
					<Space size="large">
						<button id="edit-btn" className="actions-btn">
							<i id="edit-icon" className="material-icons actions-icon">
								edit
							</i>
						</button>

						<button
							id="star-btn"
							className="actions-btn"
							onClick={activeItem!.isStarred ? unstarItem : starItem}
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
