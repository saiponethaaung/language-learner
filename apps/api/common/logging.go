package common

import (
	"fmt"
)

func LogError(message *string, err error) {
	fmt.Printf("Error: %s, %v\n", *message, err)
}
