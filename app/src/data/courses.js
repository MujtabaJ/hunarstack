import { imageForCourse } from "./marketing/images";

export const CATEGORIES = [
  {
    id: "programming",
    title: "Programming & Development",
    text: "Build apps, websites and APIs you can open, test and put in a portfolio.",
  },
  {
    id: "freelancing",
    title: "Freelancing & Online Earning",
    text: "Learn profiles, proposals, client communication and how online platforms work.",
  },
  {
    id: "ai",
    title: "AI & Automation",
    text: "Use modern AI tools with judgment, then connect repeated work into simple workflows.",
  },
  {
    id: "creator",
    title: "Creator Economy",
    text: "Learn how creator platforms work and practise making work people can actually watch.",
  },
  {
    id: "digital",
    title: "Digital Business",
    text: "Understand online stores, digital products and marketing without treating any method as a guarantee.",
  },
  {
    id: "design",
    title: "Design & Creative Skills",
    text: "Design clear visuals and interfaces you can show to a client or a team.",
  },
  {
    id: "stock",
    title: "Stock & Digital Assets",
    text: "Learn how stock sites and template products work, and what quality they expect.",
  },
];

const FEE = "PKR 2,000–3,000/month";

function course(raw) {
  const item = {
    price: FEE,
    duration: raw.duration || "3 months",
    level: raw.level || "Beginner friendly",
    assignments: [
      "Finish the practice for each module.",
      "Build the course project and write what you decided and why.",
      "Prepare one portfolio piece you could show on a profile.",
    ],
    ...raw,
  };
  item.image = imageForCourse(item);
  item.portfolio = raw.projects[0];
  item.faqs = [
    { q: `Who should join ${raw.title}?`, a: raw.audience },
    { q: "Can I start as a beginner?", a: "Yes. Beginners start with the foundations. If you already know some of the tools, you can spend more time on the project." },
    { q: "What will I leave with?", a: raw.projects[0] },
    { q: "Does this course guarantee income?", a: "No. You learn the skill, the project and the professional habits. Clients, views, sales and income are not guaranteed." },
  ];
  return item;
}

const m = (title, text) => ({ title, text });

