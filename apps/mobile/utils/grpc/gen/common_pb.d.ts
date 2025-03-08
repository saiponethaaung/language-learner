import * as jspb from 'google-protobuf'



export class ErrorResponse extends jspb.Message {
  getCode(): string;
  setCode(value: string): ErrorResponse;

  getMessage(): string;
  setMessage(value: string): ErrorResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorResponse): ErrorResponse.AsObject;
  static serializeBinaryToWriter(message: ErrorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorResponse;
  static deserializeBinaryFromReader(message: ErrorResponse, reader: jspb.BinaryReader): ErrorResponse;
}

export namespace ErrorResponse {
  export type AsObject = {
    code: string,
    message: string,
  }
}

export class EmptyRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
  static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyRequest;
  static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
  export type AsObject = {
  }
}

export class IDRequest extends jspb.Message {
  getId(): string;
  setId(value: string): IDRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IDRequest): IDRequest.AsObject;
  static serializeBinaryToWriter(message: IDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IDRequest;
  static deserializeBinaryFromReader(message: IDRequest, reader: jspb.BinaryReader): IDRequest;
}

export namespace IDRequest {
  export type AsObject = {
    id: string,
  }
}

export class IntIDRequest extends jspb.Message {
  getId(): number;
  setId(value: number): IntIDRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IntIDRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IntIDRequest): IntIDRequest.AsObject;
  static serializeBinaryToWriter(message: IntIDRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IntIDRequest;
  static deserializeBinaryFromReader(message: IntIDRequest, reader: jspb.BinaryReader): IntIDRequest;
}

export namespace IntIDRequest {
  export type AsObject = {
    id: number,
  }
}

export class StatusResponse extends jspb.Message {
  getStatus(): boolean;
  setStatus(value: boolean): StatusResponse;

  getMessage(): string;
  setMessage(value: string): StatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StatusResponse): StatusResponse.AsObject;
  static serializeBinaryToWriter(message: StatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusResponse;
  static deserializeBinaryFromReader(message: StatusResponse, reader: jspb.BinaryReader): StatusResponse;
}

export namespace StatusResponse {
  export type AsObject = {
    status: boolean,
    message: string,
  }
}

export class PaginationObject extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): PaginationObject;

  getPage(): number;
  setPage(value: number): PaginationObject;

  getLimit(): number;
  setLimit(value: number): PaginationObject;

  getTotalpages(): number;
  setTotalpages(value: number): PaginationObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PaginationObject.AsObject;
  static toObject(includeInstance: boolean, msg: PaginationObject): PaginationObject.AsObject;
  static serializeBinaryToWriter(message: PaginationObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PaginationObject;
  static deserializeBinaryFromReader(message: PaginationObject, reader: jspb.BinaryReader): PaginationObject;
}

export namespace PaginationObject {
  export type AsObject = {
    total: number,
    page: number,
    limit: number,
    totalpages: number,
  }
}

