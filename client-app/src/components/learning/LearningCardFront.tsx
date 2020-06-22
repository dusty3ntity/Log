import React from "react";
import TextEllipsis from "react-text-ellipsis";

import DifficultyIndicator from "./DifficultyIndicator";
import LearningItemProgress from "./LearningItemProgress";
import StarIcon from "../icons/StarIcon";
import HintIcon from "../icons/HintIcon";

const LearningCardFront = () => {
	const learningItem = {
		id: "96bb6bea-29c3-429d-9c6f-58ddca0237a7",
		learningMode: 1,
		numberInSequence: 1,
		item: {
			item: "horse",
			// item: "awwwwwwwwwwwwwwwwwwwwwwwwwwwwa",
			answerMask: "л_____",
			answerFirstLetter: "л",
			definition: "Domesticated mammal used for riding and racing.",
			// definition:
			// "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
			itemType: 0,
			isStarred: true,
			correctRepeatsCount: 1,
		},
	};

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
					<h1 className={`task ${textSizeClass}`}>{item.item}</h1>
				</div>

				<div className="divider invisible" />

				<div className="answer-row">
					<label htmlFor="answer">Your answer:</label>
					<textarea name="answer" className="text-input text-area answer" rows={2} maxLength={30} autoFocus />
				</div>
			</div>

			<div className="definition-row row">
				<TextEllipsis lines={3} tag="div" tagClass={`definition ${definitionTextSizeClass}`}>
					{item.definition}
				</TextEllipsis>
			</div>

			<div className="actions-row row">
				<button className="btn actions-btn hint-btn">
					<HintIcon />
					<span>Hint</span>
				</button>
				<button className="btn actions-btn submit-btn primary" type="submit">
					Submit
				</button>
			</div>
		</div>
	);
};

export default LearningCardFront;
