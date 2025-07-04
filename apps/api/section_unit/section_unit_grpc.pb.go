// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             v5.29.3
// source: section_unit.proto

package section_unit

import (
	grpc "google.golang.org/grpc"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

// SectionUnitServiceClient is the client API for SectionUnitService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type SectionUnitServiceClient interface {
}

type sectionUnitServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewSectionUnitServiceClient(cc grpc.ClientConnInterface) SectionUnitServiceClient {
	return &sectionUnitServiceClient{cc}
}

// SectionUnitServiceServer is the server API for SectionUnitService service.
// All implementations must embed UnimplementedSectionUnitServiceServer
// for forward compatibility.
type SectionUnitServiceServer interface {
	mustEmbedUnimplementedSectionUnitServiceServer()
}

// UnimplementedSectionUnitServiceServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedSectionUnitServiceServer struct{}

func (UnimplementedSectionUnitServiceServer) mustEmbedUnimplementedSectionUnitServiceServer() {}
func (UnimplementedSectionUnitServiceServer) testEmbeddedByValue()                            {}

// UnsafeSectionUnitServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to SectionUnitServiceServer will
// result in compilation errors.
type UnsafeSectionUnitServiceServer interface {
	mustEmbedUnimplementedSectionUnitServiceServer()
}

func RegisterSectionUnitServiceServer(s grpc.ServiceRegistrar, srv SectionUnitServiceServer) {
	// If the following call pancis, it indicates UnimplementedSectionUnitServiceServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&SectionUnitService_ServiceDesc, srv)
}

// SectionUnitService_ServiceDesc is the grpc.ServiceDesc for SectionUnitService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var SectionUnitService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "section_unit.SectionUnitService",
	HandlerType: (*SectionUnitServiceServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams:     []grpc.StreamDesc{},
	Metadata:    "section_unit.proto",
}
