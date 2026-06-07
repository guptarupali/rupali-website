---
title: "The Field That Took Three Weeks: What Serious API Governance Really Looks Like"
date: "2026-01-20"
category: "AI Governance"
tags: ["API Governanace", "API Strategy", "Guardrails", "Responsible AI"]
excerpt: "People sometimes called the API governance forum a blocker. I understood why. "
featured: true
---

It has been almost a year since I published an issue of The Platform Path.

Not because I had nothing to say. If anything, the opposite. The past year has been one of the most intense, formative, and perspective-shifting periods of my career. Leaving Fidelity International after more than a decade. Stepping into a global platform engineering mandate at Dunnhumby. Building, transforming, and leading at a scale and speed that left very little room for writing.

But something shifted this week.

I published two posts on LinkedIn about API governance and the golden source principle. The response was immediate and genuine. Engineers, architects, CTOs, and platform leaders wrote back saying this was exactly the conversation they needed. That it named something they had been living but struggling to articulate.

So I am back. And I am starting where it matters most right now.

Not with AI models. Not with platforms. Not with developer experience or cloud strategy or any of the topics I will cover in future issues.

I am starting with foundations.

Article content


Because the most important conversation happening in enterprise technology right now, whether you are building AI systems, modernising platforms, or designing the next generation of digital products, is not about what you are building on top. It is about what you built underneath.

And most organisations built it wrong.

The Story That Shaped Everything I Believe About API Governance
People sometimes called the API governance forum a blocker.

I understood why. When a single field change takes four weeks to ratify, when architects, product owners, compliance stakeholders, and regulatory specialists are still arguing on week three about whether a pension attribute belongs at the customer level or the account level, it is easy to see the forum as the thing standing in the way.

But the forum never diluted. Not once. Not under pressure, not under deadline, not when business stakeholders pushed back, not when engineers wanted to move faster.

And that discipline, maintained consistently across years and across every domain, is what made the transformation possible.

When I joined the API strategy program at Fidelity International, we were working with monolithic business services. Every domain had built its own model of the world. Every team had evolved its own understanding of what the data meant and how it should be structured. Customer meant something different in wealth management than it did in retirement, than it did in payments, than it did in financial crime, than it did in the workplace platform, the institutional business, and the advisor platform.

The same human being. Dozens of definitions. No authoritative version of anything.

The journey from that fragmented estate to canonical, domain-driven APIs was not a technology project. It was a re-architecting of how the organisation understood its own data. Domain by domain. Field by field. Contract by contract. Across customer data, financial crime, and payments, three of the most complex and heavily regulated domains in financial services.
The Field That Took Three Weeks
Take one example from that journey.

A pension-related field that every team had assumed belonged at the customer level. Clean. Obvious. Uncontested at first glance.

Until we started asking the harder questions in the governance forum.

What happens when a customer holds multiple pension accounts? What happens at product transfer, when a customer moves between platforms or retirement products? What are the regulatory reporting obligations across jurisdictions, and where is the direction of travel on those obligations given the regulatory environment we were operating in?

The field did not belong to the customer. It belonged to the account.

That single distinction, customer level versus account level, had downstream consequences for dozens of systems. For regulatory reporting across multiple markets. For the canonical identity model we were building for the entire enterprise. For every team that would ever consume this contract and build on top of it.

The debate took three weeks. Product owners argued from the business meaning perspective. Architectural owners argued from the data model perspective. Compliance brought the regulatory direction. Risk raised the cross-product scenarios. Nobody backed down until we had an answer we could all stand behind.
That debate was not exceptional. It was Tuesday.

Every domain went through this. Every field that mattered went through this. The forum was not a blocker. It was the mechanism by which the organisation made decisions it had been avoiding for years. Decisions about ownership, about meaning, about what we were actually promising to every system, every team, and every regulator that would ever depend on these contracts.

What We Actually Built
The architecture we designed and implemented spanned the full enterprise. Backend core services. Centralised data. Aggregation and access. Orchestration. Each layer connected, each layer governed, each layer with clear principles about what lived where and why.

Backend core services were designed for high volume throughput, high resilience, the ability to auto-scale, and deep integration capability supporting API queries, data streaming, and publish-subscribe mechanisms. These were business-critical platforms. The architecture decisions at this layer carried the weight of millions of daily transactions across regulated markets.

The centralised data layer introduced golden data domain stores, the single authoritative source for each domain entity. Data quality rules, survivorship logic, backward compatibility standards, and clear ownership were not afterthoughts. They were baked into the architecture from the start. The principle was simple and non-negotiable: clearly define data domains, golden sources, and survivability rules before you build anything that depends on them.

