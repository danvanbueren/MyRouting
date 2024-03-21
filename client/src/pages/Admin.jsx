import { useState, useEffect } from "react";
import USAFLogo from "../assets/img/USAF_LOGO.svg";
import USSFLogo from "../assets/img/USSF_LOGO.png";
import UserLogo from "../assets/img/USER.svg";
import axios from "axios";
import SearchMemberModal from "../components/SearchMemberModal";
import RoutingModal from "../components/RoutingModal";
import PacketTable from "../components/PacketTable";
import ToastMessage from "../components/ToastMessage";
import {useUser} from '../context/UserContext';
function Admin() {
  const [user, setUser] = useState({ firstName: "", lastName: "", rank: "" });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isRoutingModalOpen, setIsRoutingModalOpen] = useState(false);
  const [awaitingReview, setAwaitingReview] = useState([]);
  const [awaitingSignature, setAwaitingSignature] = useState([]);
  const [submittedAFPC, setSubmittedAFPC] = useState([]);
  const [recentlyCompleted, setRecentlyCompleted] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [error, setError] = useState(null);
  const [refreshPackets, setRefreshPackets] = useState(false);
  const [displayToast, setDisplayToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    message: "",
    color: "primary",
  });

  const { selectedUser } = useUser();


  // Function to be passed to the modal
  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setIsSearchModalOpen(false);
    setIsRoutingModalOpen(true);
  };

 const filterPackets = (packets) => {
    const awaitingReview = packets.filter(
      (packet) =>
        (packet.phases[packet.currentPhase].phase.toLowerCase() === "review" ||
          packet.phases[packet.currentPhase].phase.toLowerCase() ===
            "concur") &&
        packet.phases[packet.currentPhase].assignee !==
          "1c40ad46-e5f7-11ee-b57a-e39ea2c18650"
    );
    const awaitingSignature = packets.filter(
      (packet) =>
        packet.phases && packet.phases[packet.currentPhase]?.phase.toLowerCase() ===
          "signature" &&
        packet.phases && packet.phases[packet.currentPhase]?.assignee !==
          "1c40ad46-e5f7-11ee-b57a-e39ea2c18650"
    );
    const submittedAFPC = packets.filter(
      (packet) =>
        packet.phases && packet.phases[packet.currentPhase]?.phase.toLowerCase() === "afpc" ||
        packet.phases && packet.phases[packet.currentPhase]?.assignee ===
          "1c40ad46-e5f7-11ee-b57a-e39ea2c18650"
    );
    const recentlyCompleted = packets.filter(
      (packet) =>
        packet.phases[packet.currentPhase].phase.toLowerCase() === "complete"
    );

    setAwaitingReview(awaitingReview);
    setAwaitingSignature(awaitingSignature);
    setSubmittedAFPC(submittedAFPC);
    setRecentlyCompleted(recentlyCompleted);
  };

   
  useEffect(() => {
    document.title = "Demo myRouting Admin";

  const getUser = async () => {
    if (selectedUser) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/users/${selectedUser}`);
        setUser(response.data);
      } catch (error) {
        console.error("Get user failed:", error);
      }
    }
  };

  const getPackets = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/api/packets`
      );
      filterPackets(response.data);
    } catch (error) {
      console.error("Get packets failed:", error);
      setError("Failed to get packets data.");
    }
  };
  getUser();
  getPackets();
},  [selectedUser]);

  return (
    <>
      <div className="container-fluid p-0" style={{ width: "79%" }}>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
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
            Pending Review
            <span className="material-symbols-outlined ps-2 align-text-center">
              help
            </span>
          </h3>
          <div className="border p-3 row" id="element_table_pending">
            <PacketTable
              packets={awaitingReview}
              sectionName={"PendingAction"}
              user={user}
            />
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
            <PacketTable
              packets={awaitingSignature}
              sectionName={"awaitingSignature"}
              user={user}
            />
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
            <PacketTable
              packets={submittedAFPC}
              sectionName={"submittedAFPC"}
              user={user}
            />
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
            <PacketTable
              packets={recentlyCompleted}
              sectionName={"recentlyCompleted"}
              user={user}
            />
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
          user={selectedMember}
          setToastMessage={setToastMessage}
          setDisplayToast={setDisplayToast}
          refreshPackets={() =>
            setRefreshPackets((currentRefreshPackets) => !currentRefreshPackets)
          }
        />
        {displayToast && toastMessage.message && (
          <ToastMessage
            toastMessage={toastMessage}
            closeToast={() => {
              setDisplayToast(false);
              setToastMessage({ message: "", color: "primary" });
            }}
            setDisplayToast={setDisplayToast}
            setToastMessage={(message, color) =>
              setToastMessage({ message, color })
            }
            displayToast={displayToast}
          />
        )}
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
