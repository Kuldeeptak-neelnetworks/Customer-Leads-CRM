import PageHeader from "../../Templates/PageHeader/PageHeader";
import { PlusIconSVG } from "../../utils/SVGs/SVGs";

const Dashboard = () => {
  return (
    <div className="main-wrapper">
      <PageHeader heading={"Dashboard"}>
        <button className="cta-btn w-50">
          Add New User
          <span>
            <PlusIconSVG />
          </span>
        </button>
      </PageHeader>
      {/* React Table */}
      {/* React Table Footer */}
    </div>
  );
};

export default Dashboard;
