# Security status

This repository is a historical prototype and is not supported for production deployment.

A database connection credential was previously committed to this repository. It must be treated as compromised even though the current branch no longer embeds it. Removing a value from the current file does not remove it from Git history, forks, caches, or prior clones.

Required incident actions:

1. revoke or rotate the historical MongoDB Atlas account credential;
2. review Atlas users, network access, logs, and billing history;
3. purge secret-bearing commits using a reviewed history-rewrite and rollback procedure;
4. notify collaborators to discard or reclone affected copies;
5. verify the rewritten repository with secret scanning before restoring normal development.

The clean replacement implementation is maintained in the private `Clinscott/WebsiteFraudFinder` repository. Do not copy historical Git objects into that repository.

Please do not report security issues through a public issue containing credentials or exploit details.
