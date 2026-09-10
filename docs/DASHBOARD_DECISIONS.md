# Client dashboard: decisions to settle

What is built today is a working guess. Each item below is a product decision
that changes the dashboard, with what exists now and what changes per answer.
Answer in one line each.

## 1. How many requests can be worked on at once?

- Now: one at a time for every plan. "Being built" lane shows one card.
- If Pro allows two or more in parallel: lane shows the plan's limit, copy
  changes from "one request at a time" to the real number.
- Also decide whether One-Time plan customers get the dashboard at all.

## 2. Who approves finished work?

- Now: "Ready for review" means the client checks it, then it moves to Done.
- If review is internal QA before the client sees it: rename the lane and
  add a client approval step, or drop the lane from the client view.
- Needs a decision on who moves a card to Done: the client, or ApexDesk.

## 3. Is a client one person or one company?

- Now: one login, one queue. Two people from the same company cannot see
  each other's requests.
- If company: add a companies table, invite flow, and shared queue. This is
  the biggest data model change on the list, so decide early.

## 4. What can a client change after work starts?

- Now: nothing. Edit, reorder, urgent, and remove work only while waiting.
- Alternatives: allow comments after start, allow cancelling with a note,
  or allow edits that create a change request for the team.

## 5. What does "Urgent" do?

- Now: a flag the client sets, moves the card to the top, nothing else.
- Alternatives: paid rush add-on, limit per month, or remove the feature.

## 6. What comes back to the client when work is done?

- Now: a card in Done with a date. No link, no file, no summary.
- Real clients will want a delivery note, links to the deployed work, or
  files. Decide the minimum: a link and a short note is cheap to add.

## 7. Comments and attachments on a request

- Now: title and text only.
- Most competitors allow reference files and back-and-forth comments per
  request. Decide whether that lives here or in email and Slack.

## 8. Billing on the dashboard

- Now: plan name, price, and next payment are sample data. Pause plan does
  nothing real. Manage billing opens the Stripe portal.
- Needs Stripe webhooks to show the real plan and to make pause work.
  Decide whether pause is a feature at all, and whether clients can
  upgrade or downgrade from the dashboard.

## 9. Notifications

- Now: none. Clients must open the dashboard to see status changes.
- Decide: email on status change, or nothing for launch.

## 10. Who on the ApexDesk side moves cards?

- Now: nobody has a UI for it. Status, engineer, and due date can only be
  changed in the Supabase dashboard.
- An internal admin view is the next build if the answer is "the team".

## What is already settled by the code

- Signup collects name, company, website, company size, main need,
  plan interest, and a first project summary. Stored on the profile.
- Clients own the order of their queue. Drag and drop, plus Move to top.
- The database blocks clients from changing status, engineer, or due date.
- Requests table, profiles table, and row level security are live.
