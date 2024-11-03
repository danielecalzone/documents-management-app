import { DocumentModal } from '../../components/DocumentModal';
import { mockDocument, mockDocuments } from '../mocks/mockDocuments';
import { Document } from '../../models/Document';

describe('DocumentModal', () => {
  let documentModal: DocumentModal;

  beforeEach(() => {
    documentModal = new DocumentModal();
    documentModal.show();
  });

  afterEach(() => {
    documentModal.hide();
    documentModal.getModalElement().remove();
  });

  it('should create a document and call onCreateDocument with correct data', () => {
    const createDocumentSpy = jest.spyOn(documentModal, 'onCreateDocument');
    const title = mockDocument.Title;
    const contributors = 'John Doe, Jane Smith';
    const attachments = mockDocument.Attachments.join(', ');

    (document.getElementById('document-title') as HTMLInputElement).value =
      title;
    (document.getElementById('contributors') as HTMLInputElement).value =
      contributors;
    (document.getElementById('attachments') as HTMLInputElement).value =
      attachments;

    const form = documentModal.getForm();
    form.dispatchEvent(new Event('submit'));

    expect(createDocumentSpy).toHaveBeenCalled();

    const createdDocument = createDocumentSpy.mock.calls[0][0] as Document;
    expect(createdDocument.Title).toBe(title);
    expect(createdDocument.Contributors).toHaveLength(2);
    expect(createdDocument.Contributors[0].Name).toBe('John Doe');
    expect(createdDocument.Contributors[1].Name).toBe('Jane Smith');
    expect(createdDocument.Attachments).toEqual(mockDocument.Attachments);
    expect(createdDocument.Version).toBe(mockDocuments[1].Version);

    createDocumentSpy.mockRestore();
  });

  it('should show and hide the modal correctly', () => {
    const modalElement = documentModal.getModalElement();
    expect(modalElement).toBeTruthy();
    expect(modalElement.classList.contains('hidden')).toBe(false);

    documentModal.hide();
    expect(modalElement.classList.contains('hidden')).toBe(true);

    documentModal.show();
    expect(modalElement.classList.contains('hidden')).toBe(false);
  });

  it('should close the modal when the close button is clicked', () => {
    const closeButton = document.getElementById('close-modal');
    closeButton?.dispatchEvent(new Event('click'));

    const modalElement = documentModal.getModalElement();
    expect(modalElement.classList.contains('hidden')).toBe(true);
  });

  it('should close the modal when clicking outside of it', () => {
    documentModal.hide();
    const modalElement = documentModal.getModalElement();

    document.body.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        clientX: 0,
        clientY: 0,
      })
    );

    expect(modalElement.classList.contains('hidden')).toBe(true);
  });

  it('should show a notification when a document is created', () => {
    const notificationContainer = document.createElement('div');
    notificationContainer.classList.add('notification-container');
    document.body.appendChild(notificationContainer);

    (document.getElementById('document-title') as HTMLInputElement).value =
      mockDocument.Title;
    (document.getElementById('contributors') as HTMLInputElement).value =
      'John Doe';
    (document.getElementById('attachments') as HTMLInputElement).value =
      mockDocument.Attachments.join(', ');
    const form = documentModal.getForm();
    form.dispatchEvent(new Event('submit'));

    const notification = document.querySelector('.notification-banner');
    expect(notification).toBeTruthy();
    expect(notification?.textContent).toContain(
      'Document created successfully!'
    );

    notification?.remove();
  });
});
