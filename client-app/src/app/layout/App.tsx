import React, { Fragment } from "react";
import NavBar from "../../features/nav/NavBar";
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
						<Grid.Row>
							Kek
						</Grid.Row>
						<Grid.Row>
							Lol
						</Grid.Row>
					</Grid.Column>
				</Grid>
			</div>
		</Fragment>
	);
}

export default App;
