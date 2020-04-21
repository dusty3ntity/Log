import React, { Fragment } from "react";
import NavBar from "../../features/nav/NavBar";
import TopPanel from "../../features/topPanel/TopPanel";
import { Grid } from "semantic-ui-react";

function App() {
	return (
		<Fragment>
			<div id="main">
				<Grid>
					<Grid.Column id="nav-col" width={2}>
						<NavBar />
					</Grid.Column>
					<Grid.Column id="content-col" width={14}>
						<Grid.Row id="top-panel-row">
							<TopPanel />
						</Grid.Row>
						<Grid.Row id="content-row">
						</Grid.Row>
					</Grid.Column>
				</Grid>
			</div>
		</Fragment>
	);
}

export default App;
