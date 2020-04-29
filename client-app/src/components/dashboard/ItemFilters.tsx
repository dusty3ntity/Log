import React from "react";
import { Layout, Divider, Checkbox, Badge } from "antd";

const { Sider } = Layout;

const ItemFilters = () => {
	return (
		<Sider
			id="item-filters"
			className="dashboard-sider"
			width={186}
			trigger={null}
			collapsible
			breakpoint={"xl"}
			collapsedWidth={0}
		>
			<h2 id="filters-title">Filters</h2>
			<div id="filters-container">
				<div id="filters-category">
					<h3>Category</h3>
					<Checkbox>Words</Checkbox>
					<br />
					<Checkbox>Phrases</Checkbox>
				</div>

				<Divider />

				<div id="filters-progress">
					<h3>Progress</h3>
					<Checkbox>Learned <Badge status="success" /></Checkbox>
					<br />
					<Checkbox>In progress <Badge status="warning" /></Checkbox>
					<br />
					<Checkbox>Untouched <Badge status="default" /></Checkbox>
				</div>
			</div>
		</Sider>
	);
};

export default ItemFilters;
