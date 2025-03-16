import * as grpcWeb from 'grpc-web';

import * as common_pb from './common_pb'; // proto import: "common.proto"
import * as course_pb from './course_pb'; // proto import: "course.proto"


export class CourseServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  create(
    request: course_pb.CreateCourse,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: course_pb.CourseObject) => void
  ): grpcWeb.ClientReadableStream<course_pb.CourseObject>;

  get(
    request: common_pb.IntIDRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: course_pb.CourseObject) => void
  ): grpcWeb.ClientReadableStream<course_pb.CourseObject>;

  getAll(
    request: common_pb.EmptyRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: course_pb.CourseObject) => void
  ): grpcWeb.ClientReadableStream<course_pb.CourseObject>;

  update(
    request: course_pb.UpdateCourse,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: course_pb.CourseObject) => void
  ): grpcWeb.ClientReadableStream<course_pb.CourseObject>;

  delete(
    request: common_pb.IDRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: common_pb.StatusResponse) => void
  ): grpcWeb.ClientReadableStream<common_pb.StatusResponse>;

}

export class CourseServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  create(
    request: course_pb.CreateCourse,
    metadata?: grpcWeb.Metadata
  ): Promise<course_pb.CourseObject>;

  get(
    request: common_pb.IntIDRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<course_pb.CourseObject>;

  getAll(
    request: common_pb.EmptyRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<course_pb.CourseObject>;

  update(
    request: course_pb.UpdateCourse,
    metadata?: grpcWeb.Metadata
  ): Promise<course_pb.CourseObject>;

  delete(
    request: common_pb.IDRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<common_pb.StatusResponse>;

}

