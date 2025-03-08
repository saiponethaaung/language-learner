import * as jspb from 'google-protobuf'

import * as common_pb from './common_pb'; // proto import: "common.proto"


export class LoginRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): LoginRequest;

  getPassword(): string;
  setPassword(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class LoginResponse extends jspb.Message {
  getStatus(): boolean;
  setStatus(value: boolean): LoginResponse;

  getAccesstoken(): string;
  setAccesstoken(value: string): LoginResponse;
  hasAccesstoken(): boolean;
  clearAccesstoken(): LoginResponse;

  getError(): common_pb.ErrorResponse | undefined;
  setError(value?: common_pb.ErrorResponse): LoginResponse;
  hasError(): boolean;
  clearError(): LoginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    status: boolean,
    accesstoken?: string,
    error?: common_pb.ErrorResponse.AsObject,
  }

  export enum AccesstokenCase { 
    _ACCESSTOKEN_NOT_SET = 0,
    ACCESSTOKEN = 2,
  }

  export enum ErrorCase { 
    _ERROR_NOT_SET = 0,
    ERROR = 3,
  }
}

export class RegisterRequest extends jspb.Message {
  getName(): string;
  setName(value: string): RegisterRequest;

  getEmail(): string;
  setEmail(value: string): RegisterRequest;

  getPassword(): string;
  setPassword(value: string): RegisterRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
  static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterRequest;
  static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
  export type AsObject = {
    name: string,
    email: string,
    password: string,
  }
}

export class RegisterResponse extends jspb.Message {
  getStatus(): boolean;
  setStatus(value: boolean): RegisterResponse;

  getMessage(): string;
  setMessage(value: string): RegisterResponse;
  hasMessage(): boolean;
  clearMessage(): RegisterResponse;

  getError(): common_pb.ErrorResponse | undefined;
  setError(value?: common_pb.ErrorResponse): RegisterResponse;
  hasError(): boolean;
  clearError(): RegisterResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterResponse): RegisterResponse.AsObject;
  static serializeBinaryToWriter(message: RegisterResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterResponse;
  static deserializeBinaryFromReader(message: RegisterResponse, reader: jspb.BinaryReader): RegisterResponse;
}

export namespace RegisterResponse {
  export type AsObject = {
    status: boolean,
    message?: string,
    error?: common_pb.ErrorResponse.AsObject,
  }

  export enum MessageCase { 
    _MESSAGE_NOT_SET = 0,
    MESSAGE = 2,
  }

  export enum ErrorCase { 
    _ERROR_NOT_SET = 0,
    ERROR = 3,
  }
}

export class UserObject extends jspb.Message {
  getId(): number;
  setId(value: number): UserObject;

  getName(): string;
  setName(value: string): UserObject;

  getEmail(): string;
  setEmail(value: string): UserObject;

  getCreatedat(): string;
  setCreatedat(value: string): UserObject;

  getUpdatedat(): string;
  setUpdatedat(value: string): UserObject;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserObject.AsObject;
  static toObject(includeInstance: boolean, msg: UserObject): UserObject.AsObject;
  static serializeBinaryToWriter(message: UserObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserObject;
  static deserializeBinaryFromReader(message: UserObject, reader: jspb.BinaryReader): UserObject;
}

export namespace UserObject {
  export type AsObject = {
    id: number,
    name: string,
    email: string,
    createdat: string,
    updatedat: string,
  }
}

