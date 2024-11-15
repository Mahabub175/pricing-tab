import { useState } from "react";
import { PlansData } from "../global/global.types";
import PricingPlans from "./PricingPlans";

type BillingType = "1_year" | "2_year";

interface PricingPlansProps {
  plans: PlansData;
}

const PricingTab: React.FC<PricingPlansProps> = ({ plans }) => {
  const [billingType, setBillingType] = useState<BillingType>("1_year");

  return (
    <div className="pricing-plans">
      <div className="tabs">
        {plans?.plansInfo?.map((planInfo, index) => (
          <div key={index}>
            <button
              className={`tab-btn ${
                billingType === planInfo.id ? "active" : ""
              }`}
              onClick={() => setBillingType(planInfo?.id as BillingType)}
            >
              {planInfo.title}
            </button>
            {planInfo.discount && (
              <span className="discount-text">{planInfo.discount}</span>
            )}
          </div>
        ))}
      </div>
      <PricingPlans billingType={billingType} plans={plans} />
    </div>
  );
};

export default PricingTab;
