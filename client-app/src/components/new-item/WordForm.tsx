import React, { useContext, useState } from "react";
import { Form, Input } from "antd";

import { RootStoreContext } from "../../app/stores/rootStore";
import { INewItem } from "../../app/models/item";
import PlusIcon from "../icons/PlusIcon";
import StarIcon from "../icons/StarIcon";
import MinusIcon from "../icons/MinusIcon";

const { TextArea } = Input;

const WordForm = () => {
	const rootStore = useContext(RootStoreContext);
	const { createItem } = rootStore.itemStore;

	const [definitionActivated, setDefinition] = useState(false);
	const [starred, setStarred] = useState(false);

	const onSubmit = (formData: any) => {
		let newItem: INewItem = {
			original: formData.original,
			translation: formData.translation,
			definition: definitionActivated ? formData.definition : null,
			definitionOrigin: null,
			type: 10,
			isStarred: starred,
		};

		createItem(newItem);
	};

	return (
		<Form id="new-word-form" className="new-item-form" onFinish={onSubmit} layout="vertical">
			<Form.Item label="Original" name="original" className="original-input">
				<Input className="text-input original" autoFocus />
			</Form.Item>

			<Form.Item label="Translation" name="translation" className="translation-input">
				<Input className="text-input translation" />
			</Form.Item>

			<div className="definition-actions">
				<button
					className="btn definition-actions-btn add-definition-btn"
					type="button"
					onClick={() => {
						definitionActivated ? setDefinition(false) : setDefinition(true);
					}}
				>
					{definitionActivated ? <MinusIcon /> : <PlusIcon />}
					<span>Definition</span>
				</button>

				<button
					className="btn definition-actions-btn star-btn round"
					type="button"
					onClick={() => {
						starred ? setStarred(false) : setStarred(true);
					}}
				>
					<StarIcon active={starred} />
				</button>
			</div>

			<Form.Item label="Definition" name="definition" className={!definitionActivated ? " hidden" : ""}>
				<TextArea rows={2} className="text-input text-area definition" autoSize={false} maxLength={80} />
			</Form.Item>

			<div className="form-actions">
				<button className="btn add-btn form-actions-btn" type="submit">
					Add
				</button>

				<a className="btn cancel-btn form-actions-btn" href="/dashboard">
					Cancel
				</a>
			</div>
		</Form>
	);
};

export default WordForm;
