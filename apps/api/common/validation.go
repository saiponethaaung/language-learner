package common

import "net/mail"

func ValidateEmail(email *string) *ErrorResponse {
	if _, err := mail.ParseAddress(*email); err != nil {
		return &ErrorResponse{
			Code:    "invalid_email",
			Message: "Invalid email address!",
		}
	}

	return nil
}
