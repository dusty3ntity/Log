import React, { useState } from "react";

import LearningBackground from "./LearningBackground";
import SupportingPage from "./SupportingPage";
import LearningCardFront from "./LearningCardFront";
import LearningCardBack from "./LearningCardBack";
import LearningProgressBar from "./LearningProgressBar";
import ArrowForwardSmallIcon from "../icons/ArrowForwardSmallIcon";
import RefreshIcon from "../icons/RefreshIcon";

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

	const learningStats = {
		totalItems: 100,
		completedItems: 100,
		correctAnswers: 89,
	};

	return (
		<div id="learning-container">
			<div id="learning">
				<LearningBackground className="left" />

				<div
					id="learning-content"
					className={`${showingResult ? "showing-result" : ""}${initial ? " initial" : ""}`}
				>
					{/* <LearningCardFront learningItem={learningItem} onSubmit={onSubmit} /> */}
					{/* <LearningCardBack learningItemResult={learningItemResult} onNext={onNext} /> */}

					{/* <SupportingPage
						className="learning-start"
						stats={learningStats}
						button={
							<button className="btn actions-btn start-btn primary">
								<span>{learningStats.completedItems > 0 ? "Continue" : "Start"}</span>
								<ArrowForwardSmallIcon />
							</button>
						}
					/> */}

					{/* <SupportingPage
						className="learning-outdated"
						stats={learningStats}
						message="This training is outdated. Start the new one!"
						messageType="warning"
						button={
							<button className="btn actions-btn start-btn primary">
								<span>Start</span>
								<ArrowForwardSmallIcon />
							</button>
						}
					/> */}

					{/* <SupportingPage
						className="learning-final-end"
						stats={learningStats}
						message="You have completed the training 2 times today. Get some rest."
						messageType="info"
						button={
							<a className="btn actions-btn return-btn" href="/dashboard">
								Go to dashboard
							</a>
						}
					/> */}

					<SupportingPage
						className="learning-end"
						stats={learningStats}
						message="The training is finally over. But you can complete it one more time!"
						messageType="info"
						button={
							<button className="btn actions-btn start-btn primary">
								<span>Start again</span>
								<RefreshIcon />
							</button>
						}
					/>
				</div>

				<LearningBackground className="right" />
			</div>

			{/* <LearningProgressBar total={100} done={29} /> */}
		</div>
	);
};

export default Learning;
