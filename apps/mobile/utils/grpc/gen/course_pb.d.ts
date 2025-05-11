import * as jspb from 'google-protobuf'

import * as common_pb from './common_pb'; // proto import: "common.proto"


export class CreateCourseRequest extends jspb.Message {
  getLanguageid(): number;
  setLanguageid(value: number): CreateCourseRequest;

  getCourselanguageid(): number;
  setCourselanguageid(value: number): CreateCourseRequest;

  getName(): string;
  setName(value: string): CreateCourseRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCourseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCourseRequest): CreateCourseRequest.AsObject;
  static serializeBinaryToWriter(message: CreateCourseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCourseRequest;
  static deserializeBinaryFromReader(message: CreateCourseRequest, reader: jspb.BinaryReader): CreateCourseRequest;
}

export namespace CreateCourseRequest {
  export type AsObject = {
    languageid: number,
    courselanguageid: number,
    name: string,
  }
}

export class UpdateCourseRequet extends jspb.Message {
  getLanguageid(): number;
  setLanguageid(value: number): UpdateCourseRequet;

  getCourselanguageid(): number;
  setCourselanguageid(value: number): UpdateCourseRequet;

  getStatus(): number;
  setStatus(value: number): UpdateCourseRequet;

  getName(): string;
  setName(value: string): UpdateCourseRequet;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateCourseRequet.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateCourseRequet): UpdateCourseRequet.AsObject;
  static serializeBinaryToWriter(message: UpdateCourseRequet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateCourseRequet;
  static deserializeBinaryFromReader(message: UpdateCourseRequet, reader: jspb.BinaryReader): UpdateCourseRequet;
}

export namespace UpdateCourseRequet {
  export type AsObject = {
    languageid: number,
    courselanguageid: number,
    status: number,
    name: string,
  }
}

export class CourseObject extends jspb.Message {
  getId(): number;
  setId(value: number): CourseObject;

  getLanguageid(): number;
  setLanguageid(value: number): CourseObject;

  getCourselanguageid(): number;
  setCourselanguageid(value: number): CourseObject;

  getStatus(): number;
  setStatus(value: number): CourseObject;

  getCreatedat(): string;
  setCreatedat(value: string): CourseObject;

  getUpdatedat(): string;
  setUpdatedat(value: string): CourseObject;

  getName(): string;
  setName(value: string): CourseObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CourseObject.AsObject;
  static toObject(includeInstance: boolean, msg: CourseObject): CourseObject.AsObject;
  static serializeBinaryToWriter(message: CourseObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CourseObject;
  static deserializeBinaryFromReader(message: CourseObject, reader: jspb.BinaryReader): CourseObject;
}

export namespace CourseObject {
  export type AsObject = {
    id: number,
    languageid: number,
    courselanguageid: number,
    status: number,
    createdat: string,
    updatedat: string,
    name: string,
  }
}

export class PaginationResponse extends jspb.Message {
  getDataList(): Array<CourseObject>;
  setDataList(value: Array<CourseObject>): PaginationResponse;
  clearDataList(): PaginationResponse;
  addData(value?: CourseObject, index?: number): CourseObject;

  getPagination(): common_pb.PaginationObject | undefined;
  setPagination(value?: common_pb.PaginationObject): PaginationResponse;
  hasPagination(): boolean;
  clearPagination(): PaginationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PaginationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PaginationResponse): PaginationResponse.AsObject;
  static serializeBinaryToWriter(message: PaginationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PaginationResponse;
  static deserializeBinaryFromReader(message: PaginationResponse, reader: jspb.BinaryReader): PaginationResponse;
}

export namespace PaginationResponse {
  export type AsObject = {
    dataList: Array<CourseObject.AsObject>,
    pagination?: common_pb.PaginationObject.AsObject,
  }
}

export class GetCourseRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): GetCourseRequest;

  getLimit(): number;
  setLimit(value: number): GetCourseRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCourseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCourseRequest): GetCourseRequest.AsObject;
  static serializeBinaryToWriter(message: GetCourseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCourseRequest;
  static deserializeBinaryFromReader(message: GetCourseRequest, reader: jspb.BinaryReader): GetCourseRequest;
}

export namespace GetCourseRequest {
  export type AsObject = {
    page: number,
    limit: number,
  }
}

