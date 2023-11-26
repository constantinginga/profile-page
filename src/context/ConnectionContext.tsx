import { FC, ReactNode, createContext, useState, useEffect } from 'react';
import { Connection, ConnectionWithProfile } from '../types/connection';
import { toast } from 'react-hot-toast';

type ConnectionContextType = {
  connections: ConnectionWithProfile[];
  requests: ConnectionWithProfile[];
  setConnections: (connections: ConnectionWithProfile[]) => void;
  setRequests: (requests: ConnectionWithProfile[]) => void;
  acceptRequest: (req: ConnectionWithProfile) => void;
  declineRequest: (req: Connection) => void;
};

type ConnectionProviderProps = {
  children: ReactNode;
};

export const ConnectionContext = createContext<ConnectionContextType>({
  connections: [],
  requests: [],
  setConnections: () => {},
  setRequests: () => {},
  acceptRequest: () => {},
  declineRequest: () => {},
});

export const ConnectionProvider: FC<ConnectionProviderProps> = ({
  children,
}) => {
  const [connections, setConnections] = useState<ConnectionWithProfile[]>([]);
  const [requests, setRequests] = useState<ConnectionWithProfile[]>([]);

  const params = new URLSearchParams(window.location.search);
  const memberId = params.get('memberId');
  const token = params.get('token');

  useEffect(() => {
    if (!memberId || !token) return;

    fetchConnections();
    fetchRequests();
  }, [memberId, token]);

  async function fetchConnections() {
    const response = await fetch(
      `https://localhost:7297/Profiles/GetConnections?memberId=${memberId}&token=${token}`
    );
    const data = await response.json();

    const fetchedConnections = data as Connection[];

    const connections: ConnectionWithProfile[] = [];

    for (const connection of fetchedConnections) {
      const profileResponse = await fetch(
        `https://localhost:7297/Profiles/GetExternalProfile?memberIdToView=${connection.MemberId}`
      );

      const profileData = await profileResponse.json();

      const connectionWithProfile: ConnectionWithProfile = {
        connection,
        Name: profileData.member.Name,
        Image: profileData.member.Image,
      };

      connections.push(connectionWithProfile);
    }

    setConnections(connections);
  }

  async function fetchRequests() {
    const response = await fetch(
      `https://localhost:7297/Profiles/GetConnectionRequests?memberId=${memberId}&token=${token}`
    );
    const data = await response.json();

    const fetchedConnections = data as Connection[];

    const connections: ConnectionWithProfile[] = [];
    for (const connection of fetchedConnections) {
      const profileResponse = await fetch(
        `https://localhost:7297/Profiles/GetExternalProfile?memberIdToView=${connection.MemberId}`
      );

      const profileData = await profileResponse.json();

      const connectionWithProfile: ConnectionWithProfile = {
        connection,
        Name: profileData.member.Name,
        Image: profileData.member.Image,
      };

      connections.push(connectionWithProfile);
    }

    setRequests(connections);
  }

  const acceptRequest = async (req: ConnectionWithProfile) => {
    const response = await fetch(
      `https://localhost:7297/Profiles/ApproveConnection?memberId=${memberId}&token=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...req.connection,
          Status: true,
        }),
      }
    );
    const data = await response.json();

    if (data.StatusCode === 200) {
      setRequests((prev) =>
        prev.filter(
          (request) =>
            request.connection.ConnectedId !== req.connection.ConnectedId
        )
      );

      setConnections((prev) => [
        ...prev,
        {
          connection: req.connection,
          Name: req.Name,
          Image: req.Image,
        },
      ]);
    } else {
      toast.error('Something went wrong.');
    }
  };

  const declineRequest = async (req: Connection) => {
    const response = await fetch(
      `https://localhost:7297/Profiles/RemoveConnection?memberId=${memberId}&token=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      }
    );
    const data = await response.json();

    if (data.StatusCode === 200) {
      setRequests((prev) =>
        prev.filter(
          (request) => request.connection.ConnectedId !== req.ConnectedId
        )
      );

      setConnections((prev) =>
        prev.filter(
          (connection) => connection.connection.ConnectedId !== req.ConnectedId
        )
      );
    } else {
      toast.error('Something went wrong.');
    }
  };

  return (
    <ConnectionContext.Provider
      value={{
        connections,
        requests,
        setConnections,
        setRequests,
        acceptRequest,
        declineRequest,
      }}>
      {children}
    </ConnectionContext.Provider>
  );
};
