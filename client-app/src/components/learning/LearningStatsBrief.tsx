import React from "react";

import { getExtendedLearningProductivity } from "../../app/common/util/learning";

interface IProps {
	itemsCount: number;
	completedItemsCount: number;
	correctAnswersCount: number;
}

const LearningStatsBrief: React.FC<IProps> = ({ itemsCount, completedItemsCount, correctAnswersCount }) => {
	let productivity = getExtendedLearningProductivity(correctAnswersCount, completedItemsCount);

	const productivityColorClass =
		productivity > 80 ? "high" : productivity > 40 ? "medium" : productivity > 0.001 ? "low" : "";

	productivity = Math.floor(productivity);

	return (
		<div className="learning-stats-brief">
			<div className="items-col col">
				<div className="items-for-today cell">
					<h2>Items for today</h2>
					<span className="value">{itemsCount}</span>
				</div>

				<div className="completed-items cell">
					<h2>Items completed</h2>
					<span className="value">{completedItemsCount}</span>
				</div>
			</div>

			<div className="answers-col col">
				<div className="correct-answers cell">
					<h2>Correct answers</h2>
					<span className={`value ${correctAnswersCount === 0 ? "zero" : ""}`}>{correctAnswersCount}</span>
				</div>

				<div className="productivity cell">
					<h2>Productivity</h2>
					<span className={`value ${productivityColorClass}`}>{productivity}</span>
				</div>
			</div>
		</div>
	);
};

export default LearningStatsBrief;
