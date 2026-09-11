# Supabase auth setup for ApexDesk

For the Supabase project owner or admin. Project ref: `zommblwnothgsujpsipl`.
Takes about five minutes. Nothing here changes code.

## 1. Set the redirect URLs for email confirmation

When a client signs up, Supabase emails a confirmation link. That link sends the
client back to the app. Supabase only redirects to URLs on an allow list, and
falls back to the Site URL otherwise. The Site URL currently defaults to
`http://localhost:3000`. That works for local development but sends real
clients to a dead page until production is set here.

1. Open https://supabase.com/dashboard/project/zommblwnothgsujpsipl
2. Left sidebar: **Authentication**.
3. Under **Configuration**, click **URL Configuration**.
4. **Site URL**: enter exactly

   ```
   https://www.getapexdesk.com
   ```

   No trailing slash. This is where confirmation links send clients when
   no other redirect applies.
5. **Redirect URLs**: click **Add URL** once per entry and add these:

   ```
   https://www.getapexdesk.com/**
   https://getapexdesk.com/**
   http://localhost:3000/**
   ```

   The `/**` suffix allows any path under that host. The bare domain entry
   covers visitors who arrive without `www`. The localhost entry is for
   local development, which runs on port 3000.

6. Click **Save**.

## 2. Confirm the email provider settings

1. **Authentication** > **Providers** (under Configuration) > **Email**.
2. Make sure **Enable Email provider** is on.
3. **Confirm email**: leave on for production. Clients must click the link
   before they can sign in. The app already shows a "check your inbox" screen
   for this case.
   For a quick test without inboxes, turn it off temporarily. Signup then
   returns a session immediately and the app goes straight to the dashboard.
4. **Minimum password length**: set to 8 to match the app's own rule.
5. Click **Save**.

## 3. Optional: grant the developer access

If the developer should manage these settings without asking:

1. Top left project switcher > the organization > **Team** (or
   Organization settings > Team).
2. Find the developer's email and set the role to **Administrator**.

Members with the Developer role cannot change Authentication settings.

## 4. Optional: run the database scripts

The repo has SQL migrations under `supabase/migrations/`. Run each file in
**SQL Editor** > **New query**, oldest file first. They create the `requests`
table and its row level security policies. Any role with SQL Editor access can
do this.

## How to verify

1. Open the app's `/signup` page, create an account with a real inbox.
2. The app shows "Check your inbox".
3. Click the link in the email. The browser should land on
   https://www.getapexdesk.com and `/login` should accept the new
   credentials.
