package section

import "github.com/saiponethaaung/language-learner/apps/api/db"

type Server struct {
	sectionRepo db.SectionRepository
}

func NewSectionServer(sectionRepo db.SectionRepository) *Server {
	return &Server{
		sectionRepo: sectionRepo,
	}
}

func (s *Server) mustEmbedUnimplementedSectionServiceServer() {
	panic("unimplemented")
}
