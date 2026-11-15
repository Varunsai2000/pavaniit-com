import type { Metadata } from "next";
import MonthCycle from "@/components/MonthCycle";
import StagePage from "@/components/StagePage";
import { stageById } from "@/content/stages";

const stage = stageById("pay");

export const metadata: Metadata = {
  title: stage.metaTitle,
  description: stage.metaDescription,
  alternates: { canonical: stage.href },
  openGraph: { title: stage.title, description: stage.metaDescription, url: stage.href },
};

export default function Page() {
  return (
    <StagePage stage={stage}>
      <section className="section on-mist" aria-labelledby="calendar-title">
        <div className="wrap cycle">
          <div className="cycle-copy">
            <div className="section-head">
              <h2 className="h2" id="calendar-title">This month&apos;s statutory calendar</h2>
              <p className="lead">
                The national due dates are fixed; state ones vary. This calendar is calculated for today, so you can see
                what is done and what is coming up.
              </p>
            </div>
            <ul className="cycle-points">
              <li><b>7th</b><span className="muted">TDS on salaries deducted last month is deposited (30 April for March).</span></li>
              <li><b>15th</b><span className="muted">PF and ESI contributions for last month are paid and returns filed.</span></li>
              <li><b>Month end</b><span className="muted">Salaries credited and payslips issued on the last working day.</span></li>
              <li><b>Quarterly</b><span className="muted">TDS returns filed for every employee.</span></li>
            </ul>
          </div>
          <MonthCycle />
        </div>
      </section>
    </StagePage>
  );
}
