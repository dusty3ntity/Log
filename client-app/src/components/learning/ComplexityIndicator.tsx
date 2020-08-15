import React from "react";
import HappySmileIcon from "../icons/HappySmileIcon";
import NeutralSmileIcon from "../icons/NeutralSmileIcon";
import UnhappySmileIcon from "../icons/UnhappySmileIcon";

interface IProps {
	complexity: number;
}

const ComplexityIndicator: React.FC<IProps> = ({ complexity }) => {
	return (
		<div className="difficulty-indicator" tour-step="3-3">
			{complexity < 0.4 && <HappySmileIcon />}
			{complexity >= 0.4 && complexity < 0.8 && <NeutralSmileIcon />}
			{complexity >= 0.8 && <UnhappySmileIcon />}
		</div>
	);
};

export default ComplexityIndicator;
