import React from 'react';

import LanguagesList from './LanguagesList';

const NewDictionary = () => {
	return (
		<div id="new-dictionary-container" className="manage-dictionary-container">
			<LanguagesList id="language-list-from" type="known-language" />

			<div id="new-dictionary">

			</div>

			<LanguagesList id="language-list-to" type="language-to-learn" />
		</div>
	);
};

export default NewDictionary;
