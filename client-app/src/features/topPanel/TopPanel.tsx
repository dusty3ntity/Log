import React from "react";
import { Grid, Container, Header, Button } from "semantic-ui-react";
import DictionarySelector from "./DictionarySelector";

const TopPanel = () => {
	return (
		<Container id="top-panel">
			<Grid>
				<Grid.Column id="page-title-col" width={6}>
					<Header id="page-title" as="h1" content="Dashboard" />
				</Grid.Column>
				<Grid.Column id="buttons" width={6}>
					<Button id="continue-learning-btn" className="top-panel-btn">
						<i id="learning" className="material-icons top-panel-icon">
							wb_incandescent
						</i>
						<span>Continue learning</span>
					</Button>
					<Button id="new-item-btn" className="top-panel-btn">
						<i id="new-item" className="material-icons top-panel-icon">
							add
						</i>
						<span>New item</span>
					</Button>
				</Grid.Column>
				<Grid.Column id="dictionary-selector-col" width={4}>
					<DictionarySelector />
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default TopPanel;
