import * as jspb from 'google-protobuf'

import * as common_pb from './common_pb'; // proto import: "common.proto"


export class CreateSectionRequest extends jspb.Message {
  getCourseid(): number;
  setCourseid(value: number): CreateSectionRequest;

  getName(): string;
  setName(value: string): CreateSectionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateSectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateSectionRequest): CreateSectionRequest.AsObject;
  static serializeBinaryToWriter(message: CreateSectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateSectionRequest;
  static deserializeBinaryFromReader(message: CreateSectionRequest, reader: jspb.BinaryReader): CreateSectionRequest;
}

export namespace CreateSectionRequest {
  export type AsObject = {
    courseid: number,
    name: string,
  }
}

export class SectionObject extends jspb.Message {
  getId(): number;
  setId(value: number): SectionObject;

  getName(): string;
  setName(value: string): SectionObject;

  getCourseid(): number;
  setCourseid(value: number): SectionObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SectionObject.AsObject;
  static toObject(includeInstance: boolean, msg: SectionObject): SectionObject.AsObject;
  static serializeBinaryToWriter(message: SectionObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SectionObject;
  static deserializeBinaryFromReader(message: SectionObject, reader: jspb.BinaryReader): SectionObject;
}

export namespace SectionObject {
  export type AsObject = {
    id: number,
    name: string,
    courseid: number,
  }
}

export class PaginationResponse extends jspb.Message {
  getDataList(): Array<SectionObject>;
  setDataList(value: Array<SectionObject>): PaginationResponse;
  clearDataList(): PaginationResponse;
  addData(value?: SectionObject, index?: number): SectionObject;

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
    dataList: Array<SectionObject.AsObject>,
    pagination?: common_pb.PaginationObject.AsObject,
  }
}

export class GetSectionRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): GetSectionRequest;

  getLimit(): number;
  setLimit(value: number): GetSectionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSectionRequest): GetSectionRequest.AsObject;
  static serializeBinaryToWriter(message: GetSectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSectionRequest;
  static deserializeBinaryFromReader(message: GetSectionRequest, reader: jspb.BinaryReader): GetSectionRequest;
}

export namespace GetSectionRequest {
  export type AsObject = {
    page: number,
    limit: number,
  }
}

