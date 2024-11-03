# Documents Management Application

## Overview

The Documents Management Application is a web application designed to help users manage their documents efficiently. It displays a list of documents associated with a user's account, showcasing vital information such as document name, contributors, version number, and attachments. The app allows users to create new documents, receive real-time notifications when documents are created by other users, and sort documents based on different criteria.

This application is built with maintainability and scalability in mind, using vanilla TypeScript. It does not rely on frameworks such as React or Angular, ensuring a solid foundation that can be easily extended with new features.

## Implemented Features

- **Document Display**: View the most recent documents created in either a list view or a grid view.
- **Real-time Notifications**: Receive notifications when a new document is being created by other users.
- **Document Creation**: Users can create new documents, which are immediately displayed in the document list.
- **Sorting**: Sort documents by name, version, or creation date.
- **Offline support**: The application can function without an internet connection.
- **Box notification**: A box notification appears when a new document is created.
- **Display dates in a relative format**: Dates are shown in a user-friendly format, such as "1 day ago."
- **Data Sources**: Documents data is fetched from a JSON over HTTP API, and real-time notifications are handled via a WebSocket connection.

## Application Structure

The application is structured to support maintainability and ease of adding new features:

```bash
src/
├─ components/
│  ├─ DocumentItem.ts
│  ├─ DocumentList.ts
│  └─ DocumentModal.ts
├─ main.ts
├─ models/
│  └─ Document.ts
├─ server/
│  ├─ .gitignore
│  ├─ go.mod
│  ├─ go.sum
│  ├─ LICENSE
│  ├─ README.md
│  └─ server.go
├─ services/
│  ├─ api.ts
│  └─ websocket.ts
├─ styles/
│  ├─ document-item.css
│  ├─ document-list.css
│  ├─ document-modal.css
│  └─ global.css
├─ tests/
│  ├─ e2e/
│  │  └─ document-management.e2e.test.ts
│  ├─ integration/
│  │  ├─ api.integration.test.ts
│  │  ├─ DocumentList.integration.test.ts
│  │  ├─ DocumentModal.integration.test.ts
│  │  └─ websocket.integration.test.ts
│  ├─ mocks/
│  │  └─ mockDocuments.ts
│  └─ unit/
│     ├─ DocumentItem.test.ts
│     ├─ DocumentList.test.ts
│     ├─ DocumentModal.test.ts
│     └─ formatDate.test.ts
├─ types.ts
├─ utils/
│  └─ formatDate.ts
└─ vite-env.d.ts
```

## Installation

To get started with the application, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/danielecalzone/documents-management-app.git
   cd documents-management-app
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Download and install Go from the [official Go website](https://go.dev/). Follow the instructions provided there for your specific operating system.

4. Navigate to the Server Directory:

   ```bash
   cd documents-management-app/src/server
   ```

5. Run the Go Server:

   ```bash
   go run server.go
   ```

6. Build the application for production, run (optional):

   ```bash
   yarn build
   ```

7. Preview the production build with:

   ```bash
   yarn serve
   ```

8. Open your browser and navigate to http://localhost:3000 to view the application.

## Usage

- Creating a Document: Click on the button to create a new document, fill out the form in the modal, and submit it. The new document will appear in the list or grid view.
- Sorting Documents: Use the sorting options to arrange documents by name, version, or creation date.
- Toggle Views: Switch between list and grid views as per your preference.

## Testing

The application includes various automated tests to ensure correctness. You can run the tests with the following commands:

1. Unit Tests:
   
   ```bash
   yarn test:unit
   ```
3. Integration Tests:
   
   ```bash
   yarn test:integration
   ```
5. End-to-End Tests:
   
   ```bash
   yarn test:e2e
   ```
7. Performance Tests:
   
   ```bash
   yarn test:performance
   ```

## Development Considerations

* The application is built with maintainability in mind, allowing for easy addition of new features and modifications.
* The UI is implemented based on provided mockups, ensuring a consistent user experience.
* The application has been tested for compatibility with the latest two versions of Chrome.

## Libraries and Dependencies

The application uses several libraries for development and testing:

- **Vite:** For a fast development experience.
- **Jest:** For unit and integration testing.
- **Puppeteer:** For end-to-end testing.
- **Lighthouse**: For performance checks and audits.
- **ESLint and Prettier:** For maintaining code quality and formatting.

## Conclusion

The Documents Management Application is designed to be a user-friendly tool for managing documents efficiently while being easy to extend and maintain. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/danielecalzone/documents-management-app/blob/main/LICENSE) file for details.
