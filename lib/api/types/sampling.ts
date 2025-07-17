export interface SamplingStyle {
  master_style_id: string;
  name: string;
  style_number: number;
  slug: string;
  jc_number: number;
  simpling_merchant: string;
  sampling_watchpoint_spreedsheet_id: string;
  production_watchpoint_spreedsheet_id: string;
  production_order_received: boolean;
  style_image: string | null;
  is_style_active: boolean;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSamplingStyleRequest {
  name: string;
  jc_number: number;
  style_number: number;
  merchant_name: string;
}

export interface GetSamplingStyleResponse {
  data: SamplingStyle[];
  message: string;
  status: number;
}
