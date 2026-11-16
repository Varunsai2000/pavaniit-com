import type { Metadata } from "next";
import StagePage from "@/components/StagePage";
import { ogImage } from "@/content/site";
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
    <StagePage stage={stage} />
  );
}
