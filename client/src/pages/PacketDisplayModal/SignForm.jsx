import { ListGroup, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import MemberSelector from "../../components/MemberSelector";
import axios from "axios";

const SignForm = ({ user, packet }) => {
  const [comments, setComments] = useState("");
  const [signature, setSignature] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [showSearchMemberModal, setShowSearchMemberModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  console.log("Packet: ", packet);

  const onSelectMember = (member) => {
    setSelectedMember(member);
    setShowSearchMemberModal(false);
    setSelectedRecipient({
      assignee: member.userId,
      assigneeRole: "MEMBER",
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create new phase
    const newPhase = {
      comments,
      signature,
      assignee: selectedRecipient?.assignee,
      assigneeRole: selectedRecipient?.assigneeRole,
      // Add any other necessary fields here
    };

    // Add new phase to packet
    packet.phases.push(newPhase);

    // Update currentPhase
    packet.currentPhase = packet.phases.length;

    // Log updated packet
    console.log("Updated Packet: ", packet);

    // Send updated packet to endpoint
    try {
      // const response = await axios.post('YOUR_ENDPOINT_URL', packet);
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
            <MemberSelector
              onSelectMember={onSelectMember}
              selectedMember={selectedMember}
            />
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
