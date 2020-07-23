import React, { useContext } from "react";
import { history } from "../..";

import { RootStoreContext } from "../../app/stores/rootStore";

const AnonymousRedirectPage = ({ children }: { children: any }) => {
	const rootStore = useContext(RootStoreContext);

	if (!rootStore.userStore.user) {
		history.push("/login");
		return <div />;
	}

	if (!rootStore.commonStore.newUser) {
		history.push("/items-list");
		return <div />;
	}

	return children;
};

export default AnonymousRedirectPage;
