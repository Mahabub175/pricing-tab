import { useState } from "react";
import { PlansData, Plan } from "../global/global.types";

type BillingType = "1_year" | "2_year";

interface PricingPlansProps {
  plans: PlansData;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ plans }) => {
  console.log(plans);

  const [billingType, setBillingType] = useState<BillingType>("1_year");

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
          <h3 className="plan-name">{plan.name}</h3>
          <p className="price">
            {billingDetails.price}
            <span className="month"> {billingDetails.price_postfix}</span>
          </p>
          <p dangerouslySetInnerHTML={{ __html: plan.title }}></p>
          <p>
            {plan?.name === "Free"
              ? "Free includes:"
              : "Everything in free plus:"}
          </p>
          <ul className="list">
            {plans.features
              ?.filter((feature) =>
                plan?.name === "Free"
                  ? feature.is_pro === "0"
                  : feature.is_pro === "1"
              )
              .map((feature, i) => (
                <li key={i} className="single-list">
                  {feature.feature_title}
                </li>
              ))}
          </ul>
          <button>Select Plan</button>
        </div>
      );
    });
  };

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
              <span className="discount-text"> {planInfo.discount}</span>
            )}
          </div>
        ))}
      </div>
      <div id="plans-container">{renderPlans()}</div>
    </div>
  );
};

export default PricingPlans;
