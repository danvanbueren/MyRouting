import { ListGroup, Card, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import MemberSelector from "../../components/MemberSelector";
import axios from "axios";

const ReviewForm = ({ user, packet, closeModal }) => {
  const [comments, setComments] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showSearchMemberModal, setShowSearchMemberModal] = useState(false);
  const [nextPhase, setNextPhase] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [newSuspense, setNewSuspense] = useState(null);
  const [reviewed, setReviewed] = useState(false);

  const onSelectMember = (member) => {
    setSelectedMember(member);
    setShowSearchMemberModal(false);
    setSelectedRecipient({
      assignee: member.userId,
      assigneeRole: "MEMBER",
    });
  };

  useEffect(() => {
    if (nextPhase === "Complete") {
      setSelectedRecipient({
        assignee: packet.creator,
        assigneeRole: "CREATOR",
      });
      setCompleted(true);
    }
  }, [nextPhase]);

  const resetForm = () => {
    setComments("");
    setSelectedRecipient(null);
    setSelectedMember(null);
    setShowSearchMemberModal(false);
    setNextPhase(null);
    setCompleted(false);
    setNewSuspense(null);
    setReviewed(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create new phase
    const newPhase = [
      {
        comments,
        reviewed,
        assignee: selectedRecipient?.assignee,
        assigneeRole: selectedRecipient?.assigneeRole,
        completed: completed,
        stepNumber: packet.phases.length,
        phase: nextPhase,
        suspense: newSuspense,
      },
    ];

    // Send updated packet to endpoint
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/api/users/${user.userId}/packets/${
          packet.packetId
        }/phases/`,
        newPhase
      );
      console.log(packet);
      resetForm(); // Reset form after successful submission
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>Packet Review</h3>
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
              <Form.Group controlId="reviewed" className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="I certify that I have reviewed this packet and it is ready to move to the next phase."
                  checked={reviewed}
                  onChange={(e) => setReviewed(e.target.checked)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="newPhase" className="mb-4">
                <Form.Label className="h5 font-weight-bold">
                  Next Phase
                </Form.Label>
                <Form.Group className="d-flex flex-direction-row justify-content-evenly mt-4">
                  <Form.Check
                    type="radio"
                    label="Signature"
                    value="Signature"
                    checked={nextPhase === "Signature"}
                    onChange={(e) => setNextPhase(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Review"
                    value="Review"
                    checked={nextPhase === "Review"}
                    onChange={(e) => setNextPhase(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Concur"
                    value="Concur"
                    checked={nextPhase === "Concur"}
                    onChange={(e) => setNextPhase(e.target.value)}
                  />

                  <Form.Check
                    type="radio"
                    label="Complete"
                    value="Complete"
                    checked={nextPhase === "Complete"}
                    onChange={(e) => setNextPhase(e.target.value)}
                  />
                </Form.Group>
              </Form.Group>
              <Form.Group controlId="Suspense" className="mb-4">
                <Form.Label className="h5 font-weight-bold">
                  Suspense
                </Form.Label>
                <Form.Control
                  type="date"
                  value={newSuspense}
                  onChange={(e) => setNewSuspense(e.target.value)}
                  disabled={nextPhase === "Complete"}
                />
              </Form.Group>
            </Card.Body>
            {nextPhase !== "Complete" && (
              <MemberSelector
                onSelectMember={onSelectMember}
                selectedMember={selectedMember}
              />
            )}
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

export default ReviewForm;
