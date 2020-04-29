import React from "react";
import { Layout } from "antd";
import NavBar from "../../components/navbar/NavBar";
import TopPanel from "../../components/top-panel/TopPanel";
import Dashboard from "../../components/dashboard/Dashboard";

const { Content } = Layout;

function App() {
	return (
		<Layout id="main">
			<NavBar />
			<Layout>
				<TopPanel />
				<Content id="items-list-content">
					<Dashboard />
				</Content>
			</Layout>
		</Layout>
	);
}

export default App;
