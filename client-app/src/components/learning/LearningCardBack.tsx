import React, { useContext } from "react";
import TextEllipsis from "react-text-ellipsis";

import { RootStoreContext } from "../../app/stores/rootStore";
import { ILearningItemResult } from "../../app/models/learning";
import LearningItemProgressAnimated from "./LearningItemProgressAnimated";
import SuccessIcon from "../icons/SuccessIcon";
import ErrorIcon from "../icons/ErrorIcon";
import StarIcon from "../icons/StarIcon";
import ArrowForwardSmallIcon from "../icons/ArrowForwardSmallIcon";
import Button from "../common/inputs/Button";
import Tooltip from "../common/tooltips/Tooltip";
import Divider from "../common/other/Divider";
import { fireAnalyticsEvent } from "../../app/common/analytics/analytics";

interface IProps {
	correctAnswersToItemCompletion: number;
	prevCorrectAnswersToCompletionCount: number;
	learningItemResult: ILearningItemResult;
	progressAnimated: boolean;
	secondTraining: boolean;
	loading: boolean;
}

const LearningCardBack: React.FC<IProps> = ({
	correctAnswersToItemCompletion,
	prevCorrectAnswersToCompletionCount,
	learningItemResult,
	progressAnimated,
	secondTraining,
	loading,
}) => {
	const rootStore = useContext(RootStoreContext);
	const { status, isItemResultFlipped, onNextItem } = rootStore.learningStore;

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
		<div className={`learning-card learning-card-back ${isItemResultFlipped ? "flipped" : ""}`}>
			<div className="header-row row">
				<Tooltip
					text={learningItemResult.isAnswerCorrect ? "Your answer is correct!" : "Your answer is wrong."}
					position="top-start"
				>
					{learningItemResult.isAnswerCorrect ? (
						<SuccessIcon className="answer-icon" />
					) : (
						<ErrorIcon className="answer-icon" />
					)}
				</Tooltip>

				<Tooltip
					text={`Number of correct answers for item to be considered mastered. You have ${item.correctAnswersToCompletionCount} out of ${correctAnswersToItemCompletion} needed.`}
					position="top"
				>
					<LearningItemProgressAnimated
						total={correctAnswersToItemCompletion}
						checked={prevCorrectAnswersToCompletionCount}
						mode="difficult"
						answerCorrect={learningItemResult.isAnswerCorrect}
						animated={progressAnimated}
						secondTraining={secondTraining}
					/>
				</Tooltip>

				<Tooltip
					text={
						item.isStarred
							? "This item will be present in every single training until it is learned."
							: "Starred items are present in every single training until they are learned. This one is not starred."
					}
					position="top-end"
				>
					<StarIcon className={starredClass} />
				</Tooltip>
			</div>

			<div className="item-row row">
				<div className="task-row">
					<h1 className={`task text ${itemSizeClass}`}>{item.item}</h1>
				</div>

				<Divider invisible />

				<div className="answer-row">
					<h2
						className={`answer text user-answer ${
							learningItemResult.isAnswerCorrect ? "correct" : "wrong"
						} ${userAnswerSizeClass}`}
					>
						{learningItemResult.userAnswer}
					</h2>
					<Divider invisible />
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
				<Button
					className="actions-btn next-btn"
					noDisabledStyles
					primary
					text="Next"
					rightIcon={<ArrowForwardSmallIcon />}
					onClick={() => {
						onNextItem();
						fireAnalyticsEvent("Learning", "Requested next item");
					}}
					disabled={status > 9}
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default LearningCardBack;
