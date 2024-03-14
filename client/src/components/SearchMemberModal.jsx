import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  FormControl,
  FloatingLabel,
  Table,
} from "react-bootstrap";
import axios from "axios";

const rankOptions = [
  { value: "E-1", label: "AB" },
  { value: "E-2", label: "Amn" },
  { value: "E-3", label: "A1C" },
  { value: "E-4", label: "SrA" },
  { value: "E-5", label: "SSgt" },
  { value: "E-6", label: "TSgt" },
  { value: "E-7", label: "MSgt" },
  { value: "E-8", label: "SMSgt" },
  { value: "E-9", label: "CMSgt" },
  { value: "O-1", label: "2Lt" },
  { value: "O-2", label: "1Lt" },
  { value: "O-3", label: "Capt" },
  { value: "O-4", label: "Maj" },
  { value: "O-5", label: "Lt Col" },
  { value: "O-6", label: "Col" },
  { value: "O-7", label: "Brig Gen" },
  { value: "O-8", label: "Maj Gen" },
  { value: "O-9", label: "Lt Gen" },
  { value: "O-10", label: "Gen" },
  { value: "ALL", label: "All" },
  { value: "CIV", label: "Civ" },
  { value: "OTH", label: "Other" },
];

const SearchMemberModal = ({ isOpen, closeModal, onSelectMember }) => {
  const [searchParams, setSearchParams] = useState({
    rank: "ALL" || "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const debounceTimer = useRef(null);

  const handleSearch = async () => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      const { rank, firstName, lastName, email } = searchParams;
      if (firstName || lastName || email || rank !== "ALL") {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API
            }/api/users?grade=${rank}&firstName=${firstName}&lastName=${lastName}&email=${email}`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error("Search failed:", error);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);
  };

  useEffect(() => {
    handleSearch();
  }, [searchParams]);

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClose = () => {
    setSelectedMember(null);
    setSearchParams({
      rank: "ALL",
      firstName: "",
      lastName: "",
      email: "",
    });
    closeModal();
  };
  const TableHeader = () => (
    <thead>
      <tr>
        <th>Rank</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th></th>
      </tr>
    </thead>
  );

  const TableRow = ({ member, setSelectedMember }) => (
    <tr className={selectedMember === member ? "table-success" : ""}>
      <td>{member.rank}</td>
      <td>{member.firstName}</td>
      <td>{member.lastName}</td>
      <td>{member.email}</td>
      <td>
        <Button variant="primary" onClick={() => setSelectedMember(member)}>
          Select
        </Button>
      </td>
    </tr>
  );

  const MemberTable = ({
    searchResults,
    setSelectedMember,
    selectedMember,
  }) => (
    <Table>
      <TableHeader />
      <tbody>
        {searchResults.map((member, index) => (
          <TableRow
            key={index}
            member={member}
            setSelectedMember={setSelectedMember}
            selectedMember={selectedMember}
          />
        ))}
      </tbody>
    </Table>
  );

  return (
    <Modal
      show={isOpen}
      onHide={handleModalClose}
      size="lg"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Search Members</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <p>
            Use one or more fields to search for the subject of this packet.
          </p>
          <InputGroup className="mb-3">
            <FloatingLabel
              controlId="search-member-modal-select-rank"
              label="Rank"
              className="flex-grow-1"
            >
              <Form.Select
                aria-label="Select rank"
                value={searchParams.rank}
                onChange={handleInputChange}
                name="rank"
              >
                {rankOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <FormControl
              type="text"
              placeholder="First Name"
              aria-label="First Name"
              value={searchParams.firstName}
              onChange={handleInputChange}
              name="firstName"
            />
            <FormControl
              type="text"
              placeholder="Last Name"
              aria-label="Last Name"
              value={searchParams.lastName}
              onChange={handleInputChange}
              name="lastName"
            />
            <FormControl
              type="text"
              placeholder="Email"
              aria-label="Email"
              value={searchParams.email}
              onChange={handleInputChange}
              name="email"
            />
          </InputGroup>
          <div id="search-member-modal-member-table">
            <MemberTable
              searchResults={searchResults}
              setSelectedMember={setSelectedMember}
              selectedMember={selectedMember}
            />
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={!selectedMember}
          onClick={() => onSelectMember(selectedMember)}
        >
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchMemberModal;
