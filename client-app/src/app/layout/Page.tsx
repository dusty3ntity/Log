import React, { useContext, useEffect } from "react";
import { history } from "../..";

import NavBar from "../../components/navbar/NavBar";
import TopPanel from "../../components/top-panel/TopPanel";
import { RootStoreContext } from "../stores/rootStore";
import { combineClassNames } from "../common/util/classNames";
import { IComponentProps } from "../models/components";

export interface IPageProps extends IComponentProps {
	pageTitle: string;
	tabTitle?: string;
}

const Page: React.FC<IPageProps> = ({ id, className, pageTitle, tabTitle, children, ...props }) => {
	const rootStore = useContext(RootStoreContext);

	useEffect(() => {
		document.title = `${tabTitle || pageTitle} - Log`;
	}, [tabTitle, pageTitle]);

	if (rootStore.commonStore.newUser) {
		history.push("/before-we-begin");
		return null;
	}

	return (
		<div id="main">
			<NavBar />

			<div id={id} className={combineClassNames("page", className)} {...props}>
				<TopPanel pageTitle={pageTitle} />

				<div className="page-content">{children}</div>
			</div>
		</div>
	);
};

export default Page;
