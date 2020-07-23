import ReactGA from "react-ga";

export const initializeAnalytics = () => {
	ReactGA.initialize(process.env.REACT_APP_ANALYTICS_IDENTIFIER!);
};

// for initial loading
export const setAnalyticsPageView = (location: string) => {
	ReactGA.pageview(location);
};

export const setAnalyticsPage = (location: string) => {
	ReactGA.set({ page: location });
	ReactGA.pageview(location);
};

export const fireAnalyticsEvent = (category: string, action: string, label?: string, value?: number) => {
	ReactGA.event({
		category: category,
		action: action,
		label: label,
		value: value,
	});
};

export const fireAnalyticsNonInteractionEvent = (category: string, action: string, label?: string, value?: number) => {
	ReactGA.event({
		category: category,
		action: action,
		label: label,
		value: value,
	});
};

export const fireAnalyticsException = (description: string, fatal: boolean) => {
	ReactGA.exception({ description: description, fatal: fatal });
};
