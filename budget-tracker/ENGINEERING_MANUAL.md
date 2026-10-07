# BankingGo Engineering Manual

## 1. Purpose and Status

BankingGo is an accessibility-focused banking and budgeting **prototype**. Its purpose is to demonstrate a simpler way for people to understand a balance, plan a budget, track spending, set a savings goal, and ask for basic help. It is not a bank, does not connect to a financial institution, and cannot receive, hold, or transfer real money.

This manual is a map of the current implementation and a handover guide for engineers. It groups related lines into meaningful code blocks; blank lines, braces, and repetitive style declarations are not individually described.

## 2. Project Files

- [index.html](index.html): page structure, forms, navigation labels, disclosure text, and accessible element IDs.
- [index.js](index.js): browser-side app state, language selection, PIN demo, rendering, budget logic, local persistence, savings, transfers, and guided help.
- [style.css](style.css): colors, layout, controls, dashboard, chart, and responsive breakpoints.
- [presentation.md](presentation.md): presentation outline and speaker notes.

There is no package manager, build pipeline, server, database, test suite, payment processor, bank integration, or production AI service in this folder.

## 3. Run the Prototype

Open `index.html` in a modern browser. To test browser cryptography consistently, serve the folder from `localhost` or HTTPS if the browser disables Web Crypto on a `file:` URL. Use invented demo details only. A six-digit PIN here is not appropriate for a real financial account.

The current test flow is: create a local demo profile, add an expense, set a goal, move demo funds to savings, lock the app, and sign back in in the same browser. Clearing browser storage removes the demo profile.

## 4. Page Map: `index.html`

