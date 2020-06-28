import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../app/stores/rootStore";
import LearningBackground from "./LearningBackground";
import SupportingPage from "./SupportingPage";
import LearningCardFront from "./LearningCardFront";
import LearningCardBack from "./LearningCardBack";
import LearningProgressBar from "./LearningProgressBar";
import ArrowForwardSmallIcon from "../icons/ArrowForwardSmallIcon";
import RefreshIcon from "../icons/RefreshIcon";

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
						status === 1 || status === 4 || status === 5 ? " initial" : ""
					}`}
				>
					{(status % 10 === 2 || Math.floor(status / 10) === 2) && (
						<LearningCardFront
							correctAnswersToItemCompletion={learningList!.correctAnswersToItemCompletion}
							learningItem={learningItem!}
							onSubmit={onItemSubmit}
							isFlipped={isItemInputFlipped}
						/>
					)}
					{(status % 10 === 3 || Math.floor(status / 10) === 3) && (
						<LearningCardBack
							correctAnswersToItemCompletion={learningList!.correctAnswersToItemCompletion}
							learningItemResult={learningItemResult!}
							onNext={onNextItem}
							isFlipped={isItemResultFlipped}
						/>
					)}

					{(status % 10 === 1 || Math.floor(status / 10) === 1) && (
						<SupportingPage
							className="learning-start"
							itemsCount={learningList!.size}
							completedItemsCount={learningList!.completedItemsCount}
							correctAnswersCount={learningList!.correctAnswersCount}
							button={
								<button className="btn actions-btn start-btn primary" onClick={onStart}>
									<span>{learningList!.completedItemsCount > 0 ? "Continue" : "Start"}</span>
									<ArrowForwardSmallIcon />
								</button>
							}
							isFlipped={isLearningStartFlipped}
						/>
					)}

					{(status % 10 === 6 || Math.floor(status / 10) === 6) && (
						<SupportingPage
							className="learning-outdated"
							itemsCount={learningList!.size}
							completedItemsCount={learningList!.completedItemsCount}
							correctAnswersCount={learningList!.correctAnswersCount}
							message="This training is outdated. Start the new one!"
							messageType="warning"
							button={
								<button className="btn actions-btn start-btn primary" onClick={onOutdatedStart}>
									<span>Start</span>
									<ArrowForwardSmallIcon />
								</button>
							}
							isFlipped={isLearningOutdatedFlipped}
						/>
					)}

					{(status % 10 === 4 || Math.floor(status / 10) === 4) && (
						<SupportingPage
							className="learning-end"
							itemsCount={learningList!.size}
							completedItemsCount={learningList!.completedItemsCount}
							correctAnswersCount={learningList!.correctAnswersCount}
							message="The training is over. But you can complete it one more time!"
							messageType="info"
							button={
								<button className="btn actions-btn start-btn primary" onClick={onStartOver}>
									<span>Start again</span>
									<RefreshIcon />
								</button>
							}
							isFlipped={isLearningStartOverFlipped}
						/>
					)}

					{(status % 10 === 5 || Math.floor(status / 10) === 5) && (
						<SupportingPage
							className="learning-final-end"
							itemsCount={learningList!.size}
							completedItemsCount={learningList!.completedItemsCount}
							correctAnswersCount={learningList!.correctAnswersCount}
							message="You have completed the training 2 times today. Get some rest."
							messageType="info"
							button={
								<a className="btn actions-btn return-btn" href="/dashboard">
									Go to dashboard
								</a>
							}
							isFlipped={isLearningEndFlipped}
						/>
					)}
				</div>

				<LearningBackground className="right" />
			</div>

			{learningItem && (
				<LearningProgressBar total={learningList!.size} done={learningItem.numberInSequence + 1} />
			)}
		</div>
	);
};

export default observer(Learning);
