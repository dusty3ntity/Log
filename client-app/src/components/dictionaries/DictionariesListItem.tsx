import React from "react";
import { observer } from "mobx-react-lite";

import { IComponentProps } from "../../app/models/components";
import { IDictionary } from "../../app/models/dictionary";
import Button from "../common/inputs/Button";
import Tooltip from "../common/tooltips/Tooltip";
import Divider from "../common/other/Divider";
import { combineClassNames } from "../../app/common/util/classNames";
import SuccessIcon from "../common/icons/SuccessIcon";

export interface IDictionariesListItemProps extends IComponentProps {
	dictionary: IDictionary;
	active: boolean;
	onClick: (dictionary: IDictionary) => void;
	onSetMain: (dictionary: IDictionary) => void;
	submitting: boolean;
	setMainDisabled: boolean;
}

const DictionariesListItem: React.FC<IDictionariesListItemProps> = ({
	id,
	className,
	dictionary,
	active,
	onClick,
	onSetMain,
	submitting,
	setMainDisabled,
	...props
}) => {
	return (
		<div id={id} className={combineClassNames("list-item", className, { active: active })} {...props}>
			<button className="btn item-btn" onClick={() => onClick(dictionary)}>
				<div className="flags-col">
					<div className="lang-container known-lang-container">
						<span className="title">I know</span>

						<img
							src={`/images/flags/${dictionary.knownLanguage.isoCode}.png`}
							alt={dictionary.knownLanguage.isoCode}
						/>

						<span className="value">{dictionary.knownLanguage.isoCode.toLocaleUpperCase()}</span>
					</div>

					<div className="lang-container lang-to-learn-container">
						<span className="title">I learn</span>

						<img
							src={`/images/flags/${dictionary.languageToLearn.isoCode}.png`}
							alt={dictionary.languageToLearn.isoCode}
						/>

						<span className="value">{dictionary.languageToLearn.isoCode.toLocaleUpperCase()}</span>
					</div>
				</div>

				<Divider vertical />

				<div className="stats-col">
					<div className="row items-row">
						<div className="col words-container">
							<span className="title">Words</span>

							<span className="value">{dictionary.wordsCount}</span>

							<span className="value-learned">
								<Tooltip text="Learned words count." position="top">
									( <span className="value">{dictionary.learnedWordsCount}</span> )
								</Tooltip>
							</span>
						</div>

						<div className="col phrases-container">
							<span className="title">Phrases</span>

							<span className="value">{dictionary.phrasesCount}</span>

							<span className="value-learned">
								<Tooltip text="Learned phrases count." position="top">
									( <span className="value">{dictionary.learnedPhrasesCount}</span> )
								</Tooltip>
							</span>
						</div>
					</div>

					<div className="row params-row">
						<Tooltip
							text="We’ll try to adjust the items count of each training to this value."
							position="bottom"
						>
							<div className="col learning-list-size-container">
								<span className="title">In training</span>

								<span className="value">{dictionary.preferredLearningListSize}</span>
							</div>
						</Tooltip>

						<Tooltip
							text="Number of correct answers for item to be considered as mastered."
							position="bottom"
						>
							<div className="col repeats-to-learn-container">
								<span className="title">Repeats to learn</span>

								<span className="value">{dictionary.correctAnswersToItemCompletion}</span>
							</div>
						</Tooltip>
					</div>
				</div>

				<Divider vertical />
			</button>

			<div className="actions-col">
				<div className="row hardmode-container">
					<Tooltip
						text={
							dictionary.isHardModeEnabled
								? "Item correct answers count is reset if wrong answer provided."
								: "Hard mode resets item correct answers count if wrong answer provided."
						}
						position="top-end"
					>
						<span className="title">Hard mode</span>

						<span className={`value ${dictionary.isHardModeEnabled ? "enabled" : ""}`}>
							{dictionary.isHardModeEnabled ? "enabled" : "disabled"}
						</span>
					</Tooltip>
				</div>

				<div className="row btn-container">
					{dictionary.isMain && (
						<Tooltip
							text="This dictionary will load initially on each application start."
							position="bottom-end"
						>
							<span className="title">Main</span>
							<SuccessIcon />
						</Tooltip>
					)}

					{!dictionary.isMain && (
						<Tooltip
							text="Main dictionary loads initially on each application start."
							position="bottom-end"
						>
							<Button
								className="set-main-btn"
								text="Set main"
								onClick={() => onSetMain(dictionary)}
								loading={submitting}
								disabled={setMainDisabled}
							/>
						</Tooltip>
					)}
				</div>
			</div>
		</div>
	);
};

export default observer(DictionariesListItem);
