import { Tick } from "./bits";

const duties: { task: string; who: "you" | "us" }[] = [
  { task: "Choose who to hire and what they work on", who: "you" },
  { task: "Agree salary, goals and leave approvals", who: "you" },
  { task: "Employment contract that follows Indian labour law", who: "us" },
  { task: "Monthly payroll, income tax deduction and payslips", who: "us" },
  { task: "PF, ESI, gratuity and professional tax", who: "us" },
  { task: "Statutory leave and leave records", who: "us" },
  { task: "Exit paperwork and full-and-final settlement", who: "us" },
];

export function DutiesTable() {
  return (
    <table className="duties">
      <caption className="sr-only">Who does what under Employer of Record</caption>
      <thead>
        <tr>
          <th scope="col">Responsibility</th>
          <th scope="col" className="who">You</th>
          <th scope="col" className="who">Pavani IT</th>
        </tr>
      </thead>
      <tbody>
        {duties.map((d) => (
          <tr key={d.task}>
            <th scope="row">{d.task}</th>
            <td className="who">{d.who === "you" ? <><Tick /><span className="sr-only">Yes</span></> : null}</td>
            <td className="who">{d.who === "us" ? <><Tick /><span className="sr-only">Yes</span></> : null}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const rows: { label: string; eor: string; entity: string; contractors: string }[] = [
  {
    label: "Indian entity needed",
    eor: "No",
    entity: "Yes, a private limited company or branch",
    contractors: "No",
  },
  {
    label: "Time to first hire",
    eor: "As soon as the candidate's notice period ends",
    entity: "Several weeks to months: incorporation, bank account, tax and labour registrations",
    contractors: "Fast",
  },
  {
    label: "Legal employer",
    eor: "Pavani IT",
    entity: "Your Indian company",
    contractors: "No one; they are self-employed",
  },
  {
    label: "Payroll and filings",
    eor: "Done by Pavani IT",
    entity: "Your team or a payroll provider",
    contractors: "They invoice you; no payroll",
  },
  {
    label: "PF, ESI, gratuity, leave",
    eor: "Yes, set up from day one",
    entity: "Yes",
    contractors: "No statutory benefits",
  },
  {
    label: "Misclassification risk",
    eor: "Low: they are employees",
    entity: "Low",
    contractors: "High if they work like full-time employees",
  },
  {
    label: "Best for",
    eor: "First hires, small teams, testing India before committing",
    entity: "Large teams and a long-term presence",
    contractors: "Short, project-based work",
  },
];

export function ComparisonTable() {
  return (
    <div className="table-wrap">
      <table className="table">
        <caption className="sr-only">Employer of Record compared with your own Indian entity and independent contractors</caption>
        <colgroup>
          <col className="col-span-3" />
          <col className="col-span-3" />
          <col className="col-span-3" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Question</span></th>
            <th scope="col" className="is-us">Employer of Record</th>
            <th scope="col">Your own Indian entity</th>
            <th scope="col">Independent contractors</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td className="is-us" data-label="Employer of Record">{r.eor}</td>
              <td data-label="Your own entity">{r.entity}</td>
              <td data-label="Contractors">{r.contractors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
