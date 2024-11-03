import { DocumentList } from '../../components/DocumentList';
import { fetchDocuments } from '../../services/api';
import { mockDocuments } from '../mocks/mockDocuments';

jest.mock('../../services/api', () => ({
  fetchDocuments: jest.fn(),
}));

describe('API Integration with DocumentList', () => {
  let documentList: DocumentList;
  const container = document.createElement('div');

  beforeEach(() => {
    documentList = new DocumentList(container);
    document.body.appendChild(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
    container.innerHTML = '';
  });

  it('should fetch documents from the API and render them in the DocumentList', async () => {
    (fetchDocuments as jest.Mock).mockResolvedValueOnce(mockDocuments);

    documentList.updateDocuments(mockDocuments);

    const renderedDocuments = container.children;

    mockDocuments.forEach((doc, index) => {
      const item = renderedDocuments[index];
      expect(item.textContent).toContain(doc.Title);

      const attachmentsElement = item.querySelector('.attachments');
      expect((attachmentsElement as HTMLElement).textContent).toContain(
        doc.Attachments.join('')
      );

      doc.Contributors.forEach((contributor) => {
        expect(item.textContent).toContain(contributor.Name);
      });
    });
  });

  it('should handle API errors gracefully', async () => {
    documentList.updateDocuments([]);

    expect(container.innerHTML).toBe('');

    documentList.render();
  });
});
