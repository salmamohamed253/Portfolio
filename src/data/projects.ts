import { pending } from '../lib/content';
import type { Project } from '../types/content';

/**
 * Project catalogue.
 *
 * To add a project, append an object to this array. Wrap any detail that is
 * not yet confirmed in `pending()` — it will appear as a marked placeholder in
 * `npm run dev` and be omitted from the production build.
 *
 * Homepage order is controlled by `featured`; catalogue order follows this array.
 */
export const projects: readonly Project[] = [
  {
    slug: 'hybrid-llm-chatbot',
    title: 'Hybrid LLM Customer-Service Chatbot',
    tagline: 'Deterministic answers for predictable requests, a generative layer for everything else.',
    summary:
      'An e-commerce customer-service chatbot on WhatsApp. A rule-based decision tree answers structured requests such as order status; a generative AI layer handles open-ended questions.',
    category: 'professional',
    status: 'completed',
    context: 'Mazzraty (Al Mana Group)',
    featured: 1,
    stack: [
      'Generative AI / LLM',
      'Rule-based decision trees',
      'NLP',
      'WhatsApp',
      'API integration',
      pending('Node.js backend — confirm'),
      pending('Django admin components — confirm'),
      pending('LLM provider and model — name it'),
      pending('WhatsApp Business API (Cloud API or a provider such as Twilio?)'),
    ],
    problem: [
      'Customer messages fall into two very different groups. Many are predictable — order status, product availability, delivery information — and need fast, consistent answers. Others are open-ended and cannot be anticipated with fixed rules.',
      'A rules-only bot fails as soon as a question falls outside its tree. Relying entirely on an LLM makes answers to structured questions harder to keep consistent and depends on model output for information that has one correct answer.',
    ],
    solution: [
      'The chatbot combines two response layers. A rule-based decision tree handles the common, structured requests. Messages the tree cannot answer are passed to a generative AI layer, which extends coverage to open-ended customer questions.',
    ],
    contribution: [
      'Built and deployed the chatbot, including the decision-tree layer, the generative layer and the routing between them.',
      pending('Clarify which parts you built alone and which with a team (e.g. WhatsApp integration, hosting).'),
    ],
    diagrams: [
      {
        kind: 'flow',
        title: 'Message flow',
        caption: 'Sanitised architecture. Component names are generic; no proprietary details are shown.',
        stages: [
          { label: 'Customer', detail: 'Sends a message on WhatsApp' },
          { label: 'Message handler', detail: 'Receives the incoming message from WhatsApp' },
          { label: 'Router', detail: 'Decides whether the decision tree can answer' },
          {
            lanes: [
              { label: 'Decision tree', detail: 'Order status, product availability, delivery information' },
              { label: 'Generative AI layer', detail: 'Open-ended questions outside the tree' },
            ],
          },
          { label: 'Reply', detail: 'Sent back to the customer on WhatsApp' },
        ],
      },
    ],
    architecture: [
      pending('How the router classifies a message (keywords, menu choices, an intent classifier?).'),
      pending('Where order and product data comes from (internal API, database, e-commerce platform).'),
      pending('Whether generative answers are constrained by a system prompt, retrieved context or guardrails.'),
    ],
    decisions: [
      {
        title: 'Deterministic first, generative second',
        body: 'Structured requests are answered by the decision tree, so answers about orders and deliveries stay consistent and do not depend on model output. The generative layer is used only where fixed rules cannot reasonably anticipate the question.',
      },
      {
        title: 'Extend coverage, do not replace the rules',
        body: 'The generative layer widens the range of questions the bot can handle without giving up the predictable flows that already worked.',
      },
    ],
    challenges: [pending('Add one or two real challenges, e.g. routing edge cases, handling handover to staff, or cost and latency of LLM calls.')],
    confidentiality:
      'Built for an employer. Source code, credentials and customer conversations are confidential and are not published; this case study describes the architecture only.',
    links: [pending('Link a sanitised demo or recorded walkthrough if one can be shared.')],
  },
  {
    slug: 'hr-management-system',
    title: 'End-to-End HR Management System',
    tagline: 'A Django HR portal serving two group companies from one codebase.',
    summary:
      'A Horilla-based Django HR portal covering employee records, leave workflows, document-expiry tracking and biometric attendance, with a five-tier permission model.',
    category: 'professional',
    status: 'completed',
    context: 'Mazzraty (Al Mana Group) · Mazzraty and AQCDP',
    featured: 2,
    stack: [
      'Python',
      'Django',
      'Horilla HRMS',
      'Role-based access control',
      'Biometric API integration',
      pending('Database engine — name it (PostgreSQL, MySQL, SQL Server?)'),
      pending('Frontend: Django templates, HTML, CSS, JavaScript — confirm'),
    ],
    problem: [
      'HR processes were handled manually. Employee records, leave requests and document-expiry monitoring all required administrative effort, and attendance was logged by hand at clock-in and clock-out.',
      'The system also had to serve two group companies — Mazzraty (poultry) and AQCDP (dairy) — from a shared codebase, with access controlled by role.',
    ],
    solution: [
      'A comprehensive HR portal built in Django on top of the Horilla HRMS that replaces the manual processes with defined workflows.',
    ],
    features: [
      'Employee and HR record management.',
      'Leave requests, from submission to approval.',
      'Document-expiry tracking.',
      'Role-based access for employees, line managers, general management and HR.',
      'Automatic attendance recording through the company’s biometric API.',
    ],
    contribution: [
      'Lead developer and technical architect for the portal.',
      'Designed the five-tier role and permission system and the badge-based identity resolution.',
      'Integrated the existing biometric hardware through the company’s biometric API, replacing manual attendance logs.',
    ],
    diagrams: [
      {
        kind: 'tiers',
        title: 'Permission tiers',
        caption: 'Five access tiers, from broadest to narrowest. Each user is resolved to a tier through their badge identity.',
        tiers: [
          { label: 'Global Access' },
          { label: 'HR' },
          { label: 'GM' },
          { label: 'Line Manager' },
          { label: 'Employee' },
        ],
      },
      {
        kind: 'flow',
        title: 'Attendance recording',
        stages: [
          { label: 'Biometric device', detail: 'Existing hardware at the workplace' },
          { label: 'Biometric API', detail: 'Exposes attendance events' },
          { label: 'HR portal', detail: 'Stores attendance against the employee record' },
        ],
      },
    ],
    architecture: [
      pending('Describe what each tier can view or approve, e.g. line managers approve their team’s leave.'),
      pending('Explain how a badge ID resolves to an employee, company and tier.'),
      pending('Confirm how the biometric API is consumed (polling, push, scheduled sync).'),
    ],
    decisions: [
      {
        title: 'One codebase for two companies',
        body: 'Mazzraty and AQCDP are supported from a shared codebase, so workflow changes and fixes are made once rather than maintained in parallel.',
      },
      {
        title: 'Authorization modelled on the organisation',
        body: 'Access is defined by five tiers — Employee, Line Manager, GM, HR and Global Access — so permission rules follow the actual reporting structure rather than being configured user by user.',
      },
      pending('Why build on Horilla, and what you customised versus built from scratch.', 'Building on Horilla'),
    ],
    challenges: [pending('Add a real challenge, e.g. mapping existing employee data, edge cases in approval chains, or biometric data quality.')],
    confidentiality:
      'Internal system. No employee data, screenshots or proprietary code are published. Any future demo will use synthetic data.',
    links: [pending('Optional: a demo running on synthetic data.')],
  },
  {
    slug: 'breast-cancer-tissue-registration',
    title: 'Breast Cancer Tissue Image Registration & Classification',
    tagline: 'Aligning H&E and IHC histopathology images and classifying cancer cells — a research prototype.',
    summary:
      'My final-year project: aligning H&E and IHC-stained tissue images and classifying cancer cells with machine learning, behind a React interface for submitting images and viewing results.',
    category: 'academic',
    status: 'completed',
    context: 'University of Nottingham Malaysia · Final-year project',
    period: '2023 – 2024',
    featured: 3,
    stack: [
      'Machine learning',
      'Image processing',
      'Image registration',
      'React',
      pending('Python — confirm'),
      pending('Deep-learning framework (PyTorch, TensorFlow/Keras?)'),
      pending('Final model — DenseNet121, Vision Transformer, or other?'),
      pending('API layer between React and the model (Flask, FastAPI?)'),
    ],
    problem: [
      'Histopathology slides are stained in different ways to reveal different information. H&E and IHC stains of breast tissue look very different, which makes it hard to compare the same region across both stains automatically.',
      'Aligning the two staining types, then analysing the aligned images, can support research into classifying breast cancer tissue.',
    ],
    solution: [
      'A pipeline that registers (aligns) H&E and IHC images and applies machine learning to classify cancer cells, connected to a React interface where a user can submit or view tissue images and see the classification results.',
    ],
    contribution: [
      'Final-year project: developed the image-processing and classification pipeline and the React interface connected to it.',
      pending('Confirm this was an individual project and note any supervisor-provided components or datasets.'),
    ],
    diagrams: [
      {
        kind: 'flow',
        title: 'System overview',
        caption: 'How the interface, processing pipeline and model interact.',
        stages: [
          { label: 'React interface', detail: 'Submit or view tissue images' },
          { label: 'Preprocessing', detail: 'Prepare H&E and IHC images for alignment' },
          { label: 'Registration', detail: 'Align the two staining types' },
          { label: 'Classification', detail: 'ML inference on the aligned tissue' },
          { label: 'Results', detail: 'Returned to the interface for review' },
        ],
      },
    ],
    architecture: [
      pending('Registration method (feature-based, intensity-based, deformable?).'),
      pending('Dataset: source, size and licence (no patient-identifiable data).'),
      pending('How results are presented in the interface (labels, overlays, confidence?).'),
    ],
    decisions: [
      pending('Distinguish the final model from models you only experimented with, and why you chose it.', 'Model selection'),
      pending('Why register images before classifying rather than classifying each stain independently.', 'Register, then classify'),
    ],
    challenges: [pending('Add real challenges and lessons, e.g. stain variability, image size, or limited labelled data.')],
    responsibleUse: [
      'This is an academic research prototype. It has not been clinically validated and must not be used for diagnosis.',
    ],
    links: [pending('Link the repository, dissertation or poster if they can be shared.')],
  },
  {
    slug: 'windows-dlp-agent',
    title: 'Windows Data-Loss-Prevention Agent',
    tagline: 'A self-built Python agent that flags potentially sensitive financial data leaving the endpoint.',
    summary:
      'A Python agent for Windows with a financial-data classification engine that flags potentially sensitive data movement. Built on my own initiative as a security automation project.',
    category: 'independent',
    status: 'completed',
    context: 'Self-initiated while at Mazzraty',
    featured: 4,
    stack: [
      'Python',
      'Windows',
      'Sensitive-data classification',
      'Security automation',
      pending('Libraries used for file or system monitoring (e.g. watchdog, pywin32) — name them'),
    ],
    problem: [
      'Sensitive financial information can leave an organisation through ordinary activity on employee machines. Without monitoring at the endpoint, that movement can go unnoticed.',
    ],
    solution: [
      'A Windows agent written in Python. It watches for data movement on the endpoint, runs content through a financial-data classification engine, and flags data that appears to contain sensitive financial information.',
    ],
    contribution: ['Conceived, designed and built the agent independently as a security automation initiative.'],
    diagrams: [
      {
        kind: 'flow',
        title: 'Detection flow',
        stages: [
          { label: 'Endpoint activity', detail: 'Data movement on a Windows machine' },
          { label: 'Content inspection', detail: 'Extract content to classify' },
          { label: 'Classification engine', detail: 'Identify likely financial data' },
          { label: 'Flag', detail: 'Mark the movement for review' },
        ],
      },
    ],
    architecture: [
      pending('Which channels are monitored (file copies, USB, network shares, clipboard, email?).'),
      pending('Classification approach (patterns such as IBAN or card numbers, keywords, ML model?).'),
      pending('What happens when data is flagged (log, alert, block) and where results are stored.'),
    ],
    decisions: [pending('Add one or two design decisions, e.g. rules versus ML for classification, or handling false positives.')],
    challenges: [pending('Add real challenges, e.g. false positives, performance on the endpoint, or permissions.')],
    responsibleUse: [
      'Endpoint monitoring affects employee privacy. An agent like this should run only with organisational approval and clear policies on what is inspected and retained.',
    ],
    links: [pending('Confirm whether code can be published; if not, this case study stays architecture-only.')],
  },
  {
    slug: 'rag-pipeline',
    title: 'Retrieval-Augmented Generation Pipeline',
    tagline: 'Grounding an internal chatbot’s answers in a company knowledge base.',
    summary:
      'A retrieval pipeline for an internal company chatbot that finds relevant passages in a knowledge base and supplies them as context before the LLM responds.',
    category: 'professional',
    context: 'Internal company chatbot',
    stack: [
      'Retrieval-augmented generation',
      'LLM',
      pending('Python — confirm'),
      pending('FAISS (vector search) — confirm'),
      pending('BM25 (keyword retrieval / reranking) — confirm'),
      pending('Sentence Transformers, all-MiniLM-L6-v2 — confirm'),
      pending('Dense Passage Retrieval — confirm if used'),
      pending('LLM framework or API — name it'),
    ],
    problem: [
      'Large language models can give inaccurate answers when they lack context from a specific knowledge base. An internal chatbot needs its answers tied to the organisation’s own material.',
    ],
    solution: [
      'A retrieval-augmented generation pipeline: before the LLM responds, relevant information is retrieved from a knowledge base and supplied as context, so answers are grounded in supporting material.',
    ],
    contribution: [
      'Developed the RAG pipeline for an internal company chatbot.',
      pending('Confirm your role and the project status (prototype, in use, in progress).'),
    ],
    diagrams: [
      {
        kind: 'flow',
        title: 'Retrieval pipeline',
        caption: 'Sanitised diagram. No company documents are shown.',
        stages: [
          { label: 'Knowledge sources', detail: 'Internal documents the chatbot may draw on' },
          { label: 'Processing and chunking', detail: 'Split documents into retrievable passages' },
          { label: 'Embedding and indexing', detail: 'Represent passages for search' },
          { label: 'Candidate retrieval', detail: 'Find passages likely to answer the query' },
          { label: 'Ranking', detail: 'Order candidates by relevance' },
          { label: 'Context assembly', detail: 'Fit the best passages into the prompt' },
          { label: 'LLM response', detail: 'Answer generated from the supplied context' },
        ],
      },
    ],
    decisionsHeading: 'Engineering considerations',
    decisions: [
      {
        title: 'Lexical and semantic retrieval',
        body: 'Keyword retrieval (such as BM25) is strong on exact terms, codes and names; semantic retrieval with embeddings finds passages that use different wording for the same idea. Combining them widens the range of relevant candidates.',
      },
      {
        title: 'Chunk size',
        body: 'Smaller chunks make retrieval more precise but can strip away context; larger chunks keep context but dilute relevance and use more of the prompt.',
      },
      {
        title: 'Context limits and grounding',
        body: 'Only a limited number of passages fit in the prompt, so ranking quality directly affects whether the answer is grounded in the right material.',
      },
      {
        title: 'Speed versus relevance',
        body: 'Each extra retrieval or reranking step can improve relevance but adds latency to every question.',
      },
      pending('Mark which of the considerations above were implemented and which are future improvements.'),
    ],
    confidentiality:
      'Built for an employer. Source documents, code and credentials are not published; this page documents the architecture and approach only.',
    links: [pending('Link a public repository or demo only if it uses synthetic documents.')],
  },
  {
    slug: 'api-monitor',
    title: 'API Monitor',
    tagline: 'A small, well-tested tool for checking API availability and behaviour.',
    summary:
      'A focused monitoring tool: configurable endpoints, HTTP checks with status and latency measurement, response validation and clear failure diagnostics.',
    category: 'independent',
    status: 'in-progress',
    stack: [pending('Language and libraries — add once the first version is built')],
    problem: [
      'When an API slows down or starts failing, the useful questions are simple: which endpoint, since when, what did it return, and how long did it take. Answering them should not require a full monitoring platform.',
    ],
    solution: [
      'A deliberately small first version that runs configured checks and reports clear results, built with testing and documentation as first-class requirements.',
    ],
    contribution: ['Personal project — design, implementation and documentation.'],
    planned: [
      'Configurable list of endpoints with method, headers and expected response.',
      'HTTP request execution with status code and latency measurement.',
      'Response validation (status, body content or schema where appropriate).',
      'Failure handling with useful diagnostics: timeouts, DNS and connection errors, unexpected responses.',
      'Structured logs and a simple summary of recent results.',
      'Automated tests and clear setup instructions.',
    ],
    links: [pending('Add the repository link once it exists.')],
  },
  {
    slug: 'go-restaurant-simulator',
    title: 'Restaurant Operations Simulator',
    tagline: 'Exploring how staffing and timing affect service efficiency, in Go.',
    summary:
      'A Go simulator for exploring how staffing levels and operational intervals affect restaurant service efficiency under different scenarios.',
    category: 'independent',
    status: 'in-progress',
    stack: ['Go', pending('Add libraries and tooling once implemented')],
    problem: [
      'Restaurant operators have to decide how many staff to schedule and how to pace operations without a clear view of how those choices affect service.',
    ],
    solution: [
      'A simulation where staffing and timing assumptions can be changed and the resulting service outcomes compared across scenarios.',
    ],
    contribution: ['Personal project — design and implementation.'],
    planned: [
      'Configurable parameters for staffing levels and operational intervals.',
      'Time-based simulation of operational events.',
      'Statistical summaries for each run.',
      'Side-by-side comparison of scenarios.',
      'Unit tests and benchmarks for the simulation core.',
    ],
    architecture: [pending('Describe what is implemented so far; everything above is currently shown as planned.')],
    links: [pending('Add the repository link.')],
  },
  {
    slug: 'flutter-mortality-tracker',
    title: 'Mortality-Tracking Application',
    tagline: 'A Flutter app for consistent recording of mortality information in operations.',
    summary:
      'A Flutter application built for my company so operational teams can record and review mortality-related information in a consistent way.',
    category: 'professional',
    context: 'Mazzraty (Al Mana Group)',
    stack: [
      'Flutter',
      'Dart',
      pending('Backend — name it (Firebase, Django API, other?)'),
      pending('Database — name it'),
    ],
    problem: [
      'Operational teams need a consistent way to record and review mortality-related information within company operations.',
    ],
    solution: ['A Flutter application for capturing and reviewing mortality records.'],
    contribution: [pending('Describe your role and the project status.')],
    architecture: [
      pending('Intended users and the workflow from data capture to review.'),
      pending('How records are organised and where they are stored.'),
    ],
    confidentiality: 'Internal application. Any screenshots will be sanitised mockups without company data.',
    links: [pending('Add a sanitised mockup or screenshot.')],
  },
  {
    slug: 'adaptive-learning-planner',
    title: 'Facial-Expression-Aware Adaptive Learning Planner',
    tagline: 'Combining uncertain expression signals with learning performance to suggest study plans.',
    summary:
      'An algorithmic project exploring how facial-expression signals during lessons and quizzes, combined with quiz performance, could inform a personalised study plan.',
    category: 'independent',
    stack: [
      'Computer vision',
      'Facial-expression classification',
      'Adaptive learning logic',
      pending('Libraries and model — name them'),
      pending('Confirm category: academic or independent?'),
    ],
    problem: [
      'Students have different learning needs, and a fixed study plan does not adapt to how a student actually interacts with lessons and quizzes.',
    ],
    solution: [
      'A pipeline that combines facial-expression signals with quiz and lesson performance to identify content that may need review, then recommends a personalised study plan.',
    ],
    contribution: [pending('Describe your role and how much of the pipeline was implemented.')],
    diagrams: [
      {
        kind: 'flow',
        title: 'Proposed pipeline',
        stages: [
          { label: 'Permitted input', detail: 'Facial-expression video or images, with consent' },
          { label: 'Feature extraction', detail: 'Expression-related features' },
          {
            lanes: [
              { label: 'Expression signals', detail: 'Treated as uncertain evidence' },
              { label: 'Quiz and lesson performance', detail: 'Primary evidence of understanding' },
            ],
          },
          { label: 'Review detection', detail: 'Content that may need revisiting' },
          { label: 'Study plan', detail: 'Personalised recommendations' },
        ],
      },
    ],
    responsibleUse: [
      'Facial expressions do not reliably reveal a student’s emotional or cognitive state. In this design they are treated as uncertain signals and are combined with learning performance and the student’s own feedback, never used on their own.',
      'Capturing facial data requires informed consent and careful handling of what is stored.',
    ],
    links: [pending('Add the repository or report link.')],
  },
  {
    slug: 'location-documentation-app',
    title: 'Location Tracking and Documentation Application',
    tagline: 'Recording locations alongside the documentation that belongs to them.',
    summary: 'An application using Google location services to support location tracking and associated documentation.',
    category: 'independent',
    draft: true,
    stack: [pending('Platform, language and Google APIs used (Maps SDK, Geolocation API, Places?)')],
    problem: [pending('What problem does the app solve, and for whom?')],
    solution: [pending('Describe the workflow: how locations are captured and what documentation is attached.')],
    contribution: [pending('Your role and the project status (prototype or complete).')],
    responsibleUse: [
      'Location data is personal data. The app should request location permission only when needed and make clear what is stored.',
    ],
    links: [pending('Repository or demo link.')],
  },
  {
    slug: 'r-data-analysis',
    title: 'Data Analysis in R',
    tagline: 'Details to be added.',
    summary: 'A data analysis project in R.',
    category: 'independent',
    draft: true,
    stack: ['R', pending('Packages used (tidyverse, ggplot2, …)')],
    problem: [pending('Dataset and research question.')],
    solution: [pending('Analytical methods actually used.')],
    contribution: [pending('What the results mean, with the key charts and their interpretation.')],
    links: [pending('Repository or report link.')],
  },
];
