# Crypto Portfolio Monitoring App - Requirements Document

## Project Overview

A privacy-focused, frontend-only cryptocurrency portfolio monitoring application built on the Chtholly UI library. The app enables users to track their crypto holdings, visualize portfolio performance, and analyze asset distributions without compromising privacy through complete local data storage.

## Core Value Proposition

**Privacy-First Design**: All data stored locally in browser storage - no backend servers, no data transmission, complete user privacy and control.

## Target Audience

- Privacy-conscious cryptocurrency investors
- Individual traders and HODLers
- Users seeking simple, clean portfolio tracking
- Anyone wanting to avoid sharing financial data with third parties

## Functional Requirements

### 1. Portfolio Management
- **Add/Edit Holdings**: Users can add cryptocurrency holdings with quantity amounts via searchable crypto list
- **Remove Holdings**: Users can delete cryptocurrencies from their portfolio
- **Real-time Pricing**: Integration with CoinGecko API for current market prices (1-minute refresh intervals)
- **Portfolio Value**: Calculate and display total portfolio value in USD
- **Historical Tracking**: Store historical snapshots of portfolio value (local storage)
- **Crypto Search**: Search and select from 17,000+ cryptocurrencies via CoinGecko API
- **Configurable Refresh**: User-configurable price refresh intervals (30 seconds to 10 minutes)

### 2. Data Visualization
- **Portfolio Chart**: Interactive chart showing total portfolio value over time
- **Asset Breakdown**: Pie chart showing portfolio distribution by asset
- **Performance Metrics**: Display gains/losses, percentage changes
- **Market Data**: Show individual coin prices, 24h changes, market cap

### 3. User Interface
- **Clean, Minimal Design**: Focus on essential features without clutter
- **Mobile-First**: Responsive design optimized for all devices
- **Dark/Light Mode**: Theme switching with system preference detection
- **Intuitive Navigation**: Simple, clear user flow
- **Engaging Animations**: Smooth transitions and micro-interactions
- **Real-time Updates**: Visual indicators for price updates and refresh status
- **Customizable Settings**: Easy configuration of refresh intervals and preferences

### 4. Data Storage
- **Local Storage**: All portfolio data stored in browser's localStorage
- **No Authentication**: No user accounts or login required
- **Data Persistence**: Portfolio data persists across browser sessions

## Technical Requirements

### 1. Architecture
- **Frontend-Only**: Pure client-side application
- **React + TypeScript**: Built on existing Chtholly UI template
- **Vite Build System**: Fast development and optimized production builds
- **Component Library**: Utilize shadcn/ui components from template

### 2. External Dependencies
- **CoinGecko API**: Public/Demo API for cryptocurrency data (Demo API recommended for stability)
- **Chart Library**: Recharts for data visualization
- **Date Handling**: date-fns for time-based calculations
- **State Management**: Zustand for application state
- **HTTP Client**: Axios or fetch for API calls with retry logic

### 3. Data Structure
```typescript
interface CryptoAsset {
  id: string; // CoinGecko ID (required for API calls)
  symbol: string; // e.g., "BTC"
  name: string; // e.g., "Bitcoin"
  quantity: number; // User's holdings
  purchasePrice?: number; // Optional: user's average purchase price
  addedDate: Date; // When user added this asset
  currentPrice?: number; // Current market price
  priceChange24h?: number; // 24h price change percentage
  lastUpdated?: Date; // When price was last updated
}

interface Portfolio {
  id: string;
  name: string;
  assets: CryptoAsset[];
  createdDate: Date;
  lastUpdated: Date;
  refreshInterval: number; // Price refresh interval in seconds (default: 60)
}

interface PortfolioSnapshot {
  date: Date;
  totalValue: number;
  assetValues: Record<string, number>;
}

interface CryptoListItem {
  id: string; // CoinGecko ID
  symbol: string;
  name: string;
  image?: string; // Logo URL
  marketCap?: number;
  rank?: number;
}

interface AppSettings {
  refreshInterval: number; // Default: 60 seconds
  currency: string; // Default: 'usd'
  theme: 'light' | 'dark' | 'system';
  autoRefresh: boolean; // Default: true
}
```

### 4. API Integration
- **CoinGecko Public/Demo API**: 
  - `/coins/list` - Get complete list of all cryptocurrencies (17,000+ coins)
  - `/coins/markets` - Get current prices and market data for selected coins
  - `/coins/{id}/market_chart` - Get historical price data
  - **Rate Limiting**: 
    - Public API: 5-15 calls/minute (unreliable)
    - Demo API: 30 calls/minute, 10,000/month (recommended)
  - **Error Handling**: Graceful handling of API failures with retry logic
  - **Caching**: Implement client-side caching to reduce API calls
  - **Batch Requests**: Request multiple coin data in single API call
  - **Update Frequency**: Data updated every 1-5 minutes on CoinGecko side
  - **Fallback**: Implement fallback mechanisms for API downtime

