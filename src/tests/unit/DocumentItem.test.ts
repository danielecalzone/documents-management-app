import { DocumentItem } from '../../components/DocumentItem';
import { mockDocument } from '../mocks/mockDocuments';
import { formatRelativeDate } from '../../utils/formatDate';

describe('DocumentItem', () => {
  it('should render the document item correctly', () => {
    const documentItem = new DocumentItem(mockDocument);
    const renderedElement = documentItem.render();

    expect(renderedElement.tagName).toBe('DIV');
    expect(renderedElement.className).toBe('document-item');
    expect(renderedElement.innerHTML).toContain('Test Document 1');
    expect(renderedElement.innerHTML).toContain('Version: 2.0.0');

    expect(renderedElement.innerHTML).toContain('Creation Date:');
    expect(renderedElement.innerHTML).toContain(
      formatRelativeDate(mockDocument.CreatedAt)
    );
    const contributors = renderedElement.querySelectorAll('.contributors div');
    expect(contributors.length).toBe(2);
    expect(contributors[0].textContent).toBe('John Doe');
    expect(contributors[1].textContent).toBe('Jane Smith');

    const attachments = renderedElement.querySelectorAll('.attachments div');
    expect(attachments.length).toBe(2);
    expect(attachments[0].textContent).toBe('attachment1.pdf');
    expect(attachments[1].textContent).toBe('attachment2.png');
  });

  it('should render the document item grid correctly', () => {
    const documentItem = new DocumentItem(mockDocument);
    const renderedElement = documentItem.renderGrid();

    expect(renderedElement.tagName).toBe('DIV');
    expect(renderedElement.className).toBe('document-item-grid');
    expect(renderedElement.innerHTML).toContain('Test Document 1');
    expect(renderedElement.innerHTML).toContain('Version: 2.0.0');

    expect(renderedElement.innerHTML).toContain('Creation Date:');
    expect(renderedElement.innerHTML).toContain(
      formatRelativeDate(mockDocument.CreatedAt)
    );

    const contributors = renderedElement.querySelectorAll('.contributors div');
    expect(contributors.length).toBe(2);
    expect(contributors[0].textContent).toBe('John Doe');
    expect(contributors[1].textContent).toBe('Jane Smith');

    const attachments = renderedElement.querySelectorAll('.attachments div');
    expect(attachments.length).toBe(2);
    expect(attachments[0].textContent).toBe('attachment1.pdf');
    expect(attachments[1].textContent).toBe('attachment2.png');
  });
});
