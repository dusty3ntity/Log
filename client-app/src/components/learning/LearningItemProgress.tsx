import React from 'react';

interface IProps {
	total: number;
	checked: number;
}

const LearningItemProgress: React.FC<IProps> = ({ total, checked }) => {
	const dots = [];

	for (let i = 0; i < checked; i++)
		dots.push(<span className="progress-dot active" key={i} />);
	for (let i = 0; i < total - checked; i++)
		dots.push(<span className="progress-dot" key={i + checked} />);

	return (
		<div className="learning-item-progress">
			{dots}
		</div>
	);
};

export default LearningItemProgress;