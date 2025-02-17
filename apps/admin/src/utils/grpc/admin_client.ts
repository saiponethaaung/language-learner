"use server";

import { admin } from "./gen/admin";
import * as grpc from "@grpc/grpc-js";
import { common } from "./gen/common";
import { cookies } from "next/headers";

export const AdminClient = async () => {
  const rpc = grpc.credentials.createInsecure();

  const client = new admin.AdminServiceClient("127.0.0.1:9090", rpc);

  return client;
};

export const AdminMeta = async (): Promise<grpc.Metadata> => {
  const meta = new grpc.Metadata();
  const cookie = await cookies();
  const token = cookie.get("access_token")?.value;

  if (token) {
    meta.add("authorization", "Bearer " + token);
  }

  return meta;
};

export const AdminLogin = async (data: { email: string; password: string }) => {
  const client = await AdminClient();
  const loginRequest = new admin.LoginRequest();

  loginRequest.email = data.email;
  loginRequest.password = data.password;

  let result: admin.LoginResponse = new admin.LoginResponse();

  await new Promise((resolve, reject) => {
    client.Login(loginRequest, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res?.toObject());
      }
    });
  })
    .then((data) => {
      result = data as admin.LoginResponse;
    })
    .catch((err) => {
      console.error(err);
      return { status: false, messegae: "Failed" };
    });

  return result;
};

export const AdminProfile = async () => {
  const meta = await AdminMeta();
  const client = await AdminClient();

  let result: admin.AdminObject = new admin.AdminObject();

  const emptyRequest = new common.EmptyRequest();

  await new Promise((resolve, reject) => {
    client.Profile(emptyRequest, meta, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res?.toObject());
      }
    });
  })
    .then((data) => {
      result = data as admin.AdminObject;
    })
    .catch((err) => {
      console.error(err);
      return { status: false, messegae: "Failed" };
    });

  return result;
};
