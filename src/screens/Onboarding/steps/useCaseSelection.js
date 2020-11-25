// @flow

import React, { Fragment, useCallback } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Trans } from "react-i18next";
import { TrackScreen } from "../../../analytics";
import colors from "../../../colors";
import LText from "../../../components/LText";

import firstUse from "../assets/firstUse.png";
import devicePairing from "../assets/devicePairing.png";
import desktopSync from "../assets/desktopSync.png";
import restoreDevice from "../assets/restoreDevice.png";

import Touchable from "../../../components/Touchable";
import AnimatedHeaderView from "../../../components/AnimatedHeader";
import { ScreenName } from "../../../const";

type Props = {
  navigation: *,
  route: { params: { deviceId: string } },
};

const useCases = {
  firstUse: { route: ScreenName.OnboardingSetNewDeviceInfo, image: firstUse },
  devicePairing: { route: "", image: devicePairing },
  desktopSync: { route: "", image: desktopSync },
  restoreDevice: { route: "", image: restoreDevice },
};

function OnboardingStepUseCaseSelection({ navigation, route }: Props) {
  const next = useCallback(
    ({ route: r }: { route: string }) => {
      navigation.navigate(r, { ...route.params });
    },
    [navigation, route],
  );

  return (
    <AnimatedHeaderView
      hasBackButton
      title={<Trans i18nKey="onboarding.stepUseCase.title" />}
    >
      <TrackScreen category="Onboarding" name="UseCase" />
      {Object.keys(useCases).map((c, index) => (
        <Fragment key={c + index}>
          {index < 2 && (
            <LText semiBold style={styles.subTitle}>
              <Trans i18nKey={`onboarding.stepUseCase.${c}.title`} />
            </LText>
          )}
          <Touchable
            event="Onboarding UseCase Button"
            eventProperties={{ choice: c }}
            onPress={() => next(useCases[c])}
            style={[styles.button, { backgroundColor: colors.lightLive }]}
          >
            <LText semiBold style={[styles.label, { color: colors.live }]}>
              <Trans i18nKey={`onboarding.stepUseCase.${c}.label`} />
            </LText>
            <LText semiBold style={styles.subTitle}>
              <Trans i18nKey={`onboarding.stepUseCase.${c}.subTitle`} />
            </LText>
            <LText style={styles.desc}>
              <Trans i18nKey={`onboarding.stepUseCase.${c}.desc`} />
            </LText>
            <View style={styles.imageContainer}>
              {useCases[c].image && (
                <Image
                  style={styles.image}
                  resizeMode="contain"
                  source={useCases[c].image}
                />
              )}
            </View>
          </Touchable>
          {index === 0 && (
            <View style={styles.separator}>
              <View style={[styles.line, { backgroundColor: colors.live }]} />
              <LText
                semiBold
                style={[styles.label, styles.or, { color: colors.live }]}
              >
                <Trans i18nKey="onboarding.stepUseCase.or" />
              </LText>
              <View style={[styles.line, { backgroundColor: colors.live }]} />
            </View>
          )}
        </Fragment>
      ))}
    </AnimatedHeaderView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    paddingRight: 40,
  },
  scrollArea: {
    flex: 1,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  button: {
    borderRadius: 4,
    padding: 24,
    marginVertical: 8,
  },
  label: { fontSize: 10, textTransform: "uppercase" },
  or: { marginHorizontal: 8 },
  subTitle: { fontSize: 16, marginVertical: 8 },
  desc: { fontSize: 13 },
  separator: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  line: { flex: 1, height: 1 },
  imageContainer: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 200,
    marginTop: 24,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default OnboardingStepUseCaseSelection;
