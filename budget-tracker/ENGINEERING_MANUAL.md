# BankingGo Engineering Manual

## 1. Purpose and Status

BankingGo is an accessibility-focused banking and budgeting **prototype**. Its purpose is to demonstrate a simpler way for people to understand a balance, plan a budget, track spending, set a savings goal, and ask for basic help. It is not a bank, does not connect to a financial institution, and cannot receive, hold, or transfer real money.

This manual is a map of the current implementation and a handover guide for engineers. It groups related lines into meaningful code blocks; blank lines, braces, and repetitive style declarations are not individually described.

## 2. Project Files

- [index.html](index.html): page structure, forms, navigation labels, disclosure text, and accessible element IDs.
- [index.js](index.js): browser-side app state, language selection, PIN demo, rendering, budget logic, local persistence, savings, transfers, and guided help.
- [style.css](style.css): colors, layout, controls, dashboard, chart, and responsive breakpoints.
- [presentation.html](presentation.html): browser-viewable presentation slides.
- [presentation.md](presentation.md): presentation outline and speaker notes.

There is no package manager, build pipeline, server, database, test suite, payment processor, bank integration, or production AI service in this folder.

## 3. Run the Prototype

Open `index.html` in a modern browser. To test browser cryptography consistently, serve the folder from `localhost` or HTTPS if the browser disables Web Crypto on a `file:` URL. Use invented demo details only. A six-digit PIN here is not appropriate for a real financial account.

The current test flow is: create a local demo profile, add an expense, set a goal, move demo funds to savings, lock the app, and sign back in in the same browser. Clearing browser storage removes the demo profile.

## 4. Page Map: `index.html`

