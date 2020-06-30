import React from "react";

import WarningIcon from "../icons/WarningIcon";

const NotEnoughItems = () => {
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
		<div className="not-enough-items">
			<div className="date-row row">
				<span className="date">{date.getDate()}</span>
				<span className="month">{getMonth()}</span>
				<span className="year">{date.getFullYear()}</span>
			</div>

			<div className="divider" />

			<div className="message-row row">
				<WarningIcon />
				<div className="message">Not enough items for generating a training. Minimum 10 items required.</div>
			</div>

			<div className="actions-row row">
				<a className="btn actions-btn return-btn" href="/dashboard">
					Go to dashboard
				</a>
			</div>
		</div>
	);
};

export default NotEnoughItems;
