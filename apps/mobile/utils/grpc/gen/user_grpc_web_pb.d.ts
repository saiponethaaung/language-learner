import * as grpcWeb from 'grpc-web';

import * as common_pb from './common_pb'; // proto import: "common.proto"
import * as user_pb from './user_pb'; // proto import: "user.proto"


export class UserServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  login(
    request: user_pb.LoginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: user_pb.LoginResponse) => void
  ): grpcWeb.ClientReadableStream<user_pb.LoginResponse>;

  register(
    request: user_pb.RegisterRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: user_pb.RegisterResponse) => void
  ): grpcWeb.ClientReadableStream<user_pb.RegisterResponse>;

  profile(
    request: common_pb.EmptyRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: user_pb.UserObject) => void
  ): grpcWeb.ClientReadableStream<user_pb.UserObject>;

}

export class UserServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  login(
    request: user_pb.LoginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<user_pb.LoginResponse>;

  register(
    request: user_pb.RegisterRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<user_pb.RegisterResponse>;

  profile(
    request: common_pb.EmptyRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<user_pb.UserObject>;

}

