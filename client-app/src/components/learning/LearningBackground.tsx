import React from "react";

interface IProps {
	className: string;
}

const LearningBackground: React.FC<IProps> = ({ className }) => {
	const skeleton = [];

	for (let i = 0; i < 11; i++) 
		skeleton.push(<li key={i} />);

	return (
		<div className={`learning-background ${className}`}>
			<div className="bg-big background">
				<div className="skeleton">{skeleton}</div>
			</div>
			<div className="bg-medium background">
				<div className="skeleton">{skeleton}</div>
			</div>
			<div className="bg-small background">
				<div className="skeleton">{skeleton}</div>
			</div>
		</div>
	);
};

export default LearningBackground;
