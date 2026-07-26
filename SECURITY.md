# Security Model

## Core controls

- Tokenization through regulated providers
- TLS for all production traffic
- Least-privilege role-based access control
- Multi-factor authentication for privileged users
- Server-side validation
- Rate limiting
- CSRF protection
- Content Security Policy
- Secure cookies
- Secret-manager storage for server credentials
- Dependency scanning
- Centralized logging and alerting
- Regular backups and recovery testing
- Independent penetration testing before launch

## Secret rejection logic

A production API should reject fields or content patterns associated with wallet secrets, private keys, recovery phrases, passwords, and one-time authentication codes.

The browser-only prototype does not collect or transmit those values.
