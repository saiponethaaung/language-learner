"use server";

import {
  AdminMeta,
  Client,
  GRPC_ERROR_CODES,
  ResponseInterface,
} from "./common_client";
import { language } from "./gen/language";

export const LanguageClient = async () => {
  const client = await Client<language.LanguageServiceClient>(
    language.LanguageServiceClient
  );

  return client;
};

export const GetLanguages = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ResponseInterface<language.PaginationResponse>> => {
  const meta = await AdminMeta();
  const client = await LanguageClient();

  let result: language.PaginationResponse = new language.PaginationResponse();

  const requestDTO = new language.GetLanguagesRequest({
    page,
    limit,
  });

  await new Promise((resolve, reject) => {
    client.GetLanguages(requestDTO, meta, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res?.toObject());
      }
    });
  })
    .then((data) => {
      result = data as language.PaginationResponse;
    })
    .catch((err) => {
      console.error(err);
      return { status: false, messegae: "Failed" };
    });

  return {
    status: true,
    message: "",
    data: result,
  };
};

export const CreateLanguage = async (data: {
  name: string;
  code: string;
}): Promise<ResponseInterface<language.LanguageObject>> => {
  const meta = await AdminMeta();
  const client = await LanguageClient();

  const requestDTO = new language.CreateLanguageRequest(data);

  try {
    const result = await new Promise<language.LanguageObject>(
      (resolve, reject) => {
        client.CreateLanguage(requestDTO, meta, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res?.toObject() as language.LanguageObject);
          }
        });
      }
    );

    return {
      status: true,
      message: "",
      data: result,
    };
  } catch (err) {
    return {
      status: false,
      message: "Failed",
      error:
        GRPC_ERROR_CODES[(err as { code: keyof typeof GRPC_ERROR_CODES }).code],
    };
  }
};
