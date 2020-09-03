import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import "mobx-react-lite/batchingForReactDom";

import { RootStoreContext } from "../stores/rootStore";
import LoginPage from "../../components/users/LoginPage";
import RegistrationPage from "../../components/users/RegistrationPage";
import HomePage from "./HomePage";
import ItemsListPage from "../../components/items-list/ItemsListPage";
import NewItemPage from "../../components/manage-item/NewItemPage";
import EditItemPage from "../../components/manage-item/EditItemPage";
import LearningPage from "../../components/learning/LearningPage";
import NewDictionaryPage from "../../components/dictionaries/NewDictionaryPage";
import DictionariesSettingsPage from "../../components/dictionaries/DictionariesSettingsPage";
import NotFoundPage from "./NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import LoadingScreen from "../../components/common/loading/LoadingScreen";
import SoonPage from "./SoonPage";
import OnboardingPage from "../../components/users/OnboardingPage";
import OnboardingTour from "../../components/users/OnboardingTour";

const App: React.FC = () => {
	const rootStore = useContext(RootStoreContext);
	const { setAppLoaded, token, appLoaded, onInitialLoad } = rootStore.commonStore;
	const { user } = rootStore.userStore;

	useEffect(() => {
		if (token) {
			onInitialLoad(true).finally(setAppLoaded);
		} else {
			setAppLoaded();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onInitialLoad, setAppLoaded]);

	if (!appLoaded) {
		return <LoadingScreen size={3} />;
	}

	return (
		<>
			{user && !user.tourCompleted && <OnboardingTour />}

			<ToastContainer
				position="bottom-right"
				limit={3}
				draggable={false}
				hideProgressBar
				closeOnClick={false}
				autoClose={5000}
			/>

			<Route exact path="/">
				<HomePage />
			</Route>

			<Route
				path={"/(.+)"}
				render={() => (
					<Switch>
						<Route exact path="/login">
							<LoginPage />
						</Route>

						<Route exact path="/register">
							<RegistrationPage />
						</Route>

						<PrivateRoute exact path="/before-we-begin">
							<OnboardingPage />
						</PrivateRoute>

						<PrivateRoute exact path="/items-list">
							<ItemsListPage />
						</PrivateRoute>

						<PrivateRoute exact path="/new-dictionary">
							<NewDictionaryPage />
						</PrivateRoute>

						<PrivateRoute exact path="/dictionaries/">
							<DictionariesSettingsPage />
						</PrivateRoute>

						<PrivateRoute exact path="/new-item">
							<NewItemPage />
						</PrivateRoute>

						<PrivateRoute exact path="/edit-item">
							<EditItemPage />
						</PrivateRoute>

						<PrivateRoute exact path="/learning">
							<LearningPage />
						</PrivateRoute>

						<PrivateRoute exact path="/statistics">
							<SoonPage />
						</PrivateRoute>

						<PrivateRoute exact path="/settings">
							<SoonPage />
						</PrivateRoute>

						<PrivateRoute exact path="/profile">
							<SoonPage />
						</PrivateRoute>

						<Route exact path="/404">
							<NotFoundPage />
						</Route>

						<Route>
							<Redirect to="/404" />
						</Route>
					</Switch>
				)}
			/>
		</>
	);
};

export default withRouter(observer(App));
