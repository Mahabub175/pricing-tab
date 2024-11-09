import { useEffect, useState } from "react";
import PricingPlans from "./components/PricingTab";
import { PlansData } from "./global/global.types";

const App: React.FC = () => {
  const [data, setData] = useState<PlansData | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/pricingData.json")
      .then((res) => res.json())
      .then((data: PlansData) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="container">
      {data && <PricingPlans plans={data} />}
    </section>
  );
};

export default App;
