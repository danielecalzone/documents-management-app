import { DocumentList } from '../../components/DocumentList';
import { mockDocuments } from '../mocks/mockDocuments';
import { Document } from '../../models/Document';

describe('DocumentList Integration with DocumentItem', () => {
  let container: HTMLElement;
  let documentList: DocumentList;

  beforeEach(() => {
    container = document.createElement('div');
    documentList = new DocumentList(container);

    documentList.updateDocuments(mockDocuments);
  });

  test('renders documents correctly in list view', () => {
    documentList.render();

    mockDocuments.forEach((doc) => {
      expect(container.innerHTML).toContain(doc.Title);
    });
  });

  test('renders contributors for each document', () => {
    documentList.render();

    mockDocuments.forEach((doc) => {
      doc.Contributors.forEach((contributor) => {
        expect(container.innerHTML).toContain(contributor.Name);
      });
    });
  });

  test('renders attachments for each document', () => {
    documentList.render();
    mockDocuments.forEach((doc) => {
      doc.Attachments.forEach((attachment) => {
        expect(container.innerHTML).toContain(attachment);
      });
    });
  });

  test('updates documents correctly', () => {
    const newDocument: Document = {
      ID: '3',
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      Title: 'Test Document 3',
      Attachments: ['attachment4.docx'],
      Contributors: [{ ID: '4', Name: 'Bob Brown' }],
      Version: '1.2.0',
    };

    documentList.addDocument(newDocument);
    documentList.render();

    expect(container.innerHTML).toContain(newDocument.Title);
    expect(container.innerHTML).toContain(newDocument.Attachments[0]);
    expect(container.innerHTML).toContain(newDocument.Contributors[0].Name);
  });
});
