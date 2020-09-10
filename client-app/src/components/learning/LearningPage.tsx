import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";

import Page from "../../app/layout/Page";
import { RootStoreContext } from "../../app/stores/rootStore";
import LearningBackground from "./LearningBackground";
import SupportingPage from "./SupportingPage";
import LearningCardFront from "./LearningCardFront";
import LearningCardBack from "./LearningCardBack";
import LearningProgressBar from "./LearningProgressBar";
import LoadingScreen from "../common/loading/LoadingScreen";
import { LearningStatus } from "../../app/models/learning";
import WarningIcon from "../common/icons/WarningIcon";

const LearningPage: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { user } = rootStore.userStore;
	const { goToNextStep } = rootStore.tourStore;
	const {
		status,
		flipCounter,

		isLearningStartFlipped,
		isLearningStartOverFlipped,
		isLearningEndFlipped,
		isLearningOutdatedFlipped,

		loading,
		animationTimeout,

		onInitialLoad,
		onStart,
		onStartOver,
		onOutdatedStart,

		learningList,
		learningItem,
		learningItemResult,

		prevCorrectAnswersToCompletionCount,
	} = rootStore.learningStore;

	useEffect(() => {
		onInitialLoad();
	}, [onInitialLoad]);

	return (
		<Page pageTitle="Learning" id="learning-page" {...props}>
			<div id="learning-container">
				<LearningBackground className="left" />

				<div
					id="learning-content"
					style={{ transform: `rotateY(${flipCounter}turn)` }}
					className={status !== LearningStatus.Initial ? "animated" : ""}
					tour-step="3-1"
				>
					{status === LearningStatus.Initial && <LoadingScreen size={2} />}

					{(status % 10 === LearningStatus.ItemInput ||
						Math.floor(status / 10) === LearningStatus.ItemInput) && (
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

					{(status % 10 === LearningStatus.ItemResult ||
						Math.floor(status / 10) === LearningStatus.ItemResult) && (
						<LearningCardBack
							correctAnswersToItemCompletion={learningList!.correctAnswersToItemCompletion}
							prevCorrectAnswersToCompletionCount={prevCorrectAnswersToCompletionCount}
							learningItemResult={learningItemResult!}
							progressAnimated={status === 3 || Math.floor(status / 10) === 3}
							secondTraining={
								(learningList!.timesCompleted === 1 && !learningList!.isCompleted) ||
								(learningList!.timesCompleted === 2 && learningList!.isCompleted)
							}
							isHardModeEnabled={learningList!.isHardModeEnabled}
							loading={loading}
						/>
					)}

					{(status % 10 === LearningStatus.LearningStart ||
						Math.floor(status / 10) === LearningStatus.LearningStart) && (
						<SupportingPage
							className="learning-start"
							messageType="warning"
							message={
								learningList!.timesCompleted > 0
									? "This is the second training for today. Correct answers don't count, but wrong ones - do!"
									: undefined
							}
							buttonType={learningList!.completedItemsCount === 0 ? "start" : "continue"}
							onClick={() => {
								onStart().finally(() => {
									if (!user!.tourCompleted && !user!.learningTourCompleted) {
										setTimeout(goToNextStep, animationTimeout + 100);
									}
								});
							}}
							flipped={isLearningStartFlipped}
							loading={loading}
						/>
					)}

					{(status % 10 === LearningStatus.LearningOutdated ||
						Math.floor(status / 10) === LearningStatus.LearningOutdated) && (
						<SupportingPage
							className="learning-outdated"
							messageType="warning"
							message="That training is outdated. Start the new one!"
							buttonType="start"
							onClick={onOutdatedStart}
							flipped={isLearningOutdatedFlipped}
							loading={loading}
						/>
					)}

					{(status % 10 === LearningStatus.LearningStartOver ||
						Math.floor(status / 10) === LearningStatus.LearningStartOver) && (
						<SupportingPage
							className="learning-end"
							messageType="info"
							message="The training is over. But you can complete it one more time!"
							buttonType="start-over"
							onClick={onStartOver}
							flipped={isLearningStartOverFlipped}
							loading={loading}
						/>
					)}

					{(status % 10 === LearningStatus.LearningEnd ||
						Math.floor(status / 10) === LearningStatus.LearningEnd) && (
						<SupportingPage
							className="learning-final-end"
							messageType="info"
							message="You have completed the training 2 times today. Get some rest."
							buttonType="items-list"
							flipped={isLearningEndFlipped}
						/>
					)}

					{status === LearningStatus.NotEnoughItems && (
						<SupportingPage
							className="not-enough-items"
							content={
								<>
									<WarningIcon />
									<div className="message">
										You need to have at least 10 items to generate a training.
									</div>
								</>
							}
							buttonType="items-list"
						/>
					)}
				</div>

				<LearningBackground className="right" />
			</div>

			{(status === LearningStatus.ItemInput ||
				status === LearningStatus.ItemResult ||
				status === LearningStatus.ItemInputItemResult ||
				status === LearningStatus.ItemResultItemInput) && (
				<LearningProgressBar
					total={learningList!.size}
					done={learningItem ? learningItem.numberInSequence + 1 : learningItemResult!.numberInSequence + 1}
				/>
			)}
		</Page>
	);
};

export default observer(LearningPage);
