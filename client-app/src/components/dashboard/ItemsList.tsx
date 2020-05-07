import React, { useContext } from "react";
import { Layout, Space } from "antd";
import Search from "antd/lib/input/Search";
import ListItem from "./ListItem";
import SimpleBar from "simplebar-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const { Header, Content } = Layout;

const ItemsList = () => {
	const rootStore = useContext(RootStoreContext);
	const { itemsByDate } = rootStore.itemStore;

	return (
		<div id="items-list">
			<Layout>
				<Header id="items-list-header">
					<h2 id="items-list-title">Items</h2>
					<Space className="space" size="large">
						<button id="group-by-date-btn">
							<i id="group-by-date-icon" className="material-icons items-list-header-icon">
								insert_invitation
							</i>
						</button>
						<Search id="item-search" placeholder="item..." />
					</Space>
				</Header>
				<Content>
					<div id="list-container">
						<SimpleBar style={{ height: "100%" }} autoHide={false}>
							<div id="list">
								{itemsByDate.map((item) => (
									<ListItem key={item.id} item={item} />
								))}
							</div>
						</SimpleBar>
					</div>
				</Content>
			</Layout>
		</div>
	);
};

export default observer(ItemsList);
