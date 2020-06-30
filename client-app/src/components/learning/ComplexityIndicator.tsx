import React from "react";
import HappySmileIcon from "../icons/HappySmileIcon";
import NeutralSmileIcon from "../icons/NeutralSmileIcon";
import UnhappySmileIcon from "../icons/UnhappySmileIcon";

interface IProps {
	complexity: number;
}

const ComplexityIndicator: React.FC<IProps> = ({ complexity }) => {
	console.log(complexity)
	return (
		<div className="difficulty-indicator">
			{complexity < 0.4 && <HappySmileIcon />}
			{complexity >= 0.4 && complexity < 0.8 && <NeutralSmileIcon />}
			{complexity >= 0.8 && <UnhappySmileIcon />}
		</div>
	);
};

export default ComplexityIndicator;
