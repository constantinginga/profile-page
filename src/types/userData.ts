export type UserData = {
  MemberId: number;
  UpdatedDt: string | null;
  Name: string | null;
  Image: string | null;
  Banner: string | null;
  Email: string;
  Json: string;
  DescriptionSection: DescriptionSection;
  ContactsSection: ContactsSection;
  ServicesSection: ServicesSection;
  WorkExperienceSection: TWorkExperienceSection;
  ExternalLinksSection: TExternalLinksSection;
  ActivitySection: ActivitySection;
};

export type UserJson = {
  IsApproved: boolean;
  Alias: string;
  Avatar: string;
  IsAdmin: true;
};

export type ActivitySection = {
  MemberId: number;
  PrivacySetting: boolean;
};

export type DescriptionSection = {
  Content: string;
  PrivacySetting: boolean;
};

export type ServicesSection = object & DescriptionSection;

export type ContactsSection = {
  MemberId: number;
  Email: string;
  PhoneNumber: string;
  PrivacySetting: boolean;
};

export type TWorkExperienceSection = {
  MemberId: number;
  PrivacySetting: boolean;
  WorkExperiences: WorkExperience[];
};

export type WorkExperience = {
  WorkExperienceId?: number;
  MemberId: number;
  StartDate: string;
  EndDate: string | null;
  CompanyName: string;
  Position: string;
  PositionDescription: string;
};

export type TExternalLinksSection = {
  MemberId: number;
  PrivacySetting: boolean;
  ExternalLinks: ExternalLink[];
};

export type ExternalLink = {
  ExternalLinkId?: number;
  MemberId: number;
  Title: string;
  Url: string;
};

export type MinimalUserData = {
  Id: number;
  Name: string | null;
  isFreeUser: boolean;
};
