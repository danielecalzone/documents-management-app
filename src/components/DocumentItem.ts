import { Document } from '../models/Document';
import { formatRelativeDate } from '../utils/formatDate';
import '../styles/document-item.css';

export class DocumentItem {
  constructor(private document: Document) {}

  public render(): HTMLElement {
    const item = document.createElement('div');
    item.className = 'document-item';

    item.innerHTML = `
      <div class="document-name">
        ${this.document.Title}
        <div class="version-number">Version: ${this.document.Version}</div>
        <div class="creation-date">Creation Date: ${formatRelativeDate(this.document.CreatedAt)}</div>
      </div>
      <div class="contributors">
        ${this.document.Contributors.map((c) => `<div>${c.Name}</div>`).join('')}
      </div>
      <div class="attachments">
        ${this.document.Attachments.map((a) => `<div>${a}</div>`).join('')}
      </div>
    `;

    return item;
  }

  public renderGrid(): HTMLElement {
    const gridItem = document.createElement('div');
    gridItem.className = 'document-item-grid';

    gridItem.innerHTML = `
      <div class="document-name">${this.document.Title}</div>
      <div class="version-number">Version: ${this.document.Version}</div>
      <div class="creation-date">Creation Date: ${formatRelativeDate(this.document.CreatedAt)}</div>
      <div class="contributors">
        ${this.document.Contributors.map((c) => `<div>${c.Name}</div>`).join('')}
      </div>
      <div class="attachments">
        ${this.document.Attachments.map((a) => `<div>${a}</div>`).join('')}
      </div>
    `;

    return gridItem;
  }
}
