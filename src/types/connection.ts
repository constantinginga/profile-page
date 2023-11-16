export type Connection = {
  ConnectionId?: number;
  MemberId: number;
  ConnectedId: number;
  Status?: boolean;
};

export type ConnectionWithProfile = {
  connection: Connection;
  Name: string;
  Image: string;
};
