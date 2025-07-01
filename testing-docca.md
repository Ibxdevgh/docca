# 🧪 Testing Docca

This document outlines the testing strategies for Docca's frontend, backend, and Web3 (Solana) minting flow.

---

## ✅ Goals

* Ensure agent logic and API endpoints work as intended
* Validate wallet authentication and access control
* Simulate NFT minting without real SOL cost
* Test UI flows including onboarding and agent chat

---

## 🧠 Backend Testing (FastAPI)

### Tools:

* `pytest`
* `httpx` for test client
* `unittest.mock` or `pytest-mock`

### What to test:

* [ ] Signature verification endpoint
* [ ] Chat completion response from OpenAI
* [ ] NFT minting call to Solana SDK (mocked)
* [ ] Ownership verification logic

### Sample:

```python
from fastapi.testclient import TestClient
from app.main import app

def test_auth_signature():
    client = TestClient(app)
    res = client.post("/auth/verify", json={"wallet": "...", "signature": "..."})
    assert res.status_code == 200
```

---

## 🌐 Frontend Testing (React)

### Tools:

* `Vitest` for unit tests
* `React Testing Library` for UI
* `Playwright` for E2E tests

### What to test:

* [ ] Trait selector functionality
* [ ] Wallet connect + sign message
* [ ] Flow from onboarding → preview → mint
* [ ] Chat UI component

### Example:

```tsx
import { render, screen } from "@testing-library/react"
import TraitPicker from "../components/TraitPicker"

test("shows tone options", () => {
  render(<TraitPicker />)
  expect(screen.getByText("Witty")).toBeInTheDocument()
})
```

---

## 🧱 Smart Contract Testing (Solana / Metaplex)

### Tools:

* Use Solana **devnet** (`https://api.devnet.solana.com`)
* `@metaplex-foundation/js`
* `solana-cli` and `mocha` or `ava` for JS tests

### Strategy:

* [ ] Mint to devnet wallet with airdropped SOL
* [ ] Upload sample metadata to IPFS
* [ ] Validate minted token metadata

### Sample:

```ts
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { createNft } from '@metaplex-foundation/mpl-token-metadata'

test('mints agent NFT', async () => {
  const umi = createUmi('https://api.devnet.solana.com')
  const kp = umi.eddsa.generateKeypair()
  umi.useWallet(kp)

  const nft = await createNft(umi, {
    uri: 'https://ipfs.io/ipfs/agent.json',
    name: 'Docca Agent',
    sellerFeeBasisPoints: 500,
  }).sendAndConfirm(umi)

  expect(nft.signature).toBeDefined()
})
```

---

## 🧪 Testing Directory Structure

```bash
/tests
├── backend
│   └── test_auth.py
│   └── test_chat.py
├── frontend
│   └── traitPicker.test.tsx
│   └── e2e.test.ts
├── web3
│   └── mintAgent.test.ts
```

---

## 🧩 Future Enhancements

* Mock on-chain Solana state for unit tests
* Snapshot testing for agent prompt templates
* Parallel test CI with GitHub Actions
* Rate limit and abuse testing

---

## 📌 Notes

* Always test on devnet first
* Use disposable wallets for minting tests
* Protect production RPCs with rate limits or token gating
