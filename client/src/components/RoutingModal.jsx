import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, Card } from "react-bootstrap";
import axios from "axios";

const RoutingModal = ({
  isOpen,
  closeModal,
  user,
  isEdit,
  packet,
  setToastMessage,
  setDisplayToast,
  toastMessage,
  refreshPackets,
}) => {
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [suspenseDate, setSuspenseDate] = useState("");

  const AFPC = {
    userId: "1c40ad46-e5f7-11ee-b57a-e39ea2c18650",
    firstName: "AFPC",
    lastName: "",
    rank: "",
  };

  const CSS = {
    userId: "a8fa1132-e5f7-11ee-b57b-fb433a5600af",
    firstName: "CSS",
    lastName: "",
    rank: "",
  };

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

    let packetData = new FormData();

    let data = {
      name: user.lastName + "_" + selectedType.trim() + "_packet",
      type: selectedType,
      comments: summary,
      currentPhase: 0,
      creator: user.userId,
      createdAt: new Date().toISOString(),
      phases: [
        {
          suspense: suspenseDate || "",
          packetId: packet?.packetId || "",
          packetPhaseId: packet?.phases[0].packetPhaseId || "",
          comments: "",
          stepNumber: 0,
          completionDate: null,
          phase: selectedAction,
          assignee: selectedRecipient.assignee || "",
          assigneeRole: selectedRecipient.assigneeRole || "",
        },
      ],
    };

    packetData.append("data", JSON.stringify(data));

    if (selectedFile) {
      for (let i = 0; i < selectedFile.length; i++) {
        packetData.append(`files`, selectedFile[i]);
        console.log(selectedFile[i]);
      }
    }
    console.log(packetData);
    if (!isEdit) {
      axios
        .post(
          `${import.meta.env.VITE_API}/api/users/${user.userId}/packets`,
          packetData
        )
        .then((response) => {
          console.log(response.data);
          setToastMessage({
            message: "Successfully created packet",
            color: "success-subtle",
          });
        })
        .catch((error) => {
          setToastMessage({
            message: "Error creating packet, try again later",
            color: "danger",
          });
          console.error(error);
        });
      console.log(packetData);
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
          setToastMessage({
            message: "Successfully edited packet",
            color: "success-subtle",
          });
        })
        .catch((error) => {
          setToastMessage({
            message: "Error editing packet, try again later",
            color: "danger",
          });

          console.error(error);
        });
    }

    closeModal();
    setSelectedType("");
    setSelectedRecipient("");
    setSummary("");
    setSelectedFile(null);
    refreshPackets();
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
        setToastMessage({
          message: "Successfully deleted packet",
          color: "success-subtle",
        });

        setSelectedType("");
        setSelectedRecipient("");
        setSummary("");
        setSelectedFile(null);
        refreshPackets();
      })
      .catch((error) => {
        setToastMessage({
          message: "Error deleting packet, try again later",
          color: "danger",
        });
        console.error(error);
      });
  };
  useEffect(() => {
    refreshPackets();
    setDisplayToast(true);
  }, [toastMessage]);

  useEffect(() => {
    if (isEdit && packet) {
      setSelectedType(packet.type);
      setSummary(packet.comments || "");
      setSelectedFile(packet.files[0] || "");
      setSuspenseDate(packet.phases[0].suspense || "");

      if (packet.phases[0].assigneeRole === "RATER") {
        setSelectedRecipient({
          assignee: user.rater?.userId,
          assigneeRole: "RATER",
        });
      } else if (packet.phases[0].assigneeRole === "CSS") {
        setSelectedRecipient({ assignee: CSS.userId, assigneeRole: "CSS" });
      } else if (packet.phases[0].assigneeRole === "AFPC") {
        setSelectedRecipient({ assignee: AFPC.userId, assigneeRole: "AFPC" });
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
          <div className="border-bottom my-3"></div>

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
                  assignee: user.rater.userId,
                  assigneeRole: "RATER",
                })
              }
              checked={
                selectedRecipient &&
                selectedRecipient.assigneeRole.toUpperCase() === "RATER"
              }
            />

            <Form.Check
              type="radio"
              label="CSS"
              name="recipient"
              id="recipient2"
              onChange={() =>
                setSelectedRecipient({
                  assignee: CSS.userId,
                  assigneeRole: "CSS",
                })
              }
              checked={
                selectedRecipient &&
                selectedRecipient.assigneeRole.toUpperCase() === "CSS"
              }
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
              onChange={() =>
                setSelectedRecipient({
                  assignee: AFPC.userId,
                  assigneeRole: "AFPC",
                })
              }
              checked={
                selectedRecipient &&
                selectedRecipient.assigneeRole.toUpperCase() === "AFPC"
              }
            />
            <div className="border-bottom my-3"></div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Select Action</b>
            </Form.Label>
            <Form.Check
              type="radio"
              label="Review"
              name="action"
              id="action1"
              onChange={() => setSelectedAction("Review")}
              checked={selectedAction == "Review"}
            />

            <Form.Check
              type="radio"
              label="Concur"
              name="action"
              id="action2"
              onChange={() => setSelectedAction("Concur")}
              checked={selectedAction === "Concur"}
            />

            <Form.Check
              type="radio"
              label="Signature"
              name="action"
              id="action3"
              onChange={() => setSelectedAction("Signature")}
              checked={selectedAction === "Signature"}
            />

            <Form.Check
              type="radio"
              label="Note"
              name="action"
              id="action4"
              onChange={() => setSelectedAction("Note")}
              checked={selectedAction === "Note"}
            />

         
            <div className="border-bottom my-3"></div>
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
          <div className="border-bottom my-3"></div>

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
              multiple
              onChange={(e) => setSelectedFile(e.target.files)}
            />
          </Form.Group>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
          >
            <Button variant="secondary" type="submit">
              {!isEdit ? "Submit Packet" : "Update Packet"}
            </Button>
            {isEdit && (
              <Button
                variant="danger"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this packet?"
                    )
                  ) {
                    handleDelete(packet);
                  }
                }}
              >
                Delete Packet
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RoutingModal;
