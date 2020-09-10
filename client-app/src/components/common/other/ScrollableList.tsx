import React, { useRef, useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import { observer } from "mobx-react-lite";
import { IComponentProps } from "../../../app/models/components";
import { combineClassNames } from "../../../app/common/util/classNames";

interface IScrollableListProps extends IComponentProps {
  scrollableNodeProps?: object;
}

enum ListState {
  scrollTop,
  scrollInBetween,
  scrollBottom,
}

const LIST_TOP_CLASS = "scrollable-list-top";
const LIST_BOTTTOM_CLASS = "scrollable-list-bottom";

const ScrollableList: React.FC<IScrollableListProps> = ({
  id,
  className,
  scrollableNodeProps,
  children,
  ...props
}) => {
  const [listState, setListState] = useState(ListState.scrollTop);
  const scrollableNodeRef = useRef<HTMLDivElement>(null);
  const [listWrapper, setScrollWrapper] = useState<any>(null);

  useEffect(() => {
    if (scrollableNodeRef.current) {
      const listWrapper = scrollableNodeRef.current.children[0].children[0];
      listWrapper.classList.add("list-wrapper");
      const contentWrapper = listWrapper.querySelector(
        ".simplebar-content-wrapper"
      );
      if (
        contentWrapper &&
        contentWrapper.scrollHeight > listWrapper.clientHeight
      ) {
        listWrapper.classList.add(LIST_BOTTTOM_CLASS);
      }
      setScrollWrapper(listWrapper);
    }
  }, []);

  function handleScroll(e: React.UIEvent<HTMLElement, UIEvent>) {
    const element = e.target as HTMLElement;
    if (
      listState !== ListState.scrollTop &&
      element.scrollTop === 0 &&
      listWrapper
    ) {
      listWrapper.classList.remove(LIST_TOP_CLASS);
      setListState(ListState.scrollTop);
    } else if (
      listState !== ListState.scrollBottom &&
      element.scrollHeight - element.scrollTop === element.clientHeight &&
      listWrapper &&
      element.scrollHeight !== element.clientHeight
    ) {
      listWrapper.classList.remove(LIST_BOTTTOM_CLASS);
      setListState(ListState.scrollBottom);
    } else if (listState !== ListState.scrollInBetween && listWrapper) {
      listWrapper.classList.add(LIST_TOP_CLASS);
      listWrapper.classList.add(LIST_BOTTTOM_CLASS);
      setListState(ListState.scrollInBetween);
    }
  }

  return (
    <div
      id={id}
      className={combineClassNames("scrollable-list", className)}
      ref={scrollableNodeRef}
      {...props}
    >
      <SimpleBar
        onScroll={handleScroll}
        scrollableNodeProps={scrollableNodeProps}
        autoHide={false}
        forceVisible="y"
        scrollbarMinSize={36}
      >
        {children}
      </SimpleBar>
    </div>
  );
};

export default observer(ScrollableList);
