import React, { Fragment } from "react";
import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import "mobx-react-lite/batchingForReactDom";
import { Route, Switch } from "react-router-dom";

import NavBar from "../../components/navbar/NavBar";
import TopPanel from "../../components/top-panel/TopPanel";
import Dashboard from "../../components/dashboard/Dashboard";
import HomePage from "../../components/home/HomePage";
import NewItem from "../../components/new-item/NewItem";
import NotFound from "./NotFound";

function App() {
	return (
		<Fragment>
			<Route exact path="/" component={HomePage} />

			<Route
				path={"/(.+)"}
				render={() => (
					<div id="main">
						<NavBar />
						<div id="page-content">
							<TopPanel />
							<Switch>
								<Route path="/dashboard" component={Dashboard} />
								<Route exact path="/new-item" component={NewItem} />

								<Route component={NotFound} />
							</Switch>
						</div>
					</div>
				)}
			/>
		</Fragment>
	);
}

export default observer(App);