- [index.html](index.html#L6): meta Content Security Policy. This is a limited browser-level policy for the static demo. Production must send security headers from the web server; a meta policy does not replace those headers or server security.
- [index.html](index.html#L24): language selector. Only English, Kiswahili, Yoruba, and Luganda have interface strings in the current script.
- [index.html](index.html#L31): read-screen and stop-reading controls. They use speech voices installed on the user's device; they are not guaranteed to exist for every language or device.
- [index.html](index.html#L37): persistent demo and language disclosure. It warns that this app is not connected to a bank and that guided help currently responds in English.
- [index.html](index.html#L57): account access screen container.
- [index.html](index.html#L70): new demo profile form: name, phone, six-digit PIN, user-entered starting balance, budget, currency, and interface language.
- [index.html](index.html#L127): returning-user sign-in form. The phone and PIN are checked against the locally stored demo credential hash.
- [index.html](index.html#L143): dashboard container; it is shown after local profile creation or a successful local sign-in.
- [index.html](index.html#L193): expense form and category selection.
- [index.html](index.html#L258): savings goal form; stores a target amount and shows progress.
- [index.html](index.html#L271): wallet-to-savings demo transfer form. It changes only the values held by this browser.
- [index.html](index.html#L280): spending-by-category chart container; JavaScript fills it from expense transactions.
- [index.html](index.html#L295): recent activity list container.
- [index.html](index.html#L301): copyright notice. Confirm the actual rights owner and the correct notice before publishing or licensing the product.

HTML `id` attributes are the link between the page and the JavaScript. Renaming an ID requires updating the corresponding lookup in [index.js](index.js#L3).

## 5. JavaScript Map: `index.js`

### Startup and data model

- [index.js](index.js#L1): waits for the HTML document to be ready before looking up controls and registering event handlers.
- [index.js](index.js#L2): localStorage key for the versioned demo profile.
- [index.js](index.js#L3): caches page elements by ID so event handlers and render functions can update them.
- [index.js](index.js#L24): current hand-written translations. Additions need corresponding strings for each currently supported language; this is not a 100-language translation system.
- [index.js](index.js#L52): currency display formatters. These format a number in a selected currency; they do not perform exchange-rate conversion.
- [index.js](index.js#L57): in-memory account state. Expenses and transfers mutate this object, then render functions update the screen.
- [index.js](index.js#L58): attempts to load the existing demo profile from this browser.

### Storage and local PIN demo

- [index.js](index.js#L60): formats a numeric value using `Intl.NumberFormat` and the selected currency.
- [index.js](index.js#L64): reads and minimally version-checks localStorage data. LocalStorage is user-editable and must never be trusted for real money or authorization.
- [index.js](index.js#L74): writes changed demo profile and transactions to localStorage.
- [index.js](index.js#L85): writes a status message and error styling to a form status element.
- [index.js](index.js#L90): switches between account creation and sign-in forms.
- [index.js](index.js#L101): converts cryptographic bytes to hexadecimal text for storage.
- [index.js](index.js#L105): derives a salted PBKDF2-SHA-256 PIN hash using Web Crypto. It avoids saving the PIN as plain text, but browser-side hashing does not secure editable localStorage or make a six-digit PIN strong enough for production.

The saved demo record contains a phone number, PIN salt and hash, profile values, and transactions. It is one profile per browser storage key. There is no server identity, session revocation, multi-device access, recovery, rate limiting, or operator/admin account.

### Rendering and calculations

- [index.js](index.js#L113): builds transaction list nodes using `textContent`, avoiding insertion of transaction names as HTML.
- [index.js](index.js#L138): totals expense transactions by category and creates proportional chart bars. Transfers are excluded from spending.
- [index.js](index.js#L174): updates balance, budget, savings progress, warnings, activity, and chart from current in-memory state.
- [index.js](index.js#L209): applies a supported language to page elements marked with `data-key` and updates the selected language controls.
- [index.js](index.js#L222): displays the dashboard after profile creation or successful sign-in.

Expense entry rejects invalid or over-balance amounts, lowers the demo wallet balance, raises total spending, and records an expense. A wallet-to-savings transfer lowers available demo funds and raises demo savings, but does not increase spending. See [index.js](index.js#L358) and [index.js](index.js#L384).

### Help and accessibility

- [index.js](index.js#L229): appends text-only chat messages to the guided help panel.
- [index.js](index.js#L237): local keyword-based replies about budgets and savings. This is scripted help, not a generative AI agent and not financial advice.
- [index.js](index.js#L249): sends a user question and displays the matching local reply.
- [index.js](index.js#L257): wires account-mode and language controls.
- [index.js](index.js#L266): reads visible screen text aloud only when a matching speech voice is installed. The browser/device controls audio; no audio service is connected.
- [index.js](index.js#L302): sends assistant text from the send button or Enter key.

### User actions

- [index.js](index.js#L308): validates the new profile form, creates a salted PIN hash, initializes state, saves locally, and opens the dashboard.
- [index.js](index.js#L339): checks the phone and PIN hash for local demo sign-in, restores local state, and opens the dashboard.
- [index.js](index.js#L358): handles adding an expense and prevents spending above the available demo wallet balance.
- [index.js](index.js#L374): saves a savings target and refreshes progress.
- [index.js](index.js#L384): validates and performs an internal demo transfer to savings.
- [index.js](index.js#L398): locks the current screen and returns to the local sign-in form. This is a UI lock, not a server session logout.
- [index.js](index.js#L408): chooses create or sign-in mode at startup based on whether a local demo profile exists.

## 6. Styling Map: `style.css`

- [style.css](style.css#L1): global sizing reset and shared design variables.
- [style.css](style.css#L236): visual treatment of the important demo disclosure.
- [style.css](style.css#L246): account access tabs.
- [style.css](style.css#L280): responsive savings and transfer layout.
- [style.css](style.css#L332): category chart layout.
- [style.css](style.css#L447): dashboard summary cards.
- [style.css](style.css#L509): expense and help content columns.
- [style.css](style.css#L563): scrolling help conversation area.
- [style.css](style.css#L681): footer copyright presentation.
- [style.css](style.css#L695): tablet and medium-width layout changes.
- [style.css](style.css#L717): phone layout changes.

## 7. Current Capabilities and Limits

| Area | What works now | What it does not do |
|---|---|---|
| Accounts | One local profile with a PIN hash and lock/sign-in screen | No verified identity, production login, account recovery, or multi-device sync |
| Money | Editable demo balance, budgets, expenses, savings goals, and demo transfers | No ledger, deposits, withdrawals, settlement, or real bank transfer |
| Security | Basic form validation, salted PIN derivation, safe text rendering, and a restrictive CSP meta tag | No server-side authorization, tamper protection, encrypted database, rate limiting, fraud controls, or security monitoring |
| Languages | Four hand-written interface languages and device-native screen reading when available | Not 100+ languages, not every Indigenous language, no professional review, and no guaranteed speech voice |
| Assistant | Local rule-based replies for a small set of money questions | No live AI model, account support agent, escalation, or connection to a bank |
| Currencies | Ten currency display formats | No FX conversion, pricing, local settlement, or market-specific currency rules |
| Admin | No operator tools | No user administration, permissions, audit reports, support queue, or system configuration |

A language name in a selector is not a usable language pack. Each supported language needs complete translated interface and help content, local financial terminology review, accessibility testing, and ongoing ownership for updates. The four available translations should also be checked by fluent speakers before public use.

## 8. Engineer Handover: Production Architecture

Do not make the current static app handle real customer accounts or money. A production implementation should move trust decisions to server-side services:

1. **Agree on a first market and licensed partner.** Choose the initial country, customer group, currencies, banking/payment partner, compliance owner, data-retention policy, and customer support process before engineering money movement.
2. **Build a server API and identity service.** The server verifies identity, authenticates users, applies MFA or risk-based step-up checks, enforces account permissions, rate-limits attempts, and issues revocable short-lived sessions. Never trust a balance, role, transfer amount, or permission submitted by the browser.
3. **Create a ledger-backed money service.** Store balances as server-derived ledger entries using exact minor currency units or decimal types. Use atomic transactions, idempotency keys, duplicate protection, audit records, reconciliation, and explicit pending/settled/failed states. A transfer request should go through a licensed partner adapter, not directly from front-end JavaScript.
4. **Add a data layer and operations.** Use encrypted server/database storage, scoped access, secret management, backups, monitoring, alerts, incident response, data export/deletion workflows, and tested disaster recovery.
5. **Add an AI gateway.** Put model keys on the server only. Minimize and redact data sent to a model, get consent, log safely, evaluate harmful/wrong financial answers, restrict the assistant to approved tasks, and provide a human support path. Do not let an AI model directly authorize or execute transactions.
6. **Build reviewed localization.** Use translation keys, locale-aware number/date/currency formatting, right-to-left layout where needed, native-speaker review, community partnership for Indigenous languages, and accessible voice alternatives. Provide a language contribution and review process rather than promising unverified machine translations.
7. **Meet market requirements and test.** Obtain local legal/compliance guidance and required licenses/partners. Run threat modeling, independent penetration testing, accessibility tests, load/recovery tests, and security review before a real pilot.
8. **Deploy securely.** Serve over HTTPS, set CSP and other security headers at the server, use a reviewed dependency/build pipeline, separate environments, protect production secrets, and establish release/rollback procedures.

Security improvements such as minification, obfuscation, or a copyright notice can raise friction but cannot prevent copying or protect browser-side balances. Copyright ownership, trademark registration, contributor agreements, and sale/licensing contracts need to be handled with appropriate legal advice.

## 9. Presentation

- [presentation.html](presentation.html): open in a browser for the slides.
- [presentation.md](presentation.md): editable outline and speaker notes.

The presentation describes the inclusion problem, the intended users, current prototype features, and launch/security work still required. Keep claims aligned with the limits in section 7.
