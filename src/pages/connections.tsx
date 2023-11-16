import { useState, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import ConnectionCard from '../sections/connections/connection-card';
import { ConnectionContext } from '../context/ConnectionContext';

const Connections = () => {
  const { connections, requests } = useContext(ConnectionContext);
  const [isRequestsTab, setIsRequestsTab] = useState(false);

  return (
    <div className="flex flex-col max-w-4xl mx-auto my-12 gap-2">
      <div className="flex flex-col gap-6 w-fit">
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box gap-2">
          <li onClick={() => setIsRequestsTab(false)}>
            <a className={`${!isRequestsTab ? 'active' : ''}`}>Connections</a>
          </li>
          <li onClick={() => setIsRequestsTab(true)}>
            <a className={`${isRequestsTab ? 'active' : ''}`}>Requests</a>
          </li>
        </ul>
        <div>
          {!isRequestsTab
            ? connections.map((connection, i) => (
                <ConnectionCard
                  request={connection}
                  isRequest={false}
                  key={i}
                />
              ))
            : requests.map((request, i) => (
                <ConnectionCard request={request} isRequest={true} key={i} />
              ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Connections;
