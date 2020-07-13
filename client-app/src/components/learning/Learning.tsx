import React, { useEffect, useContext, Fragment } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../app/stores/rootStore";
import LearningBackground from "./LearningBackground";
import SupportingPage from "./SupportingPage";
import WarningIcon from "../icons/WarningIcon";
import LearningCardFront from "./LearningCardFront";
import LearningCardBack from "./LearningCardBack";
import LearningProgressBar from "./LearningProgressBar";
import LoadingScreen from "../common/loading/LoadingScreen";

const Learning = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		status,
		flipCounter,

		isLearningStartFlipped,
		isLearningStartOverFlipped,
		isLearningEndFlipped,
		isLearningOutdatedFlipped,

		loading,

		onInitialLoad,
		onStart,
		onStartOver,
		onOutdatedStart,

		learningList,
		learningItem,
		learningItemResult,
	} = rootStore.learningStore;

	useEffect(() => {
		onInitialLoad();
	}, [onInitialLoad]);

	return (
		<div id="learning-container">
			<div id="learning">
				<LearningBackground className="left" />

				<div id="learning-content" style={{ transform: `rotateY(${flipCounter}turn)` }}>
					{status === 0 && <LoadingScreen size={2} />}

					{(status % 10 === 2 || Math.floor(status / 10) === 2) && (
						<LearningCardFront
							correctAnswersToItemCompletion={learningList!.correctAnswersToItemCompletion}
							learningItem={learningItem!}
							secondTraining={
								(learningList!.timesCompleted === 1 && !learningList!.isCompleted) ||
								(learningList!.timesCompleted === 2 && learningList!.isCompleted)
							}
							loading={loading}
						/>
					)}

					{(status % 10 === 3 || Math.floor(status / 10) === 3) && (
						<LearningCardBack
							correctAnswersToItemCompletion={learningList!.correctAnswersToItemCompletion}
							learningItemResult={learningItemResult!}
							progressAnimated={status === 3 || Math.floor(status / 10) === 3}
							secondTraining={
								(learningList!.timesCompleted === 1 && !learningList!.isCompleted) ||
								(learningList!.timesCompleted === 2 && learningList!.isCompleted)
							}
							loading={loading}
						/>
					)}

					{(status % 10 === 1 || Math.floor(status / 10) === 1) && (
						<SupportingPage
							className="learning-start"
							buttonType="start"
							onClick={onStart}
							isFlipped={isLearningStartFlipped}
							loading={loading}
						/>
					)}

					{(status % 10 === 6 || Math.floor(status / 10) === 6) && (
						<SupportingPage
							className="learning-outdated"
							messageType="warning"
							message="That training is outdated. Start the new one!"
							buttonType="start"
							onClick={onOutdatedStart}
							isFlipped={isLearningOutdatedFlipped}
							loading={loading}
						/>
					)}

					{(status % 10 === 4 || Math.floor(status / 10) === 4) && (
						<SupportingPage
							className="learning-end"
							messageType="info"
							message="The training is over. But you can complete it one more time!"
							buttonType="start-over"
							onClick={onStartOver}
							isFlipped={isLearningStartOverFlipped}
							loading={loading}
						/>
					)}

					{(status % 10 === 5 || Math.floor(status / 10) === 5) && (
						<SupportingPage
							className="learning-final-end"
							messageType="info"
							message="You have completed the training 2 times today. Get some rest."
							buttonType="dashboard"
							isFlipped={isLearningEndFlipped}
						/>
					)}

					{status === 7 && (
						<SupportingPage
							className="not-enough-items"
							content={
								<Fragment>
									<WarningIcon />
									<div className="message">
										Minimum 10 items are required for generating a training.
									</div>
								</Fragment>
							}
							buttonType="dashboard"
						/>
					)}
				</div>

				<LearningBackground className="right" />
			</div>

			{(status === 2 || status === 3 || status === 23 || status === 32) && (
				<LearningProgressBar
					total={learningList!.size}
					done={learningItem ? learningItem.numberInSequence + 1 : learningItemResult!.numberInSequence + 1}
				/>
			)}
		</div>
	);
};

export default observer(Learning);
