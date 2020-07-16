import { IItem, ItemType } from "./../../models/item";

export const matchesFilters = (item: IItem, predicate: Map<string, any>) => {
	let result = true;

	predicate.forEach((value, key) => {
		switch (key) {
			case "words":
				if (item.type !== ItemType.Word) result = false;
				break;
			case "phrases":
				if (item.type !== ItemType.Phrase) result = false;
				break;
			case "learned":
				if (!item.isLearned) result = false;
				break;
			case "inProgress":
				if (item.correctAnswersToCompletionCount === 0 || item.isLearned) result = false;
				break;
			case "noProgress":
				if (item.correctAnswersToCompletionCount !== 0) result = false;
				break;
		}
	});

	return result;
};
