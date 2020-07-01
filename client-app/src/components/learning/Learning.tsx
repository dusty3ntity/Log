import React, { useEffect, useContext, Fragment } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../app/stores/rootStore";
import LearningBackground from "./LearningBackground";
import SupportingPage from "./SupportingPage";
import WarningIcon from "../icons/WarningIcon";
import LearningCardFront from "./LearningCardFront";
import LearningCardBack from "./LearningCardBack";
import LearningProgressBar from "./LearningProgressBar";

const Learning = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		status,
		isFlipped,

		isLearningStartFlipped,
		isItemInputFlipped,
		isItemResultFlipped,
		isLearningStartOverFlipped,
		isLearningEndFlipped,
		isLearningOutdatedFlipped,

		onInitialLoad,
		onStart,
		onStartOver,
		onItemSubmit,
		onNextItem,
		onOutdatedStart,

		learningList,
		learningItem,
		learningItemResult,

		loadingInitial,
	} = rootStore.learningStore;

	useEffect(() => {
		onInitialLoad();
	}, [onInitialLoad]);

	return (
		<div id="learning-container">
			<div id="learning">
				<LearningBackground className="left" />

				<div
					id="learning-content"
					className={`${isFlipped ? "flipped" : ""} ${
						status === 1 || status === 4 || status === 5 || status === 7 ? " initial" : ""
					}`}
				>
					{(status % 10 === 2 || Math.floor(status / 10) === 2) && (
						<LearningCardFront
							correctAnswersToItemCompletion={learningList!.correctAnswersToItemCompletion}
							learningItem={learningItem!}
							onSubmit={onItemSubmit}
							isFlipped={isItemInputFlipped}
							secondTraining={learningList!.timesCompleted > 0}
						/>
					)}
					{(status % 10 === 3 || Math.floor(status / 10) === 3) && (
						<LearningCardBack
							correctAnswersToItemCompletion={learningList!.correctAnswersToItemCompletion}
							learningItemResult={learningItemResult!}
							onNext={onNextItem}
							isFlipped={isItemResultFlipped}
							progressAnimated={status === 3 || Math.floor(status / 10) === 3}
							secondTraining={learningList!.timesCompleted > 0}
						/>
					)}

					{(status % 10 === 1 || Math.floor(status / 10) === 1) && (
						<SupportingPage
							className="learning-start"
							learningList={learningList!}
							buttonType="start"
							onClick={onStart}
							isFlipped={isLearningStartFlipped}
						/>
					)}

					{(status % 10 === 6 || Math.floor(status / 10) === 6) && (
						<SupportingPage
							className="learning-outdated"
							learningList={learningList!}
							messageType="warning"
							message="That training is outdated. Start the new one!"
							buttonType="start"
							onClick={onOutdatedStart}
							isFlipped={isLearningOutdatedFlipped}
						/>
					)}

					{(status % 10 === 4 || Math.floor(status / 10) === 4) && (
						<SupportingPage
							className="learning-end"
							learningList={learningList!}
							messageType="info"
							message="The training is over. But you can complete it one more time!"
							buttonType="start-over"
							onClick={onStartOver}
							isFlipped={isLearningStartOverFlipped}
						/>
					)}

					{(status % 10 === 5 || Math.floor(status / 10) === 5) && (
						<SupportingPage
							className="learning-final-end"
							learningList={learningList!}
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
