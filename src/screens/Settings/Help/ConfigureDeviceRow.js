/* @flow */
import React from "react";
import { Platform } from "react-native";
import { Trans } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { ScreenName, NavigatorName } from "../../../const";
import SettingsRow from "../../../components/SettingsRow";
import { useNavigationInterceptor } from "../../Onboarding/onboardingContext";

export default function ConfigureDeviceRow() {
  const { navigate } = useNavigation();
  const { setShowWelcome, setFirstTimeOnboarding } = useNavigationInterceptor();

  function onPress() {
    setShowWelcome(false);
    setFirstTimeOnboarding(false);
    if (Platform.OS === "ios") {
      navigate(NavigatorName.Onboarding, {
        screen: ScreenName.OnboardingUseCase,
        params: { deviceModelId: "nanoX" },
      });
    } else {
      navigate(NavigatorName.Onboarding, {
        screen: ScreenName.OnboardingDeviceSelection,
      });
    }
  }

  return (
    <SettingsRow
      event="ConfigureDeviceRow"
      title={<Trans i18nKey="settings.help.configureDevice" />}
      desc={<Trans i18nKey="settings.help.configureDeviceDesc" />}
      arrowRight
      onPress={onPress}
      alignedTop
    />
  );
}