const RAW = [
  ["ios-development", "iOS Development", "Swift & SwiftUI", "programming", "Design and build iPhone apps with Swift and SwiftUI, then finish a project you can demonstrate.", "Beginner to intermediate", ["Swift", "SwiftUI", "Xcode"], "Beginners who want mobile skills, and developers adding an iOS project.", [
    m("Swift foundations", "Types, functions, optionals and readable Swift."),
    m("SwiftUI interfaces", "Stacks, lists, navigation and state."),
    m("Data and APIs", "Load content, handle errors and keep the app responsive."),
    m("Ship a small app", "Finish screens, sample data and a short project write-up."),
  ], ["A multi-screen iOS app you can run and explain."], "Use the app as portfolio proof if you later explore mobile work. Clients are not provided."],

  ["android-development", "Android Development", "Kotlin & Java", "programming", "Learn Android fundamentals with Kotlin and Java, and build an app that handles real screens and data.", "Beginner to intermediate", ["Kotlin", "Java", "Android Studio"], "Students who want Android skills and a project for a developer portfolio.", [
    m("Kotlin and Java basics", "The language you need before Android layouts make sense."),
    m("Screens and navigation", "Activities, composables or views, and moving between them."),
    m("Local data", "Save simple information and show it back to the user."),
    m("App project", "Build a small Android app and document the user flow."),
  ], ["An Android app with navigation and saved data."], "The project shows you can build for Android. It does not promise Play Store income."],

  ["flutter-development", "Flutter Development", "Dart + Firebase", "programming", "Build one codebase for Android and iOS with Dart, Flutter and Firebase.", "Beginner to intermediate", ["Dart", "Flutter", "Firebase"], "Beginners and developers who want cross-platform mobile practice.", [
    m("Dart essentials", "Types, functions, async code and widgets."),
    m("Flutter layouts", "Screens, navigation and state you can maintain."),
    m("Firebase", "Auth and a simple database for a real feature."),
    m("Portfolio app", "Ship a small product and write how the data flows."),
  ], ["A Flutter app with login and one Firebase-backed feature."], "A working app is the proof. Freelance app work still depends on your portfolio and the market."],

  ["react-native", "React Native", "Cross-platform mobile development", "programming", "Use JavaScript and React skills to build mobile apps for more than one platform.", "Intermediate", ["JavaScript", "React", "React Native"], "Students who know basic JavaScript and want mobile projects.", [
    m("React refresher", "Components, props and state for mobile screens."),
    m("Navigation", "Stacks, tabs and passing data between screens."),
    m("Device features", "Lists, forms, storage and a simple API call."),
    m("Cross-platform project", "Finish an app you can demo on a phone."),
  ], ["A React Native app with navigation and an API-backed screen."], "Show the app when you talk about mobile work. Delivery still has to be learned project by project."],

  ["web-development", "Web Development", "HTML, CSS, JavaScript, React, Node.js, Laravel", "programming", "Go from a first web page to interactive sites and a small full-stack project.", "Beginner to intermediate", ["HTML", "CSS", "JavaScript", "React", "Node.js", "Laravel"], "Beginners, university students and career-switchers who want websites they can publish.", [
    m("HTML and CSS", "Structure, layout and mobile-first pages."),
    m("JavaScript", "DOM, forms, events and fetching data."),
    m("React", "Components, state and a multi-page interface."),
    m("Backend basics", "A small Node.js or Laravel API with one real feature."),
  ], ["A portfolio site and a small web app with a working feature."], "These pieces can support freelance web conversations later. They are not a client pipeline."],

  ["backend-apis", "Backend & APIs", "Servers, endpoints and data", "programming", "Learn how apps talk to servers: endpoints, validation, auth basics and clear responses.", "Intermediate", ["Node.js", "REST", "JSON"], "Students who can already build a simple interface and want the server side.", [
    m("HTTP and JSON", "Requests, status codes and useful error messages."),
    m("API design", "Resources, routes and documentation another person can follow."),
    m("Auth basics", "Protect a route without copying secrets into the frontend."),
    m("Mini API", "Build and test an API for one product feature."),
  ], ["A documented API another project can call."], "API skills are useful in jobs and freelance work. Projects are not assigned."],

  ["database-firebase", "Database & Firebase", "Data that apps can trust", "programming", "Model data, query it, and use Firebase for auth and realtime or stored records.", "Beginner to intermediate", ["Firebase", "Firestore", "SQL basics"], "App and web students who need data skills before a bigger project.", [
    m("Data modelling", "What to store, and what not to duplicate."),
    m("Queries", "Read the right records without fetching everything."),
    m("Firebase auth", "Sign-in and simple security rules."),
    m("Connected feature", "Save, list and update records from an app screen."),
  ], ["A small app feature backed by Firebase or a database."], "You leave with a data-backed feature you can explain."],

  ["app-development-for-earning", "App Development for Earning", "From an app idea to a portfolio offer", "programming", "Connect app-building skills to how developers describe, scope and present paid work.", "Intermediate", ["Flutter or React Native", "Figma", "Store listings"], "Students who can build a simple app and want to learn how that work is offered.", [
    m("Choose a useful app", "Pick a problem small enough to finish."),
    m("Scope and milestones", "Write what version one includes."),
    m("Build the core", "Ship the main flow, not every extra screen."),
    m("Present the offer", "Turn the app into a portfolio case and a service description."),
  ], ["A finished app case study and a one-page service description."], "You practise how app work is offered. Income is not promised."],

  ["freelancing-mastery", "Freelancing Mastery", "The full professional loop", "freelancing", "Learn the freelancing system: skill, profile, proposal, call, delivery and follow-up.", "All levels", ["A portfolio piece", "A writing doc", "A freelance platform account"], "Beginners and people who already freelance and want a cleaner process.", [
    m("Offer", "Name one service you can actually deliver."),
    m("Profile", "Write who you help and what proof you have."),
    m("Proposal", "Answer a brief with scope, questions and a plan."),
    m("Delivery habits", "Updates, files, feedback and closing a project."),
  ], ["A profile draft, two practice proposals and a delivery checklist."], "You learn the process behind real freelancing. Clients are not guaranteed."],

  ["upwork-freelancing", "Upwork Freelancing", "Profiles, proposals and client workflow", "freelancing", "See how Upwork projects, profiles and proposals work, using the founder’s real platform experience as context — not as a promise you will earn the same.", "Beginner friendly", ["Upwork", "A portfolio", "Proposal drafts"], "Beginners preparing a first profile, and freelancers improving proposals.", [
    m("How the marketplace works", "Jobs, profiles, connects and what clients actually read."),
    m("Profile", "Headline, overview and portfolio pieces that match one service."),
    m("Proposals", "Custom answers instead of copied templates."),
    m("After a reply", "Calls, scope and professional updates."),
  ], ["An Upwork-style profile draft and three practice proposals."], "This teaches the workflow. It does not promise invites, hires or earnings."],

  ["fiverr-freelancing", "Fiverr Freelancing", "A clear service buyers can understand", "freelancing", "Learn how to package one digital service, describe it honestly and deliver it if someone orders.", "Beginner friendly", ["Fiverr", "Canva or your skill tool", "Samples"], "Beginners with one skill they can define as a service.", [
    m("One offer", "Choose a service you can finish in a known time."),
    m("Gig page", "Title, packages, FAQ and what is out of scope."),
    m("Samples", "Show work that matches the offer."),
    m("Delivery", "Files, revisions and messages a buyer can follow."),
  ], ["A complete practice gig page and two sample pieces."], "A gig page is a storefront. Orders are not guaranteed."],

  ["freelancer-com", "Freelancer.com", "Bids, briefs and milestones", "freelancing", "Learn how project bids work: reading a brief, pricing a scope and writing a milestone plan.", "Beginner friendly", ["Freelancer.com", "Proposal doc"], "Students comparing marketplaces and practising bids.", [
    m("Read the brief", "Find the real requirement before you write."),
    m("Bid structure", "Relevant proof, questions and a plan."),
    m("Milestones", "Split work so both sides know what finished means."),
    m("Practice bids", "Write bids you can review, not spam."),
  ], ["Five practice bids with milestone outlines."], "Practice bids are training. They are not a record of contests you won."],

  ["linkedin-freelancing", "LinkedIn Freelancing & Personal Branding", "Be findable for real work", "freelancing", "Build a professional profile and a simple content habit around work you have actually done.", "All levels", ["LinkedIn", "A project story"], "Students, freelancers and professionals who want a clearer public profile.", [
    m("Headline and About", "Say what you do in language a stranger understands."),
    m("Featured work", "Pin a project, not a pile of certificates."),
    m("Posts", "Share a lesson from something you built."),
    m("Conversations", "Comment and message without sounding like spam."),
  ], ["A rewritten profile and three post drafts based on your project."], "LinkedIn can create visibility. It does not guarantee messages or clients."],

  ["proposal-writing", "Proposal Writing", "Custom answers to real briefs", "freelancing", "Learn to write proposals that show you understood the job, the scope and the next step.", "All levels", ["Sample job posts", "A writing doc"], "Anyone sending proposals, including people who already have a skill.", [
    m("Understand the job", "Restate the problem in your own words."),
    m("Proof", "Point to one relevant project, not every skill you have."),
    m("Scope", "Say what you will do, and what you will not do."),
    m("Rewrite", "Edit a weak proposal into a specific one."),
  ], ["Three customized practice proposals."], "Better proposals improve clarity. They do not guarantee a hire.", "6 weeks"],

  ["client-communication", "Client Communication", "Calls, updates and difficult messages", "freelancing", "Practise the messages and calls that keep a project clear from the first hello to delivery.", "All levels", ["Call notes", "Message templates you rewrite"], "Freelancers and students who freeze when a client asks a question.", [
    m("Discovery", "Questions that reveal the real requirement."),
    m("Updates", "Short progress notes before someone has to chase you."),
    m("Scope changes", "How to respond when the request grows."),
    m("Closing", "Handover, feedback and a polite next step."),
  ], ["A call script, an update template and a scope-change reply."], "Communication is a skill you can practise. It does not create clients by itself.", "6 weeks"],

  ["portfolio-building", "Portfolio Building", "Proof people can review", "freelancing", "Turn class projects into a portfolio a client, recruiter or platform can understand in a few minutes.", "All levels", ["GitHub or a simple site", "Screenshots", "Writing"], "Students who have started building and need to present the work.", [
    m("Choose pieces", "Three projects beat twenty unfinished files."),
    m("Tell the story", "Problem, what you made, and what you would improve."),
    m("Presentation", "Images, links and a page that loads on a phone."),
    m("Match the offer", "Line the portfolio up with one service."),
  ], ["A simple portfolio page with at least two projects."], "A portfolio creates proof. It does not guarantee interviews."],

  ["remote-work", "Remote Work", "How distributed work actually runs", "freelancing", "Learn the habits of remote work: written updates, time zones, files and reliable delivery.", "All levels", ["Docs", "Calendar", "A task list"], "Students and professionals who want remote-ready work habits.", [
    m("Written work", "Say what is done, what is blocked and what is next."),
    m("Time zones", "Plan calls and deadlines across countries."),
    m("Tools", "Keep files, tasks and decisions in one place."),
    m("Professional presence", "Camera, audio and a calm meeting habit."),
  ], ["A one-week remote-work log and a meeting agenda."], "These habits prepare you for remote opportunities. A remote job is not guaranteed."],

  ["online-business", "Online Business", "A small offer, honestly scoped", "freelancing", "Learn how a simple online offer is defined, priced as a draft and explained without hype.", "Beginner friendly", ["A doc", "A landing outline"], "Beginners and small business owners exploring a digital offer.", [
    m("Who it is for", "Name a person and a problem."),
    m("The offer", "What they get, how long it takes and what it costs to deliver."),
    m("Proof", "Samples, process and questions you still need to answer."),
    m("A simple page", "Explain the offer on one page without income claims."),
  ], ["A one-page offer and a delivery outline."], "You design an offer. Sales are not guaranteed."],

  ["ai-tools-mastery", "AI Tools Mastery", "Use AI without skipping the work", "ai", "Learn a practical set of AI tools for writing, research, images and everyday work, with checking built in.", "Beginner friendly", ["ChatGPT", "A browser", "A notes doc"], "Beginners and professionals who want a sane way to use AI tools.", [
    m("What these tools do", "Strengths, limits and when not to trust a draft."),
    m("Daily workflows", "Research, rewrite, summarise and plan."),
    m("Checking", "Facts, tone and anything a client would see."),
    m("Your stack", "Pick a small set of tools you will actually use."),
  ], ["A personal AI workflow for one real task you already do."], "AI can speed up drafts. It does not replace your skill or guarantee earnings."],

  ["chatgpt", "ChatGPT", "Prompts, projects and careful use", "ai", "Learn ChatGPT for study, content drafts, coding help and freelance preparation.", "Beginner friendly", ["ChatGPT"], "Anyone new to ChatGPT, including students and freelancers.", [
    m("Conversations that work", "Context, role and a clear ask."),
    m("Study and research", "Explain a topic, then verify it."),
    m("Work drafts", "Outlines, emails and checklists you edit."),
    m("Limits", "Privacy, accuracy and work you must still do yourself."),
  ], ["A prompt library for three tasks you repeat."], "You leave with better prompts, not an income system."],

  ["prompt-engineering", "Prompt Engineering", "Instructions that produce usable output", "ai", "Write prompts with context, format, examples and a way to judge the answer.", "Beginner to intermediate", ["ChatGPT or Claude", "A prompt doc"], "Students and freelancers who already use AI and want more reliable results.", [
    m("Structure", "Goal, context, constraints and format."),
    m("Examples", "Show the model what good looks like."),
    m("Iteration", "Fix a weak answer without starting from zero."),
    m("Evaluation", "Check accuracy, tone and whether you can use it."),
  ], ["A tested prompt pack for one kind of work."], "Better prompts save time. They do not guarantee client results."],

  ["ai-content-creation", "AI Content Creation", "Draft faster, edit like a person", "ai", "Use AI to research and draft content, then edit it until it sounds like you and says true things.", "Beginner friendly", ["ChatGPT", "A doc", "Canva"], "Creators, students and small businesses who publish online.", [
    m("Topic and reader", "Who the piece is for."),
    m("Outline and draft", "Use AI for structure, then rewrite."),
    m("Edit", "Remove fluff, check claims and add your example."),
    m("Publish", "A post, caption set or short article you would sign."),
  ], ["Three edited pieces you could publish."], "Content skill is the outcome. Views and income are not promised."],

  ["ai-image-generation", "AI Image Generation", "Direction, not random pictures", "ai", "Learn to brief image tools, iterate, and know when a generated image is appropriate to use.", "Beginner friendly", ["An image model", "Canva"], "Design beginners and marketers who need images for practice projects.", [
    m("Briefs", "Subject, style, lighting and what to avoid."),
    m("Iteration", "Change one thing at a time."),
    m("Editing", "Fix composition in a design tool."),
    m("Use and credit", "Where generated images are acceptable, and where they are not."),
  ], ["A small set of directed images for one project."], "You learn control over image tools. This is not a stock-income promise."],

  ["ai-video-creation", "AI Video Creation", "Scripts, clips and an edit you own", "ai", "Plan short videos with AI help, then record or assemble and edit a piece you can show.", "Beginner friendly", ["ChatGPT", "CapCut or a similar editor"], "Creators who want a practical video workflow.", [
    m("Idea and script", "A short script a person can say out loud."),
    m("Visual plan", "Shots, captions and what AI may generate."),
    m("Edit", "Cut, captions and a clear ending."),
    m("Review", "Watch it as a stranger would."),
  ], ["One short video with a script and an edit."], "You finish a video. Channel growth is not guaranteed."],

  ["ai-automation", "AI Automation", "Connect repeated steps", "ai", "Map a repeated task and automate only the parts that are safe to automate.", "Intermediate", ["Zapier, Make or n8n", "A sample process"], "Freelancers and business owners with a process they repeat.", [
    m("Map the work", "Trigger, steps, data and the human check."),
    m("Build a small flow", "One automation with a clear stop condition."),
    m("Errors", "What happens when a step fails."),
    m("Document it", "So someone else can run it."),
  ], ["One documented automation for a real repeated task."], "Automation is a service you can learn to offer. Clients are not included."],

  ["zapier", "Zapier", "No-code connections between apps", "ai", "Build Zapier workflows that move information between tools you already use.", "Beginner friendly", ["Zapier"], "Beginners who want automation without writing a server first.", [
    m("Triggers and actions", "What starts a Zap and what it does."),
    m("Filters", "Run only when the data matches."),
    m("A useful Zap", "Connect two tools for one real task."),
    m("Testing", "Sample data, logs and a manual fallback."),
  ], ["A tested Zap with written setup notes."], "You can show the workflow. It is not a business by itself."],

  ["make", "Make", "Visual scenarios for multi-step work", "ai", "Learn Make scenarios for workflows that need more than one step and a bit of logic.", "Beginner to intermediate", ["Make"], "Students who want a visual automation tool beyond a single zap.", [
    m("Scenarios", "Modules, routes and data mapping."),
    m("Logic", "Routers and simple conditions."),
    m("Build", "A scenario with at least three steps."),
    m("Hand-off", "Explain it so a teammate can maintain it."),
  ], ["A Make scenario and a one-page explanation."], "The project is the proof of skill."],

  ["n8n", "n8n", "Automation you can inspect", "ai", "Use n8n to build a workflow you can open, edit and explain node by node.", "Intermediate", ["n8n"], "Students comfortable with tools who want more control than a simple zap.", [
    m("Nodes and data", "How items move through a workflow."),
    m("APIs", "Call one service and handle a bad response."),
    m("A workflow", "Automate a small, real process."),
    m("Care", "Secrets, logs and what must stay manual."),
  ], ["An n8n workflow with notes on each important node."], "You learn a tool freelancers use. Work is not guaranteed."],

  ["ai-for-freelancers", "AI for Freelancers", "Faster preparation, same responsibility", "ai", "Use AI for research, proposals and checklists while you remain responsible for the client work.", "All levels", ["ChatGPT", "A proposal doc"], "New and existing freelancers.", [
    m("Research a brief", "Summarise a job post and list questions."),
    m("Draft a proposal", "Then rewrite it in your voice."),
    m("Delivery support", "Checklists, test plans and update notes."),
    m("Boundaries", "What you never paste into a public AI tool."),
  ], ["An AI-assisted proposal you fully rewrote and could send."], "AI does not find clients for you."],

  ["ai-for-business", "AI for Business", "Practical uses for a small team", "ai", "Find a few honest uses of AI inside a small business: support replies, content drafts and simple research.", "Beginner friendly", ["ChatGPT", "A business process"], "Small business owners and students helping a family business.", [
    m("Pick one process", "Support, content or research — not everything at once."),
    m("Draft with review", "AI writes a first pass. A person approves it."),
    m("Save time carefully", "Measure the steps you still do by hand."),
    m("Write the rule", "What the tool may and may not do."),
  ], ["A one-process AI playbook for a small business."], "This is an operations skill, not a revenue guarantee."],

  ["youtube-earning", "YouTube Earning", "How channels are built", "creator", "Learn how YouTube channels are planned, filmed and published. Ads and other income are explained, not promised.", "Beginner friendly", ["YouTube", "A phone or screen recorder", "A simple editor"], "Students and creators who want to understand YouTube properly.", [
    m("Channel purpose", "Who it is for and why they would return."),
    m("Video system", "Topic, title, script and thumbnail plan."),
    m("Publish", "Upload, description, end screen and a schedule you can keep."),
    m("Offers besides hope", "How creators point to a service or product. Results vary."),
  ], ["One published or ready-to-publish video and a four-video plan."], "You learn the system. Views, ads and income are not guaranteed."],

  ["facebook-earning", "Facebook Earning", "Pages, posts and honest offers", "creator", "Learn Facebook Pages, posts and messages as a way to present useful work to real people.", "Beginner friendly", ["Facebook"], "Local businesses, students and creators.", [
    m("Page basics", "What a Page is for."),
    m("Posts people can use", "Useful updates, not empty slogans."),
    m("Replies", "Answer questions clearly."),
    m("A simple offer", "Describe a service without fake urgency."),
  ], ["A Page setup checklist and four post drafts."], "Reach and sales are not guaranteed."],

  ["tiktok-growth", "TikTok Growth & Income", "Short video with a point", "creator", "Learn short-form video structure and how creator income is discussed, without promising virality.", "Beginner friendly", ["TikTok", "CapCut or similar"], "Students and creators practising short video.", [
    m("Hook and point", "Say something useful in the first seconds."),
    m("Filming", "Light, sound and a format you can repeat."),
    m("Series", "Plan four related videos."),
    m("Income paths", "How creator programs and offers are described. None are guaranteed."),
  ], ["Four short video drafts in one series."], "Growth is a skill you practise. It is not promised."],

  ["instagram-growth", "Instagram Growth & Income", "A profile that shows the work", "creator", "Build an Instagram presence around real projects, reels and a clear profile.", "Beginner friendly", ["Instagram", "Canva"], "Creators, freelancers and small businesses.", [
    m("Profile", "Name, bio and a link that matches your offer."),
    m("Grid and reels", "Show the work, not only the slogan."),
    m("Captions", "Write like a person."),
    m("Consistency", "A two-week plan you can keep."),
  ], ["A profile rewrite and six content pieces."], "Followers and income are not guaranteed."],

  ["video-editing", "Video Editing", "Cuts, captions and a finished piece", "creator", "Edit videos that are clear, paced and ready to publish or show a client.", "Beginner friendly", ["CapCut", "DaVinci Resolve or Premiere"], "Beginners and creators who film but do not finish edits.", [
    m("Story cut", "Remove what does not help the point."),
    m("Sound and captions", "Make it watchable without perfect audio."),
    m("Graphics", "Titles that do not cover the subject."),
    m("Export", "A file that matches where it will be posted."),
  ], ["One finished edit with a before-and-after note."], "Editing is a service people hire. This course does not supply the clients."],

  ["content-creation", "Content Creation", "Ideas, making and publishing", "creator", "Learn a repeatable way to find ideas, make the piece and publish it.", "Beginner friendly", ["Notes", "A phone", "Canva"], "Beginners who want a content habit tied to a skill.", [
    m("Audience", "One reader or viewer, not everyone."),
    m("Ideas", "A list from questions people already ask."),
    m("Make", "Write or record one piece properly."),
    m("Review", "What you would change next time."),
  ], ["A four-piece content plan and one finished piece."], "A habit is the result. An audience is not guaranteed."],

  ["blogging", "Blogging", "Articles that explain something useful", "creator", "Write blog posts with a structure, examples and a reason for someone to finish them.", "Beginner friendly", ["A doc", "A simple blog or Google Doc"], "Students and freelancers who need writing proof.", [
    m("Angle", "One question the post answers."),
    m("Structure", "Opening, steps, example, close."),
    m("Draft and edit", "Cut repetition and unsupported claims."),
    m("Publish", "A post you would put your name on."),
  ], ["Two articles you can link from a profile."], "Articles can support a portfolio. Traffic is not promised."],

  ["medium", "Medium", "Publishing articles on Medium", "creator", "Learn Medium’s publishing basics and write pieces that match a topic you know.", "Beginner friendly", ["Medium"], "Writers and students exploring article platforms.", [
    m("Account and topics", "Where your writing fits."),
    m("Story structure", "A title that matches the article."),
    m("Edit", "Read it aloud and fix the weak parts."),
    m("Distribution", "How stories are shared. Reads are not guaranteed."),
  ], ["One Medium-ready article."], "Publication is a skill. Partner-program income is not guaranteed."],

  ["patreon", "Patreon", "Memberships explained honestly", "creator", "Understand how creator memberships work and what you would need before asking people to pay.", "Intermediate", ["Patreon or a membership doc"], "Creators who already make something people follow.", [
    m("What members get", "A real benefit, not a vague community."),
    m("Tiers", "Simple options you can deliver every month."),
    m("Page", "Explain the work without income screenshots."),
    m("Delivery plan", "What you publish if ten people join — or if none do."),
  ], ["A membership outline you could launch later."], "This explains the model. Members are not guaranteed."],

  ["online-teaching", "Online Teaching", "Teach a skill you can demonstrate", "creator", "Learn to explain a skill in lessons, exercises and a small class plan.", "All levels", ["Slides or a doc", "A demo"], "Students and professionals who want to teach what they know.", [
    m("Learning goal", "What the student can do after the lesson."),
    m("Explain", "Show, then let them try."),
    m("Exercise", "A task with a clear done state."),
    m("Feedback", "How you review the work."),
  ], ["A three-lesson mini class with one exercise."], "Teaching skill can become a service. Students are not supplied."],

  ["udemy-course-creation", "Udemy Course Creation", "Plan and record a course", "creator", "Plan a short course: outcome, curriculum, lessons and a recording setup.", "Intermediate", ["Slides", "A microphone", "Screen recording"], "People who can already do the skill they want to teach.", [
    m("Promise", "One outcome for the student."),
    m("Curriculum", "Sections and lessons that build on each other."),
    m("Record", "A sample lesson with clear audio."),
    m("Listing", "Title, description and who it is not for."),
  ], ["A course outline and one sample lesson."], "A course listing does not guarantee sales."],

  ["skillshare-teaching", "Skillshare Teaching", "A class built around a project", "creator", "Design a project-based class in the style Skillshare students expect.", "Intermediate", ["A project", "Slides", "Recording"], "Creators who can teach by making something on screen.", [
    m("Project first", "The thing the student will make."),
    m("Lessons", "Short steps, not a long lecture."),
    m("Resources", "Files or checklists the student needs."),
    m("Sample", "Record the first lesson."),
  ], ["A class plan and a sample lesson."], "You learn the format. Enrollments are not guaranteed."],

  ["shopify", "Shopify", "A store that is ready to explain", "digital", "Set up a Shopify practice store: products, pages, checkout settings and a honest product description.", "Beginner friendly", ["Shopify"], "Beginners and small business owners exploring online stores.", [
    m("Store setup", "Theme, pages and policies you understand."),
    m("Product page", "Photos, description and a clear price."),
    m("Checkout", "What the buyer sees."),
    m("Operations", "Orders, shipping notes and customer questions."),
  ], ["A practice store with one complete product page."], "A store is a skill project. Sales are not guaranteed."],

  ["ecommerce", "E-Commerce", "How online selling works", "digital", "Learn product pages, orders, customer questions and the unglamorous parts of selling online.", "Beginner friendly", ["A store builder", "A spreadsheet"], "Students and shop owners who want the full picture.", [
    m("Offer", "What is being sold and to whom."),
    m("Page", "Trust, details and a next step."),
    m("Order flow", "From checkout to delivery notes."),
    m("Support", "Replies for common questions."),
  ], ["A product page and an order-handling checklist."], "You learn the system. Revenue is not promised."],

  ["dropshipping", "Dropshipping", "The model, the risks and the work", "digital", "Understand dropshipping as a business model, including supplier risk, customer service and why it is not passive income.", "Beginner friendly", ["Research doc", "A spreadsheet"], "People who have heard the term and want a clear explanation.", [
    m("How the model works", "You sell, a supplier ships, you handle the customer."),
    m("Product research", "Demand, competition and problems you would own."),
    m("Supplier checks", "Samples, shipping time and what can go wrong."),
    m("Customer care", "The messages you must be ready to answer."),
  ], ["A researched product brief with risks written down."], "This is education about the model. It is not a promise of profit."],

  ["digital-products", "Digital Products", "Something you can deliver as a file", "digital", "Design a simple digital product: who it helps, what is inside and how it is delivered.", "Beginner friendly", ["Canva or a doc", "A checkout outline"], "Creators and freelancers with knowledge they can package.", [
    m("Problem", "The job the product does."),
    m("Contents", "Outline every file the buyer receives."),
    m("Make a sample", "Build enough that someone could try it."),
    m("Delivery", "How they get it after payment."),
  ], ["A sample digital product and a sales outline."], "A product can be offered later. Buyers are not guaranteed."],

  ["print-on-demand", "Print on Demand", "Designs, mockups and listings", "digital", "Learn print-on-demand as a production method: design, mockups, listings and quality checks.", "Beginner friendly", ["Canva", "A print-on-demand platform"], "Design beginners exploring product listings.", [
    m("The model", "You design. A printer produces the order."),
    m("Design", "A print-ready file with safe margins."),
    m("Mockup", "Show the product honestly."),
    m("Listing", "Title, description and what you still need to test."),
  ], ["One print-ready design and a product listing draft."], "Listings do not guarantee orders."],

  ["affiliate-marketing", "Affiliate Marketing", "Recommend products without misleading people", "digital", "Learn how affiliate links work, how to disclose them and how to write a useful recommendation.", "Beginner friendly", ["A writing doc"], "Beginners who want to understand affiliate content.", [
    m("How links pay", "The idea of a commission, and why it may be zero."),
    m("Choose carefully", "Only recommend what you can explain."),
    m("Disclose", "Tell the reader when a link is affiliate."),
    m("Write", "A useful review or guide, not a list of hype."),
  ], ["One disclosed recommendation article."], "Commissions are not guaranteed."],

  ["amazon-kdp", "Amazon KDP", "Plan a book you could publish", "digital", "Learn the KDP publishing steps and plan a short book with a real outline.", "Beginner friendly", ["A writing doc", "KDP help pages"], "Writers exploring self-publishing.", [
    m("Reader and promise", "Who the book helps."),
    m("Outline", "Chapters that deliver that promise."),
    m("Sample chapter", "Write one chapter properly."),
    m("Listing basics", "Title, description and categories. Sales are separate."),
  ], ["A book outline and one sample chapter."], "Publishing knowledge is the outcome. Royalties are not promised."],

  ["daraz", "Daraz", "Selling on a local marketplace", "digital", "Learn how a Daraz-style listing is prepared: product data, photos and customer questions.", "Beginner friendly", ["Daraz seller resources", "Product photos"], "Small sellers in Pakistan exploring marketplace listings.", [
    m("Account readiness", "What a seller needs before listing."),
    m("Listing", "Title, attributes, price and photos."),
    m("Orders", "What happens after someone buys."),
    m("Service", "Questions and returns you should expect to handle."),
  ], ["A complete practice listing."], "A listing is not a sales guarantee."],

  ["social-media-marketing", "Social Media Marketing", "A plan, not random posting", "digital", "Build a simple social plan for a real offer: audience, posts, replies and a way to tell if it is working.", "Beginner friendly", ["Instagram or Facebook", "A calendar"], "Business owners and students who market for someone.", [
    m("Audience and offer", "Who you are talking to."),
    m("Content pillars", "A few repeating themes."),
    m("Calendar", "Two weeks of posts you could actually make."),
    m("Measurement", "What you will look at, without vanity as the goal."),
  ], ["A two-week content plan tied to one offer."], "A plan improves consistency. Reach is not guaranteed."],

  ["digital-marketing", "Digital Marketing", "Channels, messages and measurement", "digital", "Learn the core of digital marketing: audience, message, channel and an honest look at results.", "Beginner friendly", ["A doc", "Analytics basics"], "Beginners and business owners who want the map before the tactics.", [
    m("Audience", "A specific person with a problem."),
    m("Message", "What you say, and what you refuse to claim."),
    m("Channels", "Where that person already pays attention."),
    m("Review", "A simple way to see what happened."),
  ], ["A one-page marketing plan for a real or practice offer."], "Marketing skill does not guarantee leads."],

  ["graphic-design", "Graphic Design", "Layout, type and a finished piece", "design", "Learn layout, colour, type and how to finish designs that look intentional.", "Beginner friendly", ["Canva", "Figma or Photoshop"], "Beginners and students who want design as a skill or a service.", [
    m("Layout", "Alignment, space and hierarchy."),
    m("Type and colour", "Choices you can explain."),
    m("Practice pieces", "A post, a poster and a simple brand frame."),
    m("Presentation", "Show the work in a clean set."),
  ], ["Three finished designs in one mini portfolio."], "Design can be offered as a service later. Clients are not included."],

  ["canva", "Canva", "Fast, clean design for real uses", "design", "Use Canva with design basics so the results do not look like an untouched template.", "Beginner friendly", ["Canva"], "Beginners, teachers, businesses and social media students.", [
    m("Files and brand kit", "Colours, fonts and sizes you will reuse."),
    m("Layout control", "Move past the default template."),
    m("Social and print sizes", "Export the right file."),
    m("A set", "Three pieces that belong together."),
  ], ["A three-piece Canva set for one brand or project."], "You leave with files you made, not a template pack to resell as-is."],

  ["adobe-photoshop", "Adobe Photoshop", "Edit images with control", "design", "Learn the Photoshop tools you need for retouching, composites and social graphics.", "Beginner to intermediate", ["Photoshop"], "Design students who want image-editing skill.", [
    m("Layers and masks", "Edit without destroying the photo."),
    m("Selection and retouch", "Clean up with restraint."),
    m("Type and export", "Graphics that stay sharp."),
    m("Project", "One finished composite or campaign image."),
  ], ["A before-and-after Photoshop project."], "The file is portfolio proof."],

  ["adobe-illustrator", "Adobe Illustrator", "Vector shapes and logos", "design", "Draw clean vector graphics and a simple logo system in Illustrator.", "Beginner to intermediate", ["Illustrator"], "Students who want logos and icons, not only photos.", [
    m("Pen and shapes", "Clean paths."),
    m("Colour and type", "A small system, not ten fonts."),
    m("Logo", "A mark that works small."),
    m("Export", "Files for screen and print."),
  ], ["A simple logo and icon set."], "Vector skill is something you can show."],

  ["figma", "Figma", "Interfaces you can click", "design", "Design screens in Figma with components, auto layout and a simple prototype.", "Beginner friendly", ["Figma"], "Beginners and developers who need to design what they build.", [
    m("Frames and layout", "Mobile and desktop screens."),
    m("Components", "Buttons and inputs you reuse."),
    m("Prototype", "A clickable flow."),
    m("Handoff notes", "Explain spacing and states."),
  ], ["A clickable three-screen prototype."], "A prototype can sit in a design or developer portfolio."],

  ["ui-ux-design", "UI/UX Design", "From a user problem to screens", "design", "Learn a light UX process: user, flow, wireframe, interface and a case study.", "Beginner to intermediate", ["Figma", "Notes"], "Students who want product design, not only posters.", [
    m("Problem", "Who is stuck, and what they are trying to do."),
    m("Flow", "The steps before you decorate them."),
    m("Interface", "Screens with hierarchy and states."),
    m("Case study", "Write the story of the design."),
  ], ["A short UI/UX case study."], "Case studies help you talk about design work. Jobs are not guaranteed."],

  ["social-media-design", "Social Media Design", "Posts that match a brand", "design", "Design a consistent set of social posts for one brand or offer.", "Beginner friendly", ["Canva or Figma"], "Beginners and business owners.", [
    m("Sizes and safe areas", "What gets cropped."),
    m("Brand frame", "Colours, type and a repeating layout."),
    m("A set", "Feed posts and a story."),
    m("Files", "Export names a client could use."),
  ], ["A six-post social set."], "A set is portfolio work."],

  ["youtube-thumbnail-design", "YouTube Thumbnail Design", "Thumbnails people can read", "design", "Design thumbnails with a clear subject, few words and contrast that survives a small size.", "Beginner friendly", ["Photoshop or Canva"], "Creators and designers.", [
    m("Readability", "Test the design at a tiny size."),
    m("Subject", "One face, object or idea."),
    m("Type", "Few words, strong contrast."),
    m("A set", "Three thumbnails that belong to one channel."),
  ], ["Three thumbnail designs."], "Thumbnails are a skill. Click-through is not guaranteed."],

  ["adobe-stock", "Adobe Stock", "What stock libraries expect", "stock", "Learn how Adobe Stock works and what technical and legal quality a submission needs.", "Intermediate", ["A camera or design tool", "Adobe Stock contributor docs"], "Photographers and designers exploring stock.", [
    m("The marketplace", "How buyers search."),
    m("Technical quality", "Focus, noise, artifacts and design files."),
    m("Keywords and releases", "Honest metadata and when a release is required."),
    m("A practice submission set", "Prepare files as if you were submitting. Acceptance is not guaranteed."),
  ], ["A small, correctly prepared practice set."], "Acceptance and earnings are decided by the platform, not by this course."],

  ["shutterstock", "Shutterstock", "Contributor basics", "stock", "Understand Shutterstock contributor requirements and prepare a clean practice batch.", "Intermediate", ["Camera or design files", "Contributor guidelines"], "People comparing stock platforms.", [
    m("Content types", "Photos, video and vectors at a high level."),
    m("Quality bar", "What usually gets rejected."),
    m("Metadata", "Titles and keywords that match the file."),
    m("Practice batch", "Prepare files without claiming they were accepted."),
  ], ["A documented practice batch."], "This is preparation. It is not proof of approval or sales."],

  ["stock-photography", "Stock Photography", "Photographs that are usable", "stock", "Shoot and edit simple stock-style photographs with clean composition and honest descriptions.", "Beginner to intermediate", ["A camera or phone", "Lightroom or similar"], "Beginners with a camera who want disciplined practice.", [
    m("Ideas buyers search", "Objects, work, study and everyday scenes."),
    m("Light and composition", "Simple, clear frames."),
    m("Edit", "Natural correction, not a filter pile."),
    m("Caption", "Describe what is actually in the photo."),
  ], ["A ten-photo practice set with captions."], "The set is a learning portfolio, not a sales report."],

  ["stock-video", "Stock Video", "Short clips with a purpose", "stock", "Plan and export short stock-style clips: stable, clean and correctly described.", "Intermediate", ["A phone or camera", "An editor"], "Creators who already understand basic video.", [
    m("Shot list", "Clips a project might actually need."),
    m("Capture", "Stability, length and no surprise logos."),
    m("Export", "A clean file and a still frame."),
    m("Describe", "Accurate titles."),
  ], ["Five short clips with titles."], "Clips are practice. Platform approval is separate."],

  ["digital-templates", "Digital Templates", "Files other people can reuse", "stock", "Design a template someone else can edit: layers named, fonts considered and instructions written.", "Beginner to intermediate", ["Canva", "Figma or Illustrator"], "Designers who want to package layouts.", [
    m("Use case", "Who edits this, and for what."),
    m("Structure", "Named layers and locked brand pieces."),
    m("Instructions", "A short how-to."),
    m("Sample", "Show the template filled with example content."),
  ], ["One editable template and a preview."], "A template can become a product later. Sales are not guaranteed."],

  ["canva-templates", "Canva Templates", "Editable Canva files", "stock", "Build Canva templates that are easy for a non-designer to edit.", "Beginner friendly", ["Canva"], "Canva users who want to go beyond single posts.", [
    m("Brand kit", "Colours and fonts inside the file."),
    m("Editable text", "Obvious places to type."),
    m("A pack", "Several sizes that match."),
    m("Instructions", "What the user should change first."),
  ], ["A small Canva template pack."], "The pack is a project. Marketplace income is not promised."],
];

