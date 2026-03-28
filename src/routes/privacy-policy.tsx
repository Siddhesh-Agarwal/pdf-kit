import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  const sections = [
    { id: "s1", num: "01", title: "Who We Are" },
    { id: "s2", num: "02", title: "Client-Side Processing" },
    { id: "s3", num: "03", title: "Data We Don't Collect" },
    { id: "s4", num: "04", title: "Cookies & Storage" },
    { id: "s5", num: "05", title: "Third-Party Services" },
    { id: "s6", num: "06", title: "Hosting & Infrastructure" },
    { id: "s7", num: "07", title: "Open-Source Transparency" },
    { id: "s8", num: "08", title: "Children's Privacy" },
    { id: "s9", num: "09", title: "Policy Changes" },
    { id: "s10", num: "10", title: "Your Rights" },
    { id: "s11", num: "11", title: "Contact" },
  ];

  const noCollectItems = [
    "PDF file contents",
    "Name or email address",
    "IP address for profiling",
    "Browser fingerprint",
    "Behavioral analytics",
    "Click / usage events",
    "Device identifiers",
    "Location data",
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16 space-y-16">

        {/* Header */}
        <header className="space-y-2 border-b pb-8">
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
            Privacy Policy
          </p>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            PDFKit
          </h1>
          <p className="text-sm text-muted-foreground">
            Effective date: 28 March 2026 — Last updated: 26 March 2026
          </p>
        </header>

        {/* TL;DR callout */}
        <div className="rounded-lg border bg-muted/40 px-6 py-5 space-y-2">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
            TL;DR
          </p>
          <p className="leading-7 text-foreground">
            PDFKit processes your PDFs{" "}
            <strong>entirely inside your browser</strong>. Your files never
            leave your device. We collect{" "}
            <strong>no personal data</strong>, run no trackers, store no
            cookies, and have zero interest in who you are. This isn't a legal
            trick — it's the architecture. There's nothing to collect because
            nothing is sent anywhere.
          </p>
        </div>

        {/* Table of Contents */}
        <nav aria-label="Table of Contents" className="space-y-3">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
            Contents
          </p>
          <ol className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-center gap-3 rounded-sm py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    {s.num}
                  </code>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-12">

          <section id="s1" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">01</span>
              Who We Are
            </h2>
            <p className="leading-7">
              PDFKit is an open-source, client-side PDF utility available at{" "}
              <strong>pdfkit.siddhesh.cc</strong>. The source code is publicly
              available for anyone to inspect, audit, or fork. The service lets
              you merge, split, and compress PDF files directly in your web
              browser — no account, no upload, no server.
            </p>
          </section>

          <hr className="border-border" />

          <section id="s2" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">02</span>
              Client-Side Processing
            </h2>
            <p className="leading-7">
              PDFKit is built around one architectural guarantee:{" "}
              <strong>your files never leave your device.</strong>
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Every PDF operation is executed entirely within your browser using
              client-side JavaScript. Concretely, that means:
            </p>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-sm leading-7">
              <li>Your PDF files are never uploaded to any server.</li>
              <li>No file contents are transmitted over any network connection.</li>
              <li>No copies of your documents are stored, cached, or logged outside your machine.</li>
              <li>When you close the browser tab, any in-memory data is gone.</li>
            </ul>
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
              You can verify this yourself. Open your browser's DevTools → Network
              tab, then use PDFKit. You'll observe zero file-related outbound
              requests. Architecture is auditable.
            </blockquote>
          </section>

          <hr className="border-border" />

          <section id="s3" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">03</span>
              Data We Do Not Collect
            </h2>
            <p className="leading-7">
              To be explicit and unambiguous, PDFKit does not collect, process,
              store, or transmit any of the following:
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 my-6">
              {noCollectItems.map((item) => (
                <div
                  key={item}
                  className="rounded-md border bg-muted/30 px-3 py-3 space-y-1"
                >
                  <p className="text-xs font-bold text-destructive tracking-widest">NO</p>
                  <p className="text-sm leading-snug text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-border" />

          <section id="s4" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">04</span>
              Cookies &amp; Local Storage
            </h2>
            <p className="leading-7">
              PDFKit does not use tracking cookies, advertising cookies, or
              third-party cookies of any kind.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              We may use minimal browser{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                localStorage
              </code>{" "}
              or{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                sessionStorage
              </code>{" "}
              strictly to persist UI preferences (like dark mode or last-used
              settings) within your own browser. This data never leaves your
              device and is inaccessible to us or any third party.
            </p>
          </section>

          <hr className="border-border" />

          <section id="s5" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">05</span>
              Third-Party Services
            </h2>
            <p className="leading-7">
              PDFKit intentionally integrates none of the following:
            </p>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-sm leading-7">
              <li>Google Analytics, Mixpanel, Amplitude, or any behavioral analytics platform.</li>
              <li>Facebook Pixel, Google Ads, or any advertising or retargeting network.</li>
              <li>Session recording or heatmap tools (e.g. Hotjar, FullStory, Microsoft Clarity).</li>
              <li>Any data broker, CRM enrichment, or user-tracking service.</li>
            </ul>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              The codebase is publicly auditable. If you find an undisclosed
              tracker in the source, please file a bug report — that would be a
              defect, not a policy choice.
            </p>
          </section>

          <hr className="border-border" />

          <section id="s6" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">06</span>
              Hosting &amp; Infrastructure
            </h2>
            <p className="leading-7">
              PDFKit is hosted on standard web infrastructure to serve static
              application files (HTML, CSS, JavaScript). Your browser downloads
              these files once and runs the application locally. Standard server
              access logs — IP address, timestamp, requested URL — may be
              maintained by the hosting provider for operational purposes such
              as abuse prevention and uptime monitoring.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              These server logs are not used to build user profiles, are not
              sold or shared with third parties, and contain no information
              about the PDFs you process — because that processing never reaches
              the server.
            </p>
          </section>

          <hr className="border-border" />

          <section id="s7" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">07</span>
              Open-Source Transparency
            </h2>
            <p className="leading-7">
              PDFKit is open-source software. The complete source code is
              publicly available for inspection. You don't need to trust this
              document alone — you can read the code, run it locally, or fork
              it entirely.
            </p>
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
              Privacy by architecture is verifiable privacy. A policy you can't
              check is just marketing. The source code is the ground truth.
            </blockquote>
          </section>

          <hr className="border-border" />

          <section id="s8" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">08</span>
              Children's Privacy
            </h2>
            <p className="leading-7">
              PDFKit does not knowingly collect any information from children
              under the age of 13. Because we collect no personal information
              from any user, this is inherently satisfied by the architecture
              itself.
            </p>
          </section>

          <hr className="border-border" />

          <section id="s9" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">09</span>
              Changes to This Policy
            </h2>
            <p className="leading-7">
              We may update this Privacy Policy to reflect changes in the
              service or for legal clarity. Any changes will be posted on this
              page with an updated effective date. Given the nature of this
              service, we don't anticipate material changes to the core
              zero-collection stance described here. Significant changes will be
              noted in the repository's changelog.
            </p>
          </section>

          <hr className="border-border" />

          <section id="s10" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">10</span>
              Your Rights
            </h2>
            <p className="leading-7">
              Because PDFKit collects no personal data, there is nothing to
              access, correct, export, or delete on our end.{" "}
              <strong>
                You already have complete control — your data never left your
                device.
              </strong>
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              If you're located in the EU/EEA, UK, California, or any other
              jurisdiction with specific privacy rights (GDPR, CCPA, PIPEDA,
              etc.), those rights are trivially satisfied by our zero-collection
              architecture. There is no data subject request process because
              there is no data.
            </p>
          </section>

          <hr className="border-border" />

          <section id="s11" className="space-y-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight flex items-baseline gap-3">
              <span className="text-sm font-mono text-muted-foreground">11</span>
              Contact
            </h2>
            <p className="leading-7">
              If you have questions about this policy, found a potential privacy
              issue in the codebase, or want to discuss data handling:
            </p>
            <div className="rounded-lg border divide-y overflow-hidden my-6">
              <div className="flex items-center gap-4 px-4 py-3">
                <small className="text-sm font-medium leading-none w-20 text-muted-foreground uppercase tracking-widest">
                  Email
                </small>
                <a
                  href="mailto:contact@siddhesh.cc"
                  className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                >
                  contact@siddhesh.cc
                </a>
              </div>
              <div className="flex items-center gap-4 px-4 py-3">
                <small className="text-sm font-medium leading-none w-20 text-muted-foreground uppercase tracking-widest">
                  Website
                </small>
                <a
                  href="https://pdfkit.siddhesh.cc"
                  className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                >
                  pdfkit.siddhesh.cc
                </a>
              </div>
            </div>
          </section>

        </div>

        <footer className="border-t pt-8">
          <p className="text-sm text-muted-foreground text-center">
            PDFKit — Open-source, client-side PDF utilities.{" "}
            <a
              href="https://pdfkit.siddhesh.cc"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              pdfkit.siddhesh.cc
            </a>
          </p>
        </footer>

      </div>
    </main>
  );
}
