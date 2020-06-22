import React from "react";

import LearningBackground from "./LearningBackground";
import LearningCardFront from "./LearningCardFront";
import LearningProgressBar from "./LearningProgressBar";

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

			<LearningProgressBar total={100} done={29} />
		</div>
	);
};

export default Learning;
