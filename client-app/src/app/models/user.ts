export interface IUser {
	username: string;
	displayName: string;
	email: string;
	token: string;
	refreshToken: string;
}

export interface IRegisterUser {
	email: string;
	username: string;
	displayName: string;
	password: string;

	nativeLanguageCode: string;
	languageToLearnCode: string;
}

export interface ILoginUser {
	email: string;
	password: string;
}