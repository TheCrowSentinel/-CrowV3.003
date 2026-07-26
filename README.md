# Pay with Crow v3.003

A responsive merchant-payment mediation prototype.

## Included

- Mobile-first landing page
- Pay with Crow checkout demonstration
- Transaction-state visualization
- Merchant integration example
- Security-boundary documentation
- Automated dispute workflow concept
- Progressive Web App manifest
- GitHub Pages-compatible static files

## Run locally

Open `index.html` directly in a modern browser, or serve the folder with a local HTTP server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

1. Create a new public repository.
2. Upload the **contents** of this folder, not the enclosing ZIP file.
3. Commit to the `main` branch.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select `main` and `/ (root)`, then save.

## Safety boundary

This release is a visual and architectural prototype. It does not process payments, hold funds, create legal escrow, connect to a bank, adjudicate real disputes, or store financial credentials.

A production release would require regulated payment partners, legal review, licensing analysis, KYC/AML controls, privacy compliance, security testing, incident response, and audited infrastructure.
