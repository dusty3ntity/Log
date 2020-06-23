import React from "react";
import TextEllipsis from "react-text-ellipsis";

import DifficultyIndicator from "./DifficultyIndicator";
import LearningItemProgress from "./LearningItemProgress";
import StarIcon from "../icons/StarIcon";
import HintIcon from "../icons/HintIcon";

interface IProps {
	learningItem: any;
	onSubmit: () => void;
}

const LearningCardFront: React.FC<IProps> = ({ learningItem, onSubmit }) => {
	const item = learningItem.item;

	const starredClass = item.isStarred ? " active" : "";

	const textSizeClass = item.item.length > 20 ? "long" : item.item.length > 10 ? "medium" : "short";
	const definitionTextSizeClass =
		item.definition.length > 85 ? "long" : item.definition.length > 70 ? "medium" : "short";

	return (
		<div className="learning-card learning-card-front">
			<div className="header-row row">
				<DifficultyIndicator difficulty="low" />
				<LearningItemProgress total={10} checked={6} />
				<StarIcon className={starredClass} />
			</div>

			<div className="item-row row">
				<div className="task-row">
					<h1 className={`task text ${textSizeClass}`}>{item.item}</h1>
				</div>

				<div className="divider invisible" />

				<div className="answer-row">
					<label htmlFor="answer">Your answer:</label>
					<textarea name="answer" className="text-input text-area answer" rows={2} maxLength={30} autoFocus />
				</div>
			</div>

			<div className="definition-row row">
				<TextEllipsis lines={3} tag="div" tagClass={`definition text ${definitionTextSizeClass}`}>
					{item.definition}
				</TextEllipsis>
			</div>

			<div className="actions-row row">
				<button className="btn actions-btn hint-btn">
					<HintIcon />
					<span>Hint</span>
				</button>
				<button className="btn actions-btn submit-btn primary" type="button" onClick={onSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default LearningCardFront;
