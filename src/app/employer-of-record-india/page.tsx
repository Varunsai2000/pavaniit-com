import type { Metadata } from "next";
import StagePage from "@/components/StagePage";
import { ComparisonTable, DutiesTable } from "@/components/EorTables";
import PriceCard from "@/components/PriceCard";
import { MoreLink } from "@/components/bits";
import { eorPlanCards } from "@/content/site";
import { ogImage } from "@/content/site";
import { stageById } from "@/content/stages";

const stage = stageById("employ");

export const metadata: Metadata = {
  title: stage.metaTitle,
  description: stage.metaDescription,
  alternates: { canonical: stage.href },
  openGraph: { title: stage.title, description: stage.metaDescription, url: stage.href, images: [ogImage] },
};

export default function Page() {
  return (
    <StagePage stage={stage}>
      <section className="section ruled" aria-labelledby="duties-title">
        <div className="wrap depth">
          <div className="section-head">
            <h2 className="h2" id="duties-title">Who does what</h2>
            <p className="lead">
              You direct the work. Pavani IT carries the employer&apos;s legal obligations in India.
            </p>
          </div>
          <DutiesTable />
        </div>
      </section>

      <section className="section ruled" id="eor-vs-entity" aria-labelledby="compare-title">
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

      <section className="section ruled" id="eor-pricing" aria-labelledby="eor-pricing-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2" id="eor-pricing-title">What it costs</h2>
            <p className="lead">
              One monthly fee per person, on top of their salary and statutory costs, before 18% GST. Every fee is in the
              proposal before you sign.
            </p>
          </div>
          <div className="price-grid">
            {eorPlanCards.map((p, i) => (
              <PriceCard key={p.id} price={p} lead={i === 0} />
            ))}
          </div>
          <div className="section-foot">
            <MoreLink href="/pricing/">What a month costs, worked through for one employee</MoreLink>
          </div>
        </div>
      </section>
    </StagePage>
  );
}
