import React, { ReactElement, useState, CSSProperties } from "react";

import { combineClassNames } from "../../../app/common/util/classNames";
import { IComponentProps } from "../../../app/models/components";

export interface ITabsProps extends IComponentProps {
	children: ReactElement<ITabProps>[];
	defaultActiveKey: string;
}

const Tabs: React.FC<ITabsProps> = ({ id, className, children, defaultActiveKey, ...props }) => {
	const tabWidth = 100 / children.length + "%";

	const [activeTabKey, setActiveTabKey] = useState(defaultActiveKey);

	return (
		<div id={id} className={combineClassNames("tabs", className)} {...props}>
			<div className="tabs-bar">
				{children.map((tab: ReactElement<ITabProps>) => (
					<div
						className={combineClassNames("tab-button", { active: activeTabKey === tab.props.tabKey })}
						key={tab.props.tabKey}
						style={{ width: tabWidth }}
						onClick={() => setActiveTabKey(tab.props.tabKey)}
					>
						{tab.props.tabName}
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
						return React.cloneElement(tab, {
							key: tab.props.tabKey,
							className: combineClassNames(tab.props.className, "active"),
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

export interface ITabProps extends IComponentProps {
	tabName: string;
	tabKey: string;
	style?: CSSProperties;
}

const Tab: React.FC<ITabProps> = ({ id, className, tabName, tabKey, style, children, ...props }) => {
	return (
		<div id={id} className={combineClassNames("tab", className)} style={style} {...props}>
			{children}
		</div>
	);
};

export { Tabs, Tab };
