import React from "react";

import LearningBackground from "./LearningBackground";
import LearningCardFront from "./LearningCardFront";

const Learning = () => {
	return (
		<div id="learning-container">
			<div id="learning">
				<LearningBackground className="left" />

				<div id="learning-content">
					<LearningCardFront />
				</div>

				<LearningBackground className="right" />
			</div>
		</div>
	);
};

export default Learning;
