import React, { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import SearchMemberModal from "./SearchMemberModal";

const MemberSelector = ({ onSelectMember, selectedMember }) => {
  const [showSearchMemberModal, setShowSearchMemberModal] = useState(false);

  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text>Member</InputGroup.Text>
        <FormControl
          readOnly
          placeholder="Click to select member"
          value={
            selectedMember
              ? `${selectedMember.rank} ${selectedMember.firstName} ${selectedMember.lastName}`
              : ""
          }
          onClick={() => setShowSearchMemberModal(true)}
        />
      </InputGroup>
      <SearchMemberModal
        isOpen={showSearchMemberModal}
        closeModal={() => setShowSearchMemberModal(false)}
        onSelectMember={onSelectMember}
      />
    </>
  );
};

export default MemberSelector;
