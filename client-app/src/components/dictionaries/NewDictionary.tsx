import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Slider, Switch } from "antd";

import LanguagesList from "./LanguagesList";

const NewDictionary = () => {
	const [preferredLearningListSize, setPreferredLearningListSize] = useState(50);
	const [requiredCorrectAnswersNumber, setRequiredCorrectAnswersNumber] = useState(5);
	const [isHardModeEnabled, setHardModeEnabled] = useState(false);
	const [isMain, setMain] = useState(false);

	return (
		<div id="new-dictionary-container" className="manage-dictionary-container">
			<LanguagesList id="language-list-from" type="known-language" />

			<div id="new-dictionary">
				<div className="flags-row">
					<div className="lang-container known-lang-container">
						<span className="title">I know</span>

						<button className="btn flag-btn known-lang-btn no-disabled-styles" disabled>
							<img src="/images/flags/ukr.png" alt="ukr" />
						</button>
					</div>

					<div className="lang-container lang-to-learn-container">
						<span className="title">I learn</span>

						<button className="btn flag-btn lang-to-learn-btn no-disabled-styles" disabled>
							<img src="/images/flags/eng.png" alt="eng" />
						</button>
					</div>
				</div>

				<div className="settings-row">
					<div className="preferred-list-size form-item">
						<label>
							<span className="title">Preferred training size:</span>
							<span className="slider-value">{preferredLearningListSize} items</span>
						</label>

						<Slider
							className="slider"
							min={50}
							max={100}
							step={10}
							defaultValue={50}
							tooltipVisible={false}
							onChange={(value: any) => setPreferredLearningListSize(value)}
						/>
					</div>

					<div className="required-correct-answers form-item">
						<label>
							<span className="title">Required correct answers:</span>
							<span className="slider-value">{requiredCorrectAnswersNumber} answers</span>
						</label>

						<Slider
							className="slider"
							min={5}
							max={10}
							defaultValue={5}
							tooltipVisible={false}
							onChange={(value: any) => setRequiredCorrectAnswersNumber(value)}
						/>
					</div>

					<div className="is-hardmode-enabled toggle-item form-item">
						<label>Is hardmode enabled:</label>

						<Switch className="toggle" onChange={setHardModeEnabled} />
					</div>

					<div className="is-main toggle-item form-item">
						<label>Is this my main dictionary:</label>

						<Switch className="toggle" onChange={setMain} />
					</div>
				</div>

				<div className="actions-row">
					<button className="btn actions-btn primary add-btn">Add</button>

					<Link className="btn actions-btn cancel-btn" to="/dashboard">
						Cancel
					</Link>
				</div>
			</div>

			<LanguagesList id="language-list-to" type="language-to-learn" />
		</div>
	);
};

export default NewDictionary;
