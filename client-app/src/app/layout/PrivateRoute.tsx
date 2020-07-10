import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { RootStoreContext } from "../stores/rootStore";
import { observer } from "mobx-react-lite";

interface IProps {
	path: string;
	exact?: boolean;
	component: JSX.Element;
}

const PrivateRoute: React.FC<IProps> = ({ path, exact, component }) => {
	const rootStore = useContext(RootStoreContext);
	const { isLoggedIn } = rootStore.userStore;

	return (
		<Route exact={exact} path={path}>
			{isLoggedIn && component}
			{!isLoggedIn && <Redirect to={"/login"} />}
		</Route>
	);
};

export default observer(PrivateRoute);
