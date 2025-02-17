"use server";

import { admin } from "./gen/admin";
import * as grpc from "@grpc/grpc-js";

export const ClientLogin = async () => {
  const client = new admin.AdminServiceClient(
    "127.0.0.1:9090",
    grpc.credentials.createInsecure()
  );
  const loginRequest = new admin.LoginRequest();

  loginRequest.email = "saiponethaaung@gmail.com";
  loginRequest.password = "sbu9Rf5W@";

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
