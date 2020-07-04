import React from "react";
import SimpleBar from "simplebar-react";

interface IProps {
	id: string;
	type: "known-language" | "language-to-learn";
}

const LanguagesList: React.FC<IProps> = ({ id, type }) => {
	const languages = [
		{ id: 1, name: "English", ISOCode: "eng" },
		{ id: 2, name: "English", ISOCode: "eng" },
		{ id: 3, name: "English", ISOCode: "eng" },
		{ id: 4, name: "English", ISOCode: "eng" },
		{ id: 5, name: "English", ISOCode: "eng" },
		{ id: 6, name: "English", ISOCode: "eng" },
		{ id: 7, name: "English", ISOCode: "eng" },
		{ id: 8, name: "English", ISOCode: "eng" },
		{ id: 9, name: "English", ISOCode: "eng" },
		{ id: 10, name: "English", ISOCode: "eng" },
		{ id: 11, name: "English", ISOCode: "eng" },
		{ id: 12, name: "English", ISOCode: "eng" },
		{ id: 13, name: "English", ISOCode: "eng" },
		{ id: 14, name: "English", ISOCode: "eng" },
		{ id: 15, name: "English", ISOCode: "eng" },
		{ id: 16, name: "English", ISOCode: "eng" },
	];

	const title = type === "known-language" ? "Known language" : "Language to learn";

	return (
		<div id={id} className="languages-list">
			<div className="title">{title}</div>

			<div className="list-container">
				<SimpleBar style={{ height: "100%" }} autoHide={false} forceVisible="y" scrollbarMinSize={36}>
					<div id="list">
						{languages.map((item) => (
							<button className="btn list-item" key={`${item.id}-${type}`}>
								<img src={`/images/flags/${item.ISOCode}.png`} alt={item.ISOCode} />

								<span>{item.name}</span>
							</button>
						))}
					</div>
				</SimpleBar>
			</div>
		</div>
	);
};

export default LanguagesList;
