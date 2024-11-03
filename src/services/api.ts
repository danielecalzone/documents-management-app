import { Document } from '../models/Document';

const API_URL = 'http://localhost:8080/documents';

export async function fetchDocuments(): Promise<Document[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }
  return response.json();
}
