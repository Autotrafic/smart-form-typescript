import { DocumentsContext, DocumentsData } from '@modules/documents/interfaces';
import { VehicleType } from '@modules/vehicle-form/interfaces/enums';
import { INITIAL_VISIBLE_FIELDS } from '@modules/vehicle-form/utils/constants';

const emptyFile = new File([''], 'file.txt', { type: 'text/plain' });

export const documentsDataInitialState: DocumentsData = {
  documentGroup: 1,
  vehicleForm: { vehicleType: VehicleType.CAR, visibleFields: INITIAL_VISIBLE_FIELDS },
  vehiclePlate: '',
  shippingAddress: '',
  postalCode: '',
  buyerPhone: '',
  sellerPhone: '',
  buyerDocuments: { dniFrontal: emptyFile, dniBack: emptyFile },
  sellerDocuments: { dniFrontal: emptyFile, dniBack: emptyFile },
  vehicleDocuments: { contratoCompr: emptyFile, permisoCirculacion: emptyFile, fichaTecnica: emptyFile },
};

export const documentsContextInitialState: DocumentsContext = {
    documentsData: documentsDataInitialState,
    updateDocumentsData(f) {},
}