"use server";

import { admin } from "./gen/admin";
import { common } from "./gen/common";
import { AdminMeta, Client } from "./common_client";

export const AdminClient = async () => {
  const client = await Client<admin.AdminServiceClient>(
    admin.AdminServiceClient
  );

  return client;
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
