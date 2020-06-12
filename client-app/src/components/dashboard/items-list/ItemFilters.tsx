import React from "react";
import { Checkbox, Badge } from "antd";

interface IProps {
	classNames: string;
}

const ItemFilters: React.FC<IProps> = ({ classNames }) => {
	return (
		<div id="item-filters" className={classNames}>
			<h1 id="filters-title" className="mlg-hidden">
				Filters
			</h1>

			<div className="divider mlg-hidden" />

			<div id="filters-container">
				<div className="filters-category">
					<h2 className="category-title">Type</h2>
					<Checkbox className="filters-item">
						<span className="item-name">Words</span>
					</Checkbox>
					<Checkbox className="filters-item">
						<span className="item-name">Phrases</span>
					</Checkbox>
				</div>

				<div className="divider" />

				<div className="filters-category">
					<h2 className="category-title">Progress</h2>
					<Checkbox className="filters-item">
						<span className="item-name">Learned</span>
						<Badge status="success" />
					</Checkbox>

					<Checkbox className="filters-item">
						<span className="item-name">In progress</span>
						<Badge status="warning" />
					</Checkbox>

					<Checkbox className="filters-item">
						<span className="item-name">Untouched</span>
						<Badge status="default" />
					</Checkbox>
				</div>
			</div>
		</div>
	);
};

export default ItemFilters;
