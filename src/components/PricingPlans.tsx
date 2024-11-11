import React, { useState } from "react";
import { Plan, PlansData } from "../global/global.types";
import { hexToHSL } from "../utils/hexToHSL";

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
      (item) => item.price === event.target.value
    );
    setSelectedPlan(selectedSimilarPlan || null);
  };

  const renderPlans = () => {
    const mergedPlans = plans?.plans?.reduce((acc: Plan[], plan: Plan) => {
      const existingPlan = acc?.find((p) => p.name === plan.name);

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

    return mergedPlans.map((plan: Plan, i: number) => {
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
              ? selectedPlan?.price
              : billingDetails?.price}
            <span className="month"> {billingDetails.price_postfix}</span>
          </p>
          {plan?.similarPlans?.length > 0 ? (
            <select
              onChange={(e) => handleSelectChange(plan, e)}
              style={{
                marginTop: 10,
                padding: 8,
                border: `2px solid ${plan.color}`,
                borderRadius: "7px",
                color: plan.color,
                outline: `1px ${plan.color}`,
              }}
            >
              {plan?.similarPlans?.map((item) => (
                <option
                  key={item?.price}
                  value={item?.price}
                  dangerouslySetInnerHTML={{ __html: item?.title }}
                ></option>
              ))}
            </select>
          ) : (
            <div
              style={{
                color: plan.color,
                backgroundColor: `hsl(${hexToHSL(plan.color).hue}, ${
                  hexToHSL(plan.color).saturation
                }%, ${hexToHSL(plan.color).lightness + 20}%)`,
                borderRadius: 20,
                paddingTop: 5,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                marginTop: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: plan.title,
                }}
              ></div>
              <div className="feature-tooltip">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={plan?.color}
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8.5C11.4477 8.5 11 8.94772 11 9.5C11 10.0523 11.4477 10.5 12 10.5C12.5523 10.5 13 10.0523 13 9.5C13 8.94772 12.5523 8.5 12 8.5ZM11 13V17H13V13H11Z"
                    fill={plan?.color}
                  />
                </svg>
                <div className="tooltip-text">{plan.text}</div>
              </div>
            </div>
          )}
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
