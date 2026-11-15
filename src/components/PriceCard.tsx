import Link from "next/link";
import { Check } from "lucide-react";
import type { Price } from "@/content/site";
import { V } from "./bits";

export default function PriceCard({ price, lead = false, cta = true }: { price: Price; lead?: boolean; cta?: boolean }) {
  return (
    <article className={`price-card${lead ? " is-lead" : ""}`} id={`price-${price.id}`}>
      <h3 className="price-name">{price.service}</h3>
      <p className="price-amount">
        <V>{price.amount}</V>
      </p>
      <p className="price-unit">{price.unit}</p>
      <ul className="price-includes">
        {price.includes.map((item) => (
          <li key={item}>
            <Check aria-hidden="true" strokeWidth={2.4} />
            {item}
          </li>
        ))}
      </ul>
      {price.note && (
        <p className="price-note">
          <V>{price.note}</V>
        </p>
      )}
      {cta && (
        <div className="price-cta">
          <Link prefetch={false} className={`btn btn-sm ${lead ? "btn-light" : "btn-secondary"}`} href={`/contact/?need=${stageParam(price.stage)}`}>
            Get a quote
          </Link>
        </div>
      )}
    </article>
  );
}

const stageParam = (stage: Price["stage"]) => stage.toLowerCase();