- [index.html](index.html#L6): meta Content Security Policy. This is a limited browser-level policy for the static demo. Production must send security headers from the web server; a meta policy does not replace those headers or server security.
- [index.html](index.html#L24): ten-option language selector. Four Kenyan Indigenous-language options are marked as unreviewed drafts.
- [index.html](index.html#L37): screen read-aloud, stop-reading, and general help controls.
- [index.html](index.html#L43): persistent demo and language disclosure.
- [index.html](index.html#L64): account access screen container.
- [index.html](index.html#L77): new demo profile form: name, phone, six-digit PIN, starting balance, budget, currency, and language.
- [index.html](index.html#L139): returning-user sign-in form; checks the locally stored demo credential hash.
- [index.html](index.html#L155): dashboard container.
- [index.html](index.html#L192): expense form and category selection.
- [index.html](index.html#L237): voice question button. Browser speech recognition support and microphone permission are required; the adjacent notice warns speech may be processed by the browser provider.
- [index.html](index.html#L249): savings goal form.
- [index.html](index.html#L258): demo wallet-to-savings transfer form.
- [index.html](index.html#L269): spending-by-category chart container.
- [index.html](index.html#L274): recent activity list container.
- [index.html](index.html#L279): copyright notice; confirm ownership and notice before publishing or licensing.

HTML `id` attributes are the link between the page and the JavaScript. Renaming an ID requires updating the corresponding lookup in [index.js](index.js#L3).

## 5. JavaScript Map: `index.js`

### Startup and data model

- [index.js](index.js#L1): waits for the HTML document to be ready before looking up controls and registering event handlers.
- [index.js](index.js#L2): localStorage key for the versioned demo profile.
- [index.js](index.js#L3): caches page elements by ID so event handlers and render functions can update them.
- [index.js](index.js#L23): base hand-written UI translations.
- [index.js](index.js#L85): per-language assistant labels, keywords, response templates, speech locales, and review flags.
- [index.js](index.js#L154): localized accessibility-control and microphone privacy labels.
- [index.js](index.js#L181): loads a local demo profile from browser storage.

### Storage and local PIN demo

 [index.js](index.js#L191): writes changed demo profile, language, and transactions to localStorage.
 [index.js](index.js#L85): writes a status message and error styling to a form status element.
 [index.js](index.js#L90): switches between account creation and sign-in forms.
 [index.js](index.js#L101): converts cryptographic bytes to hexadecimal text for storage.
- [index.js](index.js#L222): derives a salted PBKDF2-SHA-256 PIN hash using Web Crypto. Browser-side hashing does not secure editable localStorage or make a six-digit PIN strong enough for production.

The saved demo record contains a phone number, PIN salt and hash, profile values, and transactions. It is one profile per browser storage key. There is no server identity, session revocation, multi-device access, recovery, rate limiting, or operator/admin account.

### Rendering and calculations

- [index.js](index.js#L230): builds transaction list nodes with `textContent`.
- [index.js](index.js#L255): totals expense transactions by category; transfers are excluded.
- [index.js](index.js#L291): updates balance, budget, savings progress, warnings, activity, and chart.
- [index.js](index.js#L326): applies selected UI language, persists it for the local profile, and shows a draft-review notice where needed.

Expense entry rejects invalid or over-balance amounts, lowers the demo wallet balance, raises total spending, and records an expense. A wallet-to-savings transfer lowers available demo funds and raises demo savings, but does not increase spending. See [index.js](index.js#L358) and [index.js](index.js#L384).

### Help and accessibility

- [index.js](index.js#L362): matches helper questions against a small selected-language keyword list.
- [index.js](index.js#L368): fills selected-language demo response templates for savings, budget, balance, and help. This is scripted help, not a generative AI agent or financial advice.
- [index.js](index.js#L383): speaks screen or assistant text only when the device has a matching voice.
- [index.js](index.js#L408): displays user text and the localized helper reply.
- [index.js](index.js#L448): requests browser speech recognition in the selected locale. Availability and processing vary by browser/provider; users should not speak credentials.
- [index.js](index.js#L502): reads the active screen aloud.
- [index.js](index.js#L513): connects the speak button to voice recognition.

### User actions

- [index.js](index.js#L520): creates and saves a local demo profile.
- [index.js](index.js#L551): signs in to the local demo profile.
- [index.js](index.js#L570): records an expense and rejects over-balance amounts.
- [index.js](index.js#L586): saves a savings target.
- [index.js](index.js#L596): performs a demo wallet-to-savings transfer.
- [index.js](index.js#L610): locks the UI and returns to local sign-in; it is not server logout.
- [index.js](index.js#L620): selects create or sign-in mode at startup.

## 6. Styling Map: `style.css`

- [style.css](style.css#L1): global sizing reset and shared design variables.
- [style.css](style.css#L251): demo disclosure.
- [style.css](style.css#L261): account access tabs.
- [style.css](style.css#L295): savings and transfer layout.
- [style.css](style.css#L347): category chart.
- [style.css](style.css#L462): dashboard summary cards.
- [style.css](style.css#L524): expense and help columns.
- [style.css](style.css#L578): scrolling assistant conversation.
- [style.css](style.css#L634): microphone privacy notice.
- [style.css](style.css#L722): footer.
- [style.css](style.css#L736): tablet breakpoint; [style.css](style.css#L758) contains phone rules.

## 7. Current Capabilities and Limits

| Area | What works now | What it does not do |
|---|---|---|
| Accounts | One local profile with a PIN hash and lock/sign-in screen | No verified identity, production login, account recovery, or multi-device sync |
| Money | Editable demo balance, budgets, expenses, savings goals, and demo transfers | No ledger, deposits, withdrawals, settlement, or real bank transfer |
| Security | Basic form validation, salted PIN derivation, safe text rendering, and a restrictive CSP meta tag | No server-side authorization, tamper protection, encrypted database, rate limiting, fraud controls, or security monitoring |
| Languages and speech | Ten selectable options; Chinese and French copy; Dholuo, Kikuyu, Kikamba, and Ekegusii draft packs; optional selected-locale speech | Indigenous-language drafts are unreviewed; no guaranteed recognition or speech voice; not 100+ reviewed languages |
| Assistant | Local keyword replies to typed or spoken questions; optional spoken answers | No live AI model, customer-care team, general language understanding, or bank connection |
| Currencies | Ten currency display formats | No FX conversion, pricing, local settlement, or market-specific currency rules |
| Admin | No operator tools | No user administration, permissions, audit reports, support queue, or system configuration |

A language name in a selector is not proof of full support. The Dholuo, Kikuyu, Kikamba, and Ekegusii text is draft wording that must be reviewed by speakers from those communities before financial use. Speech recognition may be handled by browser services; never dictate PINs, passwords, or account numbers.

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

## 9. Presentation Notes

- [presentation.md](presentation.md): editable presentation outline and speaker notes. The standalone presentation HTML was removed to keep this folder focused on the GitHub Pages app.

Keep presentation claims aligned with the prototype limits in section 7.
