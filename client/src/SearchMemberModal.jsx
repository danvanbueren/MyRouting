import React, { useState, useEffect } from "react";
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

function SearchMemberModal({ isOpen, closeModal, onSelectMember }) {


  const [rank, setRank] = useState("ALL");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  // Debounce function inside the component
  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Debounced search function
  const debouncedSearch = debounce(() => {
    handleSearch();
  }, 500); // 500ms delay

  useEffect(() => {
    // Call debounced search whenever search-related state changes
    debouncedSearch();
  }, [rank, firstName, lastName, email]); 



  const handleSearch = async () => {
    try {
        if(firstName!=="" || lastName!=="" || email!=="" || rank!=="ALL")
        {
        const response = await axios.get(
            `http://localhost:3000/api/users?grade=${rank}&firstName=${firstName}&lastName=${lastName}&email=${email}`
        );
        console.log(response.data);
        setSearchResults(response.data);
        }
        else
        {
          setSearchResults([]);
        }
      
    }
    catch (error) {
        console.error("Search failed:", error);
    }
    
  };

  return (
    <Modal show={isOpen} onHide={closeModal} size="lg" centered scrollable>
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
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                disabled={false}
              >
                <option value="E-1">AB</option>
                <option value="E-2">Amn</option>
                <option value="E-3">A1C</option>
                <option value="E-4">SrA</option>
                <option value="E-5">SSgt</option>
                <option value="E-6">TSgt</option>
                <option value="E-7">MSgt</option>
                <option value="E-8">SMSgt</option>
                <option value="E-9">CMSgt</option>
                <option disabled></option>
                <option value="O-1">2Lt</option>
                <option value="O-2">1Lt</option>
                <option value="O-3">Capt</option>
                <option value="O-4">Maj</option>
                <option value="O-5">Lt Col</option>
                <option value="O-6">Col</option>
                <option value="O-7">Brig Gen</option>
                <option value="O-8">Maj Gen</option>
                <option value="O-9">Lt Gen</option>
                <option value="O-10">Gen</option>
                <option disabled></option>
                <option value="ALL">
                  All
                </option>
                <option value="CIV">Civ</option>
                <option value="OTH">Other</option>
              </Form.Select>
            </FloatingLabel>

            <FormControl
              type="text"
              placeholder="First Name"
              aria-label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={false}
            />

            <FormControl
              type="text"
              placeholder="Last Name"
              aria-label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={false}
            />

            <FormControl
              type="text"
              placeholder="Email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={false}
            />
          </InputGroup>


          <div id="search-member-modal-member-table">
            {searchResults && searchResults.length > 0 ? (
              <>
             <Table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((member,index) => (
            
                  <tr key={index}>
                    <td>{member.rank}</td>
                    <td>{member.firstName}</td>
                    <td>{member.lastName}</td>
                    <td>{member.email}</td>
                    <td><Button variant="primary" onClick={() => {setSelectedMember(member)}}>Select</Button></td>
                  
                  </tr>
               
               
               
                ))}
              </tbody>

             </Table>
             </>
            
            ) : (
              <div className="text-center my-3">No results found</div>
            )}
          
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" disabled={!selectedMember }onClick={() => onSelectMember(selectedMember)}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SearchMemberModal;
