export type Activity = {
  JoinDate: string;
  NumberOfMentions: number;
  ActivityGroups: ActivityGroup[];
  PrivacySetting: boolean;
};

export type ActivityGroup = {
  MemberId: string;
  Name: string;
  NumberOfComments: number;
  NumberOfLikes: number;
  NumberOfPosts: number;
};
