import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "mobx-react-lite/batchingForReactDom";

import HomePage from "../../components/home/HomePage";
import Page from "./Page";
import Dashboard from "../../components/dashboard/Dashboard";
import NewItem from "../../components/new-item/NewItem";
import NotFound from "./NotFound";

function App() {
	return (
		<Fragment>
			<Route exact path="/" component={HomePage} />

			<Route
				path={"/(.+)"}
				render={() => (
					<Switch>
						<Route path="/dashboard">
							<Page title="Dashboard" pageTitle="Dashboard" component={<Dashboard />} />
						</Route>

						<Route exact path="/new-item">
							<Page title="New item" pageTitle="New item" component={<NewItem />} />
						</Route>

						<Route exact path="/404" component={NotFound} />

						<Route>
							<Redirect to="/404" />
						</Route>
					</Switch>
				)}
			/>
		</Fragment>
	);
}

export default observer(App);
