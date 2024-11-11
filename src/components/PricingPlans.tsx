import React, { useState } from "react";
import { Plan, PlansData } from "../global/global.types";
import PriceDropDown from "./PriceDropdown";

type BillingType = "1_year" | "2_year";

interface PricingPlansProps {
  plans: PlansData;
  billingType: BillingType;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ plans, billingType }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSelectChange = (
    plan: Plan,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedSimilarPlan = plan.similarPlans.find(
      (item) => item.details[billingType].price === event.target.value
    );
    setSelectedPlan(selectedSimilarPlan || null);
  };

  const renderPlans = () => {
    const mergedPlans = plans?.plans?.reduce((acc: Plan[], plan: Plan) => {
      const existingPlan = acc.find((p) => p.name === plan.name);

      if (existingPlan) {
        existingPlan.similarPlans = existingPlan.similarPlans || [];
        existingPlan.similarPlans.push(plan);
      } else {
        acc.push({
          ...plan,
          titles: [plan.title],
          detailsArray: [plan.details],
          similarPlans: [],
        });
      }

      return acc;
    }, []);

    return mergedPlans?.map((plan: Plan, i: number) => {
      const billingDetails = plan.details[billingType];

      return (
        <div
          key={i}
          className="plan"
          style={{
            borderTop: `7px solid ${plan.color}`,
            position: "relative",
          }}
        >
          {plan?.popular && (
            <div
              style={{
                color: "white",
                backgroundColor: plan?.color,
                padding: "4px 10px",
                borderRadius: "10px",
                position: "absolute",
                right: "10px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              Most Popular
            </div>
          )}

          <h3 className="plan-name">{plan.name}</h3>
          <p
            className="price"
            style={{ color: plan.color, fontSize: "2rem", fontWeight: "bold" }}
          >
            {plan?.similarPlans.length > 0 && selectedPlan
              ? selectedPlan.details[billingType].price
              : billingDetails?.price}
            <span className="month"> {billingDetails.price_postfix}</span>
          </p>
          <PriceDropDown
            plan={plan}
            handleSelectChange={handleSelectChange}
            billingType={billingType}
          />
          <p className="text">
            {plan?.name === "Free"
              ? "Free includes:"
              : "Everything in free plus:"}
          </p>
          <p
            className="dynamic-text"
            dangerouslySetInnerHTML={{
              __html:
                plan?.similarPlans.length > 0 && selectedPlan
                  ? selectedPlan?.title
                  : plan?.title,
            }}
          ></p>
          <ul className="list">
            {plans.features
              ?.filter((feature) =>
                plan?.name === "Free"
                  ? feature.is_pro === "0"
                  : feature.is_pro === "1"
              )
              .map((feature, i) => (
                <li key={i} className="single-list">
                  <div className="feature-tooltip">
                    {feature.feature_title}
                    <div
                      className="tooltip-text"
                      dangerouslySetInnerHTML={{
                        __html: feature?.feature_desc,
                      }}
                    />
                  </div>
                </li>
              ))}
          </ul>
          <button
            style={{ backgroundColor: plan?.color }}
            className="plan-button"
          >
            Select Plan
          </button>
        </div>
      );
    });
  };

  return <div id="plans-container">{renderPlans()}</div>;
};

export default PricingPlans;
