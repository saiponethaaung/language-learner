/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 5.29.3
 * source: common.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace common {
    export class ErrorResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            code?: string;
            message?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("code" in data && data.code != undefined) {
                    this.code = data.code;
                }
                if ("message" in data && data.message != undefined) {
                    this.message = data.message;
                }
            }
        }
        get code() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set code(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get message() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set message(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data: {
            code?: string;
            message?: string;
        }): ErrorResponse {
            const message = new ErrorResponse({});
            if (data.code != null) {
                message.code = data.code;
            }
            if (data.message != null) {
                message.message = data.message;
            }
            return message;
        }
        toObject() {
            const data: {
                code?: string;
                message?: string;
            } = {};
            if (this.code != null) {
                data.code = this.code;
            }
            if (this.message != null) {
                data.message = this.message;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.code.length)
                writer.writeString(1, this.code);
            if (this.message.length)
                writer.writeString(2, this.message);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ErrorResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ErrorResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.code = reader.readString();
                        break;
                    case 2:
                        message.message = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ErrorResponse {
            return ErrorResponse.deserialize(bytes);
        }
    }
    export class EmptyRequest extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {}) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") { }
        }
        static fromObject(data: {}): EmptyRequest {
            const message = new EmptyRequest({});
            return message;
        }
        toObject() {
            const data: {} = {};
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EmptyRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EmptyRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): EmptyRequest {
            return EmptyRequest.deserialize(bytes);
        }
    }
    export class IDRequest extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            id?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
            }
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set id(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data: {
            id?: string;
        }): IDRequest {
            const message = new IDRequest({});
            if (data.id != null) {
                message.id = data.id;
            }
            return message;
        }
        toObject() {
            const data: {
                id?: string;
            } = {};
            if (this.id != null) {
                data.id = this.id;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id.length)
                writer.writeString(1, this.id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IDRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IDRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): IDRequest {
            return IDRequest.deserialize(bytes);
        }
    }
    export class IntIDRequest extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            id?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
            }
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data: {
            id?: number;
        }): IntIDRequest {
            const message = new IntIDRequest({});
            if (data.id != null) {
                message.id = data.id;
            }
            return message;
        }
        toObject() {
            const data: {
                id?: number;
            } = {};
            if (this.id != null) {
                data.id = this.id;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id != 0)
                writer.writeInt64(1, this.id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IntIDRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IntIDRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readInt64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): IntIDRequest {
            return IntIDRequest.deserialize(bytes);
        }
    }
    export class StatusResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            status?: boolean;
            message?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("status" in data && data.status != undefined) {
                    this.status = data.status;
                }
                if ("message" in data && data.message != undefined) {
                    this.message = data.message;
                }
            }
        }
        get status() {
            return pb_1.Message.getFieldWithDefault(this, 1, false) as boolean;
        }
        set status(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        get message() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set message(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data: {
            status?: boolean;
            message?: string;
        }): StatusResponse {
            const message = new StatusResponse({});
            if (data.status != null) {
                message.status = data.status;
            }
            if (data.message != null) {
                message.message = data.message;
            }
            return message;
        }
        toObject() {
            const data: {
                status?: boolean;
                message?: string;
            } = {};
            if (this.status != null) {
                data.status = this.status;
            }
            if (this.message != null) {
                data.message = this.message;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.status != false)
                writer.writeBool(1, this.status);
            if (this.message.length)
                writer.writeString(2, this.message);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): StatusResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new StatusResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.status = reader.readBool();
                        break;
                    case 2:
                        message.message = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): StatusResponse {
            return StatusResponse.deserialize(bytes);
        }
    }
    export class PaginationObject extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            total?: number;
            page?: number;
            limit?: number;
            totalPages?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("total" in data && data.total != undefined) {
                    this.total = data.total;
                }
                if ("page" in data && data.page != undefined) {
                    this.page = data.page;
                }
                if ("limit" in data && data.limit != undefined) {
                    this.limit = data.limit;
                }
                if ("totalPages" in data && data.totalPages != undefined) {
                    this.totalPages = data.totalPages;
                }
            }
        }
        get total() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set total(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get page() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
        }
        set page(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get limit() {
            return pb_1.Message.getFieldWithDefault(this, 3, 0) as number;
        }
        set limit(value: number) {
            pb_1.Message.setField(this, 3, value);
        }
        get totalPages() {
            return pb_1.Message.getFieldWithDefault(this, 4, 0) as number;
        }
        set totalPages(value: number) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            total?: number;
            page?: number;
            limit?: number;
            totalPages?: number;
        }): PaginationObject {
            const message = new PaginationObject({});
            if (data.total != null) {
                message.total = data.total;
            }
            if (data.page != null) {
                message.page = data.page;
            }
            if (data.limit != null) {
                message.limit = data.limit;
            }
            if (data.totalPages != null) {
                message.totalPages = data.totalPages;
            }
            return message;
        }
        toObject() {
            const data: {
                total?: number;
                page?: number;
                limit?: number;
                totalPages?: number;
            } = {};
            if (this.total != null) {
                data.total = this.total;
            }
            if (this.page != null) {
                data.page = this.page;
            }
            if (this.limit != null) {
                data.limit = this.limit;
            }
            if (this.totalPages != null) {
                data.totalPages = this.totalPages;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.total != 0)
                writer.writeInt32(1, this.total);
            if (this.page != 0)
                writer.writeInt32(2, this.page);
            if (this.limit != 0)
                writer.writeInt32(3, this.limit);
            if (this.totalPages != 0)
                writer.writeInt32(4, this.totalPages);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PaginationObject {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PaginationObject();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.total = reader.readInt32();
                        break;
                    case 2:
                        message.page = reader.readInt32();
                        break;
                    case 3:
                        message.limit = reader.readInt32();
                        break;
                    case 4:
                        message.totalPages = reader.readInt32();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): PaginationObject {
            return PaginationObject.deserialize(bytes);
        }
    }
}
