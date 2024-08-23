import { IAuthDataRequest } from "@/types";

export type LoginForm = Exclude<IAuthDataRequest, "expiresInMins">;
