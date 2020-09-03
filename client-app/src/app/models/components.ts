export interface IComponentProps {
	id?: string;
	className?: string;
}

export interface ISignFormProps {
	facebookHandler: (response: any) => void;
	googleHandler: (response: any) => void;
	submitting: boolean;
	loadingTarget?: string;
}

export interface IProviderButtonProps {
	text: string;
	loading?: boolean;
	onClick: (response: any) => void;
	disabled?: boolean;
}
