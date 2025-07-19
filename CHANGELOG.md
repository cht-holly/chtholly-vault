# Changelog

All notable changes to the Crypto Portfolio Monitoring App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial requirements document for Crypto Portfolio Monitoring App
- Privacy-first design approach with local storage only
- CoinGecko API integration specification
- Comprehensive user experience requirements
- Technical architecture specifications
- Changelog document for tracking all future updates
- Detailed cryptocurrency list retrieval via CoinGecko `/coins/list` endpoint
- User-configurable price refresh intervals (30s to 10 minutes)
- Crypto asset discovery and search functionality
- Enhanced data structures for price management
- Performance optimizations for large portfolios
- Core application implementation:
  - TypeScript interfaces for crypto portfolio management
  - CoinGecko API service with rate limiting and caching
  - Zustand state management for portfolio data
  - Crypto search component with autocomplete
  - Add asset dialog with quantity input
  - Edit asset dialog for updating positions
  - Portfolio dashboard with real-time updates
  - Utility functions for data formatting
  - Dialog UI component for modal interactions
  - Auto-navigation to portfolio when assets exist

### Changed
- Updated API integration details with accurate CoinGecko rate limits
- Enhanced data structures to include refresh intervals and price tracking
- Improved settings UI to include refresh interval configuration
- Updated information architecture to include real-time update indicators
- Clarified price refresh default to 1 minute with user configuration options
- Replaced demo application with crypto portfolio monitoring functionality
- Updated main App component to show portfolio dashboard
- Fixed navigation bar to only show buttons when needed
- Improved portfolio asset management with edit functionality

### Removed
- Export data functionality (simplified scope)
- Demo content and example components from original template

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

---

## Guidelines for Changelog Updates

### Categories
- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

### Format
- Use semantic versioning (MAJOR.MINOR.PATCH)
- Keep an "Unreleased" section at the top
- Add release dates for each version
- Group changes by type (Added, Changed, etc.)
- Write clear, concise descriptions
- Include relevant issue/PR numbers when applicable

### When to Update
- Every new feature or component addition
- Every bug fix or improvement
- Every breaking change
- Every security update
- Before each release

---

**Last Updated**: 2025-07-18  
**Document Version**: 1.0