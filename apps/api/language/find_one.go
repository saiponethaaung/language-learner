package language

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

// GetLanguage implements LanguageServiceServer.
func (s *Server) GetLanguage(context.Context, *common.IDRequest) (*LanguageObject, error) {
	panic("unimplemented")
}
