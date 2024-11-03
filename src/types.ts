export interface Contributor {
  ID: string;
  Name: string;
}

export interface Document {
  ID: string;
  Title: string;
  Contributors: Contributor[];
  Version: string;
  Attachments: string[];
  CreatedAt: string;
  UpdatedAt: string;
}
