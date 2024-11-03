import { fetchDocuments } from './services/api';
import { connectWebSocket, disconnectWebSocket } from './services/websocket';
import { DocumentList } from './components/DocumentList';
import { DocumentModal } from './components/DocumentModal';
import './styles/global.css';

const documentListContainer = document.querySelector(
  '.document-list'
) as HTMLElement;
const documentList = new DocumentList(documentListContainer);
const documentModal = new DocumentModal();
documentModal.onCreateDocument = (newDocument) => {
  documentList.addDocument(newDocument);
};
const createDocumentButton = document.querySelector(
  '.create-document-btn'
) as HTMLElement;
createDocumentButton.addEventListener('click', () => documentModal.show());
const gridIcon = document.getElementById('grid-icon') as HTMLElement;
const listIcon = document.getElementById('list-icon') as HTMLElement;
const headerRow = document.querySelector('.header-row') as HTMLElement;
const createDocumentBtnContainer = document.querySelector(
  '.create-document-btn-container'
) as HTMLElement;

gridIcon.addEventListener('click', () => {
  documentList.toggleGridView();
  headerRow.style.display = 'none';
  createDocumentBtnContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
  gridIcon.style.opacity = '1';
  listIcon.style.opacity = '0.5';
});

listIcon.addEventListener('click', () => {
  documentList.toggleListView();
  headerRow.style.display = 'grid';
  createDocumentBtnContainer.style.gridTemplateColumns = '1fr';
  gridIcon.style.opacity = '0.5';
  listIcon.style.opacity = '1';
});

async function loadDocuments() {
  try {
    const documents = await fetchDocuments();
    const limitedDocuments = documents.slice(0, 3);
    documentList.updateDocuments(limitedDocuments);
  } catch (error) {
    console.error('Error loading documents:', error);
  }
}

connectWebSocket(handleNotification);
loadDocuments();

const sortSelect = document.querySelector('.sort-select') as HTMLSelectElement;
sortSelect.addEventListener('change', (event) => {
  const selectedOption = (event.target as HTMLSelectElement).value;
  documentList.sortDocuments(selectedOption);
});

let notificationCount = 0;

function handleNotification() {
  notificationCount++;

  const notificationBadge = document.getElementById(
    'notification-badge'
  ) as HTMLElement;
  notificationBadge.textContent = notificationCount.toString();

  const notificationBanner = document.getElementById(
    'notification-banner'
  ) as HTMLElement;
  notificationBanner.classList.remove('hidden');
}

window.addEventListener('beforeunload', disconnectWebSocket);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );

        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('New content is available, please refresh.');
                  if (
                    confirm(
                      'A new version of the app is available. Would you like to refresh?'
                    )
                  ) {
                    window.location.reload();
                  }
                }
              }
            };
          }
        };
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
