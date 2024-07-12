import {
  panel,
  heading,
  button,
  form,
  input,
  text,
  copyable,
} from "@metamask/snaps-sdk";

/**
 * @description createMenuInterface return the first manu interface
 * @returns Promise<string>
 */
export async function createMenuInterface(): Promise<string> {
  return await snap.request({
    method: "snap_createInterface",
    params: {
      ui: panel([
        heading(" Gm! How can I help you?"),
        text("Ask me for a transaction operation or for information!"),
        button({ value: "Transaction", name: "transaction" }),
        button({ value: "Knowledge Base", name: "knowledge-base" }),
      ]),
    },
  });
}

export async function createTransactionInterface(id: string) {
  await snap.request({
    method: "snap_updateInterface",
    params: {
      id,
      ui: panel([
        heading("🔒 Transaction! "),
        text(
          "Let me create a transaction for you. Type below the transaction you want to do."
        ),
        form({
          name: "store-form",
          children: [
            input({
              label: "Prompt",
              name: "user-prompt",
              placeholder: "Transfer 1 ETH to ...",
            }),
            button({
              value: "Generate",
              buttonType: "submit",
            }),
          ],
        }),
      ]),
    },
  });
}

/**
 * @description generate UI interface to show an error status
 * @param id - the interface ID
 * @param errorMessage - the error message to display
 */
export async function showErrorResult(id: string, errorMessage: string) {
  await snap.request({
    method: "snap_updateInterface",
    params: {
      id,
      ui: panel([
        heading("❌ Oops, Something went wrong! ❌"),
        text("An error happened. The error message log is:"),
        copyable(errorMessage),
      ]),
    },
  });
}

/**
 *
 * @param id
 */
export async function cleanMessages(id: string) {
  await snap.request({
    method: "snap_manageState",
    params: {
      operation: "clear",
    },
  });
}
