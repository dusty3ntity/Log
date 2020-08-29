import React, { ReactElement, useState } from "react";

import { combineClassNames } from "../../../app/common/util/classNames";

interface ITabsProps {
	id?: string;
	classNames?: string[];
	children: ReactElement<ITabProps>[];
	defaultActiveKey: string;
}

const Tabs: React.FC<ITabsProps> = ({ classNames = [], id, children, defaultActiveKey, ...props }) => {
	classNames.unshift("tabs");
	const tabWidth = 100 / children.length + "%";

	const [activeTabKey, setActiveTabKey] = useState(defaultActiveKey);

	return (
		<div id={id} className={classNames.join(" ")} {...props}>
			<div className="tabs-bar">
				{children.map((tab: ReactElement<ITabProps>) => (
					<div
						className={combineClassNames("tab-button", { active: activeTabKey === tab.props.tabKey })}
						key={tab.props.tabKey}
						style={{ width: tabWidth }}
						onClick={() => setActiveTabKey(tab.props.tabKey)}
					>
						{tab.props.name}
					</div>
				))}

				<div
					className="thumb"
					style={{
						width: tabWidth,
						transform: `translateX(${100 * children.findIndex((t) => t.props.tabKey === activeTabKey)}%)`,
					}}
				/>
			</div>

			<div className="tabs-content">
				{children.map((tab: ReactElement<ITabProps>) => {
					if (tab.props.tabKey === activeTabKey) {
						const classNames = tab.props.classNames || [];
						classNames.push("active");
						return React.cloneElement(tab, {
							key: tab.props.tabKey,
							classNames: classNames,
						});
					} else if (tab.props.tabKey > activeTabKey) {
						return React.cloneElement(tab, {
							key: tab.props.tabKey,
							style: { transform: "translateX(120%)" },
						});
					} else {
						return React.cloneElement(tab, {
							key: tab.props.tabKey,
							style: { transform: "translateX(-120%)" },
						});
					}
				})}
			</div>
		</div>
	);
};

interface ITabProps {
	id?: string;
	classNames?: string[];
	name: string;
	tabKey: string;
	style?: {};
}

const Tab: React.FC<ITabProps> = ({ id, classNames = [], style, children }) => {
	classNames.unshift("tab");

	return (
		<div id={id} className={classNames.join(" ")} style={style}>
			{children}
		</div>
	);
};

export { Tabs, Tab };
