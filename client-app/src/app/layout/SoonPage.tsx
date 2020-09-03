import React from "react";

const SoonPage: React.FC = ({ ...props }) => {
	document.title = "Soon - Log";

	return (
		<div id="soon-page" {...props}>
			<h1>
				<div>
					<ul>
						<li>Bientôt...</li>
						<li>Незабаром...</li>
						<li>Bald...</li>
						<li>Скоро...</li>
						<li>Soon...</li>
					</ul>
				</div>
			</h1>
		</div>
	);
};

export default SoonPage;
