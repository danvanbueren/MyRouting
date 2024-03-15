import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, Card } from "react-bootstrap";
import axios from "axios";
function RoutingModal({ isOpen, closeModal, user, isEdit, packet }) {
  console.log(packet);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [suspenseDate, setSuspenseDate] = useState("");

  const handleRadioChange = (e) => {
    if (e.target.value === "Other") {
      setIsOtherSelected(true);
      setSelectedType("");
    } else {
      setIsOtherSelected(false);
      setSelectedType(e.target.value);
    }
  };

  const handleTextInputChange = (event) => {
    if (isOtherSelected) {
      setSelectedType(event.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let packetFiles = packet?.files || [];
    if (selectedFile) {
      packetFiles.push({
        name: selectedFile.name,
        createdAt: new Date().toISOString(),
        file: selectedFile,
      });
    }

    let packetData = {
      name: user.lastName + "_" + selectedType.trim() + "_packet",
      type: selectedType,
      comments: summary,
      currentPhase: 0,
      creator: user.userId,
      createdAt: new Date().toISOString(),
      files: packetFiles,
      phases: [
        {
          suspense: suspenseDate,
          packetId: packet?.packetId || "",
          packetPhaseId: packet?.phases[0].packetPhaseId || "",
          comments: "",
          stepNumber: 0,
          completionDate: null,
          phase: "Review",
          assignee: selectedRecipient.Rater,
          assigneeRole: selectedRecipient.assigneeRole,
        },
      ],
    };

    if (!isEdit) {
      axios
        .post(
          `${import.meta.env.VITE_API}/api/users/${user.userId}/packets`,
          packetData
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (isEdit && packet) {
      axios
        .put(
          `${import.meta.env.VITE_API}/api/users/${user.userId}/packets/${
            packet.packetId
          }`,
          packetData
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    console.log(packetData);
    closeModal();
    setSelectedType("");
    setSelectedRecipient("");
    setSummary("");
    setSelectedFile(null);
  };

  const handleDelete = (packet) => {
    axios
      .delete(
        `${import.meta.env.VITE_API}/api/users/${user.userId}/packets/${
          packet.packetId
        }`
      )
      .then((response) => {
        closeModal();
        setSelectedType("");
        setSelectedRecipient("");
        setSummary("");
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (isEdit && packet) {
      setSelectedType(packet.type);
      setSummary(packet.comments || "");
      setSelectedFile(packet.files[0] || "");
      setSuspenseDate(packet.phases[0].suspense || "");

      if (packet.phases[0].assigneeRole === "RATER") {
        setSelectedRecipient({ Rater: user.rater?.userId });
      } else {
        setSelectedRecipient(packet.phases[0].assigneeRole);
      }
    }
  }, [isEdit, packet]);

  return (
    <Modal show={isOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{!isEdit ? "Add Routing" : "Edit Packet"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Routing Settings</b>
            </Form.Label>
            <p>Select the appropriate options to route your document.</p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>Select Type</b>
            </Form.Label>
            <Form.Check
              type="radio"
              label="Memo for Record"
              name="type"
              id="type1"
              onChange={() =>
                handleRadioChange({ target: { value: "Memo for Record" } })
              }
              checked={selectedType === "Memo for Record"}
            />

            <Form.Check
              type="radio"
              label="DEROS Extension"
              name="type"
              id="type2"
              onChange={() =>
                handleRadioChange({ target: { value: "DEROS Extension" } })
              }
              checked={selectedType === "DEROS Extension"}
            />

            <Form.Check
              type="radio"
              label="Command Sponsorship"
              name="type"
              id="type3"
              onChange={() =>
                handleRadioChange({
                  target: { value: "Command Sponsorship" },
                })
              }
              checked={selectedType === "Command Sponsorship"}
            />

            <Form.Check
              type="radio"
              label="Training Report"
              name="type"
              id="type4"
              onChange={() =>
                handleRadioChange({ target: { value: "Training Report" } })
              }
              checked={selectedType === "Training Report"}
            />

            <InputGroup>
              <InputGroup.Text>
                <Form.Check
                  type="radio"
                  name="type"
                  value="Other"
                  onChange={handleRadioChange}
                  checked={isOtherSelected}
                />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Specify other type"
                onChange={handleTextInputChange}
                disabled={!isOtherSelected}
                value={isOtherSelected ? selectedType : ""}
              />
            </InputGroup>
          </Form.Group>
          <div class="border-bottom my-3"></div>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>Choose Recipient</b>
            </Form.Label>
            <Form.Check
              type="radio"
              label="Rater"
              name="recipient"
              id="recipient1"
              onChange={() =>
                setSelectedRecipient({
                  Rater: user.rater.userId,
                  assigneeRole: "RATER",
                })
              }
              checked={
                selectedRecipient &&
                selectedRecipient.Rater === user.rater.userId
              }
            />

            <Form.Check
              type="radio"
              label="CSS"
              name="recipient"
              id="recipient2"
              onChange={() => setSelectedRecipient("CSS")}
              checked={selectedRecipient === "CSS"}
            />

            <Form.Check
              type="radio"
              label="Commander"
              name="recipient"
              id="recipient3"
              onChange={() => setSelectedRecipient("Commander")}
              checked={selectedRecipient === "Commander"}
            />

            <Form.Check
              type="radio"
              label="MPF"
              name="recipient"
              id="recipient4"
              onChange={() => setSelectedRecipient("MPF")}
              checked={selectedRecipient === "MPF"}
            />

            <Form.Check
              type="radio"
              label="AFPC"
              name="recipient"
              id="recipient5"
              onChange={() => setSelectedRecipient("AFPC")}
              checked={selectedRecipient === "AFPC"}
            />
            <div class="border-bottom my-3"></div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>Summary of Request</b>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </Form.Group>
          <div class="border-bottom my-3"></div>

          <Form.Group className="mb-3">
            <Form.Label>
              <b>Suspense Date</b>
            </Form.Label>
            <Form.Control
              type="date"
              value={suspenseDate}
              onChange={(e) => setSuspenseDate(e.target.value)}
            />
          </Form.Group>
          {isEdit &&
            packet &&
            packet.files &&
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
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Add Documents</b>
            </Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Form.Group>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
          >
            <Button variant="secondary" type="submit">
              {!isEdit ? "Submit Packet" : "Update Packet"}
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this packet?")
                ) {
                  handleDelete(packet);
                }
              }}
            >
              Delete Packet
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RoutingModal;
