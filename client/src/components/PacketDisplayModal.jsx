import { Modal, Button, ListGroup, Tab, Nav } from "react-bootstrap";
import { getUser } from "../utils/user";
import { useState, useEffect } from "react";
import PacketDisplayStatus from "../pages/PacketDisplayModal/PacketDisplayStatus";
import PacketDisplayDetails from "../pages/PacketDisplayModal/PacketDisplayDetails";

const PacketDisplayModal = ({ isOpen, closeModal, packet }) => {
  const [creator, setCreator] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const [activeKey, setActiveKey] = useState("status");

  useEffect(() => {
    if (packet) {
      getUser(packet.creator).then(setCreator);
      getUser(packet.phases[0].assignee).then(setAssignee);
    }
  }, [packet]);

  return (
    <Modal show={isOpen} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{packet && packet.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="status">Status</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="details">Details</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="status">
              <PacketDisplayStatus packet={packet} />
            </Tab.Pane>
            <Tab.Pane eventKey="details">
              <PacketDisplayDetails packet={packet} creator={creator} />
            </Tab.Pane>
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
