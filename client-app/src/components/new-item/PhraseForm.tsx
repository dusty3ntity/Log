import React, { useContext } from "react";
import { Space, Button, Form, Input } from "antd";
import { RootStoreContext } from "../../app/stores/rootStore";
import { INewItem } from "../../app/models/item";

const PhraseForm = () => {
	const rootStore = useContext(RootStoreContext);
	const { createItem } = rootStore.itemStore;

	const onSubmit = (formData: any) => {
		let newItem: INewItem = {
			original: formData.original,
			translation: formData.translation,
			description: formData.description,
			type: 20,
			isStarred: true,
		};

		createItem(newItem);
	};

	return (
		<Form id="new-phrase-form" onFinish={onSubmit} layout="vertical">
			<Form.Item label="Original" name="original">
				<Input className="original" autoFocus />
			</Form.Item>
			<Form.Item label="Translation" name="translation">
				<Input className="translation" />
			</Form.Item>
			{/* <Form.Item name="description">
				<Input className="description" />
			</Form.Item> */}

			<Form.Item>
				<Space>
					<Button>
						<i id="plus" className="material-icons plus">
							add
						</i>
						Definition
					</Button>
					<Button>
						<i id="star" className="material-icons star">
							star
						</i>
					</Button>
				</Space>
			</Form.Item>

			<Space size="large">
				<Button id="save-btn" htmlType="submit">
					Add
				</Button>

				<Button id="cancel-btn" className="actions-btn" htmlType="reset">
					Cancel
				</Button>
			</Space>
		</Form>
	);
};

export default PhraseForm;
