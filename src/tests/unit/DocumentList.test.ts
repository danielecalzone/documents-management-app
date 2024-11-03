import { DocumentList } from '../../components/DocumentList';
import { mockDocuments } from '../mocks/mockDocuments';

describe('DocumentList Unit Tests', () => {
  let container: HTMLElement;
  let documentList: DocumentList;

  beforeEach(() => {
    container = document.createElement('div');
    documentList = new DocumentList(container);
  });

  test('should render list view correctly', () => {
    documentList.updateDocuments(mockDocuments);
    documentList.toggleListView();
    documentList.render();

    expect(container.innerHTML).toContain('Test Document 1');
    expect(container.innerHTML).toContain('Test Document 2');
  });

  test('should render grid view correctly', () => {
    documentList.updateDocuments(mockDocuments);
    documentList.toggleGridView();
    documentList.render();

    expect(container.querySelectorAll('.grid-row').length).toBe(1);
  });

  test('should sort documents by name', () => {
    documentList.updateDocuments(mockDocuments);
    documentList.sortDocuments('name');

    const documentTitles = Array.from(
      container.querySelectorAll('.document-name')
    ).map((element) => element.childNodes[0].textContent?.trim() || '');

    expect(documentTitles).toEqual(['Test Document 1', 'Test Document 2']);
  });

  test('should sort documents by version', () => {
    documentList.updateDocuments(mockDocuments);
    documentList.sortDocuments('version');

    const documentTitles = Array.from(
      container.querySelectorAll('.document-name')
    ).map((element) => element.childNodes[0].textContent?.trim() || '');

    expect(documentTitles).toEqual(['Test Document 2', 'Test Document 1']);
  });

  test('should sort documents by creation date', () => {
    documentList.updateDocuments(mockDocuments);
    documentList.sortDocuments('date');

    const documentTitles = Array.from(
      container.querySelectorAll('.document-name')
    ).map((element) => element.childNodes[0].textContent?.trim() || '');

    expect(documentTitles).toEqual(['Test Document 2', 'Test Document 1']);
  });
});
