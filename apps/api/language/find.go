package language

import "context"

// GetLanguages implements LanguageServiceServer.
func (s *Server) GetLanguages(context.Context, *GetLanguagesRequest) (*PaginationResponse, error) {
	panic("unimplemented")
}
