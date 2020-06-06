import React from "react";
import { Divider, Checkbox, Badge } from "antd";

interface IProps {
	classNames: string;
}

const ItemFilters: React.FC<IProps> = ({ classNames }) => {
	return (
		<div id="item-filters" className={classNames}>
			<div id="filters-container">
				<div id="filters-category">
					<h3>Category</h3>
					<Checkbox className="checkbox">Words</Checkbox>
					<br />
					<Checkbox className="checkbox">Phrases</Checkbox>
				</div>

				<Divider />

				<div id="filters-progress">
					<h3>Progress</h3>
					<Checkbox className="checkbox">
						Learned <Badge status="success" />
					</Checkbox>
					<br />
					<Checkbox className="checkbox">
						In progress <Badge status="warning" />
					</Checkbox>
					<br />
					<Checkbox className="checkbox">
						Untouched <Badge status="default" />
					</Checkbox>
				</div>
			</div>
		</div>
	);
};

export default ItemFilters;
