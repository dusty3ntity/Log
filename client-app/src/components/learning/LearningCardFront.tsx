import React, { useState } from "react";
import TextEllipsis from "react-text-ellipsis";

import { ILearningItem } from "../../app/models/learning";
import ComplexityIndicator from "./ComplexityIndicator";
import LearningItemProgress from "./LearningItemProgress";
import StarIcon from "../icons/StarIcon";
// import HintIcon from "../icons/HintIcon";

interface IProps {
	correctAnswersToItemCompletion: number;
	learningItem: ILearningItem;
	onSubmit: (answer: string) => void;
	isFlipped: boolean;
	secondTraining: boolean;
}

const LearningCardFront: React.FC<IProps> = ({
	correctAnswersToItemCompletion,
	learningItem,
	onSubmit,
	isFlipped,
	secondTraining,
}) => {
	const item = learningItem.item;

	const starredClass = item.isStarred ? " active" : "";
	const textSizeClass = item.item.length > 20 ? "long" : item.item.length > 10 ? "medium" : "short";

	const [answer, setAnswer] = useState("");
	const handleInputChange = (event: any) => {
		setAnswer(event.target.value);
	};

	return (
		<div className={`learning-card learning-card-front ${isFlipped ? "flipped" : ""}`}>
			<div className="header-row row">
				<ComplexityIndicator complexity={item.complexity} />
				<LearningItemProgress
					total={correctAnswersToItemCompletion}
					checked={item.correctAnswersToCompletionCount}
					secondTraining={secondTraining}
				/>
				<StarIcon className={starredClass} />
			</div>

			<div className="item-row row">
				<div className="task-row">
					<h1 className={`task text ${textSizeClass}`}>{item.item}</h1>
				</div>

				<div className="divider invisible" />

				<div className="answer-row">
					<label htmlFor="answer">Your answer:</label>

					<textarea
						name="answer"
						className="text-input text-area answer"
						rows={2}
						maxLength={100}
						autoFocus
						value={answer}
						onChange={handleInputChange}
					/>
				</div>
			</div>

			{item.definition && (
				<div className="definition-row row">
					<TextEllipsis
						lines={3}
						tag="div"
						tagClass={`definition text ${
							item.definition.length > 85 ? "long" : item.definition.length > 70 ? "medium" : "short"
						}`}
					>
						{item.definition}
					</TextEllipsis>
				</div>
			)}

			<div className="actions-row row">
				{/* <button className="btn actions-btn hint-btn">
					<HintIcon />
					<span>Hint</span>
				</button> */}

				<button
					className="btn actions-btn submit-btn primary"
					onClick={() => {
						onSubmit(answer.replace(/\s+/g, " ").trim());
					}}
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default LearningCardFront;
