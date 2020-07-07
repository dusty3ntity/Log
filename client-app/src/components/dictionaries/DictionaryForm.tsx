import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Slider, Switch } from "antd";

import { ILanguage, INewDictionary } from "../../app/models/dictionary";

interface IProps {
	id: string;

	knownLanguage?: ILanguage | undefined;
	languageToLearn?: ILanguage | undefined;

	onKnownLanguageButtonClick?: () => void;
	onLanguageToLearnButtonClick?: () => void;

	onSubmit: (formData: any) => void;
}

const DictionaryForm: React.FC<IProps> = ({
	id,
	knownLanguage,
	languageToLearn,
	onKnownLanguageButtonClick,
	onLanguageToLearnButtonClick,
	onSubmit,
}) => {
	const [preferredLearningListSize, setPreferredLearningListSize] = useState(50);
	const [requiredCorrectAnswersNumber, setRequiredCorrectAnswersNumber] = useState(5);
	const [isHardModeEnabled, setHardModeEnabled] = useState(false);
	const [isMain, setMain] = useState(false);

	const onFormSubmit = () => {
		const newDictionary: INewDictionary = {
			knownLanguageCode: knownLanguage!.isoCode,
			languageToLearnCode: languageToLearn!.isoCode,
			preferredLearningListSize: preferredLearningListSize,
			correctAnswersToItemCompletion: requiredCorrectAnswersNumber,
			isMain: isMain,
			isHardModeEnabled: isHardModeEnabled,
		};

		onSubmit(newDictionary);
	};

	return (
		<div className="dictionary-form" id={id}>
			<div className="flags-row">
				<div className="lang-container known-lang-container">
					<span className="title">I know</span>

					{!knownLanguage && <div className="flag-placeholder" />}

					<button
						className={`btn ${knownLanguage ? "flag-btn" : "flag-placeholder-btn"} known-lang-btn`}
						onClick={onKnownLanguageButtonClick}
					>
						{knownLanguage && (
							<img src={`/images/flags/${knownLanguage.isoCode}.png`} alt={knownLanguage.isoCode} />
						)}
					</button>

					{knownLanguage && (
						<div className="flag">
							<img
								src={`/images/flags/${knownLanguage.isoCode}.png`}
								className="flag"
								alt={knownLanguage.isoCode}
							/>
						</div>
					)}
				</div>

				<div className="lang-container lang-to-learn-container">
					<span className="title">I learn</span>

					{!languageToLearn && <div className="flag-placeholder" />}

					<button
						className={`btn ${languageToLearn ? "flag-btn" : "flag-placeholder-btn"} lang-to-learn-btn`}
						onClick={onLanguageToLearnButtonClick}
					>
						{languageToLearn && (
							<img src={`/images/flags/${languageToLearn.isoCode}.png`} alt={languageToLearn.isoCode} />
						)}
					</button>

					{languageToLearn && (
						<div className="flag">
							<img
								src={`/images/flags/${languageToLearn.isoCode}.png`}
								className="flag"
								alt={languageToLearn.isoCode}
							/>
						</div>
					)}
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
				<button
					className="btn actions-btn primary add-btn"
					disabled={!knownLanguage || !languageToLearn}
					onClick={onFormSubmit}
				>
					Create
				</button>

				<Link className="btn actions-btn cancel-btn" to="/dashboard">
					Cancel
				</Link>
			</div>
		</div>
	);
};

export default DictionaryForm;
