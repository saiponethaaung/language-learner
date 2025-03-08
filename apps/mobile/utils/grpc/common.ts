import { Metadata } from "grpc-web";
import { getKey } from "../store/secure-store";

export async function Client<T>(client: any): Promise<T> {
  return new client("http://10.0.0.232:8080");
}

export const UserMeta = async (): Promise<Metadata> => {
  const meta: Metadata = {};

  const token = await getKey("token");

  if (token) {
    meta["authorization"] = "Bearer " + token;
  }

  return meta;
};
