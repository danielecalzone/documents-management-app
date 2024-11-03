import { DocumentList } from '../../components/DocumentList';
import { DocumentModal } from '../../components/DocumentModal';
import { mockDocuments } from '../mocks/mockDocuments';
import { Document } from '../../models/Document';

describe('Document Modal Integration with Document List', () => {
  let documentList: DocumentList;
  let documentModal: DocumentModal;
  const container = document.createElement('div');
  let mockOnCreateDocument: jest.Mock;

  beforeEach(() => {
    documentList = new DocumentList(container);
    documentList.updateDocuments(mockDocuments);
    documentList.render();
    document.body.appendChild(container);

    mockOnCreateDocument = jest.fn((newDocument: Document) => {
      documentList.addDocument(newDocument);
    });

    documentModal = new DocumentModal();
    documentModal.onCreateDocument = mockOnCreateDocument;
    documentModal.show();
    document.body.appendChild(documentModal.getModalElement());
  });

  it('should update DocumentList when a new document is created', () => {
    const title = 'New Document';
    const contributors = 'John Doe';
    const attachments = 'file1.pdf,file2.pdf';

    const titleInput = documentModal
      .getForm()
      .elements.namedItem('document-title') as HTMLInputElement;
    const contributorsInput = documentModal
      .getForm()
      .elements.namedItem('contributors') as HTMLInputElement;
    const attachmentsInput = documentModal
      .getForm()
      .elements.namedItem('attachments') as HTMLInputElement;

    titleInput.value = title;
    contributorsInput.value = contributors;
    attachmentsInput.value = attachments;

    const event = new Event('submit', { bubbles: true });
    documentModal.getForm().dispatchEvent(event);

    expect(mockOnCreateDocument).toHaveBeenCalled();

    expect(mockOnCreateDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        Title: title,
        Contributors: expect.arrayContaining([
          expect.objectContaining({ Name: 'John Doe' }),
        ]),
        Attachments: ['file1.pdf', 'file2.pdf'],
      })
    );

    const renderedDocuments = container.querySelectorAll('.document-item');
    expect(renderedDocuments.length).toBe(mockDocuments.length + 1);
  });
});
