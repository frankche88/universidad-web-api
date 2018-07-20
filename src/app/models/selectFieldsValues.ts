import { DocumentTypeModel } from './documentTypeModel';
import { Injectable } from '@angular/core';

@Injectable()

export class SelectFieldsValues {
    public DocumentType: Array<DocumentTypeModel> = [];

    constructor() {
        // Initial values for Document type select
        this.DocumentType.push(new DocumentTypeModel(
            'Recibo por Honorarios Electrónicos',
            '1'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Factura electrónica',
            '2'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Boleta de venta electrónica',
            '3'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Nota de crédito de rhe electrónica',
            '4'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Servicio públicos',
            '5'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Nota de crédito electrónica - boleta',
            '6'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Nota de débito electrónica - boleta',
            '7'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Nota de crédito electrónica - factura',
            '8'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Nota de débito electrónica - factura ',
            '9'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Guía de remisión remitente - bienes fiscalizables',
            '10'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Guía de remisión remitente complementaria - bienes fiscalizables',
            '11'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Guía de remisión transportista - bienes fiscalizables',
            '12'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Guía de remisión transportista complementaria - bienes fiscalizables',
            '13'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Guía de remisión remitente',
            '14'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Ticket POS',
            '15'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Ticket monedero',
            '16'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Nota de crédito monedero',
            '17'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Envío resumen - factura',
            '18'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Envío resumen - boleta',
            '19'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Envío resumen - nota de crédito',
            '20'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Envío resumen - nota de debito',
            '21'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Envío resumen - ticket',
            '22'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Comprobante de percepción',
            '23'
        ));
        this.DocumentType.push(new DocumentTypeModel(
            'Comprobante de retención',
            '24'
        ));
  }
}
