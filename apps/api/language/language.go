package language

import (
	"github.com/saiponethaaung/language-learner/apps/api/db"
)

type Server struct {
	languageRepo db.LanguageRepository
}

func NewLanguageServer(languageRepo db.LanguageRepository) *Server {
	return &Server{
		languageRepo: languageRepo,
	}
}

func (s *Server) mustEmbedUnimplementedLanguageServiceServer() {
	panic("unimplemented")
}
