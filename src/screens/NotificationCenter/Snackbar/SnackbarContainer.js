// @flow
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";

import { useToasts } from "@ledgerhq/live-common/lib/providers/ToastProvider/index";
import type { ToastData } from "@ledgerhq/live-common/lib/providers/ToastProvider/types";

import Snackbar from "./Snackbar";
import * as RootNavigation from "../../../rootnavigation.js";
import { NavigatorName, ScreenName } from "../../../const";

export default function SnackbarContainer() {
  const { dismissToast, toasts } = useToasts();

  const navigate = useCallback(
    (toast: ToastData) => {
      if (toast.type === "announcement") {
        dismissToast(toast.id);
        RootNavigation.navigate(NavigatorName.NotificationCenter, {
          screen: ScreenName.NotificationCenterNews,
        });
      }
    },
    [dismissToast],
  );

  const handleDismissToast = useCallback(
    (toast: ToastData) => dismissToast(toast.id),
    [dismissToast],
  );

  return toasts && toasts.length ? (
    <View style={styles.root}>
      {toasts.map(a => (
        <Snackbar
          toast={a}
          key={a.id}
          onPress={navigate}
          onClose={handleDismissToast}
        />
      ))}
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 50,
    left: 0,
    height: "auto",
    width: "100%",
    zIndex: 100,
    paddingHorizontal: 16,
  },
});
