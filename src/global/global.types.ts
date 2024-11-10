interface BillingDetails {
  price: string;
  price_postfix: string;
  plan_type: string;
  plan_info: string;
  dd_text: string;
  btn_text: string;
  price_id: string;
}

interface PlanDetails {
  "1_year": BillingDetails;
  "2_year": BillingDetails;
}

export interface Plan {
  name: string;
  price: string;
  title: string;
  text: string;
  color: string;
  details: PlanDetails;
}

export interface Features {
  feature_desc: string;
  feature_title: string;
  is_pro: string;
}

export interface PlanInfo {
  id: string;
  title: string;
  sub_title: string;
  discount: string;
}

export interface PlansData {
  plans: Plan[];
  features: Features[];
  plansInfo: PlanInfo[];
}
