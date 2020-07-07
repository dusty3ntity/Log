import { ILanguage } from './dictionary';

export const languagesList: ILanguage[] = [
	{
		id: 1,
		name: "English",
		isoCode: "eng",
	},
	{
		id: 2,
		name: "Русский",
		isoCode: "rus",
	},
	{
		id: 3,
		name: "Українська",
		isoCode: "ukr",
	},
];

export const getLanguageByISOCode = (isoCode: string): ILanguage => {
	return languagesList.find((l) => l.isoCode === isoCode)!;
};
