package course

import (
	"context"
	"time"

	"github.com/saiponethaaung/language-learner/apps/api/common"
	"github.com/saiponethaaung/language-learner/apps/api/db"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

func (s *Server) Create(ctx context.Context, dto *CreateCourseRequest) (*CourseObject, error) {
	authInfo := ctx.Value(common.UserContextKey).(common.AuthInfo)

	// Check language is already exists or not
	courseLanguage, _ := s.languageRepo.GetLanguage(ctx, int(dto.CourseLanguageID))

	if courseLanguage.ID == 0 {
		return nil, status.Error(codes.InvalidArgument, "Source language didn't exists")
	}

	// Check language is already exists or not
	languageID, _ := s.languageRepo.GetLanguage(ctx, int(dto.LanguageID))

	if languageID.ID == 0 {
		return nil, status.Error(codes.InvalidArgument, "Target language didn't exists")
	}

	// Check course is already created or not
	checkCourse, _ := s.courseRepo.GetCourseByLanguage(ctx, int(dto.CourseLanguageID), int(dto.LanguageID))

	if checkCourse.ID != 0 {
		return nil, status.Error(codes.AlreadyExists, "Course already exists")
	}

	courseID, err := s.courseRepo.CreateCourse(ctx, db.Course{
		Order:            1,
		Status:           1,
		Name:             dto.Name,
		CourseLanguageID: int(dto.CourseLanguageID),
		LanguageID:       int(dto.LanguageID),
		CreatedBy:        authInfo.Admin.ID,
		UpdatedBy:        authInfo.Admin.ID,
	})

	if err != nil {
		return nil, err
	}

	course, _ := s.courseRepo.GetCourse(ctx, courseID)

	return &CourseObject{
		Id:               int32(course.ID),
		Name:             course.Name,
		Status:           int32(course.Status),
		CourseLanguageID: int32(course.LanguageID),
		LanguageID:       int32(course.CourseLanguageID),
		CreatedAt:        course.CreatedAt.UTC().Format(time.RFC3339),
		UpdatedAt:        course.UpdatedAt.UTC().Format(time.RFC3339),
	}, nil
}
