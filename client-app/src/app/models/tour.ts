export interface ITourStep {
	target: string;
	content: string;
	offset?: number;
}

export const itemsTourSteps = [
	{
		target: "[tour-step='1-1']",
		content: "Hi! My name is Log. Please, let me show you how I work.",
		disableBeacon: true,
		placement: "center",
	},
	{
		target: "[tour-step='1-1']",
		content:
			"First of all, this is the items list. All your items will appear here. I have created a test item for you. Please, click on it to open it.",
		disableBeacon: true,
		styles: {
			buttonNext: {
				visibility: "hidden",
			},
		},
	},
	{
		target: "[tour-step='1-2']",
		content: "This is the item details block. Let me show you everything step by step.",
		disableBeacon: true,
		placement: "left",
	},
	{
		target: "[tour-step='1-2-1']",
		content: "This is the item details block. Let me show you everything step by step.",
		disableBeacon: true,
		placement: "left",
		offset: 420,
	},
	{
		target: "[tour-step='1-2'] [tour-step='1-3']",
		content:
			"This is the item's progress indicator. It can be grey (no progress), yellow (in progress), and green (learned). You can hover over it to get some additional info.",
		placement: "bottom",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-2-1'] [tour-step='1-3']",
		content:
			"This is the item's progress indicator. It can be grey (no progress), yellow (in progress), and green (learned). You can hover over it to get some additional info.",
		placement: "bottom",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-2'] [tour-step='1-4']",
		content:
			"This is the maximum priority indicator. If an item is starred, it means you want to learn it as soon as possible. Use this wisely.",
		placement: "bottom-end",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-2-1'] [tour-step='1-4']",
		content:
			"This is the maximum priority indicator. If an item is starred, it means you want to learn it as soon as possible. Use this wisely.",
		placement: "bottom-end",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-2'] [tour-step='1-5']",
		content: "This is the item's original.",
		placement: "left-end",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-2-1'] [tour-step='1-5']",
		content: "This is the item's original.",
		placement: "left-end",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-2'] [tour-step='1-6']",
		content: "And this is the item's translation.",
		placement: "left-start",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-2-1'] [tour-step='1-6']",
		content: "And this is the item's translation.",
		placement: "left-start",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-2'] [tour-step='1-7']",
		content:
			"This is the item's definition block. Actually, a definition is optional, but sometimes it can help you remember the item better.",
		placement: "left-start",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-2-1'] [tour-step='1-7']",
		content:
			"This is the item's definition block. Actually, a definition is optional, but sometimes it can help you remember the item better.",
		placement: "left-start",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-2']",
		content:
			"And what left is the item's statistics block and actions. Let's delete this item, I've created it only for the demonstration :)",
		disableBeacon: true,
		placement: "left-end",
		styles: {
			buttonNext: {
				visibility: "hidden",
			},
		},
	},
	{
		target: "[tour-step='1-2-1']",
		content:
			"And what left is the item's statistics block and actions. Let's delete this item, I've created it only for the demonstration :)",
		disableBeacon: true,
		placement: "left-end",
		styles: {
			buttonNext: {
				visibility: "hidden",
			},
		},
	},
	{
		target: "[tour-step='1-9']",
		content:
			"This is the dictionaries' control panel. Here you can select between dictionaries and tweak their settings. ",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-10']",
		content:
			"You will press this button when you are ready to learn. I hope you will press it often enough. Let's leave it for now, we have nothing to learn yet :)",
		disableBeacon: true,
	},
	{
		target: "[tour-step='1-11']",
		content:
			"And finally the 'New item' button! All your items are born here. Let's try to add a new item to your dictionary. Please, press the button. ",
		disableBeacon: true,
		styles: {
			buttonNext: {
				visibility: "hidden",
			},
		},
	},
];

export const newItemTourSteps = [
	{
		target: "[tour-step='2-1']",
		content: "Items are created here! Let's go step by step.",
		disableBeacon: true,
		placement: "left",
	},
	{
		target: "[tour-step='2-1']",
		content: "First of all, you need to choose the item's type.",
		disableBeacon: true,
		placement: "left-start",
	},
	{
		target: "[tour-step='2-2']",
		content: "Then you enter the item's original and translation.",
		disableBeacon: true,
		placement: "top",
	},
	{
		target: "[tour-step='2-3']",
		content: "You can also add a definition and make the item starred.",
		disableBeacon: true,
		placement: "bottom",
	},
	{
		target: "[tour-step='2-1']",
		content:
			"To start learning, add at least 10 items to your dictionary, and press the 'Continue learning' button. I will be waiting for you there!",
		disableBeacon: true,
		placement: "center",
	},
];

export const learningTourSteps = [
	{
		target: "[tour-step='3-1']",
		content:
			"This is the place where you learn your words! Training can be generated once a day, but you can complete it whenever you want. You also can interrupt and continue later. Press the 'Start' button when you're ready.",
		disableBeacon: true,
		placement: "left",
		styles: {
			buttonNext: {
				visibility: "hidden",
			},
		},
	},
	{
		target: "[tour-step='3-2']",
		content:
			"This is the item's progress indicator. For one correct answer, you get one point, otherwise, we take one point :) But everything changes when the hard mode is enabled!",
		disableBeacon: true,
		placement: "bottom",
	},
	{
		target: "[tour-step='3-3']",
		content: "This is the difficulty indicator. The happier the smile is, the better you master this item.",
		disableBeacon: true,
		placement: "bottom-start",
	},
	{
		target: "[tour-step='3-4']",
		content:
			"To gain points you have to complete the cards. Just enter the translation of an item you get or leave the field blank if you are stuck.",
		disableBeacon: true,
		placement: "bottom",
	},
	{
		target: "[tour-step='3-1']",
		content:
			"Well, now you know the basics :) Don't forget you can interrupt the training and continue when you are comfortable. Visit the FAQ page to learn more about the additional features. Good luck!",
		disableBeacon: true,
		placement: "center",
	},
];
