export type Activity = {
  JoinDate: string;
  NumberOfMentions: number;
  ActivityGroups: ActivityGroup[];
};

export type ActivityGroup = {
  MemberId: string;
  Name: string;
  NumberOfComments: number;
  NumberOfLikes: number;
  NumberOfPosts: number;
};
