import { Document } from '../models/Document';
import '../styles/document-modal.css';

export class DocumentModal {
  private modal: HTMLElement;
  private form: HTMLFormElement;

  constructor() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal', 'hidden');
    this.modal.innerHTML = `
      <div class="modal-content">
        <span class="close-button" id="close-modal">&times;</span>
        <h2>Create New Document</h2>
        <form id="document-form">
          <label for="document-title">Name:</label>
          <input type="text" id="document-title" required />

          <label for="contributors">Contributors (enter names separated by commas):</label>
          <input type="text" id="contributors" required />
          
          <label for="attachments">Attachments (enter values separated by commas):</label>
          <input type="text" id="attachments" required />

          <button type="submit">Create document</button>
        </form>
      </div>
    `;

    document.body.appendChild(this.modal);
    this.form = this.modal.querySelector('#document-form') as HTMLFormElement;

    this.modal.querySelector('#close-modal')!.addEventListener('click', () => {
      this.hide();
    });

    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.hide();
      }
    });

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.createDocument();
    });
  }

  show() {
    this.modal.classList.remove('hidden');
  }

  hide() {
    this.modal.classList.add('hidden');
  }

  private createDocument() {
    const title = (
      document.getElementById('document-title') as HTMLInputElement
    ).value;
    const contributorsInput = (
      document.getElementById('contributors') as HTMLInputElement
    ).value;
    const attachments = (
      document.getElementById('attachments') as HTMLInputElement
    ).value
      .split(',')
      .map((item) => item.trim());

    const contributors = contributorsInput.split(',').map((name, index) => {
      return { ID: `${Date.now()}-${index}`, Name: name.trim() };
    });

    const newDocument: Document = {
      ID: Date.now().toString(),
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      Title: title,
      Attachments: attachments,
      Contributors: contributors,
      Version: '1.0.0',
    };

    this.onCreateDocument(newDocument);
    this.showNotification('Document created successfully!');
    this.hide();
    this.form.reset();
  }

  public getForm(): HTMLFormElement {
    return this.form;
  }

  public getModalElement(): HTMLElement {
    return this.modal;
  }

  private showNotification(message: string) {
    const container = document.querySelector('.notification-container');
    const notification = document.createElement('div');

    notification.classList.add('notification-banner');
    notification.innerHTML = `<div class="notification-creation-text">${message}</div>`;

    container?.appendChild(notification);

    setTimeout(() => {
      container?.removeChild(notification);
    }, 5000);
  }

  onCreateDocument(newDocument: Document) {
    console.log('New Document Created:', newDocument);
  }
}
