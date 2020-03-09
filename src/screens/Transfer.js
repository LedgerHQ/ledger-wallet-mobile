/* @flow */
import React, { useState } from "react";
import Touchable from "../components/Touchable";
import TabIcon from "../components/TabIcon";
import CreateModal from "../modals/Create";
import TransferIcon from "../icons/Transfer";
import ExchangeScreen from "./Partners";
import { lockSubject } from "../components/RootNavigator/CustomBlockRouterNavigator";

const hitSlop = {
  top: 10,
  left: 25,
  right: 25,
  bottom: 25,
};

interface Props {
  tintColor: string;
  navigation: *;
}

export function TransferHeader(props: Props) {
  const [isModalOpened, setIsModalOpened] = useState();

  function openModal() {
    setIsModalOpened(true);
  }

  function onModalClose() {
    setIsModalOpened(false);
  }

  return (
    <>
      <Touchable
        event="Transfer"
        disabled={lockSubject.getValue}
        hitSlop={hitSlop}
        onPress={openModal}
      >
        {/* $FlowFixMe */}
        <TabIcon Icon={TransferIcon} i18nKey="tabs.transfer" {...props} />
      </Touchable>
      <CreateModal isOpened={isModalOpened} onClose={onModalClose} />
    </>
  );
}

export default function Create(props: *) {
  return <ExchangeScreen {...props} />;
}
