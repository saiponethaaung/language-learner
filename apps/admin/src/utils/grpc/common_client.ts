import * as grpc from "@grpc/grpc-js";
import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function Client<T>(client: any): Promise<T> {
  const rpc = grpc.credentials.createInsecure();

  return new client("127.0.0.1:9090", rpc);
}

export const AdminMeta = async (): Promise<grpc.Metadata> => {
  const meta = new grpc.Metadata();
  const cookie = await cookies();
  const token = cookie.get("access_token")?.value;

  if (token) {
    meta.add("authorization", "Bearer " + token);
  }

  return meta;
};

export interface ResponseInterface<T> {
  status: boolean;
  message: string;
  data?: T;
  error?: {
    code: number;
    name: string;
    description: string;
  };
}

export const GRPC_ERROR_CODES = {
  [grpc.status.OK]: {
    code: 0,
    name: "OK",
    description: "Not an error; returned on success.",
  },
  [grpc.status.CANCELLED]: {
    code: 1,
    name: "CANCELLED",
    description: "Operation was cancelled by the caller.",
  },
  [grpc.status.UNKNOWN]: {
    code: 2,
    name: "UNKNOWN",
    description:
      "Unknown error. An example of where this might be used is if a Status value received from another address space belongs to an error-space that is not known in this address space.",
  },
  [grpc.status.INVALID_ARGUMENT]: {
    code: 3,
    name: "INVALID_ARGUMENT",
    description:
      "Client specified an invalid argument. Note that this differs from FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are problematic regardless of the state of the system.",
  },
  [grpc.status.DEADLINE_EXCEEDED]: {
    code: 4,
    name: "DEADLINE_EXCEEDED",
    description:
      "Deadline expired before operation could complete. For operations that change the state of the system, this error may be returned even if the operation has completed successfully.",
  },
  [grpc.status.NOT_FOUND]: {
    code: 5,
    name: "NOT_FOUND",
    description:
      "Some requested entity (e.g., file or directory) was not found. This could be used when a resource is not found, or a request is sent to an non-existent endpoint.",
  },
  [grpc.status.ALREADY_EXISTS]: {
    code: 6,
    name: "ALREADY_EXISTS",
    description:
      "Some entity that we attempted to create (e.g., file or directory) already exists.",
  },
  [grpc.status.PERMISSION_DENIED]: {
    code: 7,
    name: "PERMISSION_DENIED",
    description:
      "The caller does not have permission to execute the specified operation. PERMISSION_DENIED must not be used for rejections caused by exhausting some resource (use RESOURCE_EXHAUSTED instead).",
  },
  [grpc.status.RESOURCE_EXHAUSTED]: {
    code: 8,
    name: "RESOURCE_EXHAUSTED",
    description:
      "Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space.",
  },
  [grpc.status.FAILED_PRECONDITION]: {
    code: 9,
    name: "FAILED_PRECONDITION",
    description:
      "Operation was rejected because the system is not in a state required for the operation's execution. For example, directory to be deleted may be non-empty, an rmdir operation is applied to a non-directory, etc.",
  },
  [grpc.status.ABORTED]: {
    code: 10,
    name: "ABORTED",
    description:
      "The operation was aborted, typically due to a concurrency issue like a sequencer check failure or transaction abort.",
  },
  [grpc.status.OUT_OF_RANGE]: {
    code: 11,
    name: "OUT_OF_RANGE",
    description:
      "Operation was attempted past the valid range. Unlike INVALID_ARGUMENT, this can be used for values that are mathematically valid, but not in the range of expected values.",
  },
  [grpc.status.UNIMPLEMENTED]: {
    code: 12,
    name: "UNIMPLEMENTED",
    description:
      "Operation is not implemented or not supported/enabled in this service.",
  },
  [grpc.status.INTERNAL]: {
    code: 13,
    name: "INTERNAL",
    description:
      "Internal errors. This means that some invariants expected by the underlying system have been broken. This error code is reserved for serious errors.",
  },
  [grpc.status.UNAVAILABLE]: {
    code: 14,
    name: "UNAVAILABLE",
    description:
      "The service is currently unavailable. This is a most likely a transient condition and may be corrected by retrying with a backoff.",
  },
  [grpc.status.DATA_LOSS]: {
    code: 15,
    name: "DATA_LOSS",
    description: "Unrecoverable data loss or corruption.",
  },
  [grpc.status.UNAUTHENTICATED]: {
    code: 16,
    name: "UNAUTHENTICATED",
    description:
      "The request does not have valid authentication credentials for the operation.",
  },
};

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function parseGrpcError(error: any) {
//   if (!(error instanceof Error)) {
//     return {
//       type: "Unknown Error",
//       message: "Not a valid Error object",
//       details: error,
//     };
//   }

//   const errorResult = {
//     type: "gRPC Error",
//     name: error.name,
//     message: error.message,
//     fullErrorDetails: null,
//   };

//   // Check if it's a gRPC error with a status code
//   if (error.code !== undefined && GRPC_ERROR_CODES[error.code]) {
//     const errorCode = GRPC_ERROR_CODES[error.code];
//     errorResult.fullErrorDetails = {
//       code: errorCode.code,
//       name: errorCode.name,
//       description: errorCode.description,
//     };
//   }

//   return errorResult;
// }
