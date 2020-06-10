import React, { useContext } from "react";
import { Space, Button, Form, Input } from "antd";
import { RootStoreContext } from "../../app/stores/rootStore";
import { INewItem } from "../../app/models/item";

const WordForm = () => {
	const rootStore = useContext(RootStoreContext);
	const { createItem } = rootStore.itemStore;

	const onSubmit = (formData: any) => {
		let newItem: INewItem = {
			original: formData.original,
			translation: formData.translation,
			definition: "test definition",
			definitionOrigin: null,
			type: 10,
			isStarred: true,
		};

		createItem(newItem);
	};

	return (
		<Form id="new-word-form" onFinish={onSubmit} layout="vertical">
			<Form.Item label="Original" name="original">
				<Input className="original" autoFocus />
			</Form.Item>
			<Form.Item label="Translation" name="translation">
				<Input className="translation" />
			</Form.Item>
			{/* <Form.Item name="definition">
				<Input className="definition" />
			</Form.Item> */}

			<Form.Item>
				<Space className="control-buttons-space" size="large">
					<Button className="add-definition-btn" size="large">
						<i id="plus" className="material-icons plus">
							add
						</i>
						Definition
					</Button>
					<Button className="star-btn" shape="circle" size="large">
						<i id="star" className="material-icons star">
							star
						</i>
					</Button>
				</Space>
			</Form.Item>

			<div className="actions-space-container">
				<Space className="form-actions-space" size="large">
					<Button className="add-btn actions-btn" htmlType="submit">
						Add
					</Button>

					<Button className="cancel-btn actions-btn" htmlType="reset">
						Cancel
					</Button>
				</Space>
			</div>
		</Form>
	);
};

export default WordForm;
