"Legacy‑to‑Modern" Wow Demo — Concept Brief

Goal

Create a side‑by‑side interactive demo that lets Patti (and prospects) see exactly how a legacy UniBasic routine is transformed into a modern .NET + SQL implementation. The demo should:

Visually step through each line of UniBasic code.

Show its real‑time equivalent in C# / EF Core plus the resulting UI action.

Educate without overwhelming—ideal for a 3‑minute sales‑meeting wow factor.

Demo Flow (3‑pane layout)

Pane

What it shows

Interaction

1. Legacy Terminal

Embedded xterm.js window with prerecorded keystrokes executing the original Split‑Load/BOL Entry routine.

“Next” button steps to the next code line.

2. Code Transformation

Monaco editor split vertically: left = highlighted UniBasic line; right = color‑coded C# method or SQL query that replaces it.

Auto‑scroll sync; hovering a line shows a tooltip explaining the refactor.

3. Modern UI Preview

React component rendering the new form and live calculations (rack price, tax, total).

Fields update in sync with each transformation step.

Example Line‑by‑Line Mapping

UniBasic snippet

Modern C# / EF Core

Notes

READV CUSTOMER, ID, 1, NAME

var name = await _customerRepo.GetNameAsync(id);

Repository pattern replaces direct file read.

WRITEV INVOICE, INV.ID, 5, TOTAL

await _invoiceRepo.UpdateTotalAsync(invId, total);

Entity update wrapped in a SQL transaction.

GOSUB CALC_TAX

var tax = _taxSvc.Calculate(product, gallons, state);

Dependency‑injected service isolates business rule.

WRITEU INVENTORY, TANK.NO, 3, NEW.QTY

await _inventorySvc.PostTxnAsync(tankId, qty);

Event‑driven inventory service posts quantity txn.

Educational Call‑outs

Rule Isolation: pop‑over explains how C# service layer makes tax logic unit‑testable.

Data Integrity: banner highlights use of SQL constraints vs. UniBasic soft errors.

DevOps: final slide shows GitHub Actions pipeline replacing manual file copy.

Tech Stack to Build Demo

Front‑end: React + Tailwind + xterm.js + Monaco Editor.

State management: Zustand or Context to keep panes in sync.

Backend (mock): Lightweight .NET 8 minimal API returning sample data.

Hosting: Netlify or S3/CloudFront for quick public share link.

Build Effort & Timeline

Day

Deliverable

1

Set up React app, xterm.js with prerecorded session.

2

Implement Monaco split‑editor with synchronized highlighting.

3

Build modern UI pane and hook up stepper logic.

4

Polish tooltips, add sample data API, run UAT.

Expected Outcome

Stakeholders watch a three‑minute walkthrough and instantly grasp:

Why UniBasic is cumbersome.

How each line maps cleanly to modern, maintainable code.

Confidence that the migration path is concrete—not hand‑wavy.