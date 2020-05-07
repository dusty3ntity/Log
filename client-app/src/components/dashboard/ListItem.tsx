import React, { useContext } from "react";
import { Row, Col, Divider, Checkbox, Space } from "antd";
import { IItem } from "../../app/models/item";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";

interface IProps {
	item: IItem;
}

const ListItem: React.FC<IProps> = ({ item }) => {
	const rootStore = useContext(RootStoreContext);
	const { selectItem } = rootStore.itemStore;

	const progress = item.isLearned ? "learned" : item.totalRepeatsCount > 0 ? "in-progress" : "untouched";

	return (
		<div className="list-item">
			<Row className="list-item-row">
				<Col span={2} className="item-selector-col">
					<div className={"progress-bar " + progress}>‌‌</div>
					<Checkbox className="selector" />
				</Col>

				<Col span={8} className="text-col original">
					{item.original}
				</Col>

				<Col span={1} className="item-divider-col">
					<Divider type="vertical" />
				</Col>

				<Col span={8} className="text-col translation">
					{item.translation}
				</Col>

				<Col span={5} className="item-actions-col">
					<Space className="item-actions" size="middle">
						<button className="item-star-btn">
							<i className="material-icons star-icon">star</i>
						</button>

						<button className="item-actions-dropdown" onClick={() => selectItem(item.id)}>
							<i className="material-icons actions-icon">more_vert</i>
						</button>
					</Space>
				</Col>
			</Row>
		</div>
	);
};

export default observer(ListItem);
