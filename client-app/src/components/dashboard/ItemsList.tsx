import React from "react";
import { Layout, Space, List } from "antd";
import Search from "antd/lib/input/Search";
import ListItem from "./ListItem";
import { IItem } from "../../app/models/item";

import SimpleBar from "simplebar-react";

const { Header, Content } = Layout;

const ItemsList = () => {
	const data: IItem[] = [
		{
			id: "1",
			isLearned: true,
			original: "Horse",
			translation: "Лошадь",
			totalRepeatsCount: 3,
		},
		{
			id: "2",
			isLearned: false,
			original: "House",
			translation: "Дом",
			totalRepeatsCount: 1,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
		{
			id: "3",
			isLearned: false,
			original: "Genuine",
			translation: "Оригинальный",
			totalRepeatsCount: 0,
		},
	];

	return (
		<div id="items-list">
			<Layout>
				<Header id="items-list-header">
					<h2 id="items-list-title">Items</h2>
					<Space className="space" size="large">
						<button id="group-by-date-btn">
							<i id="group-by-date-icon" className="material-icons items-list-header-icon">
								insert_invitation
							</i>
						</button>
						<Search id="item-search" placeholder="item..." />
					</Space>
				</Header>
				<Content>
					<div id="list-container">
						<SimpleBar style={{ height: "100%" }} autoHide={false}>
							<div id="list">
								<List
									split={false}
									itemLayout="horizontal"
									dataSource={data}
									renderItem={(item) => <ListItem item={item} />}
								/>
							</div>
						</SimpleBar>
					</div>
				</Content>
			</Layout>
		</div>
	);
};

export default ItemsList;
