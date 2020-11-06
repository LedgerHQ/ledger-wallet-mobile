// $flow
import React, { useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Trans } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import BaseInfoModal from "../BaseModal";
import termsImg from "../../../../images/lending-info-1.png";
import { ScreenName } from "../../../../const";

type Props = {
  route: { params: { endCallback: () => void } },
};

export default function LendingInfoStep1({ route: { params } }: Props) {
  const navigation = useNavigation();
  const onNext = useCallback(() => {
    navigation.push(ScreenName.LendingInfo2, params);
  }, [navigation, params]);

  return (
    <BaseInfoModal
      event="Edu step 1"
      title={<Trans i18nKey="transfer.lending.info.1.title" />}
      description={<Trans i18nKey="transfer.lending.info.1.description" />}
      badgeLabel={<Trans i18nKey="transfer.lending.info.1.label" />}
      illustration={
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode="contain" source={termsImg} />
        </View>
      }
      onNext={onNext}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  image: { width: "100%", height: "100%" },
});
