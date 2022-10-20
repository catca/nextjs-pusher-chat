export type Members = {
  members: any;
  count: number;
  myID: any;
  me: any;
  get: (id: string) => any;
  each: (callback: Function) => void;
  setMyID: (id: string) => void;
  onSubscription: (subscriptionData: any) => void;
  addMember: (memberData: any) => any;
  removeMember: (memberData: any) => any;
  reset: () => void;
};

export type Member = {
  id: string;
  info: {
    username: string;
  };
};

export type MessageData = {
  message: string;
  username: string;
};
