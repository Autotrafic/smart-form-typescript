interface DocumentsData extends Documents {
  documentGroup: number;
  vehicleForm: { vehicleType: number; visibleFields: number };
}

interface Documents {
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

interface DocumentsContext {
  documentsData: DocumentsData;
  updateDocumentsData: (setStateFunc: (prev: DocumentsData) => DocumentsData) => void;
}

type IDocumentsLaterData = { vehiclePlate: string };
