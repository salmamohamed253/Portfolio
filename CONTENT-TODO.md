# Content to confirm

Everything on the live site comes from the CV or from project descriptions supplied by Salma. The items below are **not yet published**: they appear as **To confirm** placeholders in `npm run dev` and are stripped from production builds.

To publish a detail, replace its `pending('…')` in `src/data/projects.ts` with plain text.

## Links

- [ ] **LinkedIn** — `https://www.linkedin.com/in/salmamsalem` (taken from the CV). Open it once to confirm it works; it could not be checked from the build environment.
- [ ] **CV PDF** — the downloadable CV includes your phone number and home town. Keep it as is, or replace `public/Salma_Mohamed_Salem_CV.pdf` with a version without the phone number.
- [ ] Repository, demo or write-up links for any project that can be shared publicly.

## Featured projects

### Hybrid LLM customer-service chatbot
- [ ] Backend stack: Node.js? Django components? Something else?
- [ ] LLM provider and model.
- [ ] WhatsApp integration: Cloud API directly, or through a provider such as Twilio?
- [ ] How the router decides between the decision tree and the generative layer.
- [ ] Where order and product data comes from.
- [ ] Any guardrails on generative answers (system prompt, retrieved context…).
- [ ] Which parts you built alone and which with a team.
- [ ] One or two real challenges or lessons learned.

### HR management system
- [ ] Database engine.
- [ ] Frontend approach (Django templates, HTML, CSS, JavaScript).
- [ ] What each permission tier can view or approve.
- [ ] How a badge ID resolves to an employee, company and tier.
- [ ] How the biometric API is consumed (polling, push, scheduled sync).
- [ ] Why you built on Horilla, and what you customised versus built new.
- [ ] A real challenge or lesson learned.

### Breast cancer tissue registration and classification
- [ ] Language and frameworks (Python? PyTorch or TensorFlow/Keras?).
- [ ] **Final model actually used**, as opposed to models you only experimented with (DenseNet121? Vision Transformer?).
- [ ] Registration method.
- [ ] API layer between React and the model.
- [ ] Dataset source, size and licence.
- [ ] How results are shown in the interface.
- [ ] Confirm it was an individual project.
- [ ] Challenges and lessons learned.
- [ ] Repository, dissertation or poster link, if shareable.

### Windows DLP agent
- [ ] Monitored channels (file copies, USB, network shares, clipboard, email…).
- [ ] Classification approach (patterns, keywords, ML…).
- [ ] What happens when data is flagged.
- [ ] Libraries used.
- [ ] Design decisions and challenges.
- [ ] Whether the code can be published.

## Other published projects

### RAG pipeline
- [ ] Confirm each component before it is named: Python, FAISS, BM25, Sentence Transformers (`all-MiniLM-L6-v2`), DPR, LLM framework or API.
- [ ] Your role, and the status (prototype, in use, in progress).
- [ ] Which engineering considerations were implemented and which are future improvements.

### API Monitor (in progress)
- [ ] Language and libraries, once the first version exists.
- [ ] Repository link.

### Go restaurant simulator (in progress)
- [ ] What is implemented so far. Everything is currently shown as planned.
- [ ] Repository link.

### Flutter mortality tracker
- [ ] Backend and database.
- [ ] Your role and the project status.
- [ ] Intended users and workflow.
- [ ] A sanitised mockup.

### Facial-expression-aware learning planner
- [ ] Category (academic or independent?) and status.
- [ ] Libraries and model.
- [ ] How much of the pipeline was implemented.
- [ ] Repository or report link.

## Drafts (hidden in production until details are supplied)

### Location tracking and documentation app (`draft: true`)
- [ ] Platform, language and Google APIs used.
- [ ] The problem it solves and the workflow.
- [ ] Your role and the status.

### R data analysis (`draft: true`)
- [ ] Dataset and research question.
- [ ] Methods and packages used.
- [ ] Findings, with the key charts and what they mean.
