// @flow
import invariant from "invariant";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { from } from "rxjs";
import SafeAreaView from "react-native-safe-area-view";
import { useTranslation } from "react-i18next";
import { createAction as createAppAction } from "@ledgerhq/live-common/lib/hw/actions/app";
import connectApp from "@ledgerhq/live-common/lib/hw/connectApp";
import { withDevice } from "@ledgerhq/live-common/lib/hw/deviceAccess";
import signMessage from "@ledgerhq/live-common/lib/hw/signMessage";
import { accountScreenSelector } from "../../reducers/accounts";
import DeviceAction from "../../components/DeviceAction";
import { TrackScreen } from "../../analytics";
import { ScreenName } from "../../const";

const initialState = {
  signMessageRequested: null,
  signMessageError: null,
  signMessageResult: null,
};
const createAction = connectAppExec => {
  const useHook = (reduxDevice, request) => {

    console.log(request);

    const appState = createAppAction(connectAppExec).useHook(reduxDevice, {
      account: request.account,
    });

    const { device, opened, inWrongDeviceForAccount, error } = appState;

    const [state, setState] = useState(initialState);

    const sign = useCallback(async () => {
      let result;
      try {
        result = await withDevice(device.deviceId)(t =>
          // $FlowFixMe (can't figure out MessageData | TypedMessageData)
          from(signMessage(t, request.message)),
        ).toPromise();
      } catch (e) {
        if (e.name === "UserRefusedAddress") {
          e.name = "UserRefusedOnDevice";
          e.message = "UserRefusedOnDevice";
        }
        setState({
          ...initialState,
          signMessageError: e,
        });
      }
      setState({
        ...initialState,
        signMessageResult: result.signature,
      });
    }, [request.message, device]);

    useEffect(() => {
      if (!device || !opened || inWrongDeviceForAccount || error) {
        setState(initialState);
        return;
      }

      setState({
        ...initialState,
        signMessageRequested: request.message,
      });

      sign();
    }, [device, opened, inWrongDeviceForAccount, error, request.message, sign]);

    return {
      ...appState,
      ...state,
    };
  };

  return {
    useHook,
    mapResult: r => ({
      signature: r.signMessageResult,
      error: r.signMessageError,
    }),
  };
};

const action = createAction(connectApp);

type Props = {
  navigation: any,
  route: {
    params: RouteParams,
    name: string,
  },
};

type RouteParams = {
  device: Device,
  accountId: string,
  message: Transaction,
};

export default function ConnectDevice({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { account, parentAccount } = useSelector(accountScreenSelector(route));
  invariant(account, "account is required");

  const onResult = result => {
    if (result.error) {
      return navigation.navigate(ScreenName.SignValidationError, {
        ...route.params,
        error: result.error,
      });
    }
    if (result.signature) {
      return navigation.navigate(ScreenName.SignValidationSuccess, {
        ...route.params,
        signature: result.signature,
      });
    }
  };

  return useMemo(
    () => (
      <SafeAreaView style={styles.root}>
        <TrackScreen category={"SignMessage"} name="ConnectDevice" />
        <DeviceAction
          action={action}
          request={{
            account,
            parentAccount,
            message: route.params.message,
          }}
          device={route.params.device}
          onResult={onResult}
        />
      </SafeAreaView>
    ),
    // prevent rerendering caused by optimistic update (i.e. exclude account related deps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [route.params.message],
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
});
