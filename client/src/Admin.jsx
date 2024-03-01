import { useState, useEffect } from "react";
import USAFLogo from "./assets/img/USAF_LOGO.svg";
import USSFLogo from "./assets/img/USSF_LOGO.png";
import UserLogo from "./assets/img/USER.svg";
import axios from "axios";
import SearchMemberModal from "./components/SearchMemberModal";
import RoutingModal from "./components/RoutingModal";
function Admin() {
  const [user, setUser] = useState({ firstName: "", lastName: "", rank: "" });

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isRoutingModalOpen, setIsRoutingModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Function to be passed to the modal
  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setIsSearchModalOpen(false); // Optionally close the modal upon selection
    setIsRoutingModalOpen(true);
    console.log("Selected Member:", member); // For demonstration, you can remove this line


  };
  const handleOpenModal = () => {
    setIsSearchModalOpen(true);
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
            <span>Loading...</span>
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
            <span>Loading...</span>
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
            <span>Loading...</span>
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
            <span>Loading...</span>
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

        <RoutingModal isOpen={isRoutingModalOpen}  closeModal={() => setIsRoutingModalOpen(false)}/>

        <div
          className="modal fade"
          id="add-routing-page2-modal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="modal-title-7">
                  Add Packet
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  <h5>Routing Settings</h5>
                  <p>Select the appropriate options to route your document.</p>

                  <h6>Select Type</h6>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      name="rg2"
                      id="r1d"
                    />
                    <label className="form-check-label" htmlFor="r1d">
                      Memo for Record
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      name="rg2"
                      id="r1c"
                    />
                    <label className="form-check-label" htmlFor="r1c">
                      DEROS Extension
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      name="rg2"
                      id="r1b"
                    />
                    <label className="form-check-label" htmlFor="r1b">
                      Command Sponsorship
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      name="rg2"
                      id="r1a"
                    />
                    <label className="form-check-label" htmlFor="r1a">
                      Training Report
                    </label>
                  </div>

                  <div className="input-group">
                    <div className="input-group-text rounded-start-circle">
                      <input
                        type="radio"
                        className="form-check-input mt-0"
                        name="rg2"
                        value=""
                        aria-label="Radio button for following input"
                      />
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Other"
                      aria-label="Input with radio button"
                    />
                  </div>

                  <div className="border-bottom my-3"></div>

                  <h6>Choose Recipient</h6>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      name="rg3"
                      id="r2a"
                    />
                    <label className="form-check-label" htmlFor="r2a">
                      Rater
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      name="rg3"
                      id="r2b"
                    />
                    <label className="form-check-label" htmlFor="r2b">
                      CSS
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      name="rg3"
                      id="r2c"
                    />
                    <label className="form-check-label" htmlFor="r2c">
                      Commander
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      name="rg3"
                      id="r2d"
                    />
                    <label className="form-check-label" htmlFor="r2d">
                      MPF
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value=""
                      name="rg3"
                      id="r2e"
                    />
                    <label className="form-check-label" htmlFor="r2e">
                      AFPC
                    </label>
                  </div>
                  <div className="input-group">
                    <div className="input-group-text rounded-start-circle">
                      <input
                        type="radio"
                        className="form-check-input mt-0"
                        name="rg3"
                        value=""
                        aria-label="Radio button for following input"
                      />
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Other"
                      aria-label="Input with radio button"
                    />
                  </div>

                  <div className="border-bottom my-3"></div>

                  <h6>Summary of Request</h6>

                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Summary"
                      id="example-textarea-2"
                      style={{ height: "80px" }}
                    ></textarea>
                    <label htmlFor="example-textarea-2">Summary</label>
                  </div>

                  <div className="border-bottom my-3"></div>

                  <h6>Add Documents</h6>

                  <div>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        id="example-file-input-1"
                        aria-label="Attach resume"
                      />
                      <label
                        className="input-group-text"
                        htmlFor="example-file-input-1"
                      >
                        Upload
                      </label>
                    </div>
                    <div className="form-text">
                      Include primary and supporting documents in your packet.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary ms-auto float-end"
                  >
                    Submit Packet
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

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
