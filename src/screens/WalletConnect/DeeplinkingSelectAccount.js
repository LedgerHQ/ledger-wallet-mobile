/* @flow */
import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { Trans } from "react-i18next";
import type {
  Account,
  AccountLikeArray,
} from "@ledgerhq/live-common/lib/types";
import { getAccountCurrency } from "@ledgerhq/live-common/lib/account";
import {
  flattenAccountsEnforceHideEmptyTokenSelector,
  accountsSelector,
} from "../../reducers/accounts";
import withEnv from "../../logic/withEnv";
import colors from "../../colors";
import { ScreenName } from "../../const";
import { TrackScreen } from "../../analytics";
import LText from "../../components/LText";
import FilteredSearchBar from "../../components/FilteredSearchBar";
import AccountCard from "../../components/AccountCard";
import KeyboardView from "../../components/KeyboardView";
import { formatSearchResults } from "../../helpers/formatAccountSearchResults";
import type { SearchResult } from "../../helpers/formatAccountSearchResults";

const SEARCH_KEYS = ["name", "unit.code", "token.name", "token.ticker"];
const forceInset = { bottom: "always" };

type Props = {
  accounts: Account[],
  allAccounts: AccountLikeArray,
  navigation: any,
  route: { params?: { uri: string } },
};

type State = {};

class SendFundsSelectAccount extends Component<Props, State> {
  renderList = items => {
    const { accounts } = this.props;
    const formatedList = formatSearchResults(items, accounts);

    return (
      <FlatList
        data={formatedList}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.list}
      />
    );
  };

  renderItem = ({ item: result }: { item: SearchResult }) => {
    const { account, match } = result;
    return (
      <AccountCard
        disabled={!match}
        account={account}
        style={styles.cardStyle}
        onPress={() => {
          this.props.navigation.replace(ScreenName.WalletConnectConnect, {
            defaultAccount: account,
            uri: this.props.route.params.uri,
          });
        }}
      />
    );
  };

  renderEmptySearch = () => (
    <View style={styles.emptyResults}>
      <LText style={styles.emptyText}>
        <Trans i18nKey="transfer.receive.noAccount" />
      </LText>
    </View>
  );

  keyExtractor = item => item.account.id;

  render() {
    const { allAccounts } = this.props;
    return (
      <SafeAreaView style={styles.root} forceInset={forceInset}>
        <TrackScreen category="WalletConnect" name="DeeplinkingSelectAccount" />
        <KeyboardView style={{ flex: 1 }}>
          <View style={styles.searchContainer}>
            <FilteredSearchBar
              list={allAccounts.filter(
                account =>
                  account.type === "Account" &&
                  getAccountCurrency(account).id === "ethereum",
              )}
              inputWrapperStyle={styles.padding}
              renderList={this.renderList}
              renderEmptySearch={this.renderEmptySearch}
              keys={SEARCH_KEYS}
            />
          </View>
        </KeyboardView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  allAccounts: flattenAccountsEnforceHideEmptyTokenSelector,
  accounts: accountsSelector,
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchContainer: {
    paddingTop: 16,
    flex: 1,
  },
  list: {
    paddingBottom: 32,
  },
  emptyResults: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.fog,
  },
  padding: {
    paddingHorizontal: 16,
  },
  cardStyle: {
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
});

export default compose(
  connect(mapStateToProps),
  withEnv("HIDE_EMPTY_TOKEN_ACCOUNTS"),
)(SendFundsSelectAccount);
