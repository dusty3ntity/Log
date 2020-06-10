import React, { useContext } from "react";
import { Row, Space, Divider, Form, Button } from "antd";
import { RootStoreContext } from "../../../app/stores/rootStore";
import EditInput from "../../common/EditInput";
import { IItem } from "../../../app/models/item";

interface IProps {
	item: IItem;
}

const ItemDetailsEditForm: React.FC<IProps> = ({ item }) => {
	const rootStore = useContext(RootStoreContext);
	const { editItem, closeEditor } = rootStore.itemStore;

	const onSubmit = (formData: any) => {
		let editedItem = {
			original: formData.original === item.original ? undefined : formData.original,
			translation: formData.translation === item.translation ? undefined : formData.translation,
			definition: formData.definition === item.definition ? undefined : formData.definition,
			definitionOrigin: undefined
		};

		editItem(item.id, editedItem);
	};

	return (
		<Form onFinish={onSubmit}>
			<div id="details-container">
				<Row id="header-row" align="middle" justify="center">
					{/* {item.isStarred && <div>Starred</div>} */}
				</Row>

				<Row id="item-row" align="middle" justify="center">
					<EditInput name="original" className="original" value={item.original} autoFocus />
					<span className="type">Word</span>
					<Divider />
					<EditInput name="translation" className="translation" value={item.translation} />
					{item.definition && <EditInput name="definition" className="definition" value={item.definition} />}
					{/* <span className="definition-origin">Cambridge Dictionary</span> */}
				</Row>

				<Row id="stats-row" align="middle" justify="center"></Row>

				<Row id="actions-row" align="middle" justify="center">
					<Space size="large">
						<Button id="save-btn" htmlType="submit">
							Save
						</Button>

						<Button id="cancel-btn" className="actions-btn" htmlType="reset" onClick={closeEditor}>
							Cancel
						</Button>
					</Space>
				</Row>
			</div>
		</Form>
	);
};

export default ItemDetailsEditForm;
