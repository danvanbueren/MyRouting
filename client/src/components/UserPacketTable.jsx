import React from "react";
import { Table, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import PacketDisplayModal from "../components/PacketDisplayModal";

function UserPacketTable({ packets, user, sectionName }) {
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (packets.length < 1) {
    return (
      <Container>
        <Row className="align-items-center">
          <Col xs="auto" className="p-0 m-0">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "2.5rem" }}
            >
              info
            </span>
          </Col>
          <Col>
            <h6>No Items Pending</h6>
            <span>There are currently no pending items.</span>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Rank</th>
         <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packets.map((packet) => (
            <tr key={packet.packetId}>
              <td>
              {user.rank}
              </td>
              <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
              <td>
                <Button
                  variant="secondary"
                  className="me-2"
                  size="sm"
                  onClick={() => {
                    setSelectedPacket(packet);
                    setIsModalOpen(true);
                  }}
                >
                  View
                </Button>
                <Button variant="secondary" size="sm" disabled>
                  Reassign
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PacketDisplayModal
        isOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
          setSelectedPacket(null);
        }}
        packet={selectedPacket}
      />
    </>
  );
}

export default UserPacketTable;
