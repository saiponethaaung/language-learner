import * as grpcWeb from 'grpc-web';

import * as common_pb from './common_pb'; // proto import: "common.proto"
import * as language_pb from './language_pb'; // proto import: "language.proto"


export class LanguageServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getLanguages(
    request: language_pb.GetLanguagesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: language_pb.PaginationResponse) => void
  ): grpcWeb.ClientReadableStream<language_pb.PaginationResponse>;

  getLanguagesByIds(
    request: language_pb.GetLanguagesByIdsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: language_pb.LanguagesResponse) => void
  ): grpcWeb.ClientReadableStream<language_pb.LanguagesResponse>;

  getLanguage(
    request: common_pb.IntIDRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: language_pb.LanguageObject) => void
  ): grpcWeb.ClientReadableStream<language_pb.LanguageObject>;

  createLanguage(
    request: language_pb.CreateLanguageRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: language_pb.LanguageObject) => void
  ): grpcWeb.ClientReadableStream<language_pb.LanguageObject>;

  updateLanguage(
    request: language_pb.UpdateLanguageRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: language_pb.LanguageObject) => void
  ): grpcWeb.ClientReadableStream<language_pb.LanguageObject>;

  updateLanguageStatus(
    request: language_pb.UpdateLanguageStatusRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: language_pb.LanguageObject) => void
  ): grpcWeb.ClientReadableStream<language_pb.LanguageObject>;

  deleteLanguage(
    request: common_pb.IntIDRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: common_pb.EmptyRequest) => void
  ): grpcWeb.ClientReadableStream<common_pb.EmptyRequest>;

}

export class LanguageServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  getLanguages(
    request: language_pb.GetLanguagesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<language_pb.PaginationResponse>;

  getLanguagesByIds(
    request: language_pb.GetLanguagesByIdsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<language_pb.LanguagesResponse>;

  getLanguage(
    request: common_pb.IntIDRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<language_pb.LanguageObject>;

  createLanguage(
    request: language_pb.CreateLanguageRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<language_pb.LanguageObject>;

  updateLanguage(
    request: language_pb.UpdateLanguageRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<language_pb.LanguageObject>;

  updateLanguageStatus(
    request: language_pb.UpdateLanguageStatusRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<language_pb.LanguageObject>;

  deleteLanguage(
    request: common_pb.IntIDRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<common_pb.EmptyRequest>;

}

