export const combineClassNames = (...props: any[]) => {
	const classNames: string[] = [];

	props.forEach((p) => {
		if (typeof p === "string") {
			classNames.push(p);
		} else if (typeof p === "object") {
			Object.keys(p).forEach((key) => {
				if (p[key]) {
					classNames.push(key);
				}
			});
		}
	});

	return classNames.join(" ");
};
