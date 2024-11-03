import { Document } from '../models/Document';
import { DocumentItem } from './DocumentItem';
import '../styles/document-list.css';

export class DocumentList {
  private documents: Document[] = [];
  private isGridView: boolean = false;

  constructor(private container: HTMLElement) {}

  public render() {
    this.container.innerHTML = '';

    if (this.isGridView) {
      this.renderGridView();
    } else {
      this.renderListView();
    }
  }

  private renderListView() {
    this.documents.forEach((document) => {
      const item = new DocumentItem(document);
      this.container.appendChild(item.render());
    });
  }

  private renderGridView() {
    const rows = Math.ceil(this.documents.length / 3);
    for (let i = 0; i < rows; i++) {
      const rowContainer = document.createElement('div');
      rowContainer.className = 'grid-row';

      for (let j = 0; j < 3; j++) {
        const documentIndex = i * 3 + j;
        if (documentIndex < this.documents.length) {
          const item = new DocumentItem(this.documents[documentIndex]);
          const box = document.createElement('div');
          box.className = 'grid-box';
          box.appendChild(item.renderGrid());
          rowContainer.appendChild(box);
        }
      }

      this.container.appendChild(rowContainer);
    }
  }

  public updateDocuments(newDocuments: Document[]) {
    this.documents = newDocuments;
    this.render();
  }

  public toggleGridView() {
    this.isGridView = true;
    this.render();
  }

  public toggleListView() {
    this.isGridView = false;
    this.render();
  }

  public sortDocuments(sortBy: string) {
    this.documents.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.Title.localeCompare(b.Title);
        case 'date':
          return (
            new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
          );
        case 'version':
          return a.Version.localeCompare(b.Version);
        default:
          return 0;
      }
    });
    this.render();
  }

  public addDocument(newDocument: Document) {
    this.documents = [...this.documents, newDocument];
    this.updateDocuments(this.documents);
  }
}
