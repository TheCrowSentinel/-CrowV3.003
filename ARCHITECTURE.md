# Crow v3.003 Architecture

## System layers

1. **Buyer and merchant interfaces**
   - Responsive checkout
   - Merchant dashboard
   - Transaction status
   - Dispute submission

2. **Crow application API**
   - Creates transaction records
   - Validates merchant and order references
   - Applies authorization rules
   - Emits audit events

3. **Payment partner adapter**
   - Exchanges provider tokens
   - Reads funding and settlement states
   - Never exposes raw card, bank, seed, or private-key data to Crow

4. **Transaction state machine**
   - `CREATED`
   - `AUTHORIZED`
   - `SECURED`
   - `FULFILLMENT_PENDING`
   - `DELIVERED`
   - `RELEASE_ELIGIBLE`
   - `DISPUTED`
   - `UNDER_REVIEW`
   - `REFUND_RECOMMENDED`
   - `RELEASE_RECOMMENDED`
   - `CLOSED`

5. **Dispute service**
   - Pauses automated release
   - Classifies claim type
   - Collects evidence
   - Enforces submission deadlines
   - Recommends an outcome
   - Escalates uncertain or high-risk cases

6. **Audit and monitoring**
   - Append-only event records
   - Access logs
   - Security alerts
   - Operational metrics

## Prohibited data

Crow must reject or avoid storing:

- Seed phrases
- Private keys
- Recovery phrases
- Raw card numbers
- CVV values
- Online banking passwords
- Authentication codes
- Government ID images outside an approved identity provider
