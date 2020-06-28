import React from "react";

import LearningStatsBrief from "./LearningStatsBrief";
import WarningIcon from "../icons/WarningIcon";
import InfoIcon from "../icons/InfoIcon";

interface IProps {
	className: string;
	itemsCount: number;
	completedItemsCount: number;
	correctAnswersCount: number;
	message?: string;
	messageType?: "info" | "warning";
	button: JSX.Element;
	isFlipped: boolean;
}

const SupportingPage: React.FC<IProps> = ({
	className,
	itemsCount,
	completedItemsCount,
	correctAnswersCount,
	message,
	messageType,
	button,
	isFlipped,
}) => {
	const date = new Date();

	const getMonth = () => {
		switch (date.getMonth()) {
			case 0:
				return "January";
			case 1:
				return "February";
			case 2:
				return "March";
			case 3:
				return "April";
			case 4:
				return "May";
			case 5:
				return "June";
			case 6:
				return "July";
			case 7:
				return "August";
			case 8:
				return "September";
			case 9:
				return "October";
			case 10:
				return "November";
			case 11:
				return "December";
		}
	};

	return (
		<div className={`learning-supporting-card ${className} ${isFlipped ? "flipped" : ""}`}>
			<div className="date-row row">
				<span className="date">{date.getDate()}</span>
				<span className="month">{getMonth()}</span>
				<span className="year">{date.getFullYear()}</span>
			</div>

			<div className="divider" />

			<div className="learning-stats-row row">
				<LearningStatsBrief
					itemsCount={itemsCount}
					completedItemsCount={completedItemsCount}
					correctAnswersCount={correctAnswersCount}
				/>
			</div>

			<div className="bottom-row row">
				<div className="message-row row">
					{message && (messageType === "info" ? <InfoIcon /> : <WarningIcon />)}
					<span>{message}</span>
				</div>

				<div className="actions-row row">{button}</div>
			</div>
		</div>
	);
};

export default SupportingPage;
