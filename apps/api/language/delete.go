package language

import (
	"context"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

// DeleteLanguage implements LanguageServiceServer.
func (s *Server) DeleteLanguage(context.Context, *common.IDRequest) (*common.EmptyRequest, error) {
	panic("unimplemented")
}
