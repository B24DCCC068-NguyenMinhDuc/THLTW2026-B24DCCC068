import ColumnChart from "../../../../components/Chart/ColumnChart";

import SummaryCards from "./SummaryCards";

import { Club } from "../../types/club";
import { Application } from "../../types/application";

interface Props {
  clubs: Club[];
  applications: Application[];
}

const ReportTab: React.FC<Props> = ({ clubs, applications }) => {

  const categories = clubs.map(club => club.name);
  const pendingCounts = clubs.map(club => {
    return applications.filter(a => a.clubId === club.id && a.status === "Pending").length;
  });
  const approvedCounts = clubs.map(club => {
    return applications.filter(a => a.clubId === club.id && a.status === "Approved").length;
  });
  const rejectedCounts = clubs.map(club => {
    return applications.filter(a => a.clubId === club.id && a.status === "Rejected").length;
  });

  return (
    <>
      <SummaryCards
        clubs={clubs}
        applications={applications}
      />

      <ColumnChart
        title="Application Status by Club"
        xAxis={categories}
        yAxis={[pendingCounts, approvedCounts, rejectedCounts]}
        yLabel={["Pending", "Approved", "Rejected"]}
        type="bar"
        colors={["#fcfc00", "#48fc00", "#f70213"]}
      />
    </>
  );
};

export default ReportTab;