The aggregation and access layer managed how data was surfaced and assembled for consumers. Requests from channels and digital services were authorised and routed here. Multi-flow requests for complex customer journeys were managed here. Data from the centralised layer was surfaced through clean APIs and events for consumption by downstream applications, analytics platforms, and external partners.

The orchestration layer handled the complexity that emerges when systems need to coordinate across boundaries. Synchronous API workflows for real-time interactions. Asynchronous workflows for long-running business processes. BPM workflows, workload choreography, scheduling, and event orchestration. Each pattern had a defined place in the architecture. None of it was invented ad hoc.

And underneath all of it, the API governance forum. The mechanism that ensured every contract in every layer was owned, defined, governed, and trusted.
Why API Governance Fails in Most Organisations
The pattern I have seen repeatedly, at Fidelity before the transformation and in organisations I have worked with and spoken to since, is the same.

Governance is launched as a standards document. A committee is formed. Engineers are told to follow the standards. Nobody enforces them. Two years later, there are 300 APIs and no two of them look alike.
The problem is not the standards. The problem is that governance was designed as a control layer instead of an enablement layer.
The governance forum at Fidelity worked because it was embedded inside the delivery process, not bolted on top of it. Domain reviews happened early, before design decisions calcified. Templates made the right patterns the easiest ones to follow. Tooling enforced naming conventions, versioning, and security baselines before code reached production.

Governance stopped being something that slowed teams down. It became something that protected teams from the mistakes that slow everyone down later.
The secret to API governance that actually works is this: make compliance the path of least resistance. If engineers have to fight the process to do the right thing, they will find shortcuts. If the process makes the right thing automatic, they will do it every time without thinking about it.

This is true for APIs. It is true for platform engineering. It is true for AI systems. The principle does not change.
The AI Connection I Want To Make Explicit
Everything I have described in this newsletter, canonical identity, golden source data, governed contracts, backward compatibility, clean aggregation and access patterns, is not history.

It is the prerequisite for trustworthy enterprise AI.
An AI system does not question the data it receives. It reasons on it, generates from it, decides based on it. If your APIs are returning inconsistent representations of the same entity because you never solved the canonical identity problem, your AI will produce inconsistent outputs. It will not tell you this. It will sound equally confident every time.
If your contracts are ungoverned and break without warning, your AI behaviour will change silently when contracts change. A field moves from customer to account level. A response structure changes. A new attribute appears. The AI has no way to know. It adapts based on whatever it receives. And the outputs drift in ways that are invisible until something breaks.
The organisations that invested in these foundations before AI arrived are the ones whose AI initiatives are succeeding now. The organisations that did not are discovering that their AI problems are actually API and data architecture problems in disguise.

Enterprise AI does not fail because of models. It fails because of foundations.
This is the central argument of the series I am building on LinkedIn right now, one post every Wednesday, connecting a decade of financial services API architecture to the most pressing challenge in enterprise technology today.

What Platform Engineers Need To Take From This
I see the same patterns emerging in platform engineering conversations that I lived through in financial services API governance a decade ago.

Teams are building Internal Developer Platforms and discovering that the hardest part is not the tooling. It is the ownership model. Who defines the golden path? Who has the authority to say this template is the standard? What happens when a team wants to deviate?

These are governance questions. Not technology questions.

The organisations that answer them clearly, with the right mix of authority and flexibility, are the ones whose platforms get adopted rather than worked around. The ones that treat governance as an afterthought discover it later, when the platform has already fragmented and the technical debt is embedded.
The lesson from financial services API governance is not a FinTech lesson. It is an enterprise architecture lesson that applies equally to cloud-native platforms, internal developer portals, AI integration layers, and any system where multiple teams are building on a shared foundation.

Contracts matter. Domain definitions matter. Backward compatibility matters. Ownership matters. And the organisations that take these seriously early are the ones that do not spend years untangling the mess later.
One Question To Leave You With
In your organisation, who has the authority to say what a customer is?

Not who maintains the customer record. Not which team built the customer service. Who has the authority to define what a customer means, which system holds the authoritative version, and what happens downstream when that definition needs to change?

If the answer is unclear, or if different people in different parts of your business would give different answers, you have a domain ownership problem. And until you solve it, no amount of API tooling, no amount of platform investment, and no amount of AI capability will give you the reliability and trustworthiness you need.
I would genuinely love to hear how you are thinking about this. Reply directly or drop a comment. Every response shapes what I write next.

Welcome back to The Platform Path.

Post #1 of #28: The API Playbook. From Architecture to AI.
This is Issue 1 of a newsletter series running alongside my Wednesday LinkedIn posts: The API Foundation for AI.

Issue #2 covers the golden source principle in full depth and why it is the single most important concept in enterprise AI readiness that most organisations are rushing past.

Until next time.

Rupali
