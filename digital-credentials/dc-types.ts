// types.ts

export type ProviderType = "default" | "oid4vp";

export interface IdentityRequestProvider {
  protocol: string;
  request: object;
}

export interface DigitalCredentialRequestOptions {
  providers: IdentityRequestProvider[] | any;
}

export interface CredentialRequestOptions {
  digital: DigitalCredentialRequestOptions;
}

export type ActionType = "create" | "get" | "preventSilentAccess";
export type AbortType = "before" | "after";

export interface EventData {
  action: ActionType;
  abort?: AbortType;
  options?: object;
}

export interface PostData {
  action: ActionType;
  result?: any;
  errorName?: object;
}


export interface SendMessageData {
  action: ActionType;
  options?: CredentialRequestOptions;
}

export type SendMessage = (iframe: HTMLIFrameElement, data: SendMessageData) => Promise<any>;

