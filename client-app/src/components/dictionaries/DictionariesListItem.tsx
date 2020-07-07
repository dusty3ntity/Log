import React, { Fragment } from "react";

import { IDictionary } from "../../app/models/dictionary";
import SuccessIcon from "../icons/SuccessIcon";

interface IProps {
	dictionary: IDictionary;
	isActive: boolean;
	onClick: (dictionary: IDictionary) => void;
	onDelete: (dictionary: IDictionary) => void;
}

const DictionariesListItem: React.FC<IProps> = ({ dictionary, isActive, onClick, onDelete }) => {
	return (
		<div className={`list-item ${isActive ? "active" : ""}`}>
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

				<div className="divider vertical" />

				<div className="stats-col">
					<div className="row items-row">
						<div className="col words-container">
							<span className="title">Words</span>

							<span className="value">{dictionary.wordsCount}</span>

							<span className="value-learned">
								( <span className="value">{dictionary.learnedWordsCount}</span> )
							</span>
						</div>

						<div className="col phrases-container">
							<span className="title">Phrases</span>

							<span className="value">{dictionary.phrasesCount}</span>

							<span className="value-learned">
								( <span className="value">{dictionary.learnedPhrasesCount}</span> )
							</span>
						</div>
					</div>

					<div className="row params-row">
						<div className="col learning-list-size-container">
							<span className="title">In training</span>

							<span className="value">{dictionary.preferredLearningListSize}</span>
						</div>

						<div className="col repeats-to-learn-container">
							<span className="title">Repeats to learn</span>

							<span className="value">{dictionary.correctAnswersToItemCompletion}</span>
						</div>
					</div>
				</div>

				<div className="divider vertical" />
			</button>

			<div className="actions-col">
				<div className="row hardmode-container">
					<span className="title">Hard mode</span>

					<span className={`value ${dictionary.isHardModeEnabled ? "enabled" : ""}`}>
						{dictionary.isHardModeEnabled ? "enabled" : "disabled"}
					</span>
				</div>

				<div className="row btn-container">
					{dictionary.isMain && (
						<Fragment>
							<span className="title">Main</span>
							<SuccessIcon />
						</Fragment>
					)}

					{!dictionary.isMain && (
						<button className="btn delete-btn" onClick={() => onDelete(dictionary)}>
							Delete
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default DictionariesListItem;
