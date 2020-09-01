import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { RootStoreContext } from "../../app/stores/rootStore";
import LearningStatsBrief from "./LearningStatsBrief";
import WarningIcon from "../icons/WarningIcon";
import InfoIcon from "../icons/InfoIcon";
import ArrowForwardSmallIcon from "../icons/ArrowForwardSmallIcon";
import RefreshIcon from "../icons/RefreshIcon";
import Button from "../common/inputs/Button";
import Divider from "../common/other/Divider";

interface IProps {
	className: string;

	content?: JSX.Element;

	message?: string;
	messageType?: "info" | "warning";

	buttonType: "start" | "start-over" | "continue" | "items-list";
	onClick?: () => void;
	isFlipped?: boolean;
	loading?: boolean;
}

const SupportingPage: React.FC<IProps> = ({
	className,
	content,
	message,
	messageType,
	buttonType,
	onClick,
	isFlipped,
	loading,
}) => {
	const rootStore = useContext(RootStoreContext);
	const { status, learningList } = rootStore.learningStore;

	const date = new Date();

	if (!content)
		content = (
			<LearningStatsBrief
				itemsCount={learningList!.size}
				completedItemsCount={learningList!.totalCompletedItemsCount}
				correctAnswersCount={learningList!.correctAnswersCount}
			/>
		);

	return (
		<div className={`learning-supporting-card ${className} ${isFlipped ? "flipped" : ""}`}>
			<div className="date-row row">
				<span className="date">{date.getDate()}</span>
				<span className="month">{format(date, "MMMM")}</span>
				<span className="year">{date.getFullYear()}</span>
			</div>

			<Divider />

			<div className="content-row row">{content}</div>

			<div className="bottom-row row">
				<div className="message-row row">
					{message && (messageType === "info" ? <InfoIcon /> : <WarningIcon />)}
					<span>{message}</span>
				</div>

				<div className="actions-row row">
					{buttonType === "start" && (
						<Button
							className="actions-btn, start-btn"
							primary
							noDisabledStyles
							text="Start"
							rightIcon={<ArrowForwardSmallIcon />}
							onClick={onClick}
							disabled={status > 9}
							loading={loading}
						/>
					)}

					{buttonType === "continue" && (
						<Button
							className="actions-btn, start-btn"
							primary
							noDisabledStyles
							text="Continue"
							rightIcon={<ArrowForwardSmallIcon />}
							onClick={onClick}
							disabled={status > 9}
							loading={loading}
						/>
					)}

					{buttonType === "start-over" && (
						<Fragment>
							<Button
								className="actions-btn, start-btn"
								primary
								noDisabledStyles
								text="Start over"
								rightIcon={<RefreshIcon />}
								onClick={onClick}
								disabled={status > 9}
								loading={loading}
							/>

							<Link className="btn actions-btn return-btn" to="/items-list">
								Go to items list
							</Link>
						</Fragment>
					)}

					{buttonType === "items-list" && (
						<Link className="btn actions-btn return-btn" to="/items-list">
							Go to items list
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default SupportingPage;
