import { InvoiceTypesEnum } from '../enums/invoice_types.enum';
import { JobEnum } from '../enums/job.enum';
import { TypeRequestRetentionEnum } from '../enums/request_retention_type.enum';
import { TrimesterTypesEnum } from '../enums/trimester_types.enum';

export interface UserLogin {
  name: string | null;
  password: string | null;
}

export interface User {
  id_user: number;
  name: string;
  password: string;
}

export interface Client {
  id_client: number;
  name: string;
  cif: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  postal_code: string;
  emails: Email[];
}

export interface Email {
  id_email: number;
  email: string;
  id_client: number;
}

export interface Product {
  id_product: number;
  name: string;
  description: string;
  price: number;
}

export interface Construction {
  id_construction: number;
  name: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  half_retention: number;
  total_retention: number;
  half_retention_receive: boolean;
  total_retention_receive: boolean;
  start_date: Date;
  end_date: Date;
  client: Client;
  invoices: Invoice[];
  request_retention: RequestRetention[];
}

export interface Invoice {
  type_invoice: InvoiceTypesEnum;
  id_invoice: number;
  number_invoice: number;
  total_origin: number;
  total_last: number;
  total_net: number;
  advance: number;
  iva: number;
  iva_percent: number;
  retention: number;
  retention_percent: number;
  pay_soon: number;
  pay_soon_percent: number;
  observation: string;
  creation_date: Date;
  items: ItemInvoice[];
  construction: Construction;
  client: Client;
  number_invoice_format: string;
}

export interface ItemInvoice {
  id_item_invoice: number;
  unit_origin: number;
  unit_last: number;
  unit_total: number;
  price: number;
  product: Product;
  invoice: Invoice;
  not_contract: boolean;
}

export interface Employee {
  id_employee: number;
  name: string;
  dni: string;
  date_of_birth: Date;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  email: string;
  area: string;
  job: JobEnum;
}

export interface EmployeeDTOPDF {
  id_employee: number;
  delivery_date: Date;
}

export interface TotalsHome {
  total_year: number;
  total_month: number;
  total_retention_year: number;
}

export interface TotalsMonths {
  text: string;
  value: number;
}

export interface ClientTotalsDTO {
  total_invoices: number;
  total_retentions: number;
  total_retentions_receive: number;
  total_retentions_pending: number;
  constructions_retentions_pending: Construction[];
}

export interface RequestRetention {
  id_request_retention: number;
  type_request_retention: TypeRequestRetentionEnum;
  request_date: Date;
  requested: boolean;
  receive_payment: boolean;
  construction: Construction;
}

export interface Budget {
  id_budget: number;
  client: Client;
  construction: Construction;
  creationDate: Date;
  items: ItemBudget[];
  observation: string;
  iva: number;
  iva_percent: number;
  total_gross: number;
  total_net: number;
}

export interface ItemBudget {
  id_item_budget: number;
  quantity: number;
  price: number;
  product: Product;
  budget: Budget;
}

export interface SummaryPDF {
  trimester_type: TrimesterTypesEnum;
  invoices: Invoice[];
  emails: Email[];
}

export interface ParamsConfiguration {
  excess_cement: number;
  hours_without_tools: number;
  hours_with_tools: number;
  account_number: string;
}
