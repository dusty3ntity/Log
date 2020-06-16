import React from "react";
import { Tabs } from "antd";

import WordForm from "./WordForm";
import PhraseForm from "./PhraseForm";

const { TabPane } = Tabs;

const NewItem = () => {
	return (
		<div id="new-item-container">
			<div id="new-item">
				<Tabs defaultActiveKey="10">
					<TabPane tab="Word" key="10">
						<WordForm />
					</TabPane>

					<TabPane tab="Phrase" key="20">
						<PhraseForm />
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};

export default NewItem;
