import * as jspb from 'google-protobuf'

import * as common_pb from './common_pb'; // proto import: "common.proto"


export class CreateCourse extends jspb.Message {
  getTargetlanguageid(): number;
  setTargetlanguageid(value: number): CreateCourse;

  getSourcelanguageid(): number;
  setSourcelanguageid(value: number): CreateCourse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCourse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCourse): CreateCourse.AsObject;
  static serializeBinaryToWriter(message: CreateCourse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCourse;
  static deserializeBinaryFromReader(message: CreateCourse, reader: jspb.BinaryReader): CreateCourse;
}

export namespace CreateCourse {
  export type AsObject = {
    targetlanguageid: number,
    sourcelanguageid: number,
  }
}

export class UpdateCourse extends jspb.Message {
  getTargetlanguageid(): number;
  setTargetlanguageid(value: number): UpdateCourse;

  getSourcelanguageid(): number;
  setSourcelanguageid(value: number): UpdateCourse;

  getStatus(): boolean;
  setStatus(value: boolean): UpdateCourse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateCourse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateCourse): UpdateCourse.AsObject;
  static serializeBinaryToWriter(message: UpdateCourse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateCourse;
  static deserializeBinaryFromReader(message: UpdateCourse, reader: jspb.BinaryReader): UpdateCourse;
}

export namespace UpdateCourse {
  export type AsObject = {
    targetlanguageid: number,
    sourcelanguageid: number,
    status: boolean,
  }
}

export class CourseObject extends jspb.Message {
  getId(): number;
  setId(value: number): CourseObject;

  getTargetlanguageid(): number;
  setTargetlanguageid(value: number): CourseObject;

  getSourcelanguageid(): number;
  setSourcelanguageid(value: number): CourseObject;

  getStatus(): boolean;
  setStatus(value: boolean): CourseObject;

  getCreatedat(): string;
  setCreatedat(value: string): CourseObject;

  getUpdatedat(): string;
  setUpdatedat(value: string): CourseObject;

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
    targetlanguageid: number,
    sourcelanguageid: number,
    status: boolean,
    createdat: string,
    updatedat: string,
  }
}

