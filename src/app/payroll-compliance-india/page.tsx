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
      <section className="section ruled" aria-labelledby="calendar-title">
        <div className="wrap cycle">
          <div className="cycle-copy">
            <div className="section-head">
              <h2 className="h2" id="calendar-title">This month&apos;s statutory calendar</h2>
              <p className="lead">
                The national due dates are fixed; state ones vary. March&apos;s TDS is due by 30 April rather than the 7th,
                and TDS returns are filed every quarter. This calendar is worked out for today, so you can see what is
                done and what is coming up.
              </p>
            </div>
          </div>
          <MonthCycle />
        </div>
      </section>
    </StagePage>
  );
}
