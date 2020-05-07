import React, { Fragment } from "react";
import { Divider, Checkbox, Badge } from "antd";

const ItemFilters = () => {
	return (
		<Fragment>
			<h2 id="filters-title">Filters</h2>
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
		</Fragment>
	);
};

export default ItemFilters;
