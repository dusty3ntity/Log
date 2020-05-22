import React from "react";
import { Layout, Tabs } from "antd";
import WordForm from "./WordForm";
import PhraseForm from "./PhraseForm";

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const NewItem = () => {
	return (
		<Layout id="new-item-container">
			<Sider width={390} trigger={null} collapsible breakpoint={"xl"}></Sider>

			<Content id="new-item">
				<Tabs defaultActiveKey="10">
					<TabPane tab="Word" key="10">
						<WordForm />
					</TabPane>

					<TabPane tab="Phrase" key="20">
						<PhraseForm />
					</TabPane>
				</Tabs>
			</Content>

			<Sider width={390} trigger={null} collapsible breakpoint={"xl"}></Sider>
		</Layout>
	);
};

export default NewItem;
