Overview
This agent will ground its responses primarily in the WHO guideline “WHO recommendations on antenatal care for a positive pregnancy experience,” supplemented by a small set of public, authoritative resources on danger signs, mapping of services, and existing maternal‑health chatbots.

We use the WHO guideline via embeddings and retrieval‑augmented generation (RAG), and the other resources as pattern libraries for safety, referral logic, and design choices rather than as primary knowledge sources.

1. WHO ANC Guideline (Primary Knowledge Source)
What it is

Global WHO guideline on routine ANC for pregnant women and adolescent girls, covering nutrition, maternal and fetal assessment, preventive measures, common physiological symptoms, and health‑system interventions.

Endorses an ANC model with a minimum of eight contacts and explicitly emphasizes person‑centred, rights‑based, respectful care.

Where it is available

Full guideline and executive summary are open‑access on WHO’s publications site and via the WHO IRIS repository; multiple language versions exist.

Healthy Newborn Network hosts an accessible overview and download links.
​

How we use it (implementation)

Embedding & RAG (primary content):

Extract short, semi‑structured snippets for:

Visit schedule (8‑contact model and approximate timing).

Routine assessments (blood pressure, urine tests, anemia screening).

Nutritional interventions and supplements (without dosage‑level instructions).

Interventions for common physiological symptoms (e.g., nausea, heartburn, back pain).
​

Chunk and embed this content; use RAG to pull the top‑K passages per user question and inject into the LLM context.

System prompt grounding (behavioral rules):

Use language from the guideline about “positive pregnancy experience,” respectful, person‑centred care, and the need for communication and psychosocial support to define tone and agent persona.

Limitations / boundaries:

We deliberately exclude dosage tables, complex clinical algorithms, and context‑specific implementation details from direct user‑facing answers and instead use them to inform general advice plus referrals.

When to use

For all in‑scope informational questions: symptoms in normal pregnancy, visit scheduling, what typically happens at ANC visits, basic nutrition and self‑care, and explaining why ANC is important for adolescents.
​
​

2. Danger‑Sign and Urgent‑Care Resources (Guardrails & Safety Text)
Key sources

CDC “Urgent Maternal Warning Signs” / Hear Her campaign: public‑facing list of urgent signs (e.g., severe headache, vision changes, heavy bleeding, chest pain, trouble breathing, severe belly pain, sudden swelling, baby’s movements slowing or stopping).

Research articles on obstetric danger‑sign awareness in LMICs, documenting common knowledge gaps.

Where they are available

CDC pages are open‑access and updated periodically.
​

Peer‑reviewed studies are accessible via PubMed Central and journal websites; we use them mainly for design rationale rather than as direct Q&A sources.

How we use them

Pre‑LLM emergency routing:

Build a keyword/intent list and simple classifier for urgent signs from CDC’s list (e.g., “bleeding,” “severe headache,” “can’t breathe,” “chest pain,” “no baby movement”).
​
​

If triggered, bypass the LLM and return a hardcoded emergency message that:

Acknowledges the symptom.

States that it could be serious.

Urges immediate in‑person care and, where known, local emergency numbers or hotlines.

Post‑LLM safety check:

For responses mentioning any danger sign, enforce a post‑processing rule that appends “please seek care now”‑style language consistent with CDC phrasing.
​

Design justification:

Use LMIC danger‑sign awareness literature in the memo to justify extra emphasis on explaining lesser‑known signs (e.g., vision changes, severe headache), especially for adolescents.

When to use

Every time the model detects possibly serious symptoms, either from user input or within its own drafted answer.

When drafting generic educational content like “warning signs you should never ignore.”

3. Maternal‑Health Chatbots (Design and Evaluation Patterns)
Key sources

Rosie, a maternal and child health education chatbot supporting pregnancy and parenting questions, evaluated as an AI‑powered clinical intervention.

Where available

Peer‑reviewed evaluations in JMIR/Formative and related journals, plus product information on project sites.

How we use them

Tone and style:

Use Rosie findings to support our choice of warm, non‑judgmental, adolescent‑friendly language and short, conversational answers.
​

Escalation model:

Mirror the pattern where routine questions are answered automatically, but mental‑health risk signals lead to human follow‑up or referral (e.g., hotlines).
​

Evaluation framing:

Reference Rosie’s reported acceptability and trust to motivate our evaluation rubric focusing on safety, tone, and completeness, not just accuracy.
​
​

When to use

In design documentation, evaluation planning, and the reflection memo—these are inputs to our design, not part of the RAG corpus.

4. Maternal and Infant Health Mapping & MCP‑Style Resources
Key sources

HRSA Maternal and Infant Health Mapping Tool and Quick Maps (US): interactive maps of maternal/infant indicators and locations of HRSA‑funded services and health centers.

High‑resolution mapping of maternal and child health service coverage in countries like Nigeria, and effective coverage cascade studies for ANC in multiple LMICs.

Where available

HRSA tools are public, browser‑based dashboards with open indicator metadata.

Mapping and coverage studies are available via PubMed, journal sites (BMJ Open, BMJ Global Health, etc.).

How we use them

Prototype phase:

Use them as design inspiration and, optionally, as a static “demo” data source for one geography (e.g., hardcode 3–5 clinics or hotlines for a target city or region) rather than integrating live map APIs.
​
​

Scaling narrative:

In the memo, describe how, at scale, we could:

Ingest official facility registries and coverage maps to prioritize underserved areas.

Tailor referral messages based on travel time and service availability (e.g., more urgent language where CEmONC is far away).

When to use

For referral recommendations (“nearest youth‑friendly ANC clinic”) in a limited pilot region using static data.

In future design discussions and funding proposals when explaining how the chatbot could align with national maternal‑health programs and MCP‑style networks.

5. Availability, Licensing, and Inclusion in the Stack
WHO ANC guideline: Open‑access, intended to inform policies and clinical protocols; safe to embed and index for RAG as long as we do not misrepresent it as individual medical advice.

CDC and HRSA resources: Public US government materials; generally usable in products, with appropriate attribution where required.

Peer‑reviewed articles & chatbot evaluations: Typically under journal licenses (often Creative Commons for open‑access). We use them for internal design justification and do not surface verbatim text in the chatbot.

In code terms:

RAG index: WHO ANC guideline (selected portions only).

Rule‑based libraries: CDC danger signs, static facility/hotline tables for a pilot geography.

Design references (no direct retrieval): Maternal health chatbot papers, mapping and coverage studies.

This keeps the live system simple and safely grounded while showing a clear path to richer integrations later.

Prepared by Deep Research