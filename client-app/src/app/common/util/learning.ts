export const getExtendedLearningProductivity = (correctAnswersCount: number, completedItemsCount: number) => {
	let productivity = 0;

	if (completedItemsCount > 0) {
		if (correctAnswersCount !== 0) {
			productivity = (correctAnswersCount / completedItemsCount) * 100;
		} else {
			productivity = 0.01;
		}
	}

	return productivity;
};
