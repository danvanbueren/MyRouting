import { ListGroup, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";

const ConcurForm = () => {
  const [comments, setComments] = useState("");
  const [concurred, setConcurred] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Comments: ", comments);
    console.log("Concurred: ", concurred);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>Packet Concur</h3>
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
              <Form.Group controlId="concurred" className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="I agree I have reviewed and verified that all documents are correct"
                  checked={concurred}
                  onChange={(e) => setConcurred(e.target.checked)}
                />
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

export default ConcurForm;
