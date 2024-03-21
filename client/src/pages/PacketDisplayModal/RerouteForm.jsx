import { ListGroup, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

const RerouteForm = () => {
  const [comments, setComments] = useState("");
  const [reassignTo, setReassignTo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Comments: ", comments);
    console.log("Reassigned to: ", reassignTo);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>Packet Reassignment</h3>
          <Card>
            <Card.Body>
              <Form.Group controlId="comments" className="mt-2 mb-4">
                <Form.Label className="h5 font-weight-bold">
                  Comments
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="reassignTo" className="mb-4">
                <Form.Label className="h5 font-weight-bold">
                  Reassign To
                </Form.Label>
                <Form.Control
                  as="select"
                  value={reassignTo}
                  onChange={(e) => setReassignTo(e.target.value)}
                >
                  {/* Add options for users to reassign to here */}
                  <option value="">Select user...</option>
                </Form.Control>
              </Form.Group>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      </ListGroup>
      <div className="d-flex justify-content-end mt-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default RerouteForm;
