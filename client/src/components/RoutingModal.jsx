import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

function RoutingModal({ isOpen, closeModal }) {
  const [selectedType, setSelectedType] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleRadioChange = (event) => {
    const { value } = event.target;
    if (value === "Other") {
      setIsOtherSelected(true);
      // Only set selectedType to 'Other' initially, actual value is set on text input change
      setSelectedType("");
    } else {
      setIsOtherSelected(false);
      setSelectedType(value);
    }
  };

  const handleTextInputChange = (event) => {
    setSelectedType(event.target.value);
  };

  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Type:", selectedType);
    console.log("Selected Recipient:", selectedRecipient);
    console.log("Summary:", summary);
    console.log("Selected File:", selectedFile);
    // Implement form submission logic here
    closeModal(); // Close modal after form submission
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
              onChange={() => setSelectedRecipient("Rater")}
              checked={selectedRecipient === "Rater"}
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
            <Form.Label><b>Add Documents</b></Form.Label>
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
