# FraudFinder — historical prototype

This public repository preserves the original 2022–2023 FraudFinder web prototype. It is retained for provenance and learning history; it is **not supported or safe for production deployment**.

The prototype explored a legitimate defensive concept:

1. normalize a protected domain;
2. generate deterministic look-alike labels;
3. compare them with a registry-zone corpus;
4. enrich observed registrations with WHOIS-style evidence;
5. present possible impersonation candidates for review.

The historical implementation contains known correctness, concurrency, reproducibility, dependency, and security defects. In particular, a database credential was previously committed. The current tip no longer embeds it, but it remains compromised until revoked/rotated and historical Git objects are separately remediated. Read [`SECURITY.md`](SECURITY.md).

The maintained clean-room replacement is developed in the private `Clinscott/WebsiteFraudFinder` repository. It uses request-local state, bounded deterministic generation, explicit evidence states, integrity-checked sharded corpora, live registry gates, isolated website rendering, explainable content/visual similarity, and automated security/scale verification.

Do not copy this repository's historical Git objects into the replacement repository. Do not deploy this prototype, and do not treat a registered look-alike domain as proof of fraud.
