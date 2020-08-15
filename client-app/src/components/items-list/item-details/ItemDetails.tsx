import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemDetailsContent from "./ItemDetailsContent";
import LoadingScreen from "../../common/loading/LoadingScreen";
import Empty from "../../common/other/Empty";

interface IProps {
	classNames: string;
	tourStep: string;
}

const ItemDetails: React.FC<IProps> = ({ classNames, tourStep }) => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem, loadingItem } = rootStore.itemStore;

	return (
		<div id="item-details" className={classNames} tour-step={tourStep}>
			{!activeItem && !loadingItem && <Empty text="Select an item" size={9} />}
			{loadingItem && <LoadingScreen size={2} />}
			{activeItem && !loadingItem && <ItemDetailsContent item={activeItem} />}
		</div>
	);
};

export default observer(ItemDetails);
