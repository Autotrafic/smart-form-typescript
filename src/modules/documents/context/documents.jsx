import React, { createContext, useContext, useState } from "react";

const INITIAL_VISIBLE_FIELDS = 3;

const DocumentsStore = () => {
  const documentsDataInitialState = {
    vehicleForm: { vehicleType: 1, visibleFields: INITIAL_VISIBLE_FIELDS },
  };
  const [documentsData, setDocumentsData] = useState(documentsDataInitialState);

  const updateDocumentsData = (value) => {
    setDocumentsData(value);
  };

  return {
    updateDocumentsData,

    documentsData,
  };
};

const DocumentsContext = createContext();

export const useDocuments = () => useContext(DocumentsContext);

export const DocumentsProvider = ({ children }) => {
  const documentsStore = DocumentsStore();

  return <DocumentsContext.Provider value={documentsStore}>{children}</DocumentsContext.Provider>;
};
