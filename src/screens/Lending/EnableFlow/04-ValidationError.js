/* @flow */
import React, { useCallback } from "react";
import { StyleSheet, Linking } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { Account, AccountLike } from "@ledgerhq/live-common/lib/types";
import { TrackScreen } from "../../../analytics";
import colors from "../../../colors";
import ValidateError from "../../../components/ValidateError";
import { urls } from "../../../config/urls";

const forceInset = { bottom: "always" };

type Props = {
  account: AccountLike,
  parentAccount: ?Account,
  navigation: any,
  route: { params: RouteParams },
};

type RouteParams = {
  accountId: string,
  parentId: String,
  deviceId: string,
  transaction: any,
  error: Error,
};

export default function ValidationError({ navigation, route }: Props) {
  const onClose = useCallback(() => {
    navigation.dangerouslyGetParent().pop();
  }, [navigation]);

  const contactUs = useCallback(() => {
    Linking.openURL(urls.contact);
  }, []);

  const retry = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const error = route.params.error;

  return (
    <SafeAreaView style={styles.root} forceInset={forceInset}>
      <TrackScreen category="LendingEnableFlow" name="ValidationError" />
      <ValidateError
        error={error}
        onRetry={retry}
        onClose={onClose}
        onContactUs={contactUs}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
