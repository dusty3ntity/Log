import React from "react";
import SimpleBar from "simplebar-react";

import { IComponentProps } from "../../app/models/components";
import { ILanguage } from "../../app/models/languages";
import { languagesList } from "../../app/models/languages";
import Tooltip from "../common/tooltips/Tooltip";
import Button from "../common/inputs/Button";
import { combineClassNames } from "../../app/common/util/classNames";
import ResetIcon from "../common/icons/ResetIcon";

export interface ILanguagesListProps extends IComponentProps {
	title: string;
	disabledItems: ILanguage[];
	selectedItem: ILanguage | undefined;
	onReset?: () => void;
	onItemSelect: (item: ILanguage) => void;
}

const LanguagesList: React.FC<ILanguagesListProps> = ({
	id,
	className,
	title,
	disabledItems,
	selectedItem,
	onItemSelect,
	onReset,
	...props
}) => {
	return (
		<div id={id} className={combineClassNames("languages-list", className)} {...props}>
			<div className="title-container">
				<span className="title">{title}</span>

				{onReset && (
					<Tooltip text="Reset selected language." position="top">
						<Button className="reset-btn" onClick={onReset} icon={<ResetIcon />} />
					</Tooltip>
				)}
			</div>

			<div className="list-container">
				<SimpleBar style={{ height: "100%" }} autoHide={false} forceVisible="y" scrollbarMinSize={36}>
					<div className="list">
						{languagesList
							.sort((a, b) => {
								if (a.name < b.name) {
									return -1;
								}
								if (a.name > b.name) {
									return 1;
								}
								return 0;
							})
							.map((item) => (
								<button
									className={combineClassNames("btn list-item", {
										active: selectedItem?.isoCode === item.isoCode,
									})}
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
