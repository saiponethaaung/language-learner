"use server";

import {
  AdminMeta,
  Client,
  GRPC_ERROR_CODES,
  ResponseInterface,
} from "./common_client";
import { section } from "./gen/section";

export const SectionClient = async () => {
  const client = await Client<section.SectionServiceClient>(
    section.SectionServiceClient
  );

  return client;
};

export const GetSections = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ResponseInterface<section.PaginationResponse>> => {
  const meta = await AdminMeta();
  const client = await SectionClient();

  let result: section.PaginationResponse = new section.PaginationResponse();

  const requestDTO = new section.GetSectionRequest({
    page,
    limit,
  });

  await new Promise((resolve, reject) => {
    client.GetAll(requestDTO, meta, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res?.toObject());
      }
    });
  })
    .then((data) => {
      result = data as section.PaginationResponse;
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

export const CreateSection = async (data: {
  name: string;
  sectionID: number;
}): Promise<ResponseInterface<section.SectionObject>> => {
  const meta = await AdminMeta();
  const client = await SectionClient();

  const requestDTO = new section.CreateSectionRequest(data);

  try {
    const result = await new Promise<section.SectionObject>(
      (resolve, reject) => {
        client.Create(requestDTO, meta, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res?.toObject() as section.SectionObject);
          }
        });
      }
    );

    return {
      status: true,
      message: "Section created successfully",
      data: result,
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      message: "Failed to create section",
      error:
        GRPC_ERROR_CODES[(err as { code: keyof typeof GRPC_ERROR_CODES }).code],
    };
  }
};
