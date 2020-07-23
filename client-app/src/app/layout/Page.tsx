import React, { ReactNode, useContext } from "react";
import { history } from "../..";

import NavBar from "../../components/navbar/NavBar";
import TopPanel from "../../components/top-panel/TopPanel";
import { RootStoreContext } from "../stores/rootStore";

interface IProps {
	pageTitle: string;
	title: string;
	component: ReactNode;
}

const Page: React.FC<IProps> = ({ pageTitle, title, component }) => {
	const rootStore = useContext(RootStoreContext);

	if (rootStore.commonStore.newUser) {
		history.push("/before-we-begin");
		return <div />;
	}

	document.title = `${pageTitle} - Log`;

	return (
		<div id="main">
			<NavBar />

			<div id="page-content">
				<TopPanel title={title} />
				{component}
			</div>
		</div>
	);
};

export default Page;
