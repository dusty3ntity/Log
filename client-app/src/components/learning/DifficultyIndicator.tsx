import React from "react";
import HappySmileIcon from "../icons/HappySmileIcon";
import NeutralSmileIcon from "../icons/NeutralSmileIcon";
import UnhappySmileIcon from "../icons/UnhappySmileIcon";

interface IProps {
	difficulty: "low" | "medium" | "high";
}

const DifficultyIndicator: React.FC<IProps> = ({ difficulty }) => {
	return (
		<div className="difficulty-indicator">
			{difficulty === "low" ? (
				<HappySmileIcon />
			) : difficulty === "medium" ? (
				<NeutralSmileIcon />
			) : (
				<UnhappySmileIcon />
			)}
		</div>
	);
};

export default DifficultyIndicator;
