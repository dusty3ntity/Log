import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ItemDetailsContent from "./ItemDetailsContent";
import LoadingScreen from "../../common/loading/LoadingScreen";
import Empty from "../../common/other/Empty";

interface IProps {
	classNames: string;
}

const ItemDetails: React.FC<IProps> = ({ classNames }) => {
	const rootStore = useContext(RootStoreContext);
	const { activeItem, loading } = rootStore.itemStore;

	return (
		<div id="item-details" className={classNames}>
			{!activeItem && !loading && <Empty text="Select an item" size={9} />}
			{loading && <LoadingScreen size={2} />}
			{activeItem && !loading && <ItemDetailsContent item={activeItem} />}
		</div>
	);
};

export default observer(ItemDetails);
