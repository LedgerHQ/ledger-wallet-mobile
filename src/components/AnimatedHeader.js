// @flow
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import colors from "../colors";

import Styles from "../navigation/styles";
import LText from "./LText";
import { normalize, width } from "../helpers/normalizeSize";
import ArrowLeft from "../icons/ArrowLeft";
import Close from "../icons/Close";

const { interpolate, Extrapolate } = Animated;

const AnimatedLText = Animated.createAnimatedComponent(LText);

const height = Platform.OS === "ios" ? 174 : 134;

const hitSlop = {
  bottom: 10,
  left: 24,
  right: 24,
  top: 10,
};

const BackButton = ({ navigation }: { navigation: * }) => (
  <Pressable
    hitSlop={hitSlop}
    style={styles.buttons}
    onPress={() => navigation.goBack()}
  >
    <ArrowLeft size={18} color={colors.darkBlue} />
  </Pressable>
);

const CloseButton = ({ navigation }: { navigation: * }) => (
  <Pressable
    hitSlop={hitSlop}
    onPress={() => navigation.popToTop()}
    style={styles.buttons}
  >
    <Close size={18} color={colors.darkBlue} />
  </Pressable>
);

type Props = {
  title: React$Node,
  hasBackButton?: boolean,
  hasCloseButton?: boolean,
  children?: React$Node,
  footer?: React$Node,
  style?: *,
};

export default function AnimatedHeaderView({
  title,
  hasBackButton,
  hasCloseButton,
  children,
  footer,
  style,
}: Props) {
  const navigation = useNavigation();

  const [scrollY] = useState(new Animated.Value(0));

  const event = Animated.event([
    { nativeEvent: { contentOffset: { y: scrollY } } },
    {
      useNativeDriver: true,
    },
  ]);

  const translateY = interpolate(scrollY, {
    inputRange: [0, 140],
    outputRange: [0, -50],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateX = interpolate(scrollY, {
    inputRange: [0, 140],
    outputRange: [0, -5],
    extrapolate: Extrapolate.CLAMP,
  });

  const scale = interpolate(scrollY, {
    inputRange: [0, 140],
    outputRange: [1, 0.8],
    extrapolate: Extrapolate.CLAMP,
  });

  const headerHeight = interpolate(scrollY, {
    inputRange: [0, 140],
    outputRange: [height, height - 60],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors.white }, style]}
    >
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <View style={styles.topHeader}>
          {hasBackButton && <BackButton navigation={navigation} />}
          <View style={styles.spacer} />
          {hasCloseButton && <CloseButton navigation={navigation} />}
        </View>

        <AnimatedLText
          bold
          style={[
            styles.title,
            { transform: [{ translateY, translateX }, { scale }] },
          ]}
        >
          {title}
        </AnimatedLText>
      </Animated.View>
      {children && (
        <Animated.ScrollView onScroll={event} style={styles.scrollArea}>
          {children}
        </Animated.ScrollView>
      )}
      {footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topHeader: { flexDirection: "row", alignContent: "center" },
  spacer: { flex: 1 },
  header: {
    ...Styles.headerNoShadow,
    backgroundColor: "transparent",
    width: "100%",
    paddingTop: Platform.OS === "ios" ? 84 : 40,
    height,
    flexDirection: "column",
    overflow: "hidden",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: normalize(32),
    width: width - 40,
  },
  buttons: {
    paddingVertical: 16,
  },
  scrollArea: { marginTop: 16, paddingHorizontal: 24, paddingBottom: 24 },
});
