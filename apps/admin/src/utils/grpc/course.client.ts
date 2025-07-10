"use server";

import {
  AdminMeta,
  Client,
  GRPC_ERROR_CODES,
  ResponseInterface,
} from "./common.client";
import { course } from "./gen/course";

export const CourseClient = async () => {
  const client = await Client<course.CourseServiceClient>(
    course.CourseServiceClient
  );

  return client;
};

export const GetCourses = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ResponseInterface<course.PaginationResponse>> => {
  const meta = await AdminMeta();
  const client = await CourseClient();

  let result: course.PaginationResponse = new course.PaginationResponse();

  const requestDTO = new course.GetCourseRequest({
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
      result = data as course.PaginationResponse;
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

export const CreateCourse = async (data: {
  name: string;
  languageID: number;
  courseLanguageID: number;
}): Promise<ResponseInterface<course.CourseObject>> => {
  const meta = await AdminMeta();
  const client = await CourseClient();

  const requestDTO = new course.CreateCourseRequest(data);

  try {
    const result = await new Promise<course.CourseObject>((resolve, reject) => {
      client.Create(requestDTO, meta, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res?.toObject() as course.CourseObject);
        }
      });
    });

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
