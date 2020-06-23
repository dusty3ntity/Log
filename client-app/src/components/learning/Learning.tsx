import React, { useState } from "react";

import LearningBackground from "./LearningBackground";
import LearningCardFront from "./LearningCardFront";
import LearningCardBack from "./LearningCardBack";
import LearningProgressBar from "./LearningProgressBar";

const Learning = () => {
	const [showingResult, setShowingResult] = useState(false);
	const [initial, setInitial] = useState(true);

	const onSubmit = () => {
		setShowingResult(true);
		setInitial(false);
	};

	const onNext = () => {
		setShowingResult(false);
	};

	const learningItem = {
		id: "96bb6bea-29c3-429d-9c6f-58ddca0237a7",
		learningMode: 1,
		numberInSequence: 1,
		item: {
			item: "horse",
			answerMask: "л_____",
			answerFirstLetter: "л",
			definition: "Domesticated mammal used for riding and racing.",
			itemType: 0,
			isStarred: true,
			correctRepeatsCount: 1,
		},
	};

	const learningItemResult = {
		isAnswerCorrect: false,
		userAnswer: "собака",
		item: {
			id: "1b8adf7f-1236-49d8-a77a-f137c439377a",
			item: "horse",
			answer: "лошадь",
			definition: "Domesticated mammal used for riding and racing.",
			definitionOrigin: "Cambridge Dictionary",
			type: 0,
			creationDate: "2020-03-26T11:45:20.305337",
			isStarred: true,
			isLearned: false,
			totalRepeatsCount: 4,
			correctRepeatsCount: 2,
			goesForNextDay: false,
		},
	};

	return (
		<div id="learning-container">
			<div id="learning">
				<LearningBackground className="left" />

				<div
					id="learning-content"
					className={`${showingResult ? "showing-result" : ""}${initial ? " initial" : ""}`}
				>
					<LearningCardFront learningItem={learningItem} onSubmit={onSubmit} />
					<LearningCardBack learningItemResult={learningItemResult} onNext={onNext} />
				</div>

				<LearningBackground className="right" />
			</div>

			<LearningProgressBar total={100} done={29} />
		</div>
	);
};

export default Learning;
