# 🚀 Quick Start Guide - AI Citation Agent

Welcome! This guide will help you get up and running with the AI Citation Agent in minutes.

## What This Tool Does

The AI Citation Agent audits how well your brand (or any brand) appears in AI-powered search results. It answers questions like:
- **Where does my brand appear?** (Wikipedia, G2, TechCrunch, etc.)
- **How good are my citations?** (Quality scoring across 5 dimensions)
- **Do AI platforms cite me?** (Perplexity, ChatGPT, Gemini rankings)
- **What should I fix first?** (Prioritized action items)

## ⚡ Getting Started (3 Steps)

### Step 1: Check Your Setup

The project dependencies are already installed. Let's verify everything is ready:

```bash
# Check if Node.js is working
node --version

# Check if dependencies are installed
npm list --depth=0
```

### Step 2: Configure Airtable (Required for Data Storage)

You need an Airtable account to store audit results. This is **free** and takes 2 minutes:

1. **Get Airtable API Key:**
   - Go to https://airtable.com/create/tokens
   - Click "Create new token"
   - Name: "AI Citation Agent"
   - Scopes: Select `data.records:read`, `data.records:write`, `schema.bases:read`, `schema.bases:write`
   - Copy the token (starts with `pat...`)

2. **Create Airtable Base:**
   - Go to https://airtable.com/
   - Click "Add a base" → "Start from scratch"
   - Name it "AI Citation Intelligence"
   - Copy the Base ID from URL: `https://airtable.com/appXXXXXXXXXXXXXX`
   - The `appXXXXXXXXXXXXXX` part is your Base ID

3. **Create `.env.local` file:**
   ```bash
   # In the project root, create .env.local
   AIRTABLE_API_KEY=pat...your_token_here
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   ```

4. **Setup Airtable Schema:**
   ```bash
   # This creates 5 tables automatically
   node scripts/setup-airtable-schema.js
   ```

### Step 3: Run Your First Audit

In Claude Code, simply run:

```bash
/agents:audit-citations
```

You'll be prompted for:
1. **Brand name** (e.g., "Jasper", "Salesforce", "Clio")
2. **Category context** (e.g., "AI writing tools", "CRM software", "legal billing")
3. **Content URLs** (optional - leave blank for now)

The audit takes **8-10 minutes** and will:
- ✅ Check 29 trust nodes (Wikipedia, G2, TechCrunch, etc.)
- ✅ Score citation quality (5 dimensions)
- ✅ Test AI platform rankings (Perplexity, ChatGPT, Gemini)
- ✅ Generate strategic recommendations
- ✅ Save results to Airtable automatically

## 📊 Understanding Your Results

After the audit completes, you'll get:

### 1. Markdown Report
Located in `output/[brand]-audit-report-[date].md`

**Key sections:**
- **Trust Node Coverage** - Where your brand appears (22/29 nodes = 76%)
- **Citation Quality Scorecard** - Scores out of 10 for each dimension
- **LLM Rankings** - Position on each AI platform (#1, #2, etc.)
- **Overall AI Visibility Score** - Single number (0-10) summarizing everything
- **Priorities** - What to fix first (this month, this quarter, long-term)

### 2. Airtable Database
All data is automatically saved to 5 tables:
- **Audit_Runs** - Overall scores and summary
- **Trust_Nodes** - Presence across 29 nodes
- **Citations** - Quality scores per source
- **LLM_Responses** - Rankings from AI platforms
- **Priorities** - Action items with timelines

## 🎯 Common Operations

### Run a New Audit
```bash
/agents:audit-citations
```
Just provide brand name and category when prompted.

### View Existing Reports
```bash
/agents:audit-citations
# Type: manage
# Then select option to view reports
```

### Deploy Dashboard (Visual Reports)
After an audit completes, you'll be asked if you want to deploy a dashboard:
- **Deploy to Vercel** - Shareable web dashboard (requires free Vercel account)
- **Run locally** - View at http://localhost:3000

### Clean Up Browser Issues
If browser automation gets stuck:
```bash
@playwright-cleanup
```

### Test Airtable Connection
```bash
node scripts/test-airtable-connection.js
```

## 🔍 What Each Step Does

### Step 1: Source & Citation Discovery
**What it checks:** 29 "trust nodes" across 6 categories:
- Knowledge Graphs (Wikipedia, Wikidata, Google Knowledge Panel)
- Review Platforms (G2, Capterra, Trustpilot)
- Directories (Crunchbase, Product Hunt, BuiltWith)
- Company Profiles (LinkedIn, Bloomberg)
- News & PR (TechCrunch, Forbes, VentureBeat)
- Seed Sites (Major tech publications)

**Output:** Map showing where brand exists and critical gaps.

### Step 2: Citation Quality Scoring
**What it scores:** Each citation on 5 dimensions (0-10):
- **Authority** - Domain reputation, editorial standards
- **Data Structure** - Schema.org markup, structured data
- **Brand Alignment** - Accurate representation, sentiment
- **Freshness** - Publication date, recency
- **Cross-Link Signals** - Links to/from other trust nodes

**Output:** Quality scorecard with dimension breakdown.

### Step 3: LLM Response Evaluation
**What it tests:** 3 AI platforms with structured queries:
- Perplexity (via API or browser)
- ChatGPT (via browser automation)
- Gemini (via browser automation)

**Query types:**
- "What are the top [category] in 2025?"
- "Best [category] for [use case]"
- "[Brand] reviews and credentials"

**Output:** Rankings, citation sources, competitor analysis.

### Step 4: Dashboard Synthesis
**What it creates:**
- Overall AI Visibility Score (0-10)
- Trust Node → Citation Quality → LLM Visibility chain analysis
- Immediate priorities (this month)
- Strategic initiatives (this quarter)
- Long-term vision (6-12 months)

**Output:** Actionable roadmap with specific metrics.

## 🛠️ Troubleshooting

### "Endless browser tabs" issue
```bash
@playwright-cleanup
```

### Airtable connection errors
1. Check `.env.local` exists and has correct credentials
2. Test connection: `node scripts/test-airtable-connection.js`
3. Verify API key has correct scopes

### Missing dependencies
```bash
npm install
```

### Agent not found
Make sure you're using the correct syntax:
- Orchestrator: `/agents:audit-citations` (slash command)
- Skills: `@playwright-cleanup` (at symbol)

## 📚 Next Steps

- **Read the full README:** `README.md` - Complete documentation
- **Setup details:** `SETUP.md` - Detailed installation guide
- **Architecture:** `CLAUDE.md` - How the system works
- **Example reports:** Check `output/` directory

## 💡 Pro Tips

1. **Start with a well-known brand** (like "Jasper" or "Salesforce") to see how the system works
2. **Be specific with categories** - "AI writing tools" is better than "software"
3. **Review Airtable after each audit** - The visual tables help spot patterns
4. **Re-audit every 60 days** - Track improvements over time
5. **Use the dashboard** - Visual reports are great for presentations

## 🎓 Example Workflow

```bash
# 1. Run audit
/agents:audit-citations
# Brand: "Jasper"
# Category: "AI writing tools"

# 2. Wait 8-10 minutes for completion

# 3. Review markdown report
# File: output/jasper-audit-report-2025-01-15.md

# 4. Check Airtable
# Open your base to see structured data

# 5. Deploy dashboard (optional)
# Select "Deploy to Vercel" when prompted

# 6. Take action on priorities!
```

---

**Ready to start?** Run `/agents:audit-citations` and let's audit your first brand! 🚀
