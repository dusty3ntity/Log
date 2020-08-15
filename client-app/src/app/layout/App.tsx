import React, { Fragment, useEffect, useContext } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { history } from "../..";
import "mobx-react-lite/batchingForReactDom";

import LoginPage from "../../components/users/LoginPage";
import RegistrationPage from "../../components/users/RegistrationPage";
import HomePage from "../../components/home/HomePage";
import Page from "./Page";
import ItemsListPage from "../../components/items-list/ItemsListPage";
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
import { setAnalyticsPageView } from "../common/analytics/analytics";
import OnboardingPage from "../../components/users/OnboardingPage";
import AnonymousRedirectPage from "./AnonymousRedirectPage";
import OnboardingTour from "../../components/common/other/OnboardingTour";

function App() {
	const rootStore = useContext(RootStoreContext);
	const { setAppLoaded, token, appLoaded, onInitialLoad } = rootStore.commonStore;
	const { user } = rootStore.userStore;

	useEffect(() => {
		if (token) {
			onInitialLoad(true).finally(setAppLoaded);
		} else {
			setAppLoaded();
		}
		setAnalyticsPageView(history.location.pathname);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onInitialLoad, setAppLoaded]); // I don't need the "token" dependency!

	if (!appLoaded) {
		return <LoadingScreen size={3} />;
	}

	return (
		<Fragment>
			{user && !user.tourCompleted && <OnboardingTour />}

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
						<Route exact path="/register" component={RegistrationPage} />

						<PrivateRoute exact path="/before-we-begin">
							<AnonymousRedirectPage>
								<OnboardingPage />
							</AnonymousRedirectPage>
						</PrivateRoute>

						<PrivateRoute exact path="/items-list">
							<Page title="Items list" pageTitle="Items list" component={<ItemsListPage />} />
						</PrivateRoute>

						<PrivateRoute exact path="/new-dictionary">
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
						<PrivateRoute exact path="/profile" component={Soon} />

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
