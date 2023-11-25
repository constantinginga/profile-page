import { useState, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import ConnectionCard from '../sections/connections/connection-card';
import { ConnectionContext } from '../context/ConnectionContext';
import FindConnections from '../sections/connections/find-connections';

type Tab = 'connections' | 'requests' | 'find-connections';

const Connections = () => {
  const { connections, requests } = useContext(ConnectionContext);
  const [isRequestsTab, setIsRequestsTab] = useState<Tab>('connections');

  return (
    <div className="flex flex-col max-w-4xl mx-auto my-12 gap-2">
      <div className="flex flex-col gap-6 w-fit">
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box gap-2 w-fit">
          <li onClick={() => setIsRequestsTab('connections')}>
            <a className={`${isRequestsTab === 'connections' ? 'active' : ''}`}>
              Connections
            </a>
          </li>
          <li onClick={() => setIsRequestsTab('requests')}>
            <a className={`${isRequestsTab === 'requests' ? 'active' : ''}`}>
              Requests
            </a>
          </li>
          <li onClick={() => setIsRequestsTab('find-connections')}>
            <a
              className={`${
                isRequestsTab === 'find-connections' ? 'active' : ''
              }`}>
              Find Connections
            </a>
          </li>
        </ul>
        <div className="flex gap-4">
          {isRequestsTab === 'connections' ? (
            connections.map((connection, i) => (
              <ConnectionCard request={connection} isRequest={false} key={i} />
            ))
          ) : isRequestsTab === 'requests' ? (
            requests.map((request, i) => (
              <ConnectionCard request={request} isRequest={true} key={i} />
            ))
          ) : (
            <FindConnections />
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Connections;
