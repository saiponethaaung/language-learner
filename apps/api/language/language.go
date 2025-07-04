package language

type Server struct{}

func (s *Server) mustEmbedUnimplementedLanguageServiceServer() {
	panic("unimplemented")
}
