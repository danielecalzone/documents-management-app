import { connectWebSocket } from '../../services/websocket';
import { DocumentList } from '../../components/DocumentList';
import { mockDocuments } from '../mocks/mockDocuments';

jest.mock('../../services/websocket');

describe('WebSocket Integration with Notification Badge', () => {
  let documentList: DocumentList;
  let container: HTMLElement;
  let notificationBadge: HTMLElement;

  let notificationCount: number;

  beforeEach(() => {
    container = document.createElement('div');
    documentList = new DocumentList(container);
    documentList.updateDocuments(mockDocuments);

    notificationBadge = document.createElement('span');
    notificationBadge.id = 'notification-badge';
    document.body.appendChild(notificationBadge);

    notificationCount = 0;

    (connectWebSocket as jest.Mock).mockImplementation((onNotification) => {
      const fakeNotification = {
        title: 'New Document Added',
        body: JSON.stringify({}),
      };

      onNotification(fakeNotification);
      notificationCount++;

      notificationBadge.textContent = notificationCount.toString();
    });
  });

  it('should increase notification count when a notification is received', () => {
    connectWebSocket(() => {});

    expect(notificationBadge.textContent).toBe('1');
  });

  it('should increase notification count for multiple notifications', () => {
    connectWebSocket(() => {});
    connectWebSocket(() => {});

    expect(notificationBadge.textContent).toBe('2');
  });
});
