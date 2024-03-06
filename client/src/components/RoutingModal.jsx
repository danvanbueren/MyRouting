import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
function RoutingModal({ isOpen, closeModal, user }) {
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [suspenseDate, setSuspenseDate] = useState("");

  const handleRadioChange = (event) => {
    const { value } = event.target;
    if (value === "Other") {
      setIsOtherSelected(true);
      setSelectedType(null);
    } else {
      setIsOtherSelected(false);
      setSelectedType(value);
    }
  };

  const handleTextInputChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const packetData = {
      name: user.lastName + "_" + selectedType.trim() + "_packet",
      type: selectedType,
      comments: summary,
      currentPhase: 0,
      creator: user.userId,
      createdAt: new Date().toISOString(),
      files: [
        {
          name: selectedFile.name,
          createdAt: new Date().toISOString(),
          file: selectedFile,
        },
      ],
      phases: [
        {
          suspense: suspenseDate,
          comments: "",
          stepNumber: 0,
          completionDate: "",
          phase: "Review",
          assignee: selectedRecipient.Rater,
        },
      ],
    };

    axios
      .post(
        `https://routing.inicolai.com/api/users/${user.userId}/packets`,
        packetData
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    closeModal(); // Close modal after form submission
    setSelectedType("");
    setSelectedRecipient("");
    setSummary("");
    setSelectedFile("");
  };

  return (
    <Modal show={isOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Routing</Modal.Title>
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
              onChange={() => setSelectedType("Memo for Record")}
              checked={selectedType === "Memo for Record"}
            />

            <Form.Check
              type="radio"
              label="DEROS Extension"
              name="type"
              id="type2"
              onChange={() => setSelectedType("DEROS Extension")}
              checked={selectedType === "DEROS Extension"}
            />
            <Form.Check
              type="radio"
              label="Command Sponsorship"
              name="type"
              id="type3"
              onChange={() => setSelectedType("Command Sponsorship")}
              checked={selectedType === "Command Sponsorship"}
            />

            <Form.Check
              type="radio"
              label="Training Report"
              name="type"
              id="type4"
              onChange={() => setSelectedType("Training Report")}
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
                value={
                  isOtherSelected && selectedType !== null ? selectedType : ""
                }
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
                setSelectedRecipient({ Rater: user.rater.userId })
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

          <Button variant="primary" className="float-end" type="submit">
            Submit Packet
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RoutingModal;
