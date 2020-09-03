import React, { useState, useContext } from "react";
import TextEllipsis from "react-text-ellipsis";

import { IComponentProps } from "../../app/models/components";
import { RootStoreContext } from "../../app/stores/rootStore";
import { ILearningItem, LearningMode } from "../../app/models/learning";
import ComplexityIndicator from "./ComplexityIndicator";
import ItemProgressDots from "./ItemProgressDots";
import Button from "../common/inputs/Button";
import Tooltip from "../common/tooltips/Tooltip";
import Divider from "../common/other/Divider";
import { fullTrim } from "../../app/common/forms/formValidators";
import { combineClassNames } from "../../app/common/util/classNames";
import StarIcon from "../common/icons/StarIcon";

export interface ILearningCardFrontProps extends IComponentProps {
	correctAnswersToItemCompletion: number;
	learningItem: ILearningItem;
	secondTraining: boolean;
	loading: boolean;
}

const LearningCardFront: React.FC<ILearningCardFrontProps> = ({
	id,
	className,
	correctAnswersToItemCompletion,
	learningItem,
	secondTraining,
	loading,
	...props
}) => {
	const rootStore = useContext(RootStoreContext);
	const { status, isItemInputFlipped, onItemSubmit } = rootStore.learningStore;
	const { activeDictionary } = rootStore.dictionaryStore;

	const item = learningItem.item;

	const textSizeClass = item.item.length > 20 ? "long" : item.item.length > 10 ? "medium" : "short";

	const [answer, setAnswer] = useState("");
	const handleInputChange = (event: any) => {
		setAnswer(event.target.value);
	};

	return (
		<div
			id={id}
			className={combineClassNames("learning-card learning-card-front", className, {
				flipped: isItemInputFlipped,
			})}
			{...props}
		>
			<div className="header-row row">
				<Tooltip text="Item complexity value based on your answers." position="top-start">
					<ComplexityIndicator complexity={item.complexity} tour-step="3-3" />
				</Tooltip>

				<Tooltip
					text={`Number of correct answers for item to be considered mastered. You have ${item.correctAnswersToCompletionCount} out of ${correctAnswersToItemCompletion} needed.`}
					position="top"
				>
					<ItemProgressDots
						total={correctAnswersToItemCompletion}
						checked={item.correctAnswersToCompletionCount}
						secondTraining={secondTraining}
						tour-step="3-2"
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
					<StarIcon active={item.isStarred} />
				</Tooltip>
			</div>

			<div className="item-row row" tour-step="3-4">
				<div className="task-row">
					<h1 className={`task text ${textSizeClass}`}>{item.item}</h1>
				</div>

				<Divider invisible />

				<div className="answer-row form-item">
					<label htmlFor="answer">
						<span className="label-text">Translation:</span>
						<span className="language-badge">
							{learningItem.learningMode === LearningMode.Primary
								? activeDictionary.languageToLearn.isoCode
								: activeDictionary.knownLanguage.isoCode}
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
				<Button
					className="actions-btn submit-btn"
					primary
					noDisabledStyles
					text="Submit"
					onClick={() => {
						const trimAnswer = fullTrim(answer);
						onItemSubmit(trimAnswer);
					}}
					disabled={status > 9}
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default LearningCardFront;
