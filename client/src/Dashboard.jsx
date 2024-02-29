import { useState, useEffect } from 'react'
import USAFLogo from './assets/img/USAF_LOGO.svg';
import USSFLogo from './assets/img/USSF_LOGO.png';
import UserLogo from './assets/img/USER.svg';
import axios from "axios";
import RoutingModal from './RoutingModal';

function Dashboard() {
    const [user, setUser] = useState({firstName: "", lastName: "", rank: ""});
    const [packets, setPackets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };


    useEffect(() => {
        document.title = 'Demo myRouting';
        const getUser = async () => {
    
            try {
           
                const response = await axios.get(
                  `http://localhost:3000/api/users/1de77550-d6f0-11ee-abc6-5c60baeb08ab`
                );
                setUser(response.data);
            
            } catch (error) {
              console.error("Get user failed:", error);
      
            }
          };
      
          getUser();

          const getPackets = async () => {
            try {
           
                const response = await axios.get(
                  `http://localhost:3000/api/users/1de77550-d6f0-11ee-abc6-5c60baeb08ab/packets`
                );
                setPackets(response.data);
            
            } catch (error) {
              console.error("Get user failed:", error);
      
            }
          };
          getPackets()
        
    
      }, []);








  return (
    <>
    

    <div className="container-fluid p-0" style={{width: "79%"}}>
        <div className="w-100 border-bottom">
            <div className="d-flex justify-content-between align-items-end">
                <h3 className="pb-2">myRouting Dashboard</h3>
                <div className="align-text-bottom">
                    <button type="button" onClick={()=> setIsModalOpen(true) } className="btn btn-secondary rounded-0 me-2 mb-2" data-bs-toggle="modal"  data-bs-target="#add-routing-page2-modal"><span className="material-symbols-outlined align-text-bottom fs-5 pe-1">add</span><span className="align-text-center">Add Routing</span></button>
                </div>
            </div>
            
            
        </div>

        <div className="pt-4 d-flex align-items-center">
            <img src={UserLogo} alt="Logo" height="80rem" className="d-inline-block align-text-top" />
            <h6 className="d-inline-block align-text-top ps-3">Welcome, {user.rank} {user.firstName} {user.lastName}
</h6>
        </div>

        <div className="w-100 pt-3">
            <h3 className="pb-2">Ready For Action<span className="material-symbols-outlined ps-2 align-text-center">help</span></h3>
            <div className="border p-3 row">
                <div className="col-auto p-0 m-0">
                    <span className="material-symbols-outlined" style={{"fontSize": "2.5rem"}}>info</span>
                </div>
                <div className="col">


                    
                    <h6>No Items Pending</h6>
                    
                    <span>There are currently no pending items.</span>
                </div>
            </div>
        </div>

        <div className="w-100 pt-3">
            <h3 className="pb-2">In Coordination<span className="material-symbols-outlined ps-2 align-text-center">help</span></h3>
            <div className="border p-3 row">
                <div className="col-auto p-0 m-0">
                    <span className="material-symbols-outlined" style={{"fontSize": "2.5rem"}}>info</span>
                </div>
                <div className="col">
                {packets && packets.length > 0 ? (
              <>
             <table>
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
                {packets.map((packet,index) => (
            
                  <tr key={index}>
                    <td>{packet.packetId}</td>
                  
                    <td><button variant="primary" onClick={() => {setSelectedMember(member)}}>Select</button></td>
                  
                  </tr>
               
               
               
                ))}
              </tbody>

             </table>
             </>
            
            ) : (
                <>
                  <h6>No Items Pending</h6>
                    <span>There are currently no pending items.</span>
                </>
            )}
          



                  
                </div>
            </div>
        </div>

        <div className="w-100 pt-3">
            <h3 className="pb-2">Recently Completed<span className="material-symbols-outlined ps-2 align-text-center">help</span></h3>
            <div className="border p-3 row">
                <div className="col-auto p-0 m-0">
                    <span className="material-symbols-outlined" style={{"fontSize": "2.5rem"}}>info</span>
                </div>
                <div className="col">
                    <h6>No Items Pending</h6>
                    <span>There are currently no pending items.</span>
                </div>
            </div>
        </div>
    </div>

    <div className="w-100 pt-3 border-bottom" style={{height: "4rem"}}></div>

    <RoutingModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}  />

    </>
  )
}

export default Dashboard
