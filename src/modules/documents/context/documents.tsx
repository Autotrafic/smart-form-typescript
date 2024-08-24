import React, { createContext, ReactNode, useContext, useState } from 'react';
import { documentsContextInitialState, documentsDataInitialState } from '../components/utils/initialStates';
import { DocumentsContext as IDocumentsContext, DocumentsData } from '../interfaces';

const DocumentsStore = (): IDocumentsContext => {
  const [documentsData, setDocumentsData] = useState<DocumentsData>(documentsDataInitialState);

  const updateDocumentsData = (setStateFunc: (prev: DocumentsData) => DocumentsData) => {
    setDocumentsData(setStateFunc);
  };

  return {
    updateDocumentsData,

    documentsData,
  };
};

const DocumentsContext = createContext<IDocumentsContext>(documentsContextInitialState);

export const useDocuments = () => useContext(DocumentsContext);

export const DocumentsProvider = ({ children }: { children: ReactNode }) => {
  const documentsStore = DocumentsStore();

  return <DocumentsContext.Provider value={documentsStore}>{children}</DocumentsContext.Provider>;
};
