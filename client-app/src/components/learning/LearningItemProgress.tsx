import React from "react";

interface IProps {
	total: number;
	checked: number;
	secondTraining: boolean;
}

const LearningItemProgress: React.FC<IProps> = ({ total, checked, secondTraining }) => {
	const dots = [];

	for (let i = 0; i < checked; i++) {
		dots.push(<span className={`progress-dot active ${secondTraining ? "second-training" : ""}`} key={i} />);
	}

	for (let i = 0; i < total - checked; i++) {
		dots.push(<span className={`progress-dot ${secondTraining ? "second-training" : ""}`} key={i + checked} />);
	}

	return <div className="learning-item-progress" tour-step="3-2">{dots}</div>;
};

export default LearningItemProgress;
