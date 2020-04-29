import React from "react";
import { Layout } from "antd";
import ItemFilters from "./ItemFilters";
import ItemDetails from "./ItemDetails";
import ItemsList from "./ItemsList";

const { Content } = Layout;

const Dashboard = () => {
	return (
		<div id="dashboard">
			<Layout>
				<ItemFilters />
				<Content>
					<ItemsList />
				</Content>
				<ItemDetails />
			</Layout>
		</div>
	);
};

export default Dashboard;
