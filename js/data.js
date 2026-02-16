/* ====================================================
   THE WISE GROUP — Solution Data
   Update scores, descriptions, and features here.
   The HTML will be generated from this data.
   ==================================================== */

const SOLUTIONS = [
  {
    id: 1,
    title: "Real-Time Utilities Tracking & Rewards System",
    badge: "Human-Generated",
    badgeClass: "badge--human",
    isWinner: true,
    isNew: true,
    description: "A digital platform integrated into the MyUnite app that provides students with real-time visibility of their energy and water consumption, combined with a gamified rewards system that incentivises sustainable usage behaviours through tiered rewards (Bronze, Silver, Gold) and redeemable vouchers.",
    features: [
      "Real-time energy and water usage dashboard with smart meter integration",
      "AI-powered benchmarking against similar flats and historical averages",
      "Tiered rewards programme (Bronze, Silver, Gold) with milestone badges",
      "Redeemable voucher system (campus food, gym, local retailers)",
      "Social comparison and flat-level leaderboards",
      "Personalised AI nudges and sustainability tips"
    ],
    benefits: "Reduces Unite Students' £30.5M annual utility costs through behavioural change, enhances student engagement and satisfaction, supports ESG/sustainability reporting, and addresses the 'moral hazard' problem of all-inclusive billing.",
    strategicChallenge: "Unite Students faces rising utility costs (£30.5M in FY2024) with limited ability to pass costs to students due to all-inclusive rental models. The absence of consumption visibility creates a 'moral hazard' where students have no incentive to conserve.",
    keyData: "69% of students want control over energy usage; 85% prioritise bills-included accommodation; £30.5M utility costs in FY2024; 58% check sustainability features when choosing accommodation.",
    references: "Allen (2025); Biggs (2025); Unipol/NUS (2025); Ivanova et al. (2025)",
    scores: {
      orgRelevance: 5,
      viability: 4,
      customerValue: 5,
      competitiveEdge: 3,
      total: 17
    },
    drawbacks: "Requires significant upfront investment in IoT smart meters across the property portfolio. Integration complexity with existing building management systems. Risk of low adoption if rewards are not sufficiently attractive. Privacy concerns around granular usage monitoring."
  },
  {
    id: 2,
    title: "Student Financial Wellness & Lifestyle Hub",
    badge: "Human-Generated",
    badgeClass: "badge--human",
    isWinner: false,
    isNew: true,
    description: "A comprehensive digital platform within MyUnite that provides students with budgeting tools, financial literacy resources, local discount partnerships, and lifestyle management features to support their overall wellbeing during university.",
    features: [
      "Personal budget tracker and expense categorisation",
      "Financial literacy modules and interactive guides",
      "Local discount marketplace and partner offers",
      "Rent payment scheduling and reminders",
      "Wellbeing resources and support signposting",
      "Community events and social features"
    ],
    benefits: "Increases student satisfaction and retention, creates additional revenue streams through partnerships, differentiates Unite from competitors, and addresses the cost-of-living crisis affecting student choices.",
    strategicChallenge: "76% of students prioritise affordability when choosing accommodation. The cost-of-living crisis is putting pressure on student budgets and affecting accommodation choice decisions.",
    keyData: "76% prioritise affordability; HEPI (2024) reports rising costs of being a student in London; 85% want bills-included to manage budgets.",
    references: "HEPI (2024); Unipol/NUS (2025); Knight Frank (2025)",
    scores: {
      orgRelevance: 3,
      viability: 4,
      customerValue: 3,
      competitiveEdge: 3,
      total: 13
    },
    drawbacks: "Not directly aligned with Unite's core operational challenges (utility costs, maintenance). Financial wellness tools already exist from banks and fintech apps. Limited competitive moat. Revenue model unclear beyond partnerships."
  },
  {
    id: 3,
    title: "FloodGuard Predictive Risk Platform",
    badge: "AI-Generated",
    badgeClass: "badge--ai",
    isWinner: false,
    isNew: true,
    description: "An AI-driven predictive analytics platform that uses environmental data, weather forecasting, and historical flood patterns to assess and mitigate flood risk across Unite Students' property portfolio, enabling proactive asset protection and insurance optimisation.",
    features: [
      "Real-time flood risk monitoring using environmental sensor data",
      "Predictive modelling with machine learning algorithms",
      "Automated early warning system for property managers",
      "Insurance risk scoring and premium optimisation",
      "Historical incident tracking and trend analysis",
      "Integration with local authority flood defence data"
    ],
    benefits: "Protects Unite's £5.9B property portfolio from flood damage, reduces insurance premiums through proactive risk management, supports long-term asset strategy and site selection for new developments.",
    strategicChallenge: "Climate change is increasing flood risk to UK properties. Unite's large property portfolio across multiple UK cities is exposed to varying levels of environmental risk that could impact asset values and operational continuity.",
    keyData: "Unite's portfolio valued at £5.9B; Climate risk is a growing factor in property valuation; Insurance costs rising due to increased flood events.",
    references: "Biggs (2025); Knight Frank (2025); Corlett (2022)",
    scores: {
      orgRelevance: 4,
      viability: 4,
      customerValue: 4,
      competitiveEdge: 3,
      total: 15
    },
    drawbacks: "Limited direct impact on student experience or satisfaction. Flood risk, while real, is not Unite's most pressing operational challenge. Requires specialist environmental data science expertise. ROI difficult to demonstrate until a flood event occurs."
  },
  {
    id: 4,
    title: "AI Predictive Service & Maintenance Hub (PSM-Hub)",
    badge: "AI-Generated",
    badgeClass: "badge--ai",
    isWinner: false,
    isNew: true,
    description: "An AI-powered predictive maintenance platform that uses IoT sensor data from building systems (HVAC, plumbing, electrical) to predict equipment failures before they occur, automatically schedule maintenance, and optimise building performance across Unite's portfolio.",
    features: [
      "IoT sensor integration for real-time equipment monitoring",
      "Machine learning failure prediction algorithms",
      "Automated maintenance scheduling and work order generation",
      "Building performance optimisation dashboards",
      "Tenant impact scoring to prioritise critical repairs",
      "Cost analytics and maintenance budget forecasting"
    ],
    benefits: "Reduces reactive maintenance costs and emergency callouts, improves student satisfaction through fewer disruptions, extends equipment lifespan, and provides data-driven insights for capital expenditure planning.",
    strategicChallenge: "Managing maintenance across a large property portfolio is costly and reactive. Student complaints about maintenance response times affect satisfaction scores and brand reputation.",
    keyData: "Maintenance is a significant operational cost; Student satisfaction surveys highlight maintenance as a key concern; Predictive maintenance can reduce costs by 25-30% (industry benchmarks).",
    references: "EcoSync (2025); Biggs (2025); Giddins (2025)",
    scores: {
      orgRelevance: 4,
      viability: 3,
      customerValue: 5,
      competitiveEdge: 3,
      total: 15
    },
    drawbacks: "Very high implementation cost for IoT sensor deployment across all properties. Requires integration with multiple building management systems of varying age. Data quality dependent on sensor reliability. Long payback period."
  }
];

