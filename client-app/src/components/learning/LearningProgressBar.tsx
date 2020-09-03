import React from "react";

export interface IProps {
	total: number;
	done: number;
}

const LearningProgressBar: React.FC<IProps> = ({ total, done, ...props }) => {
	return (
		<div id="learning-progressbar" {...props}>
			<div id="progressbar-track">
				<div id="progressbar-slider" style={{ width: `${(done / total) * 100}%` }}>
					<div id="progressbar-counter">
						{done}/{total}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LearningProgressBar;
