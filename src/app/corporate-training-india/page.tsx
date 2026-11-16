import type { Metadata } from "next";
import StagePage from "@/components/StagePage";
import { ogImage, trainingPartners } from "@/content/site";
import { stageById } from "@/content/stages";

const stage = stageById("grow");

export const metadata: Metadata = {
  title: stage.metaTitle,
  description: stage.metaDescription,
  alternates: { canonical: stage.href },
  openGraph: { title: stage.title, description: stage.metaDescription, url: stage.href, images: [ogImage] },
};

export default function Page() {
  return (
    <StagePage stage={stage}>
      {/* Listed only once partners have agreed to be named (src/content/site.ts). */}
      {trainingPartners.length > 0 && (
        <section className="section ruled" aria-labelledby="partners-title">
          <div className="wrap depth">
            <div className="section-head">
              <h2 className="h2" id="partners-title">Our training partners</h2>
              <p className="lead">Specialist trainers we match to your topic and stack.</p>
            </div>
            <ul className="contact-facts">
              {trainingPartners.map((name) => (
                <li key={name}><span>Partner</span><span>{name}</span></li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </StagePage>
  );
}
