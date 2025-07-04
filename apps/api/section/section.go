package section

type Server struct{}

func (s *Server) mustEmbedUnimplementedSectionServiceServer() {
	panic("unimplemented")
}