export const COURSES = RAW.map((row) =>
  course({
    slug: row[0],
    title: row[1],
    subtitle: row[2],
    category: row[3],
    description: row[4],
    level: row[5],
    tools: row[6],
    audience: row[7],
    modules: row[8],
    projects: row[9],
    opportunities: row[10],
    duration: row[11] || "3 months",
  })
);

const video = COURSES.find((c) => c.slug === "video-editing");
if (video) video.also = "design";
const digitalProduct = COURSES.find((c) => c.slug === "digital-products");
if (digitalProduct) digitalProduct.also = "stock";

export const FEATURED = [
  "freelancing-mastery",
  "web-development",
  "flutter-development",
  "ai-tools-mastery",
  "graphic-design",
  "youtube-earning",
  "upwork-freelancing",
  "app-development-for-earning",
].map((slug) => COURSES.find((c) => c.slug === slug)).filter(Boolean);

export function getCourse(slug) {
  const key = String(slug || "").toLowerCase();
  return COURSES.find((c) => c.slug === key);
}

export function coursesIn(category) {
  return COURSES.filter((c) => c.category === category || c.also === category);
}

export function relatedCourses(course, limit = 3) {
  return COURSES.filter((c) => c.category === course.category && c.slug !== course.slug).slice(0, limit);
}

export function searchCourses(query) {
  const needle = String(query || "").trim().toLowerCase();
  if (!needle) return COURSES;
  return COURSES.filter((c) =>
    `${c.title} ${c.subtitle} ${c.description} ${c.tools.join(" ")} ${c.category}`.toLowerCase().includes(needle)
  );
}
