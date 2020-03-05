/* @flow */
import React, { Component } from "react";
import { StyleSheet, Linking } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import type { Account, AccountLike } from "@ledgerhq/live-common/lib/types";
import { accountScreenSelector } from "../../reducers/accounts";
import { TrackScreen } from "../../analytics";
import colors from "../../colors";
import ValidateError from "../../components/ValidateError";
import { urls } from "../../config/urls";

const forceInset = { bottom: "always" };

interface RouteParams {
  accountId: string;
  parentId: String;
  deviceId: string;
  transaction: *;
  error: Error;
}

interface Props {
  account: AccountLike;
  parentAccount: ?Account;
  navigation: *;
  route: { params: RouteParams };
}

class ValidationError extends Component<Props> {
  dismiss = () => {
    const { navigation } = this.props;
    if (navigation.dismiss) {
      const dismissed = navigation.dismiss();
      if (!dismissed) navigation.goBack();
    }
  };

  contactUs = () => {
    Linking.openURL(urls.contact);
  };

  retry = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const error = this.props.route.params?.error;

    return (
      <SafeAreaView style={styles.root} forceInset={forceInset}>
        <TrackScreen category="SendFunds" name="ValidationError" />
        <ValidateError
          error={error}
          onRetry={this.retry}
          onClose={this.dismiss}
          onContactUs={this.contactUs}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

const mapStateToProps = (state, { route }) =>
  accountScreenSelector(route)(state);

export default connect(mapStateToProps)(withTranslation()(ValidationError));
