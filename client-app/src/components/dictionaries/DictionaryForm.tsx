import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useForm, Controller } from "react-hook-form";

import { RootStoreContext } from "../../app/stores/rootStore";
import { IComponentProps } from "../../app/models/components";
import { INewDictionary, IDictionary, IEditDictionary } from "../../app/models/dictionary";
import { ILanguage } from "../../app/models/languages";
import Button from "../common/inputs/Button";
import Tooltip from "../common/tooltips/Tooltip";
import Switch from "../common/inputs/Switch";
import Slider from "../common/inputs/Slider";
import { createConfirmationModal } from "../../app/common/components/modals";
import { combineClassNames } from "../../app/common/util/classNames";

export interface IDictionaryFormProps extends IComponentProps {
	dictionary?: IDictionary;

	knownLanguage?: ILanguage;
	languageToLearn?: ILanguage;

	onKnownLanguageButtonClick?: () => void;
	onLanguageToLearnButtonClick?: () => void;

	onSubmit: any;
	onDelete?: () => void;
}

interface FormData {
	preferredLearningListSize: number;
	correctAnswersToItemCompletion: number;
	isHardModeEnabled: boolean;
	isMain: boolean;
}

const DictionaryForm: React.FC<IDictionaryFormProps> = ({
	id,
	className,
	dictionary,
	knownLanguage,
	languageToLearn,
	onKnownLanguageButtonClick,
	onLanguageToLearnButtonClick,
	onSubmit,
	onDelete,
	...props
}) => {
	const rootStore = useContext(RootStoreContext);
	const { submitting, deleting } = rootStore.dictionaryStore;

	const { register, watch, formState, control, handleSubmit, reset } = useForm<FormData>({
		defaultValues: dictionary || {
			preferredLearningListSize: 50,
			correctAnswersToItemCompletion: 5,
			isHardModeEnabled: false,
			isMain: false,
		},
	});

	const submit = async (data: FormData) => {
		if (!dictionary) {
			const newDictionary: INewDictionary = {
				knownLanguageCode: knownLanguage!.isoCode,
				languageToLearnCode: languageToLearn!.isoCode,
				preferredLearningListSize: data.preferredLearningListSize,
				correctAnswersToItemCompletion: data.correctAnswersToItemCompletion,
				isMain: data.isMain,
				isHardModeEnabled: data.isHardModeEnabled,
			};

			onSubmit(newDictionary);
		} else {
			const editDictionary: IEditDictionary = {
				preferredLearningListSize: data.preferredLearningListSize,
				correctAnswersToItemCompletion: data.correctAnswersToItemCompletion,
				isHardModeEnabled: data.isHardModeEnabled,
			};

			const result = await onSubmit(dictionary.id, editDictionary);
			if (result) {
				reset(editDictionary);
			}
		}
	};

	const handleDelete = () => {
		const modalContent = (
			<>
				<span>Are you sure you want to delete this dictionary?</span>
				<span>This can't be undone.</span>
			</>
		);

		const onOk = () => {
			onDelete!();
		};

		createConfirmationModal(modalContent, "Delete", onOk);
	};

	return (
		<form
			id={id}
			className={combineClassNames("dictionary-form", className)}
			{...props}
			onSubmit={handleSubmit(submit)}
		>
			<div className="flags-row">
				<div className="lang-container known-lang-container">
					<span className="title">I know</span>

					{!knownLanguage && !dictionary && <div className="flag-placeholder" />}

					{!dictionary && (
						<Button
							className={combineClassNames(
								"known-lang-btn",
								knownLanguage ? "flag-btn" : "flag-placeholder-btn"
							)}
							onClick={onKnownLanguageButtonClick}
						>
							{knownLanguage && (
								<img src={`/images/flags/${knownLanguage.isoCode}.png`} alt={knownLanguage.isoCode} />
							)}
						</Button>
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
						<Button
							className={combineClassNames(
								"lang-to-learn-btn",
								knownLanguage ? "flag-btn" : "flag-placeholder-btn"
							)}
							onClick={onLanguageToLearnButtonClick}
						>
							{languageToLearn && (
								<img
									src={`/images/flags/${languageToLearn.isoCode}.png`}
									alt={languageToLearn.isoCode}
								/>
							)}
						</Button>
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
						<Tooltip
							text="We’ll try to adjust the items count of each training to this value."
							position="top-start"
						>
							<span className="title">Preferred training size:</span>
						</Tooltip>

						<span className="slider-value">{watch("preferredLearningListSize")} items</span>
					</label>

					<Controller
						as={Slider}
						min={50}
						max={100}
						step={10}
						name="preferredLearningListSize"
						control={control}
					/>
				</div>

				<div className="required-correct-answers form-item">
					<label>
						<Tooltip
							text="Number of correct answers for item to be considered as mastered."
							position="top-start"
						>
							<span className="title">Required correct answers:</span>
						</Tooltip>

						<span className="slider-value">{watch("correctAnswersToItemCompletion")} answers</span>
					</label>

					<Controller as={Slider} min={5} max={10} name="correctAnswersToItemCompletion" control={control} />
				</div>

				<div className="is-hardmode-enabled toggle-item form-item">
					<Tooltip text="Resets item correct answers count if wrong answer provided." position="top-start">
						<label>Is hardmode enabled:</label>
					</Tooltip>

					<Switch name="isHardModeEnabled" ref={register} />
				</div>

				{!dictionary && (
					<div className="is-main toggle-item form-item">
						<Tooltip text="Main dictionary loads initially on each application start." position="top-start">
							<label>Is this my main dictionary:</label>
						</Tooltip>

						<Switch name="isMain" ref={register} />
					</div>
				)}
			</div>

			<div className="actions-row">
				<Button
					className="actions-btn add-btn"
					primary
					type="submit"
					text={!dictionary ? "Create" : "Update"}
					disabled={!dictionary ? !knownLanguage || !languageToLearn : !formState.dirty}
					loading={submitting}
				/>

				{!dictionary && (
					<Link className="btn actions-btn cancel-btn" to="/items-list">
						Cancel
					</Link>
				)}

				{dictionary && (
					<Button
						className="actions-btn delete-btn"
						onClick={handleDelete}
						text="Delete"
						disabled={dictionary.isMain}
						loading={deleting}
					/>
				)}
			</div>
		</form>
	);
};

export default observer(DictionaryForm);
