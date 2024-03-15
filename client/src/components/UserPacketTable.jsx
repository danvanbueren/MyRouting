import React from "react";
import { Table, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import RoutingModal from "../components/RoutingModal";
import PacketDisplayModal from "./PacketDisplayModal";

function UserPacketTable({ packets, user, onEditPacket }) {
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
              <td>{user.rank}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  variant="secondary"
                  size="sm w-25"
                  onClick={() => {
                    setSelectedPacket(packet);
                    setIsModalOpen(true);
                  }}
                >
                  View
                </Button>
                <Button
                  variant="secondary"
                  size="sm w-25"
                  onClick={() => {
                    setSelectedPacket(packet);
                    setIsEditModalOpen(true);
                    onEditPacket(packet);
                  }}
                >
                  Edit
                </Button>
                <Button variant="secondary" size="sm w-25" disabled>
                  Reassign
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <RoutingModal
        isOpen={isEditModalOpen}
        closeModal={() => {
          setIsEditModalOpen(false);
          setSelectedPacket(null);
        }}
        packet={selectedPacket}
        user={user}
        isEdit={true}
      />
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
