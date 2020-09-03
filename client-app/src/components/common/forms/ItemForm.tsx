import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { IComponentProps } from "../../../app/models/components";
import { IItem, INewItem, ItemType } from "../../../app/models/item";
import { fullTrim, minLength, maxLength, includes } from "../../../app/common/forms/formValidators";
import ValidationMessage from "./ValidationMessage";
import Button from "../inputs/Button";
import Tooltip from "../tooltips/Tooltip";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { createConfirmationModal } from "../../../app/common/components/modals";
import { combineClassNames } from "../../../app/common/util/classNames";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import StarIcon from "../icons/StarIcon";

export interface IItemFormProps extends IComponentProps {
	type: ItemType;
	id: string;
	item?: IItem;
	onSubmit: (item: INewItem, resetForm: () => void) => void;
	submitting: boolean;
	knownLanguageCode: string;
	languageToLearnCode: string;
}

export interface FormData {
	original: string;
	translation: string;
	definition?: string | null;
	definitionOrigin?: string | null;
}

const NewItemForm: React.FC<IItemFormProps> = ({
	id,
	className,
	type,
	item,
	onSubmit,
	submitting,
	knownLanguageCode,
	languageToLearnCode,
	...props
}) => {
	const [definitionActivated, setDefinitionActivated] = useState(!!item?.definition);
	const [isStarred, setStarred] = useState(item?.isStarred ? true : false);

	const { register, handleSubmit, errors, getValues, formState, reset, setValue } = useForm<FormData>({
		defaultValues: item,
	});

	const rootStore = useContext(RootStoreContext);
	const { activeDictionary } = rootStore.dictionaryStore;

	useEffect(() => {
		reset();
	}, [activeDictionary, reset]);

	const handleDefinitionButton = () => {
		setValue("definition", null);
		setDefinitionActivated(!definitionActivated);
	};

	let formData: FormData;
	let confirmation = false;

	const handleConfirmation = () => {
		const modalContent = (
			<>
				<span>Are you sure you want to update this item?</span>
				<span>Its progress will be lost.</span>
			</>
		);

		const onOk = () => {
			confirmation = true;
			submit(formData!);
		};

		createConfirmationModal(modalContent, "Update", onOk);
	};

	const submit = (data: FormData) => {
		formData = data;

		if (
			item &&
			item.correctAnswersToCompletionCount > 0 &&
			(item.original !== data.original || item.translation !== data.translation) &&
			!confirmation
		) {
			handleConfirmation();
			return;
		}

		let newItem: INewItem = {
			original: fullTrim(data.original),
			translation: fullTrim(data.translation),
			definition: definitionActivated && data.definition!.length > 0 ? fullTrim(data.definition!) : null,
			definitionOrigin: null,
			type: type,
			isStarred: isStarred,
		};

		onSubmit(newItem, reset);
	};

	return (
		<form id={id} className={combineClassNames("item-form", className)} onSubmit={handleSubmit(submit)} {...props}>
			<div className="original-input form-item" tour-step="2-2">
				<label htmlFor="original">
					<span className="label-text">Original</span>
					<span className="language-badge">{languageToLearnCode}</span>
				</label>

				<ValidationMessage inputName="original" errors={errors} />

				<input
					name="original"
					className="text-input original"
					type="text"
					autoFocus
					autoComplete="off"
					ref={register({
						required: "Original is required.",
						validate: {
							validateOriginal: (value: string) => {
								const trimValue = fullTrim(value);

								if (minLength(trimValue, 2)) {
									return "Original must be at least 2 characters.";
								}
								if (maxLength(trimValue, 30)) {
									return "Original can be at most 30 characters.";
								}
								if (includes(trimValue, getValues("translation"))) {
									return "Original mustn't contain translation.";
								}

								return true;
							},
						},
					})}
				/>
			</div>

			<div className="translation-input form-item">
				<label htmlFor="translation">
					<span className="label-text">Translation</span>
					<span className="language-badge">{knownLanguageCode}</span>
				</label>

				<ValidationMessage inputName="translation" errors={errors} />

				<input
					name="translation"
					type="text"
					className="text-input translation"
					autoComplete="off"
					ref={register({
						required: "Translation is required.",
						validate: {
							validateTranslation: (value: string) => {
								const trimValue = fullTrim(value);

								if (minLength(trimValue, 2)) {
									return "Translation must be at least 2 characters.";
								}
								if (maxLength(trimValue, 30)) {
									return "Translation can be at most 30 characters.";
								}
								if (includes(trimValue, getValues("original"))) {
									return "Translation mustn't contain original.";
								}

								return true;
							},
						},
					})}
				/>
			</div>

			<div className="definition-actions">
				<button
					className="btn definition-actions-btn reset-form-btn"
					type="button"
					onClick={() => {
						if (!item) {
							setStarred(false);
							reset();
						} else {
							setDefinitionActivated(item.definition ? true : false);
							reset(item);
						}
					}}
					disabled={!formState.dirty}
				>
					Reset
				</button>

				<div className="right-container" tour-step="2-3">
					<Tooltip text={definitionActivated ? "Remove definition." : "Add definition."} position="bottom">
						<button
							className="btn definition-actions-btn add-definition-btn"
							type="button"
							onClick={handleDefinitionButton}
						>
							{definitionActivated ? <MinusIcon /> : <PlusIcon />}
							<span>Definition</span>
						</button>
					</Tooltip>

					{!item && (
						<Tooltip
							text={
								isStarred
									? "This item will be present in every single training until it is learned."
									: "Starred items are present in every single training until they are learned. This one is not starred."
							}
							position="bottom-end"
						>
							<button
								className="btn definition-actions-btn star-btn round"
								type="button"
								onClick={() => setStarred(!isStarred)}
							>
								<StarIcon active={isStarred} />
							</button>
						</Tooltip>
					)}
				</div>
			</div>

			<div className={`definition form-item ${!definitionActivated ? "disabled" : ""}`}>
				<label htmlFor="definition">Definition</label>

				<ValidationMessage inputName="definition" errors={errors} />

				<textarea
					name="definition"
					className="text-input text-area definition"
					rows={2}
					maxLength={100}
					ref={register({
						validate: {
							validateDefinition: (value: string) => {
								const trimValue = fullTrim(value);

								if (trimValue.length === 0) {
									return true;
								}

								if (minLength(trimValue, 5)) {
									return "Definition must be at least 5 characters.";
								}
								if (includes(trimValue, getValues("original"))) {
									return "Definition mustn't contain original.";
								}
								if (includes(trimValue, getValues("translation"))) {
									return "Definition mustn't contain translation.";
								}

								return true;
							},
						},
					})}
				/>
			</div>

			<div className="form-actions">
				<Button
					className="add-btn form-actions-btn"
					primary
					type="submit"
					text={item ? "Update" : "Create"}
					disabled={!formState.dirty || (formState.submitCount > 0 && !formState.isValid)}
					loading={submitting}
				/>

				<Link className="btn cancel-btn form-actions-btn" to="/items-list">
					Cancel
				</Link>
			</div>
		</form>
	);
};

export default observer(NewItemForm);
