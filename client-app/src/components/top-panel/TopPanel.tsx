import React from "react";
import { Layout, Col, Row, Button, Space } from "antd";
import DictionarySelector from "./DictionarySelector";
const { Header } = Layout;

const TopPanel = () => {
	return (
		<Header id="top-panel">
			<Row id="top-panel-row">
				<Col span={5}>
					<h1 id="top-panel-title">Dashboard</h1>
				</Col>

				<Col span={13}>
					<Space className="space" size="large">
					<Button id="continue-learning-btn" className="top-panel-btn" href="/">
						<i id="learning-icon" className="material-icons top-panel-icon">
							wb_incandescent
						</i>
						<span className="md-hidden">Continue learning</span>
					</Button>

					<Button id="new-item-btn" className="top-panel-btn" href="/">
						<i id="new-item-icon" className="material-icons top-panel-icon">
							add
						</i>
						<span className="md-hidden">New item</span>
					</Button>
					</Space>
				</Col>

				<Col span={6}>
					<DictionarySelector />
				</Col>
			</Row>
		</Header>
	);
};

export default TopPanel;
