package course

import (
	"context"
	"math"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
)

// GetAll implements CourseServiceServer.
func (s *Server) GetAll(ctx context.Context, dto *GetCourseRequest) (*PaginationResponse, error) {
	// authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)

	courses, err := s.courseRepo.GetAllCourse(ctx, int(dto.Limit), int(dto.Page))

	if err != nil {
		return nil, err
	}

	var courseObjects []*CourseObject

	for _, course := range courses {
		courseObjects = append(courseObjects, &CourseObject{
			Id:               int32(course.ID),
			Name:             course.Name,
			Status:           int32(course.Status),
			LanguageID:       int32(course.LanguageID),
			CourseLanguageID: int32(course.CourseLanguageID),
			CreatedAt:        course.CreatedAt.UTC().Format(time.RFC3339),
			UpdatedAt:        course.UpdatedAt.UTC().Format(time.RFC3339),
		})
	}

	total, err := s.courseRepo.CountCourse(ctx)

	if err != nil {
		return nil, err
	}

	totalPage := math.Ceil(float64(total) / float64(dto.Limit))

	return &PaginationResponse{
		Data: courseObjects,
		Pagination: &common.PaginationObject{
			Total:      int32(total),
			Page:       dto.Page,
			Limit:      dto.Limit,
			TotalPages: int32(totalPage),
		},
	}, nil
}
