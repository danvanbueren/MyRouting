import { ListGroup, Card } from "react-bootstrap";

const Status = ({ packet }) => (
  <ListGroup variant="flush">
    <ListGroup.Item>
      <h3>Packet Status</h3>
      {packet &&
        packet.phases &&
        packet.phases.map((phase, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>Phase: {phase.phase}</Card.Title>
              <Card.Text>
                <strong>Suspense:</strong> {phase.suspense}
              </Card.Text>
              <Card.Text>
                <strong>Step Number:</strong> {phase.stepNumber}
              </Card.Text>
              <Card.Text>
                <strong>Assignee:</strong>{" "}
                {phase.assigneeUser.rank +
                  " " +
                  phase.assigneeUser.firstName +
                  " " +
                  phase.assigneeUser.lastName || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Comments:</strong> {phase.comments || "No comments"}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </ListGroup.Item>
  </ListGroup>
);

export default Status;
