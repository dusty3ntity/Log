import React from 'react';

interface IProps {
	total: number;
	done: number;
}

const LearningProgressBar: React.FC<IProps> = ({ total, done }) => {
	return (
		<div id="learning-progressbar">
			<div id="progressbar-track">
				<div id="progressbar-slider" style={{width: `${done / total * 100}%`}}>
					<div id="progressbar-counter">{done}/{total}</div>
				</div>
			</div>
		</div>
	);
};

export default LearningProgressBar;
