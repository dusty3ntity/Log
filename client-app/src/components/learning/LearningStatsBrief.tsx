import React from "react";

interface IProps {
	learningStats: any;
}

const LearningStatsBrief: React.FC<IProps> = ({ learningStats }) => {
	const productivity =
		learningStats.completedItems > 0
			? Math.ceil((learningStats.correctAnswers / learningStats.completedItems) * 100)
			: 0;

	const productivityColorClass =
		productivity > 80 ? "high" : productivity > 40 ? "medium" : productivity > 0 ? "low" : "";

	return (
		<div className="learning-stats-brief">
			<div className="items-col col">
				<div className="items-for-today cell">
					<h2>Items for today</h2>
					<span className="value">{learningStats.totalItems}</span>
				</div>

				<div className="completed-items cell">
					<h2>Items completed</h2>
					<span className="value">{learningStats.completedItems}</span>
				</div>
			</div>

			<div className="answers-col col">
				<div className="correct-answers cell">
					<h2>Correct answers</h2>
					<span className={`value ${learningStats.correctAnswers === 0 ? "zero" : ""}`}>
						{learningStats.correctAnswers}
					</span>
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
