import React, { Fragment, useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import "mobx-react-lite/batchingForReactDom";

import LoginPage from "../../components/users/LoginPage";
import RegistrationPage from "../../components/users/RegistrationPage";
import HomePage from "../../components/home/HomePage";
import Page from "./Page";
import Dashboard from "../../components/dashboard/Dashboard";
import NewItem from "../../components/manage-item/NewItem";
import EditItem from "../../components/manage-item/EditItem";
import Learning from "../../components/learning/Learning";
import NewDictionary from "../../components/dictionaries/NewDictionary";
import DictionariesSettings from "../../components/dictionaries/DictionariesSettings";
import NotFound from "./NotFound";
import { RootStoreContext } from "../stores/rootStore";
import PrivateRoute from "./PrivateRoute";

function App() {
	const rootStore = useContext(RootStoreContext);
	const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
	const { getUser } = rootStore.userStore;

	useEffect(() => {
		if (token) {
			getUser().finally(() => {
				setAppLoaded();
			});
		} else {
			setAppLoaded();
		}
	}, [getUser, token, setAppLoaded]);

	if (!appLoaded) {
		return <div></div>;
	}

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
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/registration" component={RegistrationPage} />

						<PrivateRoute
							path="/dashboard"
							component={<Page title="Dashboard" pageTitle="Dashboard" component={<Dashboard />} />}
						/>

						<PrivateRoute
							path="/new-dictionary"
							component={
								<Page title="New dictionary" pageTitle="New dictionary" component={<NewDictionary />} />
							}
						/>

						<PrivateRoute
							path="/dictionaries"
							component={
								<Page
									title="Dictionaries"
									pageTitle="Dictionaries"
									component={<DictionariesSettings />}
								/>
							}
						/>

						<PrivateRoute
							exact
							path="/new-item"
							component={<Page title="New item" pageTitle="New item" component={<NewItem />} />}
						/>

						<PrivateRoute
							exact
							path="/edit-item"
							component={<Page title="Edit item" pageTitle="Edit item" component={<EditItem />} />}
						/>

						<PrivateRoute
							exact
							path="/learning"
							component={<Page title="Learning" pageTitle="Learning" component={<Learning />} />}
						/>

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