- **Yahoo Finance Exchange Rate API**:
  - Currency pair symbols: `SGD=X`, `MYR=X`, `SGDMYR=X`
  - **Free Access**: No API key required, public endpoints
  - **Rate Limiting**: Similar frequency to crypto price updates
  - **Supported Currencies**: USD, SGD, MYR with cross-rates
  - **Update Frequency**: Real-time during market hours
  - **Fallback**: Default to USD if exchange rates fail

## Cryptocurrency Data Management

### 1. Crypto Asset Discovery
- **Initial Load**: Fetch complete cryptocurrency list from CoinGecko `/coins/list` endpoint
- **Local Caching**: Cache the crypto list locally to avoid repeated API calls
- **Search Functionality**: Fast, fuzzy search through 17,000+ cryptocurrencies
- **Popular Coins**: Show popular/trending cryptocurrencies prominently
- **Coin Information**: Display symbol, name, market cap, and logo for each coin
- **Selection Process**: Clear visual feedback for selected cryptocurrencies

### 2. Price Data Management
- **Real-time Updates**: Fetch current prices every 1 minute by default
- **Configurable Intervals**: Allow users to set refresh intervals (30s, 1m, 2m, 5m, 10m)
- **Batch Requests**: Request multiple coin prices in single API call for efficiency
- **Visual Indicators**: Show last updated time and loading states
- **Auto-pause**: Pause updates when browser tab is not active
- **Manual Refresh**: Allow users to manually trigger price updates

### 3. Data Persistence
- **Crypto List Caching**: Cache full cryptocurrency list for 24 hours
- **Price Caching**: Cache price data for configured refresh interval
- **Settings Storage**: Store user preferences (refresh interval, currency)
- **Portfolio History**: Store portfolio value snapshots for trend analysis

## User Experience Requirements

### 1. Onboarding Flow
1. **Welcome Screen**: Highlight privacy-first approach
2. **Initial Setup**: Load cryptocurrency list from CoinGecko API (one-time, cached locally)
3. **Quick Setup**: Simple process to add first cryptocurrency via search
4. **Portfolio Overview**: Immediate view of portfolio value and breakdown
5. **Feature Discovery**: Subtle guidance for key features including refresh settings

### 2. Core User Flows
- **Add Asset**: Search from 17,000+ coins → Select coin → Enter quantity → Save to portfolio
- **View Portfolio**: See total value → View breakdown → Access charts → Monitor real-time updates
- **Edit Holdings**: Select asset → Modify quantity → Update portfolio
- **Analyze Performance**: View charts → Compare timeframes → Review metrics
- **Configure Settings**: Adjust refresh intervals → Set preferences → Manage data

### 3. Information Architecture
```
Home/Dashboard
├── Portfolio Overview (Total Value, 24h Change, Last Updated)
├── Holdings List (Assets with current values, price changes)
├── Charts & Analytics
│   ├── Portfolio Value Chart
│   ├── Asset Distribution Pie Chart
│   └── Performance Metrics
└── Settings
    ├── Refresh Interval Configuration (30s - 10min)
    ├── Auto-refresh Toggle
    ├── Currency Selection (USD, EUR, BTC, ETH)
    ├── Theme Toggle
    └── Privacy Information
```

## Design Requirements

### 1. Visual Design
- **Color Scheme**: Leverage existing Chtholly UI purple/indigo theme
- **Typography**: Responsive text scaling, clear hierarchy
- **Spacing**: Consistent padding and margins
- **Icons**: Lucide React icons for consistency

### 2. Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: < 640px
  - Tablet: 640px - 1024px  
  - Desktop: > 1024px
- **Touch Targets**: Minimum 44px for mobile usability

### 3. Accessibility
- **WCAG 2.1 AA**: Meet accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: Maintain proper contrast ratios

## Privacy & Security Requirements

### 1. Data Privacy
- **No Data Transmission**: All data stays on user's device
- **No Analytics**: No usage tracking or analytics
- **No Cookies**: Minimal cookie usage (theme preference only)
- **Clear Privacy Policy**: Transparent about data handling

### 2. Security Considerations
- **Input Validation**: Sanitize all user inputs
- **XSS Prevention**: Prevent cross-site scripting
- **API Security**: Secure external API communications
- **Local Storage**: Encrypt sensitive data in localStorage

## Performance Requirements

### 1. Loading Performance
- **First Paint**: < 1 second on 3G connection
- **Interactive**: < 3 seconds on 3G connection
- **Bundle Size**: < 500KB gzipped
- **Code Splitting**: Lazy load non-critical components
- **Initial Crypto List**: Cache crypto list locally to avoid repeated API calls
- **Smart Caching**: Implement intelligent caching for price data

### 2. Runtime Performance
- **Smooth Animations**: 60fps animations
- **API Response**: Handle slow API responses gracefully
- **Memory Usage**: Efficient memory management
- **Battery Impact**: Minimal battery drain on mobile
- **Refresh Optimization**: Intelligent refresh scheduling based on user activity
- **Background Updates**: Pause updates when tab is not visible

## Phase 2 Features (In Development)

