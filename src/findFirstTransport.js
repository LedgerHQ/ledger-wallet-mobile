//@flow
import { Observable } from "rxjs/Observable";
import { PromiseObservable } from "rxjs/observable/PromiseObservable";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/concatMap";
import HIDTransport from "../react-native-hid";
import DebugHttpTransport from "./DebugHttpTransport";
import BluetoothTransport from "./BluetoothTransport";

const transports: Array<*> = [
  HIDTransport,
  BluetoothTransport,
  DebugHttpTransport
];

export default () =>
  Observable.merge(
    ...transports.map(t =>
      Observable.create(t.discover).map(descriptor => ({ descriptor, t }))
    )
  )
    .first()
    .concatMap(({ descriptor, t }) =>
      PromiseObservable.create(t.open(descriptor))
    );
