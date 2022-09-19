package function

import (
	"context"
	"testing"

	"github.com/cloudevents/sdk-go/v2/event"
)

// TestHandle ensures that Handle accepts a valid CloudEvent without error.
func TestHandle(t *testing.T) {
	// Assemble
	e := event.New()
	e.SetID("id")
	e.SetType("type")
	e.SetSource("source")
	e.SetData("text/plain", "data")

	// Act
	echo, err := Handle(context.Background(), e)
	if err != nil {
		t.Fatal(err)
	}

	// Assert
	if echo != nil {
		t.Errorf(echo) // expect nil
	}
}