### Charts and Analytics
- **Individual Asset Charts**: Historical price charts for each cryptocurrency
- **Portfolio Value Chart**: Track total portfolio value over time
- **Simple Price-Based Charts**: Focus on price movements without technical indicators
- **Interactive Charts**: Zoom, pan, and tooltip interactions
- **Multi-Currency Display**: Show values in USD, SGD, MYR

### Multi-Currency Support
- **Currency Selection**: Choose between USD, SGD, MYR for display
- **Real-time Exchange Rates**: Yahoo Finance API integration
- **Currency Conversion**: Convert all crypto values to selected currency
- **Cross-Currency Calculations**: Handle SGD/MYR direct conversions

## Future Enhancements (Phase 3+)

### Advanced Features
- **Multiple Portfolios**: Support for multiple portfolio tracking
- **Price Alerts**: Local notifications for price changes
- **Advanced Charts**: Technical indicators and advanced analytics
- **Transaction History**: Track buy/sell transactions
- **Advanced Analytics**: More detailed performance metrics and insights

### Integration Features
- **DeFi Integration**: Track DeFi positions and yields
- **NFT Portfolio**: Basic NFT portfolio tracking
- **Tax Reporting**: Generate tax reports
- **Backup/Sync**: Encrypted cloud backup options

## Success Metrics

### 1. User Engagement
- **Time on Site**: Average session duration
- **Feature Usage**: Most used features
- **Return Rate**: User retention metrics
- **Portfolio Size**: Average number of assets tracked

### 2. Technical Performance
- **Page Load Speed**: Core Web Vitals metrics
- **API Success Rate**: Successful API calls percentage
- **Error Rate**: Application error frequency
- **Mobile Usage**: Mobile vs desktop usage patterns

## Development Approach

### 1. Methodology
- **Agile Development**: Iterative development approach
- **Component-First**: Build reusable components
- **Test-Driven**: Write tests for critical functionality
- **Documentation**: Maintain comprehensive documentation

### 2. Phases
1. **Phase 1**: Core portfolio functionality
2. **Phase 2**: Advanced charts and analytics
3. **Phase 3**: Enhanced features and optimizations

### 3. Quality Assurance
- **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge
- **Device Testing**: iOS, Android, desktop
- **Performance Testing**: Load testing and optimization
- **Security Testing**: Vulnerability assessment

## Documentation Requirements

### 1. Technical Documentation
- **README**: Setup and development instructions
- **API Documentation**: External API integrations
- **Component Documentation**: Reusable component guide
- **Deployment Guide**: Production deployment steps

### 2. User Documentation  
- **User Guide**: How to use the application
- **Privacy Policy**: Data handling and privacy
- **FAQ**: Common questions and answers
- **Troubleshooting**: Common issues and solutions

## Change Management

### 1. Version Control
- **Git Workflow**: Feature branches and pull requests
- **Semantic Versioning**: Follow semver for releases
- **Changelog**: Maintain detailed changelog.md
- **Release Notes**: Document new features and fixes

### 2. Update Process
- **Automated Testing**: CI/CD pipeline for testing
- **Staging Environment**: Test changes before production
- **Rollback Plan**: Ability to revert changes
- **User Communication**: Notify users of significant changes

## Risk Assessment

### 1. Technical Risks
- **API Dependencies**: CoinGecko API availability and rate limits
- **Browser Compatibility**: localStorage support
- **Performance**: Large portfolio handling (100+ assets)
- **Security**: Client-side data protection
- **API Rate Limits**: Exceeding free tier limits
- **Data Accuracy**: Reliance on third-party price data

### 2. Mitigation Strategies
- **API Tier Selection**: Use Demo API for better reliability
- **Progressive Enhancement**: Graceful degradation
- **Optimization**: Code splitting and caching
- **Security**: Input validation and sanitization
- **Rate Limit Management**: Implement request queuing and batching
- **Error Recovery**: Retry mechanisms and offline support

---

## Important Notes

1. **Changelog Requirement**: All subsequent updates, modifications, and enhancements must be documented in `CHANGELOG.md`
2. **Privacy First**: This requirement cannot be compromised - all data must remain local
3. **Simplicity**: Avoid feature creep - focus on core portfolio tracking functionality
4. **Mobile Experience**: Mobile users should have equal functionality to desktop users
5. **No Authentication**: The app should work immediately without any setup barriers

## Approval and Next Steps

This requirements document should be reviewed and approved before development begins. Once approved, the next steps are:

1. Create detailed technical architecture document
2. Design user interface mockups and prototypes  
3. Set up development environment and project structure
4. Begin Phase 1 implementation

---

**Document Version**: 1.1  
**Created**: 2025-07-18  
**Last Updated**: 2025-07-18  
**Status**: Updated - Pending Approval

### Version 1.1 Updates
- Added detailed cryptocurrency list retrieval specifications
- Clarified price refresh intervals (default: 1 minute, configurable)
- Added user-configurable refresh settings in UI
- Updated API integration details with accurate rate limits
- Enhanced data structures for better price management
- Added crypto asset discovery and search functionality
- Improved performance and caching strategies