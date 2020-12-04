// @flow

import React, { useContext } from "react";
import { Trans } from "react-i18next";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import LText from "../../components/LText";
import colors from "../../colors";
import { context, STEPS, dismiss } from "./Provider";
import { navigate } from "../../rootnavigation";
import { NavigatorName, ScreenName } from "../../const";

type Props = {
  navigation: any,
};

const PortfolioWidget = () => {
  const ptContext = useContext(context);

  if (ptContext.dismissed) {
    return null;
  }

  return (
    <View style={styles.root}>
      <LText secondary style={styles.title} bold>
        PortfolioWidget ({ptContext.completedSteps.length} /{" "}
        {Object.keys(STEPS).length})
      </LText>
      <TouchableOpacity onPress={() => dismiss(true)}>
        <LText>Dismiss</LText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate(NavigatorName.ProductTour, {
            screen: ScreenName.ProductTourMenu,
          });
        }}
      >
        <LText>Continue</LText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color: colors.darkBlue,
    justifyContent: "center",
  },
});

export default PortfolioWidget;
