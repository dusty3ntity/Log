import React, { Fragment, useEffect, useContext } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
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
import LoadingScreen from "../../components/common/loading/LoadingScreen";
import Soon from "./Soon";

function App() {
	const rootStore = useContext(RootStoreContext);
	const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
	const { getUser } = rootStore.userStore;
	const { loadDictionaries } = rootStore.dictionaryStore;

	useEffect(() => {
		if (token) {
			getUser()
				.then(loadDictionaries)
				.finally(() => {
					setAppLoaded();
				});
		} else {
			setAppLoaded();
		}
	}, [getUser, token, loadDictionaries, setAppLoaded]);

	if (!appLoaded) {
		return <LoadingScreen size={3} />;
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

						<PrivateRoute exact path="/dashboard">
							<Page title="Dashboard" pageTitle="Dashboard" component={<Dashboard />} />
						</PrivateRoute>

						<PrivateRoute path="/new-dictionary">
							<Page title="New dictionary" pageTitle="New dictionary" component={<NewDictionary />} />
						</PrivateRoute>

						<PrivateRoute exact path="/dictionaries/">
							<Page title="Dictionaries" pageTitle="Dictionaries" component={<DictionariesSettings />} />
						</PrivateRoute>

						<PrivateRoute exact path="/new-item">
							<Page title="New item" pageTitle="New item" component={<NewItem />} />
						</PrivateRoute>

						<PrivateRoute exact path="/edit-item">
							<Page title="Edit item" pageTitle="Edit item" component={<EditItem />} />
						</PrivateRoute>

						<PrivateRoute exact path="/learning">
							<Page title="Learning" pageTitle="Learning" component={<Learning />} />
						</PrivateRoute>

						<PrivateRoute exact path="/learning">
							<Page title="Learning" pageTitle="Learning" component={<Learning />} />
						</PrivateRoute>

						<PrivateRoute exact path="/statistics" component={Soon} />
						<PrivateRoute exact path="/settings" component={Soon} />

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

export default withRouter(observer(App));
