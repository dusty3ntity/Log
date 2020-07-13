import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";

import NavBar from "../../components/navbar/NavBar";
import TopPanel from "../../components/top-panel/TopPanel";

interface IProps {
	pageTitle: string;
	title: string;
	component: ReactNode;
}

const Page: React.FC<IProps> = ({ pageTitle, title, component }) => {
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

export default observer(Page);
