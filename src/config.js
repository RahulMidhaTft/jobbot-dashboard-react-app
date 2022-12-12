const NGROK_SUBDOMAIN = "b5dc-2405-201-5c06-2d35-d447-7a7e-73aa-1da7";

let ngrokApiUrl = `https://${NGROK_SUBDOMAIN}.ngrok.io`;

export const config = {
  api: {
    ngrok: ngrokApiUrl,
  },
};
