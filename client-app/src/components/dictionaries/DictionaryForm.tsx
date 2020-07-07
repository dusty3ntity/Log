import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Slider, Switch } from "antd";

import { ILanguage, INewDictionary, IDictionary, IEditDictionary } from "../../app/models/dictionary";

interface IProps {
	id: string;
	className?: string;

	dictionary?: IDictionary;

	knownLanguage?: ILanguage | undefined;
	languageToLearn?: ILanguage | undefined;

	onKnownLanguageButtonClick?: () => void;
	onLanguageToLearnButtonClick?: () => void;

	onSubmit: any;
	onDelete?: () => void;
}

const DictionaryForm: React.FC<IProps> = ({
	id,
	className,
	dictionary,
	knownLanguage,
	languageToLearn,
	onKnownLanguageButtonClick,
	onLanguageToLearnButtonClick,
	onSubmit,
	onDelete,
}) => {
	const [preferredLearningListSize, setPreferredLearningListSize] = useState(
		dictionary ? dictionary.preferredLearningListSize : 50
	);
	const [requiredCorrectAnswersNumber, setRequiredCorrectAnswersNumber] = useState(
		dictionary ? dictionary.correctAnswersToItemCompletion : 5
	);
	const [isHardModeEnabled, setHardModeEnabled] = useState(dictionary ? dictionary.isHardModeEnabled : false);
	const [isMain, setMain] = useState(false);

	const [isDirty, setDirty] = useState(false);

	const onFormSubmit = async () => {
		if (!dictionary) {
			const newDictionary: INewDictionary = {
				knownLanguageCode: knownLanguage!.isoCode,
				languageToLearnCode: languageToLearn!.isoCode,
				preferredLearningListSize: preferredLearningListSize,
				correctAnswersToItemCompletion: requiredCorrectAnswersNumber,
				isMain: isMain,
				isHardModeEnabled: isHardModeEnabled,
			};

			await onSubmit(newDictionary);
		} else {
			const editDictionary: IEditDictionary = {
				preferredLearningListSize: preferredLearningListSize,
				correctAnswersToItemCompletion: requiredCorrectAnswersNumber,
				isHardModeEnabled: isHardModeEnabled,
			};

			const success = await onSubmit(dictionary.id, editDictionary);

			if (success) {
				setDirty(false);
			}
		}
	};

	return (
		<div className={`dictionary-form ${className ? className : ""}`} id={id}>
			<div className="flags-row">
				<div className="lang-container known-lang-container">
					<span className="title">I know</span>

					{!knownLanguage && !dictionary && <div className="flag-placeholder" />}

					{!dictionary && (
						<button
							className={`btn ${knownLanguage ? "flag-btn" : "flag-placeholder-btn"} known-lang-btn`}
							onClick={onKnownLanguageButtonClick}
						>
							{knownLanguage && (
								<img src={`/images/flags/${knownLanguage.isoCode}.png`} alt={knownLanguage.isoCode} />
							)}
						</button>
					)}

					{(knownLanguage || dictionary) && (
						<div className="flag">
							<img
								src={`/images/flags/${
									knownLanguage ? knownLanguage.isoCode : dictionary!.knownLanguage.isoCode
								}.png`}
								className="flag"
								alt={knownLanguage ? knownLanguage.isoCode : dictionary!.knownLanguage.isoCode}
							/>
						</div>
					)}
				</div>

				<div className="lang-container lang-to-learn-container">
					<span className="title">I learn</span>

					{!languageToLearn && !dictionary && <div className="flag-placeholder" />}

					{!dictionary && (
						<button
							className={`btn ${languageToLearn ? "flag-btn" : "flag-placeholder-btn"} lang-to-learn-btn`}
							onClick={onLanguageToLearnButtonClick}
						>
							{languageToLearn && (
								<img
									src={`/images/flags/${languageToLearn.isoCode}.png`}
									alt={languageToLearn.isoCode}
								/>
							)}
						</button>
					)}

					{(languageToLearn || dictionary) && (
						<div className="flag">
							<img
								src={`/images/flags/${
									languageToLearn ? languageToLearn.isoCode : dictionary!.languageToLearn.isoCode
								}.png`}
								className="flag"
								alt={languageToLearn ? languageToLearn.isoCode : dictionary!.languageToLearn.isoCode}
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
						value={preferredLearningListSize}
						tooltipVisible={false}
						onChange={(value: any) => {
							setDirty(
								value !== dictionary?.preferredLearningListSize
									? true
									: requiredCorrectAnswersNumber !== dictionary?.correctAnswersToItemCompletion ||
											isHardModeEnabled !== dictionary?.isHardModeEnabled
							);
							setPreferredLearningListSize(value);
						}}
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
						value={requiredCorrectAnswersNumber}
						tooltipVisible={false}
						onChange={(value: any) => {
							setDirty(
								value !== dictionary?.correctAnswersToItemCompletion
									? true
									: preferredLearningListSize !== dictionary?.preferredLearningListSize ||
											isHardModeEnabled !== dictionary?.isHardModeEnabled
							);
							setRequiredCorrectAnswersNumber(value);
						}}
					/>
				</div>

				<div className="is-hardmode-enabled toggle-item form-item">
					<label>Is hardmode enabled:</label>

					<Switch
						className="toggle"
						checked={isHardModeEnabled}
						onChange={(value) => {
							setDirty(
								value !== dictionary?.isHardModeEnabled
									? true
									: preferredLearningListSize !== dictionary?.preferredLearningListSize ||
											requiredCorrectAnswersNumber !== dictionary.correctAnswersToItemCompletion
							);
							setHardModeEnabled(value);
						}}
					/>
				</div>

				{!dictionary && (
					<div className="is-main toggle-item form-item">
						<label>Is this my main dictionary:</label>

						<Switch className="toggle" onChange={setMain} />
					</div>
				)}
			</div>

			<div className="actions-row">
				<button
					className="btn actions-btn primary add-btn"
					disabled={!dictionary ? !knownLanguage || !languageToLearn : !isDirty}
					onClick={onFormSubmit}
				>
					{!dictionary ? "Create" : "Edit"}
				</button>

				{!dictionary && (
					<Link className="btn actions-btn cancel-btn" to="/dashboard">
						Cancel
					</Link>
				)}

				{dictionary && (
					<button className="btn actions-btn delete-btn" onClick={onDelete} disabled={dictionary.isMain}>
						Delete
					</button>
				)}
			</div>
		</div>
	);
};

export default DictionaryForm;
