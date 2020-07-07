import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { IItem, INewItem, ItemType } from "../../../app/models/item";
import { hasTrailingWhitespaces, minLength, maxLength, includes } from "../../../app/common/forms/formValidators";
import ValidationMessage from "./ValidationMessage";
import PlusIcon from "../../icons/PlusIcon";
import StarIcon from "../../icons/StarIcon";
import MinusIcon from "../../icons/MinusIcon";

interface IProps {
	type: ItemType;
	id: string;
	item?: IItem;
	onSubmit: (item: INewItem, resetForm: () => void) => void;
}

interface FormData {
	original: string;
	translation: string;
	definition?: string | null;
	definitionOrigin?: string | null;
}

const NewItemForm: React.FC<IProps> = ({ type, id, item, onSubmit }) => {
	const [definitionActivated, setDefinitionActivated] = useState(item?.definition ? true : false);
	const [isStarred, setStarred] = useState(item?.isStarred ? true : false);

	const { register, handleSubmit, errors, getValues, formState, reset, setValue } = useForm<FormData>({
		defaultValues: item,
	});

	const handleDefinitionButton = () => {
		setValue("definition", null);
		setDefinitionActivated(!definitionActivated);
	};

	const submit = (data: FormData) => {
		let newItem: INewItem = {
			original: data.original,
			translation: data.translation,
			definition: definitionActivated && data.definition!.length > 0 ? data.definition! : null,
			definitionOrigin: null,
			type: type,
			isStarred: isStarred,
		};

		onSubmit(newItem, reset);
	};

	return (
		<form id={id} className="item-form" onSubmit={handleSubmit(submit)}>
			<div className="original-input form-item">
				<label htmlFor="original">
					<span className="label-text">Original</span>
					<span className="language-badge">eng</span>
				</label>

				<ValidationMessage name="original" errors={errors} />

				<input
					name="original"
					className="text-input original"
					type="text"
					autoFocus
					ref={register({
						required: "Original is required.",
						validate: {
							trailingWhitespaces: (value) => {
								return hasTrailingWhitespaces(value) ? "Please remove trailing whitespaces." : true;
							},
							minLength: (value: string) => {
								return minLength(value, 2) ? "Original must be at least 2 characters." : true;
							},
							maxLength: (value: string) => {
								return maxLength(value, 30) ? "Original can be at most 30 characters." : true;
							},
							includesTranslation: (value: string) => {
								return includes(value, getValues("translation"))
									? "Original mustn't contain translation."
									: true;
							},
						},
					})}
				/>
			</div>
			<div className="translation-input form-item">
				<label htmlFor="translation">
					<span className="label-text">Translation</span>
					<span className="language-badge">rus</span>
				</label>

				<ValidationMessage name="translation" errors={errors} />

				<input
					name="translation"
					type="text"
					className="text-input translation"
					ref={register({
						required: "Translation is required.",
						validate: {
							trailingWhitespaces: (value) => {
								return hasTrailingWhitespaces(value) ? "Please remove trailing whitespaces." : true;
							},
							minLength: (value: string) => {
								return minLength(value, 2) ? "Translation must be at least 2 characters." : true;
							},
							maxLength: (value: string) => {
								return maxLength(value, 30) ? "Translation can be at most 30 characters." : true;
							},
							includesOriginal: (value: string) => {
								return includes(value, getValues("original"))
									? "Translation mustn't contain original."
									: true;
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

				<div className="right-container">
					<button
						className="btn definition-actions-btn add-definition-btn"
						type="button"
						onClick={handleDefinitionButton}
					>
						{definitionActivated ? <MinusIcon /> : <PlusIcon />}
						<span>Definition</span>
					</button>

					{!item && (
						<button
							className="btn definition-actions-btn star-btn round"
							type="button"
							onClick={() => {
								setStarred(!isStarred);
							}}
						>
							<StarIcon active={isStarred} />
						</button>
					)}
				</div>
			</div>

			<div className={`definition form-item ${!definitionActivated ? "disabled" : ""}`}>
				<label htmlFor="definition">Definition</label>

				<ValidationMessage name="definition" errors={errors} />

				<textarea
					name="definition"
					className="text-input text-area definition"
					rows={2}
					maxLength={100}
					ref={register({
						validate: {
							trailingWhitespaces: (value) => {
								return hasTrailingWhitespaces(value) ? "Please remove trailing whitespaces." : true;
							},
							minLength: (value: string) => {
								if (value.length > 0)
									return minLength(value, 5) ? "Definition must be at least 5 characters." : true;
								return true;
							},
							includesOriginal: (value: string) => {
								return includes(value, getValues("original"))
									? "Definition mustn't contain original."
									: true;
							},
							includesTranslation: (value: string) => {
								return includes(value, getValues("translation"))
									? "Definition mustn't contain translation."
									: true;
							},
						},
					})}
				/>
			</div>

			<div className="form-actions">
				<button
					className="btn add-btn form-actions-btn primary"
					type="submit"
					disabled={!formState.dirty || (formState.submitCount > 0 && !formState.isValid)}
				>
					{item ? "Edit" : "Add"}
				</button>

				<Link className="btn cancel-btn form-actions-btn" to="/dashboard">
					Cancel
				</Link>
			</div>
		</form>
	);
};

export default observer(NewItemForm);