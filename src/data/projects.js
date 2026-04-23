export const projects = [
  {
    id: 1,
    title: 'Undergraduate AI Researcher @ UD',
    category: 'research',
    icon: 'brain',
    period: '2023 – 2024',
    tags: ['AI/ML', 'NLP', 'Healthcare', 'RAG'],
    description:
      'Engineered a medical AI tool that transforms user-inputted information into accurate patient vignettes using Retrieval Augmented Generation (RAG) to mitigate bias in LLMs. Implemented BLEU and ROUGE metrics to evaluate text summarization quality across Transformer models.',
    links: [
      { label: 'BLEU Score Test', href: '/assets/bleu_score.py', download: true },
      { label: 'ROUGE Score Test', href: '/assets/rouge_score.py', download: true },
      { label: 'Semantic Entropy Test', href: '/assets/semantic_entropy.py', download: true },
    ],
    pdf: '/assets/Summer Scholars - Agrawal & Kumar.pdf',
  },
  {
    id: 2,
    title: 'RoomieUD',
    subtitle: 'Hackathon Winner @ HenHacks',
    category: 'hackathon',
    icon: 'users',
    period: '2023',
    tags: ['React', 'Algorithms', 'Full Stack'],
    description:
      'A Tinder-inspired roommate matching app that uses Euclidean geometry algorithms and point-based questionnaires to find compatible roommates with highly accurate results. Won at HenHacks.',
    externalLink:
      'https://devpost.com/software/roomieud?ref_content=my-projects-tab&ref_feature=my_projects',
  },
  {
    id: 3,
    title: 'Sensor Developer/Researcher @ DSU',
    subtitle: 'Funded by DoD & NSF',
    category: 'research',
    icon: 'microscope',
    period: '2022 – 2023',
    tags: ['IoT', 'Python', 'Raspberry Pi', 'Environmental'],
    description:
      'Configured an OPC-N3 optical sensor via Raspberry Pi to output PM2.5/PM10 air quality readings with user-editable features. Research funded by the Department of Defense and the National Science Foundation.',
    links: [{ label: 'Sensor Config Script', href: '/assets/sensor_test.py', download: true }],
    pdf: '/assets/Summer Symposium Abstract_PM Team_Khan.docx.pdf',
  },
  {
    id: 4,
    title: 'SurgiScan',
    subtitle: '1st Place @ HopHacks — Patient Safety Technology',
    category: 'hackathon',
    icon: 'heartpulse',
    period: '2023',
    tags: ['Computer Vision', 'YOLOv5', 'Python', 'Healthcare'],
    description:
      'A YOLOv5-powered computer vision application that detects and tracks surgical instruments in real-time during procedures, preventing tools from being inadvertently left inside patients.',
    externalLink: 'https://devpost.com/software/surgiscan',
  },
  {
    id: 5,
    title: 'FootPrint',
    subtitle: '2nd Place @ HenHacks — Automation Systems & Public Infrastructure',
    category: 'hackathon',
    icon: 'leaf',
    period: '2024',
    tags: ['React', 'Plaid API', 'Express.js', 'FinTech', 'Sustainability'],
    description:
      'An environmental impact tracker that gamifies sustainable spending by integrating with banking systems via Plaid to measure carbon footprints per transaction. Features AI-powered receipt scanning, personalized eco-friendly alternatives, and a FutureCoins rewards system.',
    externalLink: 'https://github.com/ShauryaKumarr/FootPrint',
  },
  {
    id: 6,
    title: 'Wall Of Support',
    category: 'personal',
    icon: 'comments',
    period: '2023 – Present',
    tags: ['Full Stack', 'Community', 'Web'],
    description:
      'A public forum where people worldwide can send and receive words of encouragement and positivity. An educational side project that grew into something meaningful — feel free to leave a message!',
    externalLink: 'https://wallofsupport.com/',
    badge: 'Live',
  },
  {
    id: 7,
    title: 'Sentinel Aid',
    category: 'hackathon',
    icon: 'shield',
    period: '2023',
    tags: ['AI', 'Drones', 'Disaster Management', 'Computer Vision'],
    description:
      'An AI-driven disaster management system leveraging autonomous drones to reach inaccessible areas during emergencies. Features SOS request handling, automated footage analysis, and a community-driven aid exchange platform.',
    externalLink: 'https://devpost.com/software/sentinal-aid',
  },
]
