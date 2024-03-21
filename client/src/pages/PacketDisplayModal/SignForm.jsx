import { ListGroup, Card, Form, Button } from "react-bootstrap";
import { Suspense, useEffect, useState } from "react";
import MemberSelector from "../../components/MemberSelector";
import axios from "axios";
import { getUser } from "../../utils/user";
const SignForm = ({ user, packet }) => {
  const [comments, setComments] = useState("");
  const [signature, setSignature] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showSearchMemberModal, setShowSearchMemberModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [nextPhase, setNextPhase] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [newSuspense, setNewSuspense] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create new phase
    const newPhase = [
      {
        comments,
        signature,
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
      const response = axios.post(
        `${import.meta.env.VITE_API}/api/users/${user.userId}/packets/${
          packet.packetId
        }/phases/`,
        newPhase
      );
      console.log(packet);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const generateFakeSignature = (user) => {
    console.log(user);
    const { firstName, middleInitial, lastName, dodId } = user;
    const fullName = middleInitial
      ? `${lastName.toUpperCase()}.${firstName.toUpperCase()}.${middleInitial.toUpperCase()}`
      : `${lastName.toUpperCase()}.${firstName.toUpperCase()}`;

    const currentDate = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);

    return `Signed by: \r\ncn=DOD ID CA-59,ou=PKI,ou=DoD,o=U.S. Government,c=US\r\nusing certificate Cert Value: \r\ncn=${fullName}.${dodId},ou=USAF,ou=PKI,ou=DoD,o=U.S. Government,c=US\r\nOn: ${currentDate}`;
  };

  const handleSign = () => {
    setSignature(generateFakeSignature(user));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>Packet Signature</h3>
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
                    label="Denied"
                    value="Denied"
                    checked={nextPhase === "Denied"}
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

              <Form.Group controlId="signature" className="mb-4">
                <div className="d-flex justify-content-around">
                  <Form.Label className="h5 font-weight-bold">
                    Digital Signature
                  </Form.Label>
                  {signature ? (
                    <Form.Control
                      as="textarea"
                      rows={6}
                      readOnly
                      value={signature}
                    />
                  ) : (
                    <Button onClick={handleSign}>Sign</Button>
                  )}
                </div>
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

export default SignForm;
