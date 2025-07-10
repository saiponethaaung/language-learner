package section_unit

import (
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

type Server struct {
	sectionUnitRepo db.SectionUnitRepository
}

// mustEmbedUnimplementedSectionUnitServiceServer implements SectionUnitServiceServer.
func (s *Server) mustEmbedUnimplementedSectionUnitServiceServer() {
	panic("unimplemented")
}

func NewSectionUnitServer(sectionUnitRepo db.SectionUnitRepository) *Server {
	return &Server{
		sectionUnitRepo: sectionUnitRepo,
	}
}
