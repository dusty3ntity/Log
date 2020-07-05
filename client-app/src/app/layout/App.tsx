import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import "mobx-react-lite/batchingForReactDom";

import HomePage from "../../components/home/HomePage";
import Page from "./Page";
import Dashboard from "../../components/dashboard/Dashboard";
import NewItem from "../../components/manage-item/NewItem";
import EditItem from "../../components/manage-item/EditItem";
import Learning from "../../components/learning/Learning";
import NewDictionary from "../../components/dictionaries/NewDictionary";
import NotFound from "./NotFound";

function App() {
	return (
		<Fragment>
			<ToastContainer
				position="bottom-right"
				limit={3}
				draggable={false}
				hideProgressBar
				closeOnClick={false}
				autoClose={5000}
			/>
			<Route exact path="/" component={HomePage} />

			<Route
				path={"/(.+)"}
				render={() => (
					<Switch>
						<Route path="/dashboard">
							<Page title="Dashboard" pageTitle="Dashboard" component={<Dashboard />} />
						</Route>

						<Route path="/new-dictionary">
							<Page title="New dictionary" pageTitle="New dictionary" component={<NewDictionary />} />
						</Route>

						<Route exact path="/new-item">
							<Page title="New item" pageTitle="New item" component={<NewItem />} />
						</Route>

						<Route exact path="/edit-item">
							<Page title="Edit item" pageTitle="Edit item" component={<EditItem />} />
						</Route>

						<Route exact path="/learning">
							<Page title="Learning" pageTitle="Learning" component={<Learning />} />
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
