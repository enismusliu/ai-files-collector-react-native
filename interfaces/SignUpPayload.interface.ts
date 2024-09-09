import { SignInPayload } from "./SignInPayload.interface";

export interface SignUpPayload extends SignInPayload {
  username: string;
}
