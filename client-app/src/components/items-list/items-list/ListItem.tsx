import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { IComponentProps } from "../../../app/models/components";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { IItem } from "../../../app/models/item";
import Button from "../../common/inputs/Button";
import Tooltip from "../../common/tooltips/Tooltip";
import ItemProgressDots from "../../learning/ItemProgressDots";
import Divider from "../../common/other/Divider";
import ItemProgressBadge from "../../common/other/ItemProgressBadge";
import Checkbox from "../../common/inputs/Checkbox";
import { createConfirmationModal } from "../../../app/common/components/modals";
import { combineClassNames } from "../../../app/common/util/classNames";
import StarIcon from "../../common/icons/StarIcon";

export interface IItemsListItemProps extends IComponentProps {
	item: IItem;
}

const ListItem: React.FC<IItemsListItemProps> = ({ id, className, item, ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { selectItem, starItemById, unstarItemById, activeItem, starring, loadingTarget } = rootStore.itemStore;
	const { goToNextStep } = rootStore.tourStore;
	const { user } = rootStore.userStore;

	const handleStar = () => {
		if (!item.isLearned) {
			starItemById(item.id);
			return;
		}

		const onOk = () => {
			starItemById(item.id);
		};

		const modalContent = (
			<>
				<span>Are you sure you want to star this item?</span>
				<span>This item is already learned, therefore its progress will be reset.</span>
			</>
		);

		createConfirmationModal(modalContent, "Star", onOk);
	};

	return (
		<div
			id={id}
			className={combineClassNames("list-item", className, {
				active: item.id === activeItem?.id,
			})}
			onClick={() => {
				if (!user!.tourCompleted && !user!.itemsTourCompleted) {
					goToNextStep();
				}
				selectItem(item.id);
			}}
			{...props}
		>
			<div className="selector-col col">
				<Tooltip
					content={
						<ItemProgressDots
							total={rootStore.dictionaryStore.activeDictionary.correctAnswersToItemCompletion}
							checked={item.correctAnswersToCompletionCount}
							secondTraining={false}
						/>
					}
					interactive
					position="top-start"
					theme="light"
				>
					<ItemProgressBadge
						status={
							item.isLearned
								? "learned"
								: item.correctAnswersToCompletionCount > 0
								? "in-progress"
								: "no-progress"
						}
						rectangular
					/>
				</Tooltip>
				<Checkbox className="selector" />
			</div>

			<div className="text-container">
				<div className="text-content">
					<Tooltip text={item.original} position="top">
						<span className="fake-text">{item.original}</span>
					</Tooltip>

					<span className="text original">{item.original}</span>
				</div>

				<Divider vertical />

				<div className="text-content">
					<Tooltip text={item.translation} position="top">
						<span className="fake-text">{item.translation}</span>
					</Tooltip>

					<span className="text translation">{item.translation}</span>
				</div>
			</div>

			<div className="actions-col col">
				<Tooltip
					text={
						item.isStarred
							? "This item will be present in every single training until it is learned."
							: "Starred items are present in every single training until they are learned. This one is not starred."
					}
					position="top-end"
				>
					<Button
						className="star-btn actions-btn"
						icon={<StarIcon active={item.isStarred} />}
						onClick={() => {
							if (item.isStarred) unstarItemById(item.id);
							else handleStar();
						}}
						loading={starring && loadingTarget.includes(item.id)}
					/>
				</Tooltip>
			</div>
		</div>
	);
};

export default observer(ListItem);
