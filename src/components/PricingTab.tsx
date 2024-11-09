import React, { useState } from "react";
import { PlansData, Plan } from "../global/global.types";

interface PricingPlansProps {
  plans: PlansData;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ plans }) => {
  const [billingType, setBillingType] = useState<"1_year" | "2_year">("1_year");

  const renderPlans = () => {
    const mergedPlans = plans.plans.reduce((acc: Plan[], plan: Plan) => {
      if (plan.name === "Growth") {
        const existingGrowthPlan = acc.find((p) => p.name === "Growth");
        if (!existingGrowthPlan) {
          acc.push({
            name: "Growth",
            price: plan.price,
            title: plan.title,
            text: plan.text,
            details: {
              "1_year": { ...plan.details["1_year"] },
              "2_year": { ...plan.details["2_year"] },
            },
          });
        }
      } else {
        acc.push(plan);
      }
      return acc;
    }, []);

    return mergedPlans.map((plan: Plan, i: number) => {
      const billingDetails = plan.details[billingType];

      return (
        <div key={i} className="plan">
          <h3>{plan.name}</h3>
          <p className="price">
            {billingDetails.price}
            {billingDetails.price_postfix}
          </p>
          <p dangerouslySetInnerHTML={{ __html: plan.title }}></p>
          <p>{billingDetails.plan_type}</p>
          <button>{billingDetails.btn_text}</button>
        </div>
      );
    });
  };

  return (
    <div className="pricing-plans">
      <div className="tabs">
        <button
          className={`tab-btn ${billingType === "1_year" ? "active" : ""}`}
          onClick={() => setBillingType("1_year")}
        >
          Billed Monthly
        </button>
        <button
          className={`tab-btn ${billingType === "2_year" ? "active" : ""}`}
          onClick={() => setBillingType("2_year")}
        >
          Billed Yearly
        </button>
      </div>
      <div id="plans-container">{renderPlans()}</div>
    </div>
  );
};

export default PricingPlans;
