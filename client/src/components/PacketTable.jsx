import React from 'react';

function PacketTable({ packets }) {
  if (packets.length < 1) {
    return (
        <>
      <div className="col-auto p-0 m-0">
        <span className="material-symbols-outlined" style={{ fontSize: '2.5rem' }}>
          info
        </span>
      </div>
      <div className="col">
        <h6>No Items Pending</h6>
        <span>There are currently no pending items.</span>
      </div>
      </>
    );
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col" style={{ width: '25%' }}>
            Recipient
          </th>
          <th scope="col" style={{ width: '25%' }}>
            Type
          </th>
          <th scope="col" style={{ width: '25%' }}>
            Status
          </th>
          <th scope="col" style={{ width: '25%' }}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {packets.map((packet) => (
          <tr key={packet.packetId}>
            <td>{packet.assignee}</td>
           
           <td>{packet.type}</td>
            <td>
              <button
                type="button"
                className="btn btn-secondary rounded-0 me-2"
             
              >
                View
              </button>
              <button type="button" className="btn btn-secondary rounded-0" disabled>
                Reassign
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PacketTable;
