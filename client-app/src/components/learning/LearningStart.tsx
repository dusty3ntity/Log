import React from "react";

import LearningStatsBrief from "./LearningStatsBrief";

const LearningStart = () => {
	const learningStats = {
		totalItems: 100,
		completedItems: 35,
		correctAnswers: 19,
	};

	return (
		<div className="learning-start learning-supporting-card">
			<div className="date-row row">
				<span className="date">24</span>
				<span className="month">June</span>
				<span className="year">2020</span>
			</div>

			<div className="divider" />

			<div className="learning-stats-row row">
				<LearningStatsBrief learningStats={learningStats} />
			</div>

			<div className="actions-row row">
				<button className="btn actions-btn start-btn primary">
					{learningStats.completedItems > 0 ? "Continue" : "Start"}
				</button>
			</div>
		</div>
	);
};

export default LearningStart;
