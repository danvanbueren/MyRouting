import { ListGroup, Card, Button } from "react-bootstrap";

const Details = ({ packet, creator }) => {
  const handleDownload = (fileId) => {
    const url = `${import.meta.env.VITE_API}/api/users/${
      packet.creator
    }/packets/${packet.packetId}/files/${fileId}`;
    window.open(url, "_blank");
  };

  return (
    packet && (
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>Packet Details</h3>
          <Card>
            <Card.Body>
              <Card.Title>Type: {packet.type}</Card.Title>
              <Card.Text>
                Created At: {new Date(packet.createdAt).toLocaleString()}
              </Card.Text>
              <Card.Text>Creator: {creator || "N/A"}</Card.Text>
              <Card.Text>
                Comments: {packet.comments || "No comments"}
              </Card.Text>
            </Card.Body>
          </Card>
        </ListGroup.Item>

        <ListGroup.Item>
          <h3>Packet Status</h3>
          {packet.phases &&
            packet.phases.map((phase, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>Phase: {phase.phase}</Card.Title>
                  <Card.Text>Suspense: {phase.suspense}</Card.Text>
                  <Card.Text>Step Number: {phase.stepNumber}</Card.Text>
                  <Card.Text>
                    Assignee:{" "}
                    {phase.assigneeUser.rank +
                      " " +
                      phase.assigneeUser.firstName +
                      " " +
                      phase.assigneeUser.lastName || "N/A"}
                  </Card.Text>
                  <Card.Text>
                    Comments: {phase.comments || "No comments"}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </ListGroup.Item>

        <ListGroup.Item>
          <h3>Files</h3>
          {packet.files &&
            packet.files.map((file, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    File Name:
                    <Button
                      variant="link"
                      onClick={() => handleDownload(file.fileId)}
                    >
                      {file.name}
                    </Button>
                  </Card.Title>
                  <Card.Text>
                    Created At: {new Date(file.createdAt).toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </ListGroup.Item>
      </ListGroup>
    )
  );
};

export default Details;
