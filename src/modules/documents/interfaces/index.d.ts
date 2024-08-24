export interface DocumentsData extends Documents {
  documentGroup: number;
  vehicleForm: { vehicleType: number; visibleFields: number };
}

export interface Documents {
  vehiclePlate: string;
  shippingAddress: string;
  postalCode: string;
  buyerPhone: string;
  sellerPhone: string;

  buyerDocuments: CustomerDocuments;
  sellerDocuments: CustomerDocuments;
  vehicleDocuments: VehicleDocuments;
}

interface CustomerDocuments {
  dniFrontal: File;
  dniBack: File;
}

interface VehicleDocuments {
  contratoCompr: File;
  permisoCirculacion: File;
  fichaTecnica: File;
}

export interface DocumentsContext {
  documentsData: DocumentsData;
  updateDocumentsData: (setStateFunc: (prev: DocumentsData) => DocumentsData) => void;
}

export type IDocumentsLaterData = { vehiclePlate: string };
