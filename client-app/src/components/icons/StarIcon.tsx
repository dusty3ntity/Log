import React from "react";

// star-black-24dp

interface IProps {
	className?: string;
	active?: boolean;
	tourStep?: string;
}

const StarIcon: React.FC<IProps> = ({ className, active, tourStep }) => {
	const classNames = "icon star-icon" + (className ? " " + className : "") + (active ? " active" : "");

	return (
		<svg className={classNames} viewBox="0 0 24 24" tour-step={tourStep}>
			<g>
				<path d="M0,0h24v24H0V0z" fill="none" />
				<path d="M0,0h24v24H0V0z" fill="none" />
			</g>
			<g>
				<path d="M12,17.27l4.15,2.51c0.76,0.46,1.69-0.22,1.49-1.08l-1.1-4.72l3.67-3.18c0.67-0.58,0.31-1.68-0.57-1.75l-4.83-0.41 l-1.89-4.46c-0.34-0.81-1.5-0.81-1.84,0L9.19,8.63L4.36,9.04c-0.88,0.07-1.24,1.17-0.57,1.75l3.67,3.18l-1.1,4.72 c-0.2,0.86,0.73,1.54,1.49,1.08L12,17.27z" />
			</g>
		</svg>
	);
};

export default StarIcon;
