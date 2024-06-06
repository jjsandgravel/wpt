// @ts-check
// Import the types from the TypeScript file
/**
 * @typedef {import('../dc-types').ProviderType} ProviderType
 * @typedef {import('../dc-types').IdentityRequestProvider} IdentityRequestProvider
 * @typedef {import('../dc-types').DigitalCredentialRequestOptions} DigitalCredentialRequestOptions
 * @typedef {import('../dc-types').CredentialRequestOptions} CredentialRequestOptions
 * @typedef {import('../dc-types').SendMessage} SendMessage
 */
/**
 * @param {ProviderType[]} [providersToUse=["default"]] - An array that can only contain "default" or "oid4vp".
 * @returns {CredentialRequestOptions}
 */
export function makeGetOptions(providersToUse = ["default"]) {
  if (!Array.isArray(providersToUse) || !providersToUse?.length) {
    return { digital: { providers: providersToUse } };
  }
  const providers = [];
  for (const provider of providersToUse) {
    switch (provider) {
      case "oid4vp":
        providers.push(makeOID4VPDict());
        break;
      default:
        providers.push(makeIdentityRequestProvider(undefined, undefined));
        break;
    }
  }
  return { digital: { providers } };
}

// Representation of https://wicg.github.io/digital-credentials/#the-identityrequestprovider-dictionary
function makeIdentityRequestProvider(protocol = "protocol", request = {}) {
  return {
    protocol,
    request,
  };
}

// Representation of a digital identity object with an OpenID4VP provider
function makeOID4VPDict() {
  return makeIdentityRequestProvider("openid4vp", {
    // Canonical example of an OpenID4VP request coming soon.
  });
}

/**
 * @type {SendMessage}
 **/
export function sendMessage(iframe, data) {
  return new Promise((resolve) => {
    window.addEventListener("message", function messageListener(event) {
      if (event.source === iframe.contentWindow) {
        window.removeEventListener("message", messageListener);
        resolve(event.data);
      }
    });
    iframe.contentWindow?.postMessage(data, "*");
  });
}
