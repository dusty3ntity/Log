import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../stores/rootStore";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { isLoggedIn } = rootStore.userStore;

	return <Route {...props} render={() => (isLoggedIn ? children : <Redirect to={"/login"} />)} />;
};

export default observer(PrivateRoute);
