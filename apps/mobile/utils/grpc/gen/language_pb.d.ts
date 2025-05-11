import * as jspb from 'google-protobuf'

import * as common_pb from './common_pb'; // proto import: "common.proto"


export class GetLanguagesRequest extends jspb.Message {
  getPage(): number;
  setPage(value: number): GetLanguagesRequest;

  getLimit(): number;
  setLimit(value: number): GetLanguagesRequest;

  getName(): string;
  setName(value: string): GetLanguagesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLanguagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLanguagesRequest): GetLanguagesRequest.AsObject;
  static serializeBinaryToWriter(message: GetLanguagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLanguagesRequest;
  static deserializeBinaryFromReader(message: GetLanguagesRequest, reader: jspb.BinaryReader): GetLanguagesRequest;
}

export namespace GetLanguagesRequest {
  export type AsObject = {
    page: number,
    limit: number,
    name: string,
  }
}

export class CreateLanguageRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateLanguageRequest;

  getCode(): string;
  setCode(value: string): CreateLanguageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateLanguageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateLanguageRequest): CreateLanguageRequest.AsObject;
  static serializeBinaryToWriter(message: CreateLanguageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateLanguageRequest;
  static deserializeBinaryFromReader(message: CreateLanguageRequest, reader: jspb.BinaryReader): CreateLanguageRequest;
}

export namespace CreateLanguageRequest {
  export type AsObject = {
    name: string,
    code: string,
  }
}

export class UpdateLanguageRequest extends jspb.Message {
  getId(): number;
  setId(value: number): UpdateLanguageRequest;

  getName(): string;
  setName(value: string): UpdateLanguageRequest;

  getCode(): string;
  setCode(value: string): UpdateLanguageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateLanguageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateLanguageRequest): UpdateLanguageRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateLanguageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateLanguageRequest;
  static deserializeBinaryFromReader(message: UpdateLanguageRequest, reader: jspb.BinaryReader): UpdateLanguageRequest;
}

export namespace UpdateLanguageRequest {
  export type AsObject = {
    id: number,
    name: string,
    code: string,
  }
}

export class UpdateLanguageStatusRequest extends jspb.Message {
  getId(): number;
  setId(value: number): UpdateLanguageStatusRequest;

  getStatus(): boolean;
  setStatus(value: boolean): UpdateLanguageStatusRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateLanguageStatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateLanguageStatusRequest): UpdateLanguageStatusRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateLanguageStatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateLanguageStatusRequest;
  static deserializeBinaryFromReader(message: UpdateLanguageStatusRequest, reader: jspb.BinaryReader): UpdateLanguageStatusRequest;
}

export namespace UpdateLanguageStatusRequest {
  export type AsObject = {
    id: number,
    status: boolean,
  }
}

export class LanguageObject extends jspb.Message {
  getId(): number;
  setId(value: number): LanguageObject;

  getName(): string;
  setName(value: string): LanguageObject;

  getCode(): string;
  setCode(value: string): LanguageObject;

  getCreatedat(): string;
  setCreatedat(value: string): LanguageObject;

  getUpdatedat(): string;
  setUpdatedat(value: string): LanguageObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LanguageObject.AsObject;
  static toObject(includeInstance: boolean, msg: LanguageObject): LanguageObject.AsObject;
  static serializeBinaryToWriter(message: LanguageObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LanguageObject;
  static deserializeBinaryFromReader(message: LanguageObject, reader: jspb.BinaryReader): LanguageObject;
}

export namespace LanguageObject {
  export type AsObject = {
    id: number,
    name: string,
    code: string,
    createdat: string,
    updatedat: string,
  }
}

export class PaginationResponse extends jspb.Message {
  getDataList(): Array<LanguageObject>;
  setDataList(value: Array<LanguageObject>): PaginationResponse;
  clearDataList(): PaginationResponse;
  addData(value?: LanguageObject, index?: number): LanguageObject;

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
    dataList: Array<LanguageObject.AsObject>,
    pagination?: common_pb.PaginationObject.AsObject,
  }
}

export class GetLanguagesByIdsRequest extends jspb.Message {
  getIdsList(): Array<number>;
  setIdsList(value: Array<number>): GetLanguagesByIdsRequest;
  clearIdsList(): GetLanguagesByIdsRequest;
  addIds(value: number, index?: number): GetLanguagesByIdsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLanguagesByIdsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLanguagesByIdsRequest): GetLanguagesByIdsRequest.AsObject;
  static serializeBinaryToWriter(message: GetLanguagesByIdsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLanguagesByIdsRequest;
  static deserializeBinaryFromReader(message: GetLanguagesByIdsRequest, reader: jspb.BinaryReader): GetLanguagesByIdsRequest;
}

export namespace GetLanguagesByIdsRequest {
  export type AsObject = {
    idsList: Array<number>,
  }
}

export class LanguagesResponse extends jspb.Message {
  getLanguagesList(): Array<LanguageObject>;
  setLanguagesList(value: Array<LanguageObject>): LanguagesResponse;
  clearLanguagesList(): LanguagesResponse;
  addLanguages(value?: LanguageObject, index?: number): LanguageObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LanguagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LanguagesResponse): LanguagesResponse.AsObject;
  static serializeBinaryToWriter(message: LanguagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LanguagesResponse;
  static deserializeBinaryFromReader(message: LanguagesResponse, reader: jspb.BinaryReader): LanguagesResponse;
}

export namespace LanguagesResponse {
  export type AsObject = {
    languagesList: Array<LanguageObject.AsObject>,
  }
}

