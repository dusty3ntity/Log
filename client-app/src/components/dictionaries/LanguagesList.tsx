import React from "react";
import SimpleBar from "simplebar-react";

import { ILanguage } from "../../app/models/dictionary";
import { languagesList } from "../../app/models/languages";
import ResetIcon from "../icons/ResetIcon";

interface IProps {
	id: string;
	title: string;
	className?: string;
	disabledItems: ILanguage[];
	selectedItem: ILanguage | undefined;
	reset?: () => void;
	onItemSelect: (item: ILanguage) => void;
}

const LanguagesList: React.FC<IProps> = ({
	id,
	title,
	className,
	disabledItems,
	selectedItem,
	onItemSelect,
	reset,
}) => {
	return (
		<div id={id} className={`languages-list ${className ? className : ""}`}>
			<div className="title-container">
				<span className="title">{title}</span>

				{reset && (
					<button className="btn reset-btn round" onClick={reset}>
						<ResetIcon />
					</button>
				)}
			</div>

			<div className="list-container">
				<SimpleBar style={{ height: "100%" }} autoHide={false} forceVisible="y" scrollbarMinSize={36}>
					<div className="list">
						{languagesList.map((item) => (
							<button
								className={`btn list-item ${selectedItem?.isoCode === item.isoCode ? "active" : ""}`}
								key={`${item.id}-${title}`}
								type="button"
								onClick={() => onItemSelect(item)}
								disabled={disabledItems.includes(item)}
							>
								<img src={`/images/flags/${item.isoCode}.png`} alt={item.isoCode} />

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
