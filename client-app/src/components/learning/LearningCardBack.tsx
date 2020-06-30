import React from "react";
import TextEllipsis from "react-text-ellipsis";

import { ILearningItemResult } from "../../app/models/learning";
import LearningItemProgressAnimated from "./LearningItemProgressAnimated";
import SuccessIcon from "../icons/SuccessIcon";
import FailIcon from "../icons/FailIcon";
import StarIcon from "../icons/StarIcon";
import ArrowForwardSmallIcon from "../icons/ArrowForwardSmallIcon";

interface IProps {
	correctAnswersToItemCompletion: number;
	learningItemResult: ILearningItemResult;
	onNext: () => void;
	isFlipped: boolean;
	progressAnimated: boolean;
	secondTraining: boolean;
}

const LearningCardBack: React.FC<IProps> = ({
	correctAnswersToItemCompletion,
	learningItemResult,
	onNext,
	isFlipped,
	progressAnimated,
	secondTraining
}) => {
	const item = learningItemResult.item;

	const starredClass = item.isStarred ? " active" : "";

	const itemSizeClass = item.item.length > 20 ? "long" : item.item.length > 10 ? "medium" : "short";
	const answerSizeClass = item.answer.length > 20 ? "long" : item.answer.length > 10 ? "medium" : "short";
	const userAnswerSizeClass =
		learningItemResult.userAnswer.length > 20
			? "long"
			: learningItemResult.userAnswer.length > 10
			? "medium"
			: "short";

	return (
		<div className={`learning-card learning-card-back ${isFlipped ? "flipped" : ""}`}>
			<div className="header-row row">
				{learningItemResult.isAnswerCorrect ? (
					<SuccessIcon className="answer-icon" />
				) : (
					<FailIcon className="answer-icon" />
				)}
				<LearningItemProgressAnimated
					total={correctAnswersToItemCompletion}
					checked={item.correctAnswersToCompletionCount}
					mode="difficult"
					answerCorrect={learningItemResult.isAnswerCorrect}
					animated={progressAnimated}
					secondTraining={secondTraining}
				/>
				<StarIcon className={starredClass} />
			</div>

			<div className="item-row row">
				<div className="task-row">
					<h1 className={`task text ${itemSizeClass}`}>{item.item}</h1>
				</div>

				<div className="divider invisible" />

				<div className="answer-row">
					<h2
						className={`answer text user-answer ${
							learningItemResult.isAnswerCorrect ? "correct" : "wrong"
						} ${userAnswerSizeClass}`}
					>
						{learningItemResult.userAnswer}
					</h2>
					<div className="divider invisible" />
					{!learningItemResult.isAnswerCorrect && (
						<h3 className={`answer text correct-answer ${answerSizeClass}`}>{item.answer}</h3>
					)}
				</div>
			</div>

			<div className="definition-row row">
				{item.definition && (
					<TextEllipsis
						lines={3}
						tag="div"
						tagClass={`definition text ${
							item.definition.length > 85 ? "long" : item.definition.length > 70 ? "medium" : "short"
						}`}
					>
						{item.definition}
					</TextEllipsis>
				)}

				<h3 className="definition-origin">{item.definitionOrigin}</h3>
			</div>

			<div className="actions-row row">
				<button className="btn actions-btn next-btn primary" onClick={onNext}>
					<span>Next</span>
					<ArrowForwardSmallIcon />
				</button>
			</div>
		</div>
	);
};

export default LearningCardBack;
