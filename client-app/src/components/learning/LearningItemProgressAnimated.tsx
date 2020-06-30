import React from "react";

interface IProps {
	total: number;
	checked: number;
	mode: "easy" | "difficult";
	answerCorrect?: boolean;
	animated?: boolean;
	secondTraining: boolean;
}

const LearningItemProgressAnimated: React.FC<IProps> = ({
	total,
	checked,
	mode,
	answerCorrect,
	animated,
	secondTraining,
}) => {
	const dots = [];

	let active = checked;
	let remaining = total - checked;

	if (answerCorrect) {
		for (let i = 0; i < checked; i++) {
			dots.push(<span className={`progress-dot active ${secondTraining ? "second-training" : ""}`} key={i} />);
		}
		if (checked < total && !secondTraining) {
			dots.push(
				<span
					className={`progress-dot ${secondTraining ? "second-training" : ""} ${animated ? "fadein" : ""}`}
					key={checked}
				/>
			);
			remaining--;
			active++;
		}
	} else {
		if (mode === "easy" && checked > 0) {
			for (let i = 0; i < checked - 1; i++) {
				dots.push(<span className="progress-dot active" key={i} />);
			}
			dots.push(
				<span
					className={`progress-dot active ${secondTraining ? "second-training" : ""} ${
						animated ? "fadeout" : ""
					}`}
					key={checked - 1}
				/>
			);
		} else {
			for (let i = 0; i < checked; i++) {
				dots.push(
					<span
						className={`progress-dot active ${secondTraining ? "second-training" : ""} ${
							animated ? "fadeout" : ""
						}`}
						key={i}
					/>
				);
			}
		}
	}

	for (let i = 0; i < remaining; i++) {
		dots.push(<span className="progress-dot" key={active + i} />);
	}

	return <div className="learning-item-progress">{dots}</div>;
};

export default LearningItemProgressAnimated;
