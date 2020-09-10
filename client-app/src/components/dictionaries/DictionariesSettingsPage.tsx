import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";

import Page from "../../app/layout/Page";
import { RootStoreContext } from "../../app/stores/rootStore";
import DictionaryForm from "./DictionaryForm";
import DictionariesListItem from "./DictionariesListItem";
import { IDictionary } from "../../app/models/dictionary";
import Empty from "../common/other/Empty";
import Drawer from "../common/other/Drawer";
import ScrollableList from "../common/other/ScrollableList";

const DictionariesSettings: React.FC = ({ ...props }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    dictionariesRegistry,
    editDictionary,
    deleteDictionary,
    setMainDictionary,
    settingMain,
    loadingTarget,
  } = rootStore.dictionaryStore;

  const [selectedDictionary, selectDictionary] = useState<
    IDictionary | undefined
  >();

  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const onDelete = async () => {
    const success = await deleteDictionary(selectedDictionary!.id);

    if (success) {
      selectDictionary(undefined);
    }
  };

  return (
    <Page
      pageTitle="Dictionaries"
      id="dictionaries-settings-page"
      className="manage-dictionary-page"
      {...props}
    >
      <div id="dictionaries-list">
        <div className="list-container">
          <ScrollableList>
            <div className="list">
              {Array.from(dictionariesRegistry.values()).map((dictionary) => (
                <DictionariesListItem
                  key={dictionary.id}
                  dictionary={dictionary}
                  active={selectedDictionary?.id === dictionary.id}
                  onClick={(dictionary: IDictionary) => {
                    selectDictionary(dictionary);
                    setDrawerVisible(true);
                  }}
                  onSetMain={(dictionary: IDictionary) =>
                    setMainDictionary(dictionary.id)
                  }
                  submitting={settingMain && dictionary.id === loadingTarget}
                  setMainDisabled={
                    settingMain && dictionary.id !== loadingTarget
                  }
                />
              ))}
            </div>
          </ScrollableList>
        </div>

        <Drawer
          id="dictionaries-settings-drawer"
          visible={isDrawerVisible}
          onClose={() => setDrawerVisible(false)}
        >
          <DictionaryForm
            className="edit-dictionary-form"
            key={selectedDictionary?.id}
            dictionary={selectedDictionary}
            onSubmit={editDictionary}
            onDelete={onDelete}
            in-drawer="true"
          />
        </Drawer>
      </div>

      <div id="edit-dictionary">
        {selectedDictionary && (
          <DictionaryForm
            key={selectedDictionary.id}
            className="edit-dictionary-form"
            dictionary={selectedDictionary}
            onSubmit={editDictionary}
            onDelete={onDelete}
          />
        )}

        {!selectedDictionary && <Empty text="Select a dictionary" size={9} />}
      </div>
    </Page>
  );
};

export default observer(DictionariesSettings);