/* Score labels for display */
const SCORE_LABELS = {
  orgRelevance:    "Org. Relevance",
  viability:       "Viability",
  customerValue:   "Customer Value",
  competitiveEdge: "Competitive Edge"
};

/* Radar chart config colours (aligned with Unite Students palette) */
const CHART_COLORS = [
  { bg: 'rgba(255, 220, 0, 0.15)',  border: '#FFDC00', label: 'Solution 1' },
  { bg: 'rgba(244, 162, 97, 0.15)', border: '#F4A261', label: 'Solution 2' },
  { bg: 'rgba(50, 51, 51, 0.12)',   border: '#323333', label: 'Solution 3' },
  { bg: 'rgba(124, 58, 237, 0.15)', border: '#7C3AED', label: 'Solution 4' }
];

/* Journey Map Data */
const JOURNEY_STAGES = ['Booking', 'Move-In', 'Daily Living', 'Mid-Tenancy', 'End of Tenancy'];

const JOURNEY_AS_IS = {
  actions: [
    'Searches accommodation options, compares prices',
    'Receives keys, sets up room, learns facilities',
    'Uses heating, lighting, water without monitoring',
    'Receives no usage feedback, continues habits',
    'Packs up, checks out, no usage summary'
  ],
  touchpoints: [
    'Website, booking portal, email confirmations',
    'Reception, welcome pack, MyUnite app',
    'Flat kitchen, shared spaces, radiators',
    'MyUnite app (rent only), email from Unite',
    'Check-out form, email confirmation'
  ],
  painPoints: [
    'No info on energy costs or sustainability',
    'No explanation of energy systems or billing',
    'No visibility of usage, no incentive to save',
    'Bill shock anxiety, flatmate conflicts over energy',
    'No feedback on impact, no reward for saving'
  ],
  emotions: ['neutral', 'neutral', 'bad', 'bad', 'bad']
};

