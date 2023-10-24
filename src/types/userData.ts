export type UserData = {
  MemberId: number;
  UpdatedDt: string | null;
  Name: string | null;
  Image: string | null;
  Email: string;
  DescriptionSection: DescriptionSection;
  ContactsSection: ContactsSection;
  ServicesSection: ServicesSection;
  WorkExperienceSection: WorkExperienceSection;
  ExternalLinksSection: ExternalLinksSection;
};

type DescriptionSection = {
  Content: string;
  PrivacySetting: boolean;
};

type ServicesSection = object & DescriptionSection;

type ContactsSection = {
  MemberId: number;
  Email: string;
  PhoneNumber: string;
  PrivacySetting: boolean;
};

type WorkExperienceSection = {
  MemberId: number;
  PrivacySetting: boolean;
  WorkExperiences: WorkExperience[];
};

export type WorkExperience = {
  WorkExperienceId: string;
  MemberId: number;
  StartDate: string;
  EndDate: string | null;
  CompanyName: string;
  Position: string;
  PositionDescription: string;
};

type ExternalLinksSection = {
  MemberId: number;
  PrivacySetting: boolean;
  ExternalLinks: ExternalLink[];
};

export type ExternalLink = {
  ExternalLinkId: string;
  MemberId: number;
  Title: string;
  Url: string;
};
