import { useState, useEffect } from "react";
import USAFLogo from "../assets/img/USAF_LOGO.svg";
import USSFLogo from "../assets/img/USSF_LOGO.png";
import UserLogo from "../assets/img/USER.svg";
import axios from "axios";
import SearchMemberModal from "../components/SearchMemberModal";
import RoutingModal from "../components/RoutingModal";
import PacketTable from "../components/PacketTable";

function Admin() {
  const [user, setUser] = useState({ firstName: "", lastName: "", rank: "" });
  const [packets, setPackets] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isRoutingModalOpen, setIsRoutingModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Function to be passed to the modal
  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setIsSearchModalOpen(false);
    setIsRoutingModalOpen(true);
  };

  useEffect(() => {
    document.title = "Demo myRouting Admin";

    const getUser = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API
          }/api/users/1de77550-d6f0-11ee-abc6-5c60baeb08ab`
        );
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Get user failed:", error);
      }
    };

    getUser();

    const getPackets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/api/packets`
        );
        setPackets(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Get user failed:", error);
      }
    };
    getPackets();
  }, []);

  return (
    <>
      <div className="container-fluid p-0" style={{ width: "79%" }}>
        <div className="w-100 border-bottom">
          <div className="d-flex justify-content-between align-items-end">
            <h3 className="pb-2">myRouting Admin Dashboard</h3>
            <div className="align-text-bottom">
              <button
                type="button"
                className="btn btn-secondary rounded-0 me-2 mb-2"
                data-bs-toggle="modal"
                data-bs-target="#add-routing-modal"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <span className="material-symbols-outlined align-text-bottom fs-5 pe-1">
                  add
                </span>
                <span className="align-text-center">Add Packet</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary rounded-0 mb-2"
              >
                <span className="material-symbols-outlined align-text-bottom fs-5 pe-1">
                  output_circle
                </span>
                <span className="align-text-center">Admin Report</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 d-flex align-items-center">
          <img
            src={UserLogo}
            alt="Logo"
            height="80rem"
            className="d-inline-block align-text-top"
          />
          <h6 className="d-inline-block align-text-top ps-3">
            Welcome, {user.rank} {user.firstName} {user.lastName}
          </h6>
        </div>

        <div className="w-100 pt-3">
          <h3 className="pb-2">
            Pending Action
            <span className="material-symbols-outlined ps-2 align-text-center">
              help
            </span>
          </h3>
          <div className="border p-3 row" id="element_table_pending">
            <PacketTable packets={packets} sectionName={"PendingAction"} />
          </div>
        </div>
        <div className="w-100 pt-3">
          <h3 className="pb-2">
            Awaiting Signature
            <span className="material-symbols-outlined ps-2 align-text-center">
              help
            </span>
          </h3>
          <div className="border p-3 row" id="element_table_signature">
            <PacketTable packets={packets} sectionName={"awaitingSignature"} />
          </div>
        </div>

        <div className="w-100 pt-3">
          <h3 className="pb-2">
            Submitted to AFPC
            <span className="material-symbols-outlined ps-2 align-text-center">
              help
            </span>
          </h3>
          <div className="border p-3 row" id="element_table_afpc">
            <PacketTable packets={packets} sectionName={"submittedAFPC"} />
          </div>
        </div>

        <div className="w-100 pt-3">
          <h3 className="pb-2">
            Recently Completed
            <span className="material-symbols-outlined ps-2 align-text-center">
              help
            </span>
          </h3>
          <div className="border p-3 row" id="element_table_completed">
            <PacketTable packets={packets} sectionName={"recentlyCompleted"} />
          </div>
        </div>

        <div
          className="w-100 pt-3 border-bottom"
          style={{ height: "4rem" }}
        ></div>

        <SearchMemberModal
          isOpen={isSearchModalOpen}
          onSelectMember={handleSelectMember}
          closeModal={() => setIsSearchModalOpen(false)}
        />

        <RoutingModal
          isOpen={isRoutingModalOpen}
          closeModal={() => setIsRoutingModalOpen(false)}
        />

        <div
          className="modal fade"
          id="view-packet-modal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div className="modal-content" id="view-packet-modal-content">
              Loading...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
