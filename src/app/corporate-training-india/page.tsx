import type { Metadata } from "next";
import StagePage from "@/components/StagePage";
import { stageById } from "@/content/stages";

const stage = stageById("grow");

export const metadata: Metadata = {
  title: stage.metaTitle,
  description: stage.metaDescription,
  alternates: { canonical: stage.href },
  openGraph: { title: stage.title, description: stage.metaDescription, url: stage.href },
};

export default function Page() {
  return (
    <StagePage stage={stage} />
  );
}
