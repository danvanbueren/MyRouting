import {
  Modal,
  Button,
  ListGroup,
  Tab,
  Nav,
  Dropdown,
  Form,
} from "react-bootstrap";
import { getUser } from "../utils/user";
import { useState, useEffect } from "react";
import PacketDisplayStatus from "../pages/PacketDisplayModal/PacketDisplayStatus";
import PacketDisplayDetails from "../pages/PacketDisplayModal/PacketDisplayDetails";
import SignForm from "../pages/PacketDisplayModal/SignForm";
import ReviewForm from "../pages/PacketDisplayModal/ReviewForm";
import RerouteForm from "../pages/PacketDisplayModal/RerouteForm";

const PacketDisplayModal = ({ isOpen, closeModal, packet, user }) => {
  const [creator, setCreator] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [activeKey, setActiveKey] = useState("status");
  const [action, setAction] = useState(null);
  useEffect(() => {
    if (packet) {
      getUser(packet.creator).then(setCreator);
      getUser(packet.phases[0].assignee).then(setAssignee);
    }
  }, [packet]);

  const handleActionSelect = (selectedAction) => {
    setAction(selectedAction);
  };
  return (
    <Modal show={isOpen} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{packet && packet.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Nav variant="tabs d-flex justify-content-between">
            <div className="d-flex flex-direction-row">
              <Nav.Item>
                <Nav.Link eventKey="status">Status</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="details">Details</Nav.Link>
              </Nav.Item>
            </div>
            <Nav.Item>
              <Dropdown onSelect={handleActionSelect}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {action ? action : "Actions"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {packet?.phases[packet.currentPhase].phase ===
                    "Signature" && (
                    <Dropdown.Item eventKey="Sign">Sign</Dropdown.Item>
                  )}
                  {packet?.phases[packet.currentPhase].phase === "Review" && (
                    <Dropdown.Item eventKey="Review">Review</Dropdown.Item>
                  )}
                  {packet?.phases[packet.currentPhase].phase === "Concur" && (
                    <Dropdown.Item eventKey="Concur">Concur</Dropdown.Item>
                  )}
                  <Dropdown.Item eventKey="Reroute">Reroute</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="status">
              <PacketDisplayStatus packet={packet} />
            </Tab.Pane>
            <Tab.Pane eventKey="details">
              <PacketDisplayDetails packet={packet} creator={creator} />
            </Tab.Pane>
            {action === "Sign" && <SignForm user={user} packet={packet} />}
            {action === "Review" && <ReviewForm user={user} packet={packet} />}
            {action === "Reroute" && (
              <RerouteForm user={user} packet={packet} />
            )}
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PacketDisplayModal;
