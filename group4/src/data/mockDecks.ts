import { PresentationDeck } from '../types/presentation';

export const TEMPLATE_DECKS: PresentationDeck[] = [
  {
    id: 'themaster-guide',
    title: 'TheMaster: Executive Problem Structuring & Presentation Engine',
    topic: 'Presentation Masterclass, Rotating Wheel & Kinetic Typography',
    description: 'A comprehensive walkthrough of executive problem decomposition, curated typography pairings (Inter, JetBrains Mono, Be Vietnam Pro, Lora), and PowerPoint-style presenter workflows.',
    author: 'TheMaster Editorial Board',
    authorRole: 'Executive Presentation Architects',
    organization: 'TheMaster Strategy Group',
    date: 'October 2026',
    readTimeMinutes: 12,
    category: 'Problem & Solution',
    theme: 'editorial-stone',
    fontPairing: 'bevietnam-jetbrains',
    coverImage: '/src/assets/images/bghanoi.jpg',
    slides: [
      {
        id: 'tm-1',
        type: 'hero_title',
        title: 'Hanoi',
        subtitle: '',
        categoryKicker: 'GROUP 4',
        notes: 'Opening: Group 4 - Hanoi.',
        timeRecommendationSeconds: 120,
        backgroundImage: '/src/assets/images/bghanoi.jpg',
        data: {}
      },
      {
        id: 'tm-wheel',
        type: 'rotating_wheel',
        title: 'Strategic Architecture & Modular Part Decomposition',
        subtitle: 'Interactive Rotating Multi-Part Radial Dial for Progressive Disclosure',
        categoryKicker: '02. ROTATING MULTI-PART DIAL',
        notes: 'Click anywhere or press Space to rotate through Part 1 (Introduction), Part 2 (Thân bài), and Part 3 (Special Meeting).',
        timeRecommendationSeconds: 150,
        backgroundImage: '/src/assets/images/bg2.jpg',
        data: {
          wheelParts: [
            {
              id: 'part-01',
              partNumber: 'PART 01',
              label: 'Introduction',
              title: 'Introduction',
              description: 'Member List • Why We Chose Hanoi',
              bullets: ['Member List', 'Why We Chose Hanoi'],
              bgImage: '/src/assets/images/bg2.jpg'
            },
            {
              id: 'part-02',
              partNumber: 'PART 02',
              label: 'Body',
              title: 'Body',
              description: 'Culture • Culinary • Summary: Essence of Hanoi',
              bullets: ['Culture', 'Culinary', 'Summary: Essence of Hanoi'],
              bgImage: '/src/assets/images/bg3.jpg'
            },
            {
              id: 'part-03',
              partNumber: 'PART 03',
              label: '???',
              title: '???',
              description: '???',
              bullets: ['???'],
              bgImage: '/src/assets/images/bg4.jpg'
            }
          ]
        }
      },
      {
        id: 'tm-2',
        type: 'team_members',
        title: 'I.Introduction',
        subtitle: 'Group 4 Team Members & Executive Responsibility Matrix',
        categoryKicker: 'PART 01 · INTRODUCTION',
        notes: 'Introduce Group 4 members: Cherry (Leader & Research), Banana (Presenter), Bill (Research), and King (Developer).',
        timeRecommendationSeconds: 120,
        backgroundImage: '/src/assets/images/bg1.jpg',
        data: {
          teamMembers: [
            {
              id: 'mem-1',
              name: 'CHERRY',
              role: 'LEADER & RESEARCH',
              avatar: '/src/assets/images/avt1.jpg',
              iconType: 'owner',
              accentColor: '#fbbf24'
            },
            {
              id: 'mem-2',
              name: 'BANANA',
              role: 'Presenter',
              avatar: '/src/assets/images/avt2.jpg',
              iconType: 'presenter',
              accentColor: '#38bdf8'
            },
            {
              id: 'mem-3',
              name: 'BILL',
              role: 'Research',
              avatar: '/src/assets/images/avt3.jpg',
              iconType: 'research',
              accentColor: '#a855f7'
            },
            {
              id: 'mem-4',
              name: 'KING',
              role: 'Developer',
              avatar: '/src/assets/images/avt4.jpg',
              iconType: 'developer',
              accentColor: '#34d399'
            }
          ]
        }
      },
      {
        id: 'tm-3',
        type: 'solution_architecture',
        title: 'II.Body',
        subtitle: 'Culture',
        categoryKicker: '1. Tangible Cultural Heritage',
        notes: 'Walk through Hanoi tangible cultural heritage sites: Imperial Citadel of Thang Long, Temple of Literature, and Hanoi Old Quarter.',
        timeRecommendationSeconds: 150,
        backgroundImage: '/src/assets/images/bg3.jpg',
        data: {
          solutionOverview: 'A structured celebration of Hanoi tangible cultural heritage and living history.',
          pillars: [
            {
              number: '01',
              title: 'Imperial Citadel of Thang Long',
              subtitle: 'UNESCO World Heritage',
              description: 'A thousand-year royal fortress where ancient stone dragon steps, monumental gates, and subterranean command bunkers whisper timeless tales of Vietnamese dynasties.',
              keyPoints: [
                '1010 AD · Ancient Imperial Seat',
                'Doan Mon Gate & Sacred Dragon Steps'
              ]
            },
            {
              number: '02',
              title: 'Temple of Literature & Imperial Academy',
              subtitle: "Vietnam's First University",
              description: 'A tranquil sanctuary of intellect founded in 1070. Shaded lotus courtyards and 82 legendary stone turtle doctor steles honor a millennium of scholarly devotion.',
              keyPoints: [
                '1070 AD · Sanctuary of Sages',
                '82 Historic Turtle Doctor Steles'
              ]
            },
            {
              number: '03',
              title: 'Hanoi Old Quarter (The 36 Old Streets)',
              subtitle: 'The Living Heart of Hanoi',
              description: 'An exhilarating labyrinth of historic trade guilds, colonial tube houses, and sensory bliss. Step into vibrant alleys alive with sizzling street food and velvety egg coffee.',
              keyPoints: [
                'The 36 Historic Guild Streets',
                'Legendary Street Food & Artisan Heritage'
              ]
            }
          ]
        }
      },
      {
        id: 'tm-3-intangible',
        type: 'intangible_heritage',
        title: 'II.Body',
        subtitle: 'Culture',
        categoryKicker: '2. Intangible Cultural Heritage',
        notes: 'Explore Hanoi 3 representative intangible cultural heritages: Ca Tru Chamber Music, Thang Long Water Puppetry, and the Giong Festival of Phu Dong and Soc Temples.',
        timeRecommendationSeconds: 150,
        backgroundImage: '/src/assets/images/bg3.jpg',
        data: {}
      },
      {
        id: 'tm-4-culinary',
        type: 'problem_breakdown',
        title: 'II.Body',
        subtitle: 'Culinary',
        categoryKicker: 'Iconic Culinary Heritage',
        notes: 'Walk through Hanoi world-famous culinary heritage: Bun Cha Obama, Hanoi Banh Mi, and Pho Bat Dan with Egg Coffee.',
        timeRecommendationSeconds: 150,
        backgroundImage: '/src/assets/images/bg2.jpg',
        data: {}
      },
      {
        id: 'tm-4-summary',
        type: 'hanoi_summary',
        title: 'II.Body',
        subtitle: 'Summary',
        categoryKicker: 'The Essence of Hanoi',
        notes: 'Synthesize the entire Body section: Culture, Culinary, and answer with conviction "That is why we choose Hanoi".',
        timeRecommendationSeconds: 150,
        backgroundImage: '/src/assets/images/bghanoi.jpg',
        data: {}
      },
      {
        id: 'tm-4',
        type: 'mystery_challenge',
        title: '???',
        subtitle: '???',
        categoryKicker: 'PART 03 · ???',
        notes: 'Help Anh Ba choose the right historic landmark in Hanoi before his mother finds him!',
        timeRecommendationSeconds: 120,
        backgroundImage: '',
        data: {}
      },
      {
        id: 'tm-5',
        type: 'thank_you',
        title: 'Thank You For Listening',
        subtitle: 'themaster',
        categoryKicker: 'CONCLUDING SLIDE',
        notes: 'Final conclusion: Thank You For Listening.',
        timeRecommendationSeconds: 60,
        backgroundImage: '',
        data: {}
      }
    ]
  },
  {
    id: 'urban-mobility-2030',
    title: 'Urban Mobility Crisis & Decarbonized Transit Architecture 2030',
    topic: 'Metropolitan Infrastructure & Multimodal Transit',
    description: 'Root cause analysis, induced demand economics, 3-pillar strategic transit blueprint, and real-time congestion pricing simulator.',
    author: 'Dr. Marcus Vance',
    authorRole: 'Chief Infrastructure Strategist',
    organization: 'Institute for Urban Mobility Futures',
    date: 'October 2026',
    readTimeMinutes: 18,
    category: 'Problem & Solution',
    theme: 'editorial-stone',
    fontPairing: 'bevietnam-jetbrains',
    coverImage: '/src/assets/images/bg2.jpg',
    slides: [
      {
        id: 'um-1',
        type: 'hero_title',
        title: 'Urban Mobility Crisis & Decarbonized Transit Architecture 2030',
        subtitle: 'A Multimodal Strategic Framework to Eliminate Congestion Bottlenecks and Accelerate Zero-Emission Transit',
        categoryKicker: 'METROPOLITAN STRATEGY REPORT · 2026',
        notes: 'Opening: Detail how traffic congestion drains $1.4B annually from regional GDP and degrades urban air quality.',
        timeRecommendationSeconds: 120,
        backgroundImage: '/src/assets/images/bg2.jpg',
        data: {
          authorName: 'Dr. Marcus Vance',
          authorTitle: 'Chief Infrastructure Strategist',
          organization: 'Institute for Urban Mobility Futures',
          heroHighlights: [
            '$1.4B Annual Economic Loss from Lost Commute Time',
            'Single-Occupancy Vehicles Account for 84% of Road Occupancy',
            'Target 48% Multimodal Transit Shift by 2030'
          ]
        }
      },
      {
        id: 'um-2',
        type: 'problem_breakdown',
        title: 'Problem Diagnostics: The Paradox of Road Expansion (Induced Demand)',
        subtitle: 'Why continuous lane additions exacerbate metropolitan traffic gridlock',
        categoryKicker: '01. ROOT CAUSE ANALYSIS',
        notes: 'Explain Induced Demand and the Braess Paradox: Adding road capacity generates +22% new vehicular traffic within 12 months.',
        timeRecommendationSeconds: 150,
        data: {
          problemSummary: 'Existing highway networks can only support 35% of projected vehicle growth. Lack of synchronized first-mile/last-mile feeder transit locks the city into perpetual gridlock.',
          rootCauses: [
            {
              title: 'The Induced Demand Trap',
              desc: 'Highway expansions only reduce travel times for 6 months before unlocking latent vehicle trips.',
              severity: 'Critical',
              stat: '+22% Latent Traffic Surge'
            },
            {
              title: 'First-Mile / Last-Mile Disconnect',
              desc: 'Commuters abandon public transit when walking access to rail stations exceeds 10 minutes without shaded micro-mobility.',
              severity: 'High',
              stat: '68% Commuter Drop-off'
            },
            {
              title: 'Disproportionate Spatial Footprint',
              desc: 'Private automobiles carry an average of 1.2 passengers while consuming 8.4x more road surface than Bus Rapid Transit.',
              severity: 'Critical',
              stat: '8.4x Surface Area / Pax'
            }
          ],
          impactStatement: 'Aggregate Societal Impact: 45 million lost productive labor hours per year and a 32% increase in peak-hour PM2.5 particulate emissions.'
        }
      },
      {
        id: 'um-3',
        type: 'data_metrics',
        title: 'Empirical Metrics: Peak-Hour Transit Carrying Capacity',
        subtitle: 'Comparing throughput velocity and volumetric passenger capacity per corridor',
        categoryKicker: '02. EMPIRICAL BENCHMARKS',
        notes: 'Highlight that grade-separated Rail and Dedicated Electric BRT carry 7x to 9x more passengers per hour than mixed vehicle lanes.',
        timeRecommendationSeconds: 140,
        data: {
          chartTitle: 'Peak-Hour Passenger Throughput (Passengers / Hour / Direction)',
          chartSubtitle: 'Measured across major metropolitan radial commute corridors',
          chartUnit: 'Pax/Hour/Direction',
          metrics: [
            {
              label: 'Average Peak Commute Speed',
              value: '14.2 km/h',
              change: '-18.5%',
              changePositive: false,
              context: 'Declining steadily over 3 consecutive years'
            },
            {
              label: 'Annual Wasted Fuel Cost',
              value: '$420 / driver',
              change: '+24%',
              changePositive: false,
              context: 'Direct financial drain on household budgets'
            },
            {
              label: 'Electric BRT & Metro Capacity',
              value: '29,500 pax/h',
              change: '+320%',
              changePositive: true,
              context: '7.8x the throughput of general traffic lanes'
            }
          ],
          chartData: [
            { label: 'Mixed Vehicle Traffic Lane', value: 3800, benchmark: 4000 },
            { label: 'Dedicated Motorcycle Lane', value: 8500, benchmark: 9000 },
            { label: 'Electric BRT Dedicated Corridor', value: 14200, benchmark: 15000 },
            { label: 'Heavy Rail Metro Transit Line', value: 29500, benchmark: 35000 }
          ]
        }
      },
      {
        id: 'um-4',
        type: 'solution_architecture',
        title: '3-Pillar Multimodal Architecture',
        subtitle: 'Shifting from vehicle-centric throughput to citizen-centric accessibility',
        categoryKicker: '03. STRATEGIC ARCHITECTURE',
        notes: 'Walk through: 1. Backbone High-Capacity Transit, 2. Micro-Mobility Feeder Hubs, 3. Dynamic Congestion Pricing.',
        timeRecommendationSeconds: 180,
        data: {
          solutionOverview: 'An integrated transit ecosystem combining electrified heavy rail backbone with real-time on-demand micro-mobility feeders.',
          pillars: [
            {
              number: '01',
              title: 'High-Capacity Backbone Corridor',
              subtitle: 'Grade-separated Metro + Electric BRT',
              description: 'Construct radial arterial lines with 3-minute peak headways, guaranteeing 99.2% on-time schedule reliability.',
              keyPoints: [
                'Hard barrier lane segregation preventing vehicle incursions',
                'Adaptive Smart Transit Signal Priority at intersections',
                '100% zero-emission electric bus & train fleet'
              ]
            },
            {
              number: '02',
              title: 'First-Mile / Last-Mile Ecosystem',
              subtitle: 'Shared E-Bikes, Shaded Corridors & Park-and-Ride',
              description: 'Create a safe 500m catchment zone around every station with unified single-tap contactless payment.',
              keyPoints: [
                'Smart e-bike docks integrated with monthly transit passes',
                'Tree-canopied pedestrian greenways reducing heat stress 4°C',
                'Secure Park & Ride facilities at city gate terminals'
              ]
            },
            {
              number: '03',
              title: 'Dynamic Congestion Demand Pricing',
              subtitle: 'Variable cordon tolling during peak commute hours',
              description: 'Implement automated license plate recognition (ANPR) pricing, ring-fencing 100% of revenue to subsidize public transit.',
              keyPoints: [
                'Automated congestion charge during peak traffic windows',
                'Full exemption for public transit, EVs and micro-mobility',
                'Reduces non-essential downtown vehicle volume by 32%'
              ]
            }
          ]
        }
      },
      {
        id: 'um-5',
        type: 'comparative_matrix',
        title: 'Transformation Matrix: Status Quo vs Multimodal 2030',
        subtitle: 'Quantifiable operational, environmental, and financial impact assessment',
        categoryKicker: '04. BEFORE VS AFTER MATRIX',
        notes: 'Demonstrate to city leadership the massive reduction in commute duration and public healthcare costs.',
        timeRecommendationSeconds: 120,
        data: {
          matrixTitle: 'Key Performance Indicators Comparison',
          currentLabel: 'Status Quo (Fragmented Private Vehicles)',
          newLabel: 'TheMaster 2030 Integrated Transit',
          comparisons: [
            {
              aspect: 'Average 12km Commute Duration',
              currentApproach: '52 minutes (highly unpredictable, vulnerable to incidents)',
              newSolution: '24 minutes predictable travel time with real-time app tracking',
              impact: 'Save 28 minutes per commute trip'
            },
            {
              aspect: 'Monthly Citizen Transportation Cost',
              currentApproach: '$120 - $180 (fuel, parking fees, vehicle maintenance)',
              newSolution: '$35 unlimited monthly multimodal digital transit pass',
              impact: '75% reduction in personal commute expense'
            },
            {
              aspect: 'Annual Transport CO2 Emissions / Capita',
              currentApproach: '1.42 metric tons of CO2 per capita',
              newSolution: '0.38 metric tons of CO2 via 100% electrified grid',
              impact: '73% reduction in transport carbon footprint'
            },
            {
              aspect: 'Urban Land Dedicated to Parking Lots',
              currentApproach: 'Consumes 28% of premium downtown surface area',
              newSolution: 'Repurposed into pedestrian plazas and linear urban parks',
              impact: '+1.5 m² green space per urban citizen'
            }
          ]
        }
      },
      {
        id: 'um-6',
        type: 'interactive_simulator',
        title: 'Interactive Simulator: Economic & Carbon Reduction Model',
        subtitle: 'Adjust modal shift parameters to observe real-time societal savings',
        categoryKicker: '05. SCENARIO SIMULATION WIDGET',
        notes: 'Live interaction: Ask audience members to select target transit adoption rates to see immediate economic payback.',
        timeRecommendationSeconds: 180,
        data: {
          simulatorTitle: 'Metropolitan Transit Impact Calculator',
          simulatorDescription: 'Adjust the input sliders below to simulate peak-hour delay reductions, carbon abatement, and municipal fuel cost savings.',
          baseCalculationType: 'traffic_congestion'
        }
      },
      {
        id: 'um-7',
        type: 'interactive_timeline',
        title: '4-Phase Strategic Roadmap (2026 - 2030)',
        subtitle: 'From rapid bus corridor pilots to fully automated AI transit orchestration',
        categoryKicker: '06. EXECUTION TIMELINE',
        notes: 'Clarify that Phase 1 requires minimal capital expenditure by repurposing existing lanes with smart enforcement.',
        timeRecommendationSeconds: 150,
        data: {
          timelineSteps: [
            {
              phase: 'Phase 1',
              period: 'Q4 2026 - Q2 2027',
              title: 'Dedicated Bus Lanes & Unified Contactless NFC Fares',
              description: 'Deploy 3 pilot electric BRT radial lines and launch the MaaS integrated mobility app with 3,000 shared e-bikes.',
              deliverables: ['30km dedicated BRT corridors', 'Unified digital transit payment app', '150 micro-mobility docking hubs'],
              status: 'In Progress'
            },
            {
              phase: 'Phase 2',
              period: 'Q3 2027 - Q4 2028',
              title: 'Commissioning 2 Heavy Rail Metro Lines & Feeder Grid',
              description: 'Open 42km of grade-separated rail transit connecting major satellite suburbs to the central business district.',
              deliverables: ['42km underground/elevated heavy rail', '24 multimodal transfer interchanges', '18% reduction in car trips'],
              status: 'Planned'
            },
            {
              phase: 'Phase 3',
              period: 'Q1 2029 - Q4 2029',
              title: 'Automated Dynamic Cordon Congestion Tolling',
              description: 'Activate automated ANPR toll gantries around the inner city core, generating ring-fenced subsidies.',
              deliverables: ['Citywide automated camera network', '+40% municipal transit subsidy revenue', '120km upgraded pedestrian greenways'],
              status: 'Planned'
            },
            {
              phase: 'Phase 4',
              period: '2030 Onward',
              title: 'Full Autonomous Transit & Net-Zero Fleet Operation',
              description: 'Achieve 48% public transit mode share and complete 100% electrification of all municipal transport.',
              deliverables: ['Net-Zero metropolitan transit certification', 'Average corridor speeds sustained >28 km/h', '$1.4B annual economic savings'],
              status: 'Planned'
            }
          ]
        }
      },
      {
        id: 'um-8',
        type: 'deep_dive_quote',
        title: 'Core Philosophy: The Measure of a Civilized City',
        subtitle: 'Guiding executive vision for long-term sustainable urban development',
        categoryKicker: '07. EXECUTIVE TAKEAWAY',
        notes: 'Deliver quote with poise: Connect urban transit directly to social equity and economic competitiveness.',
        timeRecommendationSeconds: 90,
        data: {
          quote: 'A developed city is not a place where the poor have cars, but where the rich choose to use public transportation every single day.',
          quoteAuthor: 'Enrique Peñalosa',
          quoteRole: 'Former Mayor of Bogotá & Global Urban Policy Advisor',
          quoteContext: 'Keynote Address at the World Sustainable Cities Forum',
          takeawayPoints: [
            'Transit infrastructure is a fundamental determinant of social equity and equal access to economic opportunity.',
            'Every pedestrian greenway and transit ride directly contributes to the environmental resilience of the metropolis.'
          ]
        }
      },
      {
        id: 'um-9',
        type: 'action_call',
        title: 'Call to Action & Immediate Next Steps',
        subtitle: 'Establishing the Inter-Agency Municipal Transit Taskforce',
        categoryKicker: '08. CONCLUSION & GOVERNANCE',
        notes: 'Wrap up presentation and open the floor for committee Q&A.',
        timeRecommendationSeconds: 120,
        data: {
          finalMessage: 'Decisive infrastructure reform today secures clean air, economic productivity, and livability for generations to come.',
          actionPoints: [
            { step: 'Immediate', title: 'Approve Multimodal Master Zoning Plan', desc: 'Secure municipal council approval for transit right-of-way corridors in Q4 2026.', owner: 'Department of Transportation' },
            { step: 'Month 2', title: 'Launch Public-Private Partnership (PPP) Tender', desc: 'Issue procurement tenders for 500 electric buses and battery charging depots.', owner: 'Infrastructure Investment Board' },
            { step: 'Month 3', title: 'Initiate "Car-Free Weekend" Public Awareness Campaign', desc: 'Provide 100% free transit passes on Saturdays and Sundays to build rider habits.', owner: 'Civic Engagement Council' }
          ],
          contactInfo: {
            email: 'marcus.vance@urbanmobility.org',
            website: 'https://urbanmobility-strategy.org',
            phone: '+1 (415) 890-2030'
          }
        }
      }
    ]
  },
  {
    id: 'digital-supply-chain-ai',
    title: 'Autonomous AI Supply Chain: Demand Sensing & Resilient Logistics',
    topic: 'Digital Transformation & Operational Resilience',
    description: 'Deconstructing the Bullwhip Effect, autonomous inventory replenishment, Control Tower visibility, and 90-day agile implementation roadmap.',
    author: 'Elena Rostova, MBA',
    authorRole: 'VP of Global Supply Chain Strategy',
    organization: 'LogiTech Enterprise Solutions',
    date: 'October 2026',
    readTimeMinutes: 15,
    category: 'Strategy & Business',
    theme: 'midnight-cyan',
    fontPairing: 'inter-jetbrains',
    coverImage: '/src/assets/images/bg3.jpg',
    slides: [
      {
        id: 'dsc-1',
        type: 'hero_title',
        title: 'Autonomous AI Supply Chain: Demand Sensing & Resilient Logistics',
        subtitle: 'From Reactive Firefighting to Predictive Orchestration: Freeing Working Capital and Slashing Logistics Overhead by 30%',
        categoryKicker: 'GLOBAL OPERATIONS STRATEGY · 2026',
        notes: 'Opening: Explain global supply disruptions and why legacy ERP spreadsheets cannot keep up with multi-tier demand fluctuations.',
        timeRecommendationSeconds: 120,
        backgroundImage: '/src/assets/images/bg3.jpg',
        data: {
          authorName: 'Elena Rostova, MBA',
          authorTitle: 'VP of Global Supply Chain Strategy',
          organization: 'LogiTech Enterprise Solutions',
          heroHighlights: [
            '94.5% Machine Learning Demand Forecast Accuracy',
            '38% Reduction in Excess Safety Stock Inventory',
            'Order-to-Delivery Lead Time Shortened to 48 Hours'
          ]
        }
      },
      {
        id: 'dsc-2',
        type: 'problem_breakdown',
        title: 'Operational Pain Point: The Multi-Tier Bullwhip Effect',
        subtitle: 'How a 5% retail demand variance amplifies into a 35% manufacturing distortion',
        categoryKicker: '01. SYSTEMIC VULNERABILITY',
        notes: 'Walk the board through the Bullwhip curve: Siloed data creates massive inventory write-downs and stockouts.',
        timeRecommendationSeconds: 140,
        data: {
          problemSummary: 'Siloed departmental forecasting causes commercial teams to over-inflate orders while warehouse operations hoard buffer inventory, trapping millions in frozen working capital.',
          rootCauses: [
            {
              title: 'The Bullwhip Amplification Trap',
              desc: 'Minor 5% consumer sales fluctuations get amplified into 35% excess purchase orders across Tier-1 suppliers.',
              severity: 'Critical',
              stat: '35% Inventory Distortion'
            },
            {
              title: 'Fragmented Visibility & 14-Day Data Latency',
              desc: 'No real-time tracking of maritime port congestion or transshipment container statuses.',
              severity: 'High',
              stat: '14-Day Blind Spot'
            },
            {
              title: 'Manual Spreadsheet Planning',
              desc: 'Planners cannot run Monte Carlo scenario simulations for geopolitical choke-points or tariff changes.',
              severity: 'Critical',
              stat: '80% Human Heuristics'
            }
          ],
          impactStatement: 'Financial Impact: Carrying costs increased 24% YoY, while stock-out lost revenue reached 12% across high-margin product lines.'
        }
      },
      {
        id: 'dsc-3',
        type: 'solution_architecture',
        title: 'The Self-Healing Autonomous Supply Chain Architecture',
        subtitle: 'Integrating Real-Time Control Towers with Agentic Procurement AI',
        categoryKicker: '02. TARGET OPERATING MODEL',
        notes: 'Explain Self-Healing mechanisms: AI detects port delays 72 hours early and auto-reroutes shipments without manual intervention.',
        timeRecommendationSeconds: 160,
        data: {
          solutionOverview: 'A 3-layer architecture: IoT Telemetry & ERP Lake -> Predictive Deep Learning Engine -> Autonomous Action Orchestration.',
          pillars: [
            {
              number: '01',
              title: 'Real-Time Visibility Control Tower',
              subtitle: 'End-to-End Tracking from Raw Material to Customer Doorstep',
              description: 'Continuous monitoring of 15,000 SKUs via IoT temperature, GPS telemetry, and customs clearance status.',
              keyPoints: [
                'Early bottleneck prediction 72 hours ahead of maritime delays',
                'Global interactive map showing real-time freight positions',
                'Integration with geopolitical risk and weather radar feeds'
              ]
            },
            {
              number: '02',
              title: 'Multi-Factor Demand Sensing Engine',
              subtitle: 'Deep Learning on Social Sentiment, Weather & POS Data',
              description: 'Dynamic neural network forecasting daily SKU demand at individual retail fulfillment hubs.',
              keyPoints: [
                'Automated real-time recalculation of dynamic safety stocks',
                '45% reduction in expired and obsolete inventory write-offs',
                'Agile response to sudden flash promotions and viral demand'
              ]
            },
            {
              number: '03',
              title: 'Agentic Procurement & Route Optimization',
              subtitle: 'Autonomous PO Issuance and Smart Contract Execution',
              description: 'Automated container consolidation, dynamic carrier bidding, and instant digital freight matching.',
              keyPoints: [
                '65% reduction in administrative paperwork overhead',
                'Container utilization rate increased from 68% to 92%',
                '22% lower per-unit freight shipping expenditure'
              ]
            }
          ]
        }
      },
      {
        id: 'dsc-4',
        type: 'interactive_simulator',
        title: 'Interactive ROI Calculator: Supply Chain AI Deployment',
        subtitle: 'Simulate annual enterprise revenue and inventory carrying cost savings',
        categoryKicker: '03. ECONOMIC RETURN MODEL',
        notes: 'Invite the CFO to test company revenue parameters: Typical payback period is achieved within 4.8 months.',
        timeRecommendationSeconds: 150,
        data: {
          simulatorTitle: 'Supply Chain AI ROI & Cash Release Model',
          simulatorDescription: 'Tweak annual revenue, inventory scale, and AI forecast accuracy to compute working capital released and payback duration.',
          baseCalculationType: 'roi_tech'
        }
      },
      {
        id: 'dsc-5',
        type: 'action_call',
        title: '90-Day Agile Execution & Deployment Roadmap',
        subtitle: 'Test fast, prove measurable ROI in top 20% SKUs, scale enterprise-wide',
        categoryKicker: '04. IMPLEMENTATION PLAN',
        notes: 'Call for immediate formation of the cross-functional Supply Chain AI Taskforce.',
        timeRecommendationSeconds: 100,
        data: {
          finalMessage: 'Enterprises that master real-time supply chain data protect their gross margins and guarantee superior customer satisfaction.',
          actionPoints: [
            { step: 'Month 1', title: 'Data Lake Audit & API Unification', desc: 'Connect ERP, WMS, and TMS data pipelines into a single normalized data warehouse.', owner: 'Data Engineering & IT' },
            { step: 'Month 2', title: 'Pilot Demand Sensing on Top 20% SKUs', desc: 'Validate forecast accuracy in parallel against legacy spreadsheet methods.', owner: 'Supply Chain Planning' },
            { step: 'Month 3', title: 'Full Control Tower & Autonomous PO Rollout', desc: 'Transition 100% of procurement operations to the intelligent automated dashboard.', owner: 'Executive Operations Board' }
          ],
          contactInfo: {
            email: 'elena.rostova@logitech-solutions.com',
            website: 'https://logitech-solutions.com/autonomous-supply-chain'
          }
        }
      }
    ]
  },
  {
    id: 'cleantech-energy-transition',
    title: 'Grid-Scale Clean Energy Transition & BESS Integration',
    topic: 'Renewable Power & Net-Zero Grid Modernization',
    description: 'Solving the Duck Curve paradox, Battery Energy Storage Systems (BESS), transmission de-bottlenecking, and capacity market pricing.',
    author: 'Julian Thorne, PhD',
    authorRole: 'Director of Clean Energy Strategy',
    organization: 'Global Energy Transition Alliance',
    date: 'October 2026',
    readTimeMinutes: 16,
    category: 'Science & Research',
    theme: 'emerald-nature',
    fontPairing: 'sourceserif-inter',
    coverImage: '/src/assets/images/bg4.jpg',
    slides: [
      {
        id: 'ce-1',
        type: 'hero_title',
        title: 'Grid-Scale Clean Energy Transition & BESS Integration',
        subtitle: 'Modernizing the National Power Grid, Deploying 4,500 MWh Battery Storage, and Achieving Net-Zero Grid Reliability',
        categoryKicker: 'ENERGY TRANSITION BLUEPRINT · 2026-2035',
        notes: 'Opening: Present the Net-Zero roadmap and address the intermittent variability of solar and wind generation.',
        timeRecommendationSeconds: 120,
        backgroundImage: '/src/assets/images/bg4.jpg',
        data: {
          authorName: 'Julian Thorne, PhD',
          authorTitle: 'Director of Clean Energy Strategy',
          organization: 'Global Energy Transition Alliance',
          heroHighlights: [
            '120M Metric Tons of CO2 Abated Annually by 2030',
            'Renewable Energy Grid Penetration Expanded to 48%',
            '4,500 MWh Utility-Scale Battery Energy Storage (BESS)'
          ]
        }
      },
      {
        id: 'ce-2',
        type: 'problem_breakdown',
        title: 'The Grid Paradox: Massive Renewable Generation with High Curtailment',
        subtitle: 'Why solar and wind farms are forced to shed up to 25% of clean power during peak production hours',
        categoryKicker: '01. GRID CURTAILMENT BOTTLENECK',
        notes: 'Explain the Duck Curve: Midday solar generation peaks when demand is moderate, but transmission lines cannot transport power to distant urban hubs.',
        timeRecommendationSeconds: 140,
        data: {
          problemSummary: 'Renewable installed capacity has surged, but high-voltage transmission lines and energy storage have lagged, forcing operators to curtail 25% of clean electricity.',
          rootCauses: [
            {
              title: '500kV Transmission Bottlenecks',
              desc: 'High concentration of coastal wind and solar with insufficient transmission capacity to major industrial centers.',
              severity: 'Critical',
              stat: '25% Clean Power Curtailed'
            },
            {
              title: 'Lack of Grid-Scale Battery Storage (BESS)',
              desc: 'Without storage, excess solar generated at noon cannot be shifted to meet expensive evening peak demand.',
              severity: 'High',
              stat: '< 2% Storage Penetration'
            },
            {
              title: 'Outdated Ancillary Service Tariffs',
              desc: 'Lack of regulatory pricing mechanisms for ultra-fast frequency response and spinning reserve replacement.',
              severity: 'Medium',
              stat: '85 Energy Projects Stalled'
            }
          ],
          impactStatement: 'Financial & Environmental Loss: $380M in wasted clean electricity annually while burning expensive imported thermal coal during peak evening hours.'
        }
      },
      {
        id: 'ce-3',
        type: 'data_metrics',
        title: 'Levelized Cost of Energy (LCOE): Renewables Now Beat Coal',
        subtitle: 'Utility-scale solar and onshore wind LCOE has plummeted over 80% in the last decade',
        categoryKicker: '02. LCOE COST CURVE',
        notes: 'Solar LCOE is now at $42/MWh versus $84/MWh for imported thermal coal, making the economic case undeniable.',
        timeRecommendationSeconds: 130,
        data: {
          chartTitle: 'Levelized Cost of Energy by Source (USD / MWh)',
          chartSubtitle: 'Comprehensive lifetime levelized cost analysis',
          chartUnit: 'USD/MWh',
          metrics: [
            {
              label: 'Utility-Scale Solar LCOE',
              value: '$42 / MWh',
              change: '-82%',
              changePositive: true,
              context: 'Down from $230/MWh in 2015'
            },
            {
              label: 'Onshore Wind LCOE',
              value: '$51 / MWh',
              change: '-64%',
              changePositive: true,
              context: 'Cheaper than any fossil alternative'
            },
            {
              label: 'Imported Coal Generation',
              value: '$84 / MWh',
              change: '+38%',
              changePositive: false,
              context: 'Exposed to EU CBAM carbon border tax'
            }
          ],
          chartData: [
            { label: 'Utility Solar PV', value: 42, benchmark: 80 },
            { label: 'Onshore Wind Farm', value: 51, benchmark: 80 },
            { label: 'Natural Gas CCGT', value: 78, benchmark: 80 },
            { label: 'Thermal Coal Power', value: 84, benchmark: 80 }
          ]
        }
      },
      {
        id: 'ce-4',
        type: 'solution_architecture',
        title: '3-Pillar Clean Grid Modernization Architecture',
        subtitle: 'Integrating Grid BESS, AI Dispatching, and Direct Power Purchase (DPPA)',
        categoryKicker: '03. SYSTEMIC SOLUTION',
        notes: 'Detail how AI forecasting coupled with BESS achieves 99.98% grid reliability without fossil peaker plants.',
        timeRecommendationSeconds: 160,
        data: {
          solutionOverview: 'A resilient, self-balancing decentralized smart grid replacing legacy centralized thermal generation.',
          pillars: [
            {
              number: '01',
              title: 'Utility-Scale Battery Storage (Grid BESS)',
              subtitle: 'Charge During Daytime Excess, Discharge at Evening Peak',
              description: 'Deploy 4,500 MWh of lithium iron phosphate (LFP) BESS at key 500kV substations to eliminate 100% of curtailment.',
              keyPoints: [
                'Sub-20 millisecond frequency response stabilization',
                'Automated voltage and reactive power support',
                'Harvests low-cost midday solar for evening consumption'
              ]
            },
            {
              number: '02',
              title: 'AI Machine Learning Grid Dispatch',
              subtitle: '48-Hour Ahead Satellite Cloud & Wind Forecasting',
              description: 'Deep Learning algorithms predicting renewable output with 96% accuracy using satellite weather models.',
              keyPoints: [
                'Reduces expensive thermal spinning reserve requirements',
                'Automated power flow routing preventing line overload',
                'Optimizes wholesale spot power market bidding'
              ]
            },
            {
              number: '03',
              title: 'Direct Power Purchase (DPPA) & Carbon Credits',
              subtitle: 'Unlocking Private Corporate Capital for Green Infrastructure',
              description: 'Empowering multinational corporations to buy clean power directly, securing ESG RE100 compliance.',
              keyPoints: [
                'Two-part tariff structure (Capacity + Energy charges)',
                'International I-REC green energy certificate tracking',
                'Protects export manufacturing from EU CBAM carbon tariffs'
              ]
            }
          ]
        }
      },
      {
        id: 'ce-5',
        type: 'interactive_simulator',
        title: 'Carbon Abatement & Coal Displacement Simulator',
        subtitle: 'Adjust BESS capacity and renewable share to project coal savings',
        categoryKicker: '04. PREDICTIVE SIMULATOR',
        notes: 'Demonstrate that every $1 invested in BESS saves $2.8 in avoided coal import expenditures.',
        timeRecommendationSeconds: 150,
        data: {
          simulatorTitle: 'Coal Abatement & Clean Energy Model',
          simulatorDescription: 'Test battery storage scaling parameters to calculate metric tons of coal displaced and carbon avoided.',
          baseCalculationType: 'carbon_reduction'
        }
      },
      {
        id: 'ce-6',
        type: 'action_call',
        title: 'Executive Roadmap: Establishing Clean Energy Leadership',
        subtitle: '3 key regulatory decrees and infrastructure milestones for the next 12 months',
        categoryKicker: '05. POLICY & CAPITAL COMMITMENTS',
        notes: 'Conclude: Clean power is no longer an environmental cost, but a primary national competitive advantage.',
        timeRecommendationSeconds: 100,
        data: {
          finalMessage: 'The clean energy transition is the essential foundation to attract global semiconductor and AI data center investments.',
          actionPoints: [
            { step: 'Q1 2027', title: 'Issue BESS Ancillary Services Tariff', desc: 'Establish clear capacity pricing to enable 6-year private investment payback.', owner: 'Ministry of Energy' },
            { step: 'Q2 2027', title: 'Fast-Track 500kV Double-Circuit Transmission Line', desc: 'Debottleneck 5,000 MW of wind and solar capacity in high-yield coastal corridors.', owner: 'National Grid Corporation' },
            { step: 'Q3 2027', title: 'Launch National Carbon Credit Trading Exchange', desc: 'Monetize carbon abatement certificates across industrial sectors.', owner: 'Ministry of Finance' }
          ],
          contactInfo: {
            email: 'energy.transition@cleanpower.org',
            website: 'https://cleanenergy-transition-2030.org'
          }
        }
      }
    ]
  },
  {
    id: 'healthtech-predictive-ai',
    title: 'Predictive HealthTech: Polygenic Risk Scoring Platform',
    topic: 'Personalized Healthcare & Digital Genomics',
    description: 'Series A investment pitch deck: AI-driven early detection of cardiovascular disease and oncology using multi-factor polygenic risk scoring.',
    author: 'Dr. Sarah Jenkins & Dr. Aaron Chen',
    authorRole: 'Co-Founders & Chief Medical Officers',
    organization: 'Genomix AI Health',
    date: 'October 2026',
    readTimeMinutes: 14,
    category: 'Tech & Innovation',
    theme: 'crimson-bold',
    fontPairing: 'jakarta-jetbrains',
    coverImage: '/src/assets/images/bg1.jpg',
    slides: [
      {
        id: 'ht-1',
        type: 'hero_title',
        title: 'Predictive HealthTech: Polygenic Risk Scoring Platform',
        subtitle: 'Transforming Healthcare from Late-Stage Reactive Treatment to Early Proactive Prevention with AI-Powered Genomics',
        categoryKicker: 'SERIES A INVESTMENT DECK · 2026',
        notes: 'Opening: Highlight that treating late-stage chronic illness is bankrupting health insurance systems. Early prevention is 10x cheaper.',
        timeRecommendationSeconds: 120,
        backgroundImage: '/src/assets/images/bg1.jpg',
        data: {
          authorName: 'Dr. Sarah Jenkins',
          authorTitle: 'Co-Founder & CEO',
          organization: 'Genomix AI Health',
          heroHighlights: [
            'Detects Disease Risk 5-10 Years Before Symptom Onset',
            '98.2% Deep Learning Clinical Model Accuracy',
            '85,000+ Active Patients Protected Across Network'
          ]
        }
      },
      {
        id: 'ht-2',
        type: 'problem_breakdown',
        title: 'Healthcare Crisis: 70% of Chronic Diseases Are Diagnosed Too Late',
        subtitle: 'Current healthcare systems are built to treat acute illness, not to intercept disease before onset',
        categoryKicker: '01. THE HEALTHCARE DILEMMA',
        notes: 'Provide clinical evidence: When coronary artery disease or colon cancer is caught at Stage 1, 5-year survival is 95%.',
        timeRecommendationSeconds: 130,
        data: {
          problemSummary: 'Most individuals only see a physician when painful symptoms appear. By then, average treatment costs exceed $25,000 and quality of life is severely compromised.',
          rootCauses: [
            {
              title: 'Superficial Routine Check-ups',
              desc: 'Standard blood panels only measure snapshot biomarkers, completely missing inherited polygenic mutations.',
              severity: 'Critical',
              stat: '82% Latent Risks Missed'
            },
            {
              title: 'Prohibitive Sequencing Costs',
              desc: 'Whole genome sequencing historically cost >$1,500, placing advanced diagnostics out of reach for general consumers.',
              severity: 'High',
              stat: '< 0.5% Population Tested'
            },
            {
              title: 'Disconnected Wearable Health Data',
              desc: 'Wearable data from Apple Watch & Garmin is not integrated into physician EHR clinical workflows.',
              severity: 'Medium',
              stat: '90% Wearable Data Discarded'
            }
          ],
          impactStatement: 'Cardiovascular disease and oncology claim over 18 million lives globally each year, over 60% of which are preventable with early intervention.'
        }
      },
      {
        id: 'ht-3',
        type: 'solution_architecture',
        title: 'The Genomix Solution: Lifetime Digital Health Architecture',
        subtitle: 'Low-Cost Microarray Sequencing + Polygenic Risk Engine + Continuous Lifestyle Coaching',
        categoryKicker: '02. CLINICAL SOLUTION',
        notes: 'Walk through the business model: Direct-to-Consumer (D2C) and B2B2C through commercial life insurance partners.',
        timeRecommendationSeconds: 150,
        data: {
          solutionOverview: 'A unified platform accompanying users from non-invasive saliva sample sequencing to daily personalized lifestyle interventions.',
          pillars: [
            {
              number: '01',
              title: 'Proprietary Low-Cost Genotyping Chip',
              subtitle: '$49 Comprehensive 500+ Disease Risk Panel',
              description: 'Custom micro-array gene chip optimized for diverse multi-ethnic populations with 99.9% analytical accuracy.',
              keyPoints: [
                'Non-invasive saliva sample collection from home',
                '72-hour turnaround time with CLIA/CAP certified lab',
                'End-to-end zero-knowledge encryption (HIPAA compliant)'
              ]
            },
            {
              number: '02',
              title: 'Polygenic Risk Scoring (PRS) AI Engine',
              subtitle: 'Trained on 2.5 Million Multi-Omic Patient Profiles',
              description: 'Neural networks continuously updating patient risk scores against newly published clinical literature.',
              keyPoints: [
                'Early detection of coronary disease, stroke, and diabetes',
                'Pharmacogenomics screening preventing adverse drug events',
                'Recommends exact age for advanced medical imaging scans'
              ]
            },
            {
              number: '03',
              title: 'Digital Health Companion & Tele-Health',
              subtitle: 'Continuous Biometric Sync & Board-Certified Consultations',
              description: 'Syncs wearable sleep and heart rate data to deliver real-time personalized nutritional and exercise prescriptions.',
              keyPoints: [
                '1-on-1 consultations with specialized preventive physicians',
                'Early arrhythmia and metabolic anomaly warning alerts',
                '40% reduction in 5-year disease onset probability'
              ]
            }
          ]
        }
      },
      {
        id: 'ht-4',
        type: 'data_metrics',
        title: 'Financial Traction & Unit Economics',
        subtitle: 'Annual Recurring Revenue (ARR) grew 340% YoY with 91% net revenue retention',
        categoryKicker: '03. FINANCIAL TRACTION',
        notes: 'Emphasize the 5.4x LTV / CAC ratio, demonstrating exceptional capital efficiency.',
        timeRecommendationSeconds: 140,
        data: {
          chartTitle: 'Quarterly Revenue & Active Member Growth ($K USD)',
          chartSubtitle: 'Membership recurring revenue model for proactive health monitoring',
          chartUnit: '$K USD',
          metrics: [
            {
              label: 'Annual Recurring Revenue (ARR)',
              value: '$4.8M',
              change: '+340%',
              changePositive: true,
              context: '3.4x YoY revenue growth'
            },
            {
              label: 'Customer Acquisition Cost (CAC)',
              value: '$38',
              change: '-45%',
              changePositive: true,
              context: 'Driven by insurance distribution partnerships'
            },
            {
              label: 'Customer Lifetime Value (LTV)',
              value: '$205',
              change: '+28%',
              changePositive: true,
              context: 'Exceptional 5.4x LTV / CAC ratio'
            }
          ],
          chartData: [
            { label: 'Q1 2025', value: 450, benchmark: 400 },
            { label: 'Q2 2025', value: 820, benchmark: 700 },
            { label: 'Q3 2025', value: 1450, benchmark: 1200 },
            { label: 'Q4 2025', value: 2600, benchmark: 2000 }
          ]
        }
      },
      {
        id: 'ht-5',
        type: 'action_call',
        title: 'Series A Investment Opportunity: $5M Growth Round',
        subtitle: 'Capturing market leadership across the $45B global preventive genomics sector',
        categoryKicker: '04. INVESTMENT OPPORTUNITY',
        notes: 'Close the pitch: 50% R&D and lab automation, 30% international market expansion, 20% clinical AI model upgrades.',
        timeRecommendationSeconds: 120,
        data: {
          finalMessage: 'We are not just building a high-growth HealthTech platform; we are empowering millions to live longer, healthier lives.',
          actionPoints: [
            { step: '50% Capital', title: 'Automated Lab Robotics Expansion', desc: 'Scale sequencing capacity to 100,000 samples/month while reducing unit costs 30%.', owner: 'R&D Biomedical Team' },
            { step: '30% Capital', title: 'Insurance Partnership Distribution', desc: 'Integrate platform across 3 leading global life insurance carriers.', owner: 'Growth & Business Development' },
            { step: '20% Capital', title: 'Multi-Modal Clinical AI Upgrades', desc: 'Incorporate MRI imaging and digital pathology into deep learning models.', owner: 'AI & Data Science Team' }
          ],
          contactInfo: {
            email: 'invest@genomixhealth.ai',
            website: 'https://genomixhealth.ai',
            phone: '+1 (650) 412-9080'
          }
        }
      }
    ]
  }
];
