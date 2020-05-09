import React, { Fragment } from "react";
import { Layout } from "antd";
import NavBar from "../../components/navbar/NavBar";
import TopPanel from "../../components/top-panel/TopPanel";
import Dashboard from "../../components/dashboard/Dashboard";
import { observer } from "mobx-react-lite";
import "mobx-react-lite/batchingForReactDom";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../components/home/HomePage";
import NewItem from "../../components/new-item/NewItem";
import NotFound from "./NotFound";

const { Content } = Layout;

function App() {
	return (
		<Fragment>
			<Route exact path="/" component={HomePage} />

			<Route
				path={"/(.+)"}
				render={() => (
					<Layout id="main">
						<NavBar />
						<Layout>
							<TopPanel />
							<Switch>
								<Route path="/dashboard" component={Dashboard} />
								<Route exact path="/new-item" component={NewItem} />

								<Route component={NotFound} />
							</Switch>
						</Layout>
					</Layout>
				)}
			/>
		</Fragment>
	);
}

export default observer(App);
