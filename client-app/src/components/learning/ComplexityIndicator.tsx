import React from "react";
import HappySmileIcon from "../icons/HappySmileIcon";
import NeutralSmileIcon from "../icons/NeutralSmileIcon";
import UnhappySmileIcon from "../icons/UnhappySmileIcon";

interface IProps {
	complexity: number;
}

const ComplexityIndicator: React.FC<IProps> = ({ complexity }) => {
	return (
		<div className="difficulty-indicator">
			{complexity > 0.8 ? <UnhappySmileIcon /> : complexity > 0.4 ? <NeutralSmileIcon /> : <HappySmileIcon />}
		</div>
	);
};

export default ComplexityIndicator;
