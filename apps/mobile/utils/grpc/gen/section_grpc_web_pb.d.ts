import * as grpcWeb from 'grpc-web';

import * as section_pb from './section_pb'; // proto import: "section.proto"


export class SectionServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  create(
    request: section_pb.CreateSectionRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: section_pb.SectionObject) => void
  ): grpcWeb.ClientReadableStream<section_pb.SectionObject>;

  getAll(
    request: section_pb.GetSectionRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: section_pb.PaginationResponse) => void
  ): grpcWeb.ClientReadableStream<section_pb.PaginationResponse>;

}

export class SectionServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  create(
    request: section_pb.CreateSectionRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<section_pb.SectionObject>;

  getAll(
    request: section_pb.GetSectionRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<section_pb.PaginationResponse>;

}

