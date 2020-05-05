import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Layout } from "antd";
import ItemFilters from "./ItemFilters";
import ItemDetails from "./ItemDetails";
import ItemsList from "./ItemsList";

const { Content, Sider } = Layout;

const Dashboard = () => {
	const rootStore = useContext(RootStoreContext);
	const { loadItems, loadingInitial } = rootStore.itemStore;

	useEffect(() => {
		loadItems();
	}, [loadItems]);

	if (loadingInitial) return <div></div>;

	return (
		<div id="dashboard">
			<Layout>
				<Sider
					id="item-filters"
					className="dashboard-sider"
					width={186}
					trigger={null}
					collapsible
					breakpoint={"xl"}
					collapsedWidth={0}
				>
					<ItemFilters />
				</Sider>
				
				<Content>
					<ItemsList />
				</Content>

				<Sider
					id="item-details"
					className="dashboard-sider"
					width={328}
					trigger={null}
					collapsible
					breakpoint={"xl"}
					collapsedWidth={0}
				>
					<ItemDetails />
				</Sider>
			</Layout>
		</div>
	);
};

export default Dashboard;
