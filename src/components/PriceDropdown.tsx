import { Plan } from "../global/global.types";
import { hexToHSL } from "../utils/hexToHSL";

interface PriceDropdownProps {
  plan: Plan;
  handleSelectChange: (
    plan: Plan,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  billingType: "1_year" | "2_year";
}

const PriceDropdown: React.FC<PriceDropdownProps> = ({
  plan,
  handleSelectChange,
  billingType,
}) => {
  return (
    <>
      {plan?.similarPlans?.length > 0 ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select
            onChange={(e) => handleSelectChange(plan, e)}
            style={{
              padding: 8,
              border: `2px solid ${plan.color}`,
              borderRadius: "7px",
              color: plan.color,
              outline: `1px ${plan.color}`,
            }}
          >
            {plan?.similarPlans?.map((item: Plan) => (
              <option
                key={item?.price}
                value={item.details[billingType].price}
                dangerouslySetInnerHTML={{ __html: item?.title }}
              ></option>
            ))}
          </select>
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
    </>
  );
};

export default PriceDropdown;
