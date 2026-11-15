import type { Metadata } from "next";
import StagePage from "@/components/StagePage";
import { ComparisonTable, DutiesTable } from "@/components/EorTables";
import { stageById } from "@/content/stages";

const stage = stageById("employ");

export const metadata: Metadata = {
  title: stage.metaTitle,
  description: stage.metaDescription,
  alternates: { canonical: stage.href },
  openGraph: { title: stage.title, description: stage.metaDescription, url: stage.href },
};

export default function Page() {
  return (
    <StagePage stage={stage}>
      <section className="section on-mist" aria-labelledby="duties-title">
        <div className="wrap depth">
          <div className="heading-stack">
            <h2 className="h2" id="duties-title">Who does what</h2>
            <p className="lead">
              You direct the work. Pavani IT carries the employer&apos;s legal obligations in India.
            </p>
          </div>
          <DutiesTable />
        </div>
      </section>

      <section className="section" id="eor-vs-entity" aria-labelledby="compare-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="compare-title">Employer of Record, your own entity, or contractors?</h2>
            <p className="lead">
              An Employer of Record suits first hires and small teams. Once you have a large, long-term team in India,
              your own entity usually costs less, and we can move your people across to it.
            </p>
          </div>
          <ComparisonTable />
        </div>
      </section>
    </StagePage>
  );
}
