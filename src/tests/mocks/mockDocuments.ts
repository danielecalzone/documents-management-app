import { Document } from '../../models/Document';

export const mockDocument: Document = {
  ID: '1',
  CreatedAt: new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toISOString(),
  UpdatedAt: new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toISOString(),
  Title: 'Test Document 1',
  Attachments: ['attachment1.pdf', 'attachment2.png'],
  Contributors: [
    { ID: '1', Name: 'John Doe' },
    { ID: '2', Name: 'Jane Smith' },
  ],
  Version: '2.0.0',
};

export const mockDocuments: Document[] = [
  mockDocument,
  {
    ID: '2',
    CreatedAt: new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
    Title: 'Test Document 2',
    Attachments: ['attachment3.docx'],
    Contributors: [{ ID: '3', Name: 'Alice Johnson' }],
    Version: '1.0.0',
  },
];
