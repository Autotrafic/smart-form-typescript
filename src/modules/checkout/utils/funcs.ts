import { IOrder } from "@modules/core/interfaces/order";
import { UPLOAD_DOCUMENTS_URL } from "@modules/core/utils/urls";

export function createWhatsAppConfirmationMessage(orderData: IOrder): string {
    const userName = orderData.billData.fullName.trim().split(' ').slice(0, 2).join(' ');

    return `✅ Hemos recibido su pedido correctamente, *${userName}*

    📄 El siguiente paso es adjuntar los documentos del vehículo desde el siguiente enlace:
    
    🔗 ${UPLOAD_DOCUMENTS_URL}/${orderData.orderId}
    
    🤝 Gracias por su confianza`;
}