import React from "react";
import { Table, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import PacketDisplayModal from "../components/PacketDisplayModal";

function PacketTable({ packets, sectionName, user }) {
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
            <th>Recipient</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packets.map((packet) => (
            <tr key={packet.packetId}>
              <td>
                {packet.creatorUser.rank} {packet.creatorUser.firstName}{" "}
                {packet.creatorUser.lastName}{" "}
              </td>
              <td>{packet.type}</td>
              <td>
                <p>
                  {packet?.phases[packet?.currentPhase]?.phase &&
                  packet?.phases[packet?.currentPhase]?.assigneeUser.rank &&
                  packet?.phases[packet?.currentPhase]?.assigneeUser
                    .firstName &&
                  packet?.phases[packet?.currentPhase]?.assigneeUser.lastName
                    ? packet.phases[packet.currentPhase].phase === "Completed"
                      ? `Completed by ${
                          packet.phases[packet.currentPhase].assigneeUser.rank
                        } ${
                          packet.phases[packet.currentPhase].assigneeUser
                            .firstName
                        } ${
                          packet.phases[packet.currentPhase].assigneeUser
                            .lastName
                        }`
                      : `Awaiting ${packet.phases[
                          packet.currentPhase
                        ].phase.toUpperCase()} by ${
                          packet.phases[packet.currentPhase].assigneeUser.rank
                        } ${
                          packet.phases[packet.currentPhase].assigneeUser
                            .firstName
                        } ${
                          packet.phases[packet.currentPhase].assigneeUser
                            .lastName
                        }`
                    : "Error Fetching"}
                </p>
              </td>
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
                {packet.phases[packet.currentPhase].phase.toLowerCase() !== "complete" && (
                  <Button variant="secondary" size="sm" disabled>
                    Reassign
                  </Button>
                )}
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
        user={user}
      />
    </>
  );
}

export default PacketTable;
