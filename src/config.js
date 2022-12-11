const NGROK_SUBDOMAIN = "66c7-59-91-214-173";

let ngrokApiUrl = `https://${NGROK_SUBDOMAIN}.ngrok.io`;

export const config = {
  api: {
    ngrok: ngrokApiUrl,
  },
};
