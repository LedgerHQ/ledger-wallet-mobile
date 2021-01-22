// @flow
import { Server } from "ws";
import path from "path";
import fs from "fs";
import type { E2EBridgeMessage } from "./client";
import { $waitFor } from "../utils";

export class E2EBridgeServer {
  wss: Server;

  constructor(port?: number = 8099) {
    this.wss = new Server({ port });
    this.log(`Start listening on localhost:${port}`);

    this.wss.on("connection", ws => {
      this.log(`Connection`);
      ws.on("message", this.onMessage);
    });

    afterAll(() => {
      this.wss.close();
    });
  }

  async loadConfig(fileName: string, acceptTerms?: true = true): Promise<void> {
    if (acceptTerms) {
      this.acceptTerms();
    }

    const f = fs.readFileSync(
      path.resolve("e2e", "setups", `${fileName}.json`),
    );
    // $FlowFixMe
    const { data } = JSON.parse(f);

    this.postMessage({ type: "importAccounts", payload: data.accounts });
    this.postMessage({ type: "importSettngs", payload: data.settings });

    if (data.accounts.length) {
      // TODO E2E: testID not set inside component yet
      await $waitFor("TODO testID");
      return;
    }
    await $waitFor("PortfolioScreen");
  }

  add(id: string, name: string) {
    this.postMessage({ type: "add", payload: { id, name } });
  }

  setInstalledApps(apps: string[] = []) {
    this.postMessage({
      type: "setGlobals",
      payload: { _listInstalledApps_mock_result: apps },
    });
  }

  open() {
    this.postMessage({ type: "open" });
  }

  // private

  onMessage(messageStr: string) {
    const msg = JSON.parse(messageStr);
    this.log(`Message\n${JSON.stringify(msg, null, 2)}`);

    switch (msg.type) {
      default:
        break;
    }
  }

  log(message: string) {
    // eslint-disable-next-line no-console
    console.log(`[E2E Bridge Server]: ${message}`);
  }

  acceptTerms() {
    this.postMessage({ type: "acceptTerms" });
  }

  postMessage(message: E2EBridgeMessage) {
    for (const ws of this.wss.clients.values()) {
      ws.send(JSON.stringify(message));
    }
  }
}
