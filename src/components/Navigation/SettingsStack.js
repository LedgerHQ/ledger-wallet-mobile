// @flow
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScreenName } from "../../const";
import Settings from "../../screens/Settings";
import AboutSettings from "../../screens/Settings/About";
import GeneralSettings from "../../screens/Settings/General";
import CountervalueSettings from "../../screens/Settings/General/CountervalueSettings";
import HelpSettings from "../../screens/Settings/Help";

export default function SettingsStack() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenName.Settings}
        component={Settings}
        options={{
          title: t("settings.header"),
        }}
      />
      <Stack.Screen
        name={ScreenName.CountervalueSettings}
        component={CountervalueSettings}
        options={{
          title: t("settings.display.counterValue"),
        }}
      />
      <Stack.Screen
        name={ScreenName.GeneralSettings}
        component={GeneralSettings}
        options={{
          title: t("settings.display.title"),
        }}
      />
      <Stack.Screen
        name={ScreenName.AboutSettings}
        component={AboutSettings}
        options={{
          title: t("settings.about.title"),
        }}
      />
      <Stack.Screen
        name={ScreenName.HelpSettings}
        component={HelpSettings}
        options={{
          title: t("settings.help.header"),
        }}
      />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
