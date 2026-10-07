# BankingGo Presentation

## Slide 1 — Overview
BankingGo is a simple banking and budgeting platform designed to help people manage their money clearly, safely, and confidently.

## Slide 2 — Problem
Many people cannot use banking apps because the language is too complex, the steps feel difficult, and they do not understand the terms. This excludes people who are literate, low-literacy, or speak local languages.

## Slide 3 — What BankingGo solves
The app helps users to:
- open a simple account quickly
- choose a language they understand
- track balance and monthly budgets
- make spending decisions with less stress
- receive AI guidance from BankingGo

## Slide 4 — Why this matters
- It is designed for both literate and low-literacy users.
- It offers English, Kiswahili, Yoruba, Luganda, Mandarin Chinese, French, Dholuo, Kikuyu, Kikamba, and Ekegusii. The four Kenyan Indigenous-language packs are drafts that need community review.
- It can read the active screen aloud when the device has a matching installed speech voice.
- Users can ask questions by voice when their browser supports speech recognition and grants microphone permission; typing remains available.
- The platform provides clear warnings before overspending.
- It removes confusion and fear from everyday financial decisions.

## Slide 5 — Why I built it
I built BankingGo because many people in my community need a banking tool that is simple, inclusive, and easy to understand. I want financial services to help people save, plan, and grow rather than confuse them.

## Slide 6 — Security, ownership, and launch readiness
- The browser prototype hashes a six-digit PIN with a random salt, stores demo data locally, validates common inputs, and applies a restrictive content security policy.
- A browser-only app is not tamper-proof. Users can inspect or change its source and local storage. Do not enter real banking credentials or customer data.
- BankingGo is not a licensed bank, does not connect to a bank, and does not move real money. Transfers only move demo funds between demo wallet and savings.
- The BankingGo helper uses local guided responses; it is not connected to a generative AI service.
- Speech recognition may be processed by the browser provider. Users should never dictate PINs, passwords, or account numbers.
- A real launch needs a secure backend, server-verified authentication, encryption, authorization, audit logs, monitoring, backups, incident response, independent penetration testing, and market-specific banking/payment partners and regulatory approval.
- The Dholuo, Kikuyu, Kikamba, and Ekegusii draft wording must be reviewed by fluent community speakers before financial use. Speech output and recognition depend on device/browser language support.
- Copyright notice: © 2026 BankingGo. All rights reserved. A copyright notice does not by itself stop copying or hacking. Confirm the owner and obtain qualified legal advice before selling or licensing the product.

## Prototype Features Added
- Sign-up and returning-user PIN sign-in for one local demo profile
- Browser storage persistence for balances, budgets, savings, and transactions
- Savings goal progress and demo wallet-to-savings transfers
- Category spending bars and budget warnings
- Language switching and BankingGo guided help

## Problem BankingGo Solves
BankingGo aims to reduce language and usability barriers that make it hard for people to understand balances, budget for essential spending, and get help with basic money decisions. The prototype demonstrates this experience; it is not yet a production banking platform.
