"use server";

import {
  AdminMeta,
  Client,
  GRPC_ERROR_CODES,
  ResponseInterface,
} from "./common.client";
import { common } from "./gen/common";
import { section_unit } from "./gen/section_unit";

export const SectionUnitClient = async () => {
  const client = await Client<section_unit.SectionUnitServiceClient>(
    section_unit.SectionUnitServiceClient
  );

  return client;
};

export const GetSectionUnits = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ResponseInterface<section_unit.PaginationResponse>> => {
  const meta = await AdminMeta();
  const client = await SectionUnitClient();

  let result: section_unit.PaginationResponse =
    new section_unit.PaginationResponse();

  const requestDTO = new section_unit.GetSectionUnitRequest({
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
      result = data as section_unit.PaginationResponse;
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

export const CreateSectionUnit = async (data: {
  name: string;
  sectionID: number;
}): Promise<ResponseInterface<section_unit.SectionUnitObject>> => {
  const meta = await AdminMeta();
  const client = await SectionUnitClient();

  const requestDTO = new section_unit.CreateSectionUnitRequest(data);

  try {
    const result = await new Promise<section_unit.SectionUnitObject>(
      (resolve, reject) => {
        client.Create(requestDTO, meta, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res?.toObject() as section_unit.SectionUnitObject);
          }
        });
      }
    );

    return {
      status: true,
      message: "Section unit created successfully",
      data: result,
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      message: "Failed to create section unit",
      error:
        GRPC_ERROR_CODES[(err as { code: keyof typeof GRPC_ERROR_CODES }).code],
    };
  }
};

export const GetSectionUnit = async (
  id: number
): Promise<ResponseInterface<section_unit.SectionUnitObject>> => {
  const meta = await AdminMeta();
  const client = await SectionUnitClient();

  let result: section_unit.SectionUnitObject =
    new section_unit.SectionUnitObject();

  const requestDTO = new common.IntIDRequest({ id });

  await new Promise((resolve, reject) => {
    client.Get(requestDTO, meta, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res?.toObject());
      }
    });
  })
    .then((data) => {
      result = data as section_unit.SectionUnitObject;
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
