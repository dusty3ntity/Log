import React, { useState, useContext } from "react";
import TextEllipsis from "react-text-ellipsis";

import { RootStoreContext } from "../../app/stores/rootStore";
import { ILearningItem, LearningMode } from "../../app/models/learning";
import ComplexityIndicator from "./ComplexityIndicator";
import LearningItemProgress from "./LearningItemProgress";
import StarIcon from "../icons/StarIcon";
import Button from "../common/inputs/Button";
import Tooltip from "../common/tooltips/Tooltip";
import Divider from "../common/other/Divider";
// import HintIcon from "../icons/HintIcon";

interface IProps {
	correctAnswersToItemCompletion: number;
	learningItem: ILearningItem;
	secondTraining: boolean;
	loading: boolean;
}

const LearningCardFront: React.FC<IProps> = ({
	correctAnswersToItemCompletion,
	learningItem,
	secondTraining,
	loading,
}) => {
	const rootStore = useContext(RootStoreContext);
	const { status, isItemInputFlipped, onItemSubmit } = rootStore.learningStore;

	const item = learningItem.item;

	const starredClass = item.isStarred ? " active" : "";
	const textSizeClass = item.item.length > 20 ? "long" : item.item.length > 10 ? "medium" : "short";

	const [answer, setAnswer] = useState("");
	const handleInputChange = (event: any) => {
		setAnswer(event.target.value);
	};

	return (
		<div className={`learning-card learning-card-front ${isItemInputFlipped ? "flipped" : ""}`}>
			<div className="header-row row">
				<Tooltip text="Item complexity value based on your answers." position="top-start">
					<ComplexityIndicator complexity={item.complexity} />
				</Tooltip>

				<Tooltip
					text={`Number of correct answers for item to be considered mastered. You have ${item.correctAnswersToCompletionCount} out of ${correctAnswersToItemCompletion} needed.`}
					position="top"
				>
					<LearningItemProgress
						total={correctAnswersToItemCompletion}
						checked={item.correctAnswersToCompletionCount}
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
					<h1 className={`task text ${textSizeClass}`}>{item.item}</h1>
				</div>

				<Divider invisible />

				<div className="answer-row form-item">
					<label htmlFor="answer">
						<span className="label-text">Translation:</span>
						<span className="language-badge">
							{learningItem.learningMode === LearningMode.Primary ? "eng" : "rus"}
						</span>
					</label>

					<textarea
						name="answer"
						className="text-input text-area answer"
						rows={2}
						maxLength={30}
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

				<Button
					className="actions-btn submit-btn"
					primary
					noDisabledStyles
					text="Submit"
					onClick={() => {
						onItemSubmit(answer.replace(/\s+/g, " ").trim());
					}}
					disabled={status > 9}
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default LearningCardFront;
