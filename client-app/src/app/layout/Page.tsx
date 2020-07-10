import React, { ReactNode, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";

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
	const { loadDictionaries, loadingInitial } = rootStore.dictionaryStore;

	document.title = `${pageTitle} - Log`;

	useEffect(() => {
		loadDictionaries();
	}, [loadDictionaries]);

	if (loadingInitial) return <div />;

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

export default observer(Page);