const JOURNEY_TO_BE = {
  actions: [
    'Sees Saver Plan badge on listing, checks sustainability rating',
    'Onboarded to Saver Plan dashboard, sets saving goals',
    'Checks daily usage, receives AI tips, earns points',
    'Tracks progress, redeems vouchers, competes on leaderboard',
    'Receives sustainability summary, earns badge, shares impact'
  ],
  touchpoints: [
    'Website with sustainability badge, booking portal',
    'MyUnite app onboarding, Saver Plan welcome screen',
    'Real-time dashboard, push notifications, weekly email',
    'Rewards store, leaderboard, social sharing features',
    'Impact report, sustainability certificate, social share'
  ],
  improvements: [
    'Sustainability info influences decision positively',
    'Clear onboarding creates engagement from day one',
    'Real-time feedback drives 15-20% energy reduction',
    'Gamification maintains engagement, vouchers delight',
    'Positive closure, data for ESG reporting'
  ],
  emotions: ['good', 'good', 'great', 'great', 'great']
};

/* Reference entries — APA v7 format */
const REFERENCES = [
  'Allen, M. (2025). <em>The Unite Group: Annual Results 2024</em>. The Unite Group plc.',
  'Biggs, K. (2025). <em>Annual Report and Accounts 2024</em>. The Unite Group plc.',
  'Bolton, P., Hubble, S., & Lewis, J. (2025). <em>Higher education student numbers</em>. House of Commons Library.',
  'Corlett, P. (2022). A \'Green Premium\' or a \'Brown Discount\'? Exploring the financial implications of sustainability in commercial real estate. <em>Journal of Property Investment & Finance</em>, 40(3), 289–312.',
  'Corpus Christi College Oxford. (2023, February 1). Smart Heating System for Corpus reduces our carbon footprint. <a href="https://www.ccc.ox.ac.uk/about-corpus/whats/news/smart-heating-system-corpus-reduces-our-carbon-footprint" target="_blank">https://www.ccc.ox.ac.uk/about-corpus/whats/news/smart-heating-system-corpus-reduces-our-carbon-footprint</a>',
  'EcoSync. (2025). <em>Smart heating control solutions for student accommodation</em>. EcoSync Ltd.',
  'Giddins, R. (2025). <em>Watkin Jones Group Annual Report and Accounts 2024</em>. Watkin Jones plc.',
  'HEPI. (2024). <em>The costs of being a student in London and the rest of the UK</em>. Higher Education Policy Institute.',
  'Ivanova, D., Kaluzhsky, M., & Sheridan, A. (2025). <em>PUMA Energy LLP Research Report: Student attitudes towards energy consumption in purpose-built accommodation</em>. Nottingham Trent University.',
  'Knight Frank. (2025). <em>UK Student Accommodation Outlook 2025/26</em>. Knight Frank LLP.',
  'Mapify. (2025). <em>Mapify &ndash; AI-powered mindmap generator</em> [Software]. <a href="https://mapify.so" target="_blank">https://mapify.so</a>',
  'Merrick, M. (2025). <em>iQ Student Accommodation sustainability report</em> (Vol. 22, Issue 3). iQ Student Accommodation. <a href="https://www.iqstudentaccommodation.com/sites/default/files/2025-12/ESG_Report_2025_3%201.pdf" target="_blank">https://www.iqstudentaccommodation.com/sites/default/files/2025-12/ESG_Report_2025_3%201.pdf</a>',
  'Prezi. (2025). <em>Prezi &ndash; AI-powered presentation platform</em> [Software]. <a href="https://prezi.com" target="_blank">https://prezi.com</a>',
  'Statista. (2025, November 29). Number of students in the United Kingdom 2015&ndash;2024, by accommodation. <a href="https://www.statista.com/statistics/1117816/number-of-students-united-kingdom-by-accommodation/" target="_blank">https://www.statista.com/statistics/1117816/number-of-students-united-kingdom-by-accommodation/</a>',
  'Team, M. (2025, May 1). Global Student Accommodation (GSA) expands relationship with Measurabl to accelerate sustainability initiatives in Europe. Measurabl. <a href="https://www.measurabl.com/global-student-accommodation-gsa-expands-relationship-with-measurabl-to-accelerate-sustainability-initiatives-in-europe/" target="_blank">https://www.measurabl.com/global-student-accommodation-gsa-expands-relationship-with-measurabl-to-accelerate-sustainability-initiatives-in-europe/</a>',
  'Unipol/NUS. (2025). <em>Accommodation Costs Survey 2024/25: Student housing experiences and preferences</em>. Unipol Student Homes & National Union of Students.'
];
