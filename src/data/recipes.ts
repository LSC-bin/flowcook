import type { Recipe } from '../types'

// Sample recipe 1: a daily morning news briefing, run in production by the author
export const recipe1: Recipe = {
  slug: 'daily-news-briefing',
  title: 'Get a Daily Morning News Briefing on Telegram',
  description: 'A cron job collects global and local news every morning, summarizes it, and delivers it to Telegram.',
  category: 'Productivity',
  difficulty: 'beginner',
  estimatedMinutes: 20,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'Telegram Bot', url: 'https://t.me/BotFather', required: true },
  ],
  steps: [
    {
      title: 'Create a Telegram bot',
      content: 'Open Telegram, talk to @BotFather, and run /newbot to create a bot. Put the token you receive into your agent gateway config.',
    },
    {
      title: 'Register the cron job',
      content: 'Just tell your agent something like the following. Schedule it for 7:00 AM in your timezone.',
      code: {
        language: 'text',
        content: 'Every morning at 7 AM, search global and local news,\npick at least two stories per category,\nand send me a briefing on Telegram.',
      },
    },
    {
      title: 'Set quality standards in the prompt',
      content: 'Spell out quality rules in the prompt: verify against the original article instead of trusting snippets, always include source links, and skip articles with unclear dates. This dramatically improves briefing quality.',
    },
    {
      title: 'Check the result',
      content: 'The next morning, confirm the briefing arrived on Telegram. If you do not like the format, tweak the prompt and update the cron job.',
    },
  ],
  files: [],
  tags: ['news', 'briefing', 'telegram', 'cron'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Sample recipe 2: two-way sync between Google Drive and a local folder
export const recipe2: Recipe = {
  slug: 'google-drive-local-sync',
  title: 'Two-Way Sync Between Google Drive and a Local Folder',
  description: 'A script that keeps a local folder and a Google Drive folder in sync, both ways, on a schedule.',
  category: 'Data',
  difficulty: 'intermediate',
  estimatedMinutes: 40,
  tools: [
    { name: 'Python 3.11+', required: true },
    { name: 'Google Drive API', url: 'https://developers.google.com/drive/api', required: true },
  ],
  steps: [
    {
      title: 'Create an OAuth client in Google Cloud',
      content: 'In Google Cloud Console, create a project, enable the Drive API, create a Desktop-app OAuth client, and download the client secret JSON.',
    },
    {
      title: 'Write the sync script',
      content: 'Build a script with the structure below. It compares the local file list with the Drive file list and applies adds, updates, and deletes in both directions.',
      code: {
        language: 'python',
        content: '# core logic sketch\ndef sync(local_dir, folder_id):\n    local_files = scan_local(local_dir)      # {relpath: mtime}\n    remote_files = list_drive(folder_id)     # {relpath: (file_id, mtime)}\n    upload_new(local_files, remote_files)\n    download_new(remote_files, local_files)\n    resolve_conflicts(local_files, remote_files)  # mtime comparison',
      },
    },
    {
      title: 'Run it on a schedule',
      content: 'Register it to run every 3 hours. Handle conflicts safely by moving conflicting files into a _conflicts folder.',
      code: {
        language: 'bash',
        content: '0 */3 * * * /usr/bin/python3 /home/user/sync_drive.py >> /var/log/drive_sync.log 2>&1',
      },
    },
  ],
  files: [],
  tags: ['google drive', 'sync', 'backup', 'cron'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 3: watch product prices and get an alert at your target price
export const recipe3: Recipe = {
  slug: 'product-price-monitor',
  title: 'Watch a Product Price and Get Alerted at Your Target',
  description: 'A scheduled job checks a product page every few hours and messages you the moment the price drops below your target.',
  category: 'Productivity',
  difficulty: 'beginner',
  estimatedMinutes: 15,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'Telegram Bot', url: 'https://t.me/BotFather', required: false },
  ],
  steps: [
    {
      title: 'Pick the product and your target price',
      content: 'Find the product page URL. Note the current price and the price you would actually buy at. Be realistic — a target that never triggers is useless.',
    },
    {
      title: 'Ask your agent to set up the watch',
      content: 'Describe the watch in one sentence. The agent creates a cron job that fetches the page, extracts the price, and compares it against your target.',
      code: {
        language: 'text',
        content: 'Check this product page every 3 hours:\nhttps://example.com/product/12345\nIf the price is at or below 89,000 won,\nmessage me with the price and the link, then stop watching.',
      },
    },
    {
      title: 'Make the job silent when nothing happens',
      content: 'The job must not message you every check. Only alert on two events: the price hit the target, or the page broke (product removed or price selector changed) so you know the watch is dead.',
    },
    {
      title: 'Test it once',
      content: 'Set the target temporarily above the current price to confirm the alert path works end to end, then set it back to your real target.',
    },
  ],
  files: [],
  tags: ['price', 'monitor', 'alert', 'shopping', 'cron'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 4: track blogs and news sites via RSS, digest on schedule
export const recipe4: Recipe = {
  slug: 'blog-rss-watchlist',
  title: 'Track Your Favorite Blogs Without Opening Them',
  description: 'Subscribe to a list of blogs and RSS feeds, and receive one digest a day with only the new posts.',
  category: 'Communication',
  difficulty: 'beginner',
  estimatedMinutes: 25,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
  ],
  steps: [
    {
      title: 'Collect your feed list',
      content: 'Write down 5–15 blogs you actually read. For each one find the RSS or Atom feed URL — usually at /feed, /rss.xml, or linked from the footer.',
      code: {
        language: 'text',
        content: 'https://example-blog.com/feed\nhttps://another.dev/rss.xml\nhttps://newsletter.site.io/atom.xml',
      },
    },
    {
      title: 'Create the watchlist job',
      content: 'Ask the agent to store the feed list and check it once a day. It keeps state of what it already reported, so you only see new posts.',
      code: {
        language: 'text',
        content: 'Every day at 8 AM, check these feeds and send me a digest\nof posts published since the last check. One line per post:\ntitle — blog name. Skip posts older than 7 days.',
      },
    },
    {
      title: 'Tune the noise level',
      content: 'After a week, prune feeds that never interest you and add a rule like "group by topic" or "max 10 items" if the digest gets long. A watchlist you stop reading is dead weight.',
    },
  ],
  files: [],
  tags: ['rss', 'blog', 'digest', 'feeds', 'cron'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 5: summarize YouTube videos from transcripts
export const recipe5: Recipe = {
  slug: 'youtube-video-summary',
  title: 'Summarize Any YouTube Video Before Watching It',
  description: 'Fetch a video transcript and get a structured summary — key points, timestamps, and whether it is worth your time.',
  category: 'Data',
  difficulty: 'beginner',
  estimatedMinutes: 10,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
  ],
  steps: [
    {
      title: 'Send the video link to your agent',
      content: 'Paste a YouTube URL and ask for a summary. The agent pulls the transcript (captions) and reads it — no video download needed.',
      code: {
        language: 'text',
        content: 'Summarize this video. Give me: a 2-sentence overview,\n5 key points with timestamps, and what I can skip.\nhttps://www.youtube.com/watch?v=XXXXXXXXXXX',
      },
    },
    {
      title: 'Ask for a decision, not just a summary',
      content: 'Add "is this worth watching in full for someone who wants to learn X?" — the transcript lets the agent judge whether the video goes deep or stays surface level.',
    },
    {
      title: 'Handle videos without captions',
      content: 'If there are no captions, the transcript route fails. Fallback: have the agent fetch the description, chapters, and top comments to sketch what the video covers — clearly labeled as a weaker summary.',
    },
  ],
  files: [],
  tags: ['youtube', 'summary', 'transcript', 'learning'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 6: extract text and tables from Korean HWP documents
export const recipe6: Recipe = {
  slug: 'korean-hwp-text-extract',
  title: 'Extract Text and Tables from Korean HWP Files',
  description: 'Read .hwp / .hwpx documents (the Korean standard format) with an open-source library and pull out clean text.',
  category: 'Data',
  difficulty: 'intermediate',
  estimatedMinutes: 30,
  tools: [
    { name: 'Python 3.10+', required: true },
    { name: 'pyhwp', url: 'https://pypi.org/project/pyhwp/', required: true },
  ],
  steps: [
    {
      title: 'Install the tools in a virtualenv',
      content: 'HWP is a Korean government/school document format. The pyhwp package parses the binary .hwp container and exposes text extraction.',
      code: {
        language: 'bash',
        content: 'python3 -m venv ~/tools/hwp-venv\n~/tools/hwp-venv/bin/pip install pyhwp',
      },
    },
    {
      title: 'Extract text from a file',
      content: 'Open the file through the library and read the combined body text. This works for reports, official letters, and school documents.',
      code: {
        language: 'python',
        content: "from pyhwp import HWPFile\nwith open('문서.hwp', 'rb') as f:\n    doc = HWPFile(f)\n    print(doc.text())",
      },
    },
    {
      title: 'Deal with .hwpx and old files',
      content: '.hwpx is XML inside a ZIP — unzip and parse the section XML directly. Old or DRM-protected files may fail to open; if a file was edited in Hancom Office, ask the author to also save a .hwpx copy.',
    },
    {
      title: 'Feed the text to your agent',
      content: 'Once extraction works, point your agent at a folder of HWP files: it can summarize, convert to Markdown, or answer questions about the contents without opening the office suite.',
    },
  ],
  files: [],
  tags: ['hwp', 'korean', 'document', 'extraction', 'python'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 7: disk space watchdog with silent-no-alert behavior
export const recipe7: Recipe = {
  title: 'Disk Space Watchdog That Only Speaks When It Hurts',
  slug: 'disk-space-watchdog',
  description: 'A cron job checks disk usage and alerts only when a partition crosses your threshold — silent otherwise.',
  category: 'Development',
  difficulty: 'beginner',
  estimatedMinutes: 15,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
  ],
  steps: [
    {
      title: 'Check your baseline',
      content: 'Run df -h and note which partitions matter and how full they are right now. Pick a threshold that gives you a day or two of reaction time, e.g. 85%.',
      code: {
        language: 'bash',
        content: '$ df -h /\nFilesystem  Size  Used Avail Use%\n/dev/sda1   100G   62G   38G  62%',
      },
    },
    {
      title: 'Write the watchdog script',
      content: 'The script prints nothing when everything is fine, and prints one alert line when a partition crosses the threshold. Empty output = silent tick, no notification.',
      code: {
        language: 'bash',
        content: '#!/usr/bin/env bash\nuse=$(df --output=pcent / | tail -1 | tr -d \' %\')\nif [ "$use" -ge 85 ]; then\n  echo "DISK ALERT: / is at ${use}%" && df -h / | tail -1\nfi',
      },
    },
    {
      title: 'Schedule it',
      content: 'Run the script every hour through your agent scheduler. The key rule: only a non-empty result produces a message, so you never get "all fine" noise.',
    },
    {
      title: 'Test the alert path',
      content: 'Temporarily lower the threshold to 10%, run once, confirm the alert arrives, restore 85%. An untested watchdog is a false sense of security.',
    },
  ],
  files: [],
  tags: ['disk', 'monitoring', 'watchdog', 'cron', 'server'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 8: daily digest of new GitHub issues and PRs
export const recipe8: Recipe = {
  slug: 'github-issue-daily-digest',
  title: 'One Daily Digest for Your GitHub Repos',
  description: 'Instead of notification spam, get one digest a day: new issues, PRs awaiting review, and CI failures across your repos.',
  category: 'Development',
  difficulty: 'intermediate',
  estimatedMinutes: 30,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'GitHub token', url: 'https://github.com/settings/tokens', required: true },
  ],
  steps: [
    {
      title: 'Create a read-only token',
      content: 'Generate a fine-grained personal access token scoped to just the repos you care about, with Issues and Pull requests read permissions. Store it where your agent can use it — never paste tokens into chat.',
    },
    {
      title: 'Define the digest',
      content: 'Ask the agent for a daily digest job. Be explicit about what counts as news: issues opened since the last run, open PRs older than 2 days, failed CI on the default branch.',
      code: {
        language: 'text',
        content: 'Every weekday at 9 AM, for repos me/myapp and me/mylib:\n- issues opened since yesterday\n- PRs open > 2 days\n- failed CI runs on main\nSend one message grouped by repo. Skip a repo with no news.',
      },
    },
    {
      title: 'Add an "action needed" section',
      content: 'Have the digest end with at most 3 items that genuinely need a decision from you today. That turns a report into a to-do list.',
    },
    {
      title: 'Review after two weeks',
      content: 'If you keep skipping a section, delete it from the prompt. The digest should shrink over time until every line earns its place.',
    },
  ],
  files: [],
  tags: ['github', 'issues', 'digest', 'ci', 'cron'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 9: automatic meeting minutes from Teams/recordings
export const recipe9: Recipe = {
  slug: 'meeting-minutes-from-transcript',
  title: 'Turn Meeting Transcripts into Minutes with Action Items',
  description: 'Feed a meeting transcript to your agent and get structured minutes: decisions, action items with owners, and open questions.',
  category: 'Communication',
  difficulty: 'intermediate',
  estimatedMinutes: 20,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
  ],
  steps: [
    {
      title: 'Get the transcript',
      content: 'Export the transcript from your meeting tool (Teams, Meet, Zoom all offer downloads), or record audio and let your agent transcribe it.',
    },
    {
      title: 'Define the output contract',
      content: 'Tell the agent exactly what minutes look like for you. A fixed shape makes every meeting comparable and skimmable.',
      code: {
        language: 'text',
        content: 'Read the attached transcript and produce minutes:\n1. Attendees\n2. Decisions made (one line each)\n3. Action items — task, owner, deadline\n4. Open questions\nKeep it under one page.',
      },
    },
    {
      title: 'Verify names and numbers',
      content: 'Spot-check every action item owner and every number against the transcript. Transcripts mis-hear names; wrong owners are worse than no minutes.',
    },
    {
      title: 'File it where the team looks',
      content: 'Save the minutes to the shared folder or doc space with a consistent naming scheme like 2026-08-31_weekly-sync.md so they are findable months later.',
    },
  ],
  files: [],
  tags: ['meeting', 'minutes', 'transcript', 'action items'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 10: repurpose one long post into a social thread
export const recipe10: Recipe = {
  slug: 'blog-post-to-social-thread',
  title: 'Turn One Blog Post into a Ready-to-Post Social Thread',
  description: 'Give the agent a finished article and get back a social thread draft in your voice — hook, key points, and a call to read more.',
  category: 'Marketing',
  difficulty: 'intermediate',
  estimatedMinutes: 20,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
  ],
  steps: [
    {
      title: 'Feed the full article',
      content: 'Paste the finished post or point the agent at its URL. Do not use an outline — the thread has to reflect what you actually published.',
    },
    {
      title: 'Set the thread rules',
      content: 'Give hard constraints: number of posts, character limit, tone, and what to keep from your voice (e.g. you never use emojis, you open with a question).',
      code: {
        language: 'text',
        content: 'Turn this article into a 6-post X thread.\nRules: plain language, no emojis, no hashtags,\nfirst post is a question or a bold claim,\nlast post links the article. Keep my dry tone.',
      },
    },
    {
      title: 'Kill the AI smell',
      content: 'Reject drafts with words like "unlock", "dive in", "game-changer". Ask for a rewrite until a stranger could not tell it was drafted. The thread promotes your writing — it must sound written by you.',
    },
    {
      title: 'Save your working template',
      content: 'Once a draft passes, save the exact prompt and rules as a reusable template so every future post takes one command instead of a negotiation.',
    },
  ],
  files: [],
  tags: ['social media', 'content', 'writing', 'marketing'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

export const recipe11: Recipe = {
  slug: 'tomorrow-calendar-reminder',
  title: "Get Tomorrow's Schedule the Night Before — Silent When Empty",
  description:
    "A nightly job reads your calendar and messages you tomorrow's events. If there is nothing scheduled, it stays completely silent.",
  category: 'Productivity',
  difficulty: 'beginner',
  estimatedMinutes: 15,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'Google Calendar API', url: 'https://developers.google.com/calendar', required: true },
  ],
  steps: [
    {
      title: 'Connect your calendar (read-only is enough)',
      content:
        'Authorize the agent with the Calendar API using a read-only scope. All the job needs is to list events, never to create or edit them.',
    },
    {
      title: 'Write a script that only speaks when there is something to say',
      content:
        'Fetch tomorrow\'s events and print a formatted list. Print nothing when the day is empty — an empty output means no message is sent at all. This "silent watchdog" pattern keeps reminders useful instead of noisy.',
      code: {
        language: 'python',
        content:
          "events = list_events(tomorrow)\nif not events:\n    sys.exit(0)          # silent: nothing is delivered\nfor e in events:\n    print(f\"{start_time(e)} {title(e)}\")",
      },
    },
    {
      title: 'Schedule it for the evening',
      content:
        'Run it once a day around 8 PM so you can plan your evening around tomorrow. Register it as a script-only job: stdout is the message verbatim.',
      code: { language: 'bash', content: '0 20 * * * /usr/bin/python3 /home/user/tomorrow_reminder.py' },
    },
    {
      title: 'Test both paths',
      content:
        'Verify a day with events delivers the list, and an empty day delivers nothing. The silence is the feature — if you ever get a blank message, the empty-check is broken.',
    },
  ],
  files: [],
  tags: ['calendar', 'reminder', 'cron', 'silent'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

export const recipe12: Recipe = {
  slug: 'countdown-checklist-reminders',
  title: 'One-Shot Countdown Reminders for Big-Event Prep (D-90, D-60, D-30)',
  description:
    'Schedule one-time reminders at 90, 60, and 30 days before a trip or deadline — each message names the exact next action, so nothing slips.',
  category: 'Productivity',
  difficulty: 'beginner',
  estimatedMinutes: 10,
  tools: [{ name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true }],
  steps: [
    {
      title: 'Break the prep into dated milestones',
      content:
        'For a trip: D-90 visa/ESTA application, D-60 travel insurance, D-30 eSIM and roaming. Each milestone gets a date and one concrete action — vague reminders get ignored.',
    },
    {
      title: 'Schedule each as a one-shot job',
      content:
        'Create three single-run jobs on those dates. The prompt is the reminder text itself, written as a direct instruction with the action in it.',
      code: {
        language: 'text',
        content:
          'You are 90 days out from your trip.\nToday, prepare or submit your ESTA application.\nTell me in one short message.',
      },
    },
    {
      title: 'Keep messages short and actionable',
      content:
        'One line of context plus one action. "D-60: look into travel insurance today." beats a paragraph of tips you will not read.',
    },
    {
      title: 'List the schedule once to confirm',
      content:
        'Print the pending one-shot jobs and check dates and order. That is the whole maintenance — they fire once and are done.',
    },
  ],
  files: [],
  tags: ['travel', 'reminder', 'one-shot', 'checklist'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

export const recipe13: Recipe = {
  slug: 'weekly-ai-spend-report',
  title: 'A Weekly AI Spend Report So API Bills Never Sneak Up',
  description:
    'A weekly job checks your LLM provider dashboard and sends a short summary of last week\'s usage and cost — with a strict no-guessing rule.',
  category: 'Data',
  difficulty: 'intermediate',
  estimatedMinutes: 25,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'Provider dashboard (e.g. OpenRouter)', url: 'https://openrouter.ai', required: true },
  ],
  steps: [
    {
      title: 'Find what is actually verifiable',
      content:
        'Open your provider dashboard and note which numbers exist: weekly spend, token usage, per-model breakdown. The report can only be as honest as its sources.',
    },
    {
      title: 'Write the prompt with a no-guessing rule',
      content:
        'Tell the job to report only confirmed numbers and to say "not verifiable" for anything it cannot see. Without this rule, summaries drift into confident fiction.',
      code: {
        language: 'text',
        content:
          'Check last week\'s usage and cost on the provider dashboard.\nSummarize briefly.\nDo not guess anything you cannot confirm — say it is unverifiable instead.',
      },
    },
    {
      title: 'Schedule it weekly',
      content: 'Once a week, same day, delivered to your messaging app. A weekly rhythm catches drift early; daily is noise.',
      code: { language: 'bash', content: '0 22 * * 0   # every Sunday' },
    },
    {
      title: 'Add a threshold once you know your baseline',
      content:
        'After a few weeks you know a normal range. Ask the job to flag weeks that exceed it, so the report only demands attention when something changed.',
    },
  ],
  files: [],
  tags: ['cost', 'monitoring', 'llm', 'report'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 14: monitor competitor news with cited digests
export const recipe14: Recipe = {
  slug: 'competitor-news-monitor',
  title: 'Monitor Competitor News Without Reading the News Yourself',
  description: 'A scheduled job watches named companies for material news and delivers a digest where every claim carries a source link.',
  category: 'Marketing',
  difficulty: 'intermediate',
  estimatedMinutes: 25,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'Web search provider', required: true },
  ],
  steps: [
    {
      title: 'Define the watchlist and what counts',
      content: 'List the companies you care about and define "material": launches, pricing, funding, layoffs, outages. If you do not define this, the job will drown you in trivia.',
    },
    {
      title: 'Write the monitoring prompt with citation rules',
      content: 'Require a source URL next to every claim and forbid speculation. A no-guessing rule keeps the digest trustworthy.',
      code: {
        language: 'text',
        content:
          'Watch these companies: [Acme, Globex, Initech].\nEvery weekday at 9 AM, search for news from the last 24h.\nReport only material events: launches, pricing, funding, layoffs, outages.\nEvery item needs a source URL. If you cannot verify something, say so.',
      },
    },
    {
      title: 'Schedule it and review for a week',
      content: 'Run it daily for a week, then tune: drop sources that only produce noise, add terms the job keeps missing.',
    },
    {
      title: 'Keep it silent on empty days',
      content: 'Tell the job to send nothing when there is no material news. A monitor that speaks every day gets muted.',
    },
  ],
  files: [],
  tags: ['competitors', 'monitoring', 'news', 'marketing'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 15: turn scanned PDFs into searchable text
export const recipe15: Recipe = {
  slug: 'scanned-pdf-ocr',
  title: 'Turn Scanned PDFs into Searchable Text',
  description: 'OCR a stack of scanned documents and feed the clean text into your agent for summarizing or filing.',
  category: 'Data',
  difficulty: 'intermediate',
  estimatedMinutes: 30,
  tools: [
    { name: 'Python 3.11+', required: true },
    { name: 'ocrmypdf', url: 'https://github.com/ocrmypdf/OCRmyPDF', required: true },
  ],
  steps: [
    {
      title: 'Install the OCR toolchain',
      content: 'ocrmypdf wraps Tesseract and keeps your PDF layout. Install the language packs you need.',
      code: { language: 'bash', content: 'pip install ocrmypdf\nsudo apt install tesseract-ocr tesseract-ocr-eng tesseract-ocr-kor' },
    },
    {
      title: 'OCR the document',
      content: 'Run it on a scan. The output looks identical but now has a text layer.',
      code: { language: 'bash', content: 'ocrmypdf -l eng+kor input_scan.pdf output_searchable.pdf' },
    },
    {
      title: 'Extract the text',
      content: 'Pull the text layer out with any PDF library, then hand it to your agent.',
      code: { language: 'python', content: 'import pymupdf\ndoc = pymupdf.open("output_searchable.pdf")\ntext = "\\n".join(page.get_text() for page in doc)' },
    },
    {
      title: 'Ask your agent what you actually need',
      content: 'Summaries, action items, tables as CSV — extraction is the boring part, analysis is where the agent earns its keep.',
    },
  ],
  files: [],
  tags: ['pdf', 'ocr', 'extraction', 'tesseract'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 16: deploy a static site with prerendering
export const recipe16: Recipe = {
  slug: 'github-pages-prerender-deploy',
  title: 'Deploy a Static Site to GitHub Pages with Prerendering',
  description: 'Ship a client-side app as fully prerendered static HTML so search engines and link previews actually see your content.',
  category: 'Development',
  difficulty: 'intermediate',
  estimatedMinutes: 45,
  tools: [
    { name: 'Node.js 18+', required: true },
    { name: 'Playwright', url: 'https://playwright.dev', required: true },
    { name: 'GitHub Pages', url: 'https://pages.github.com', required: true },
  ],
  steps: [
    {
      title: 'Build for the subpath',
      content: 'GitHub Pages serves from /your-repo/, not /. Set the base path at build time or every asset link 404s.',
      code: { language: 'bash', content: 'VITE_BASE_PATH=/flowcook/ npm run build' },
    },
    {
      title: 'Prerender every route',
      content: 'A headless browser renders each route to static HTML. This is what makes SEO and social previews work for a JS app.',
      code: {
        language: 'bash',
        content: 'SITE_URL=https://user.github.io BASE_PATH=/flowcook/ node scripts/prerender.mjs',
      },
    },
    {
      title: 'Push dist to a gh-pages branch',
      content: 'Clone into a temp dir, copy the build output over, push the gh-pages branch. Keep source on main, artifacts on gh-pages.',
    },
    {
      title: 'Verify like a stranger',
      content: 'Check the live site, the sitemap, and one route in an incognito tab. Also fetch a page with curl and confirm the HTML contains real content, not an empty root div.',
    },
  ],
  files: [],
  tags: ['github pages', 'seo', 'prerender', 'deployment'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 17: track new arXiv papers
export const recipe17: Recipe = {
  slug: 'arxiv-paper-watchlist',
  title: 'Track New arXiv Papers in Your Field Automatically',
  description: 'A daily job pulls fresh arXiv submissions matching your keywords and sends you only the ones worth reading.',
  category: 'Development',
  difficulty: 'beginner',
  estimatedMinutes: 20,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'arXiv API', url: 'https://info.arxiv.org/help/api/', required: true },
  ],
  steps: [
    {
      title: 'Pick tight search terms',
      content: 'Broad terms like "machine learning" produce 200 papers a day. Pick a narrow intersection, like a method plus an application area.',
    },
    {
      title: 'Create the daily job',
      content: 'The arXiv API is public and needs no key. Have the agent fetch yesterday\'s submissions and filter.',
      code: {
        language: 'text',
        content:
          'Every morning, query the arXiv API for yesterday\'s submissions\nmatching [your keywords]. Send me the top 3 most relevant papers:\ntitle, one-line takeaway, and the abs link. Skip duplicates.',
      },
    },
    {
      title: 'Ask for relevance ranking',
      content: 'A list of titles is cheap. Ask the agent to rank by relevance to your stated focus and say why — that is the part humans are bad at doing daily.',
    },
  ],
  files: [],
  tags: ['arxiv', 'research', 'papers', 'daily digest'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 18: triage a messy inbox
export const recipe18: Recipe = {
  slug: 'email-inbox-triage',
  title: 'Triage a Messy Inbox Without Reading Everything',
  description: 'Point your agent at your inbox, get threads ranked by urgency with suggested replies — you only approve.',
  category: 'Communication',
  difficulty: 'intermediate',
  estimatedMinutes: 30,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'IMAP access to your mailbox', required: true },
  ],
  steps: [
    {
      title: 'Connect read-only first',
      content: 'Use an app password with read-only IMAP access. The agent should be able to read and draft, but never send without your approval.',
    },
    {
      title: 'Define your triage rules',
      content: 'Spell out what is urgent for you: sender domains, deadlines within 48 hours, threads waiting on you. Generic triage is useless; yours is specific.',
    },
    {
      title: 'Get ranked output with drafts',
      content: 'Ask for three buckets — reply today, reply this week, ignore — plus a one-paragraph draft reply for the top items.',
    },
    {
      title: 'Review, then send',
      content: 'You edit or approve each draft. The agent prepares; you decide. That split is what keeps email safe to automate.',
    },
  ],
  files: [],
  tags: ['email', 'triage', 'imap', 'drafts'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 19: voice memos to searchable notes
export const recipe19: Recipe = {
  slug: 'voice-memo-to-note',
  title: 'Turn Voice Memos into Clean, Searchable Notes',
  description: 'Drop a voice recording, get back a timestamped, cleaned-up text note filed in your notes folder.',
  category: 'Productivity',
  difficulty: 'beginner',
  estimatedMinutes: 15,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'whisper.cpp or local Whisper', url: 'https://github.com/ggerganov/whisper.cpp', required: true },
  ],
  steps: [
    {
      title: 'Set up local transcription',
      content: 'A local Whisper model keeps voice data on your machine. The "small" model is a good speed/accuracy tradeoff for memos.',
    },
    {
      title: 'Tell the agent what a finished note looks like',
      content: 'Do not stop at a raw transcript. Ask for filler words removed, a title, and a date prefix so notes sort themselves.',
      code: {
        language: 'text',
        content:
          'Transcribe this audio, then clean it into a note:\n- remove filler words and false starts\n- add a short title\n- save as YYYY-MM-DD_title.md in my notes folder',
      },
    },
    {
      title: 'Send memos from your phone',
      content: 'Forward the audio file to your agent over Telegram or email. Within a minute you have a note where grep can find it.',
    },
  ],
  files: [],
  tags: ['voice', 'transcription', 'whisper', 'notes'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 20: weekly spreadsheet report from raw data
export const recipe20: Recipe = {
  slug: 'weekly-spreadsheet-report',
  title: 'Auto-Generate a Weekly Spreadsheet Report from Raw Data',
  description: 'A Friday job reads your raw data files and produces a formatted weekly report with pivot-style summaries.',
  category: 'Data',
  difficulty: 'intermediate',
  estimatedMinutes: 35,
  tools: [
    { name: 'Python 3.11+', required: true },
    { name: 'pandas', url: 'https://pandas.pydata.org', required: true },
    { name: 'openpyxl', url: 'https://openpyxl.readthedocs.io', required: true },
  ],
  steps: [
    {
      title: 'Fix the output format first',
      content: 'Before writing any code, decide the exact sheet layout: columns, groupings, totals row. Changing your mind later costs more than deciding now.',
    },
    {
      title: 'Build the transform once',
      content: 'One script: read the week\'s raw CSVs, aggregate, and write a styled workbook. Save Korean or other non-ASCII CSVs as UTF-8 with BOM so Excel displays them correctly.',
      code: {
        language: 'python',
        content:
          'import pandas as pd\ndf = pd.concat([pd.read_csv(f) for f in week_files])\nsummary = df.groupby("category").agg(count=("id","count"), total=("amount","sum"))\nsummary.to_excel("weekly_report.xlsx")',
      },
    },
    {
      title: 'Schedule it for Friday afternoon',
      content: 'Run it when the week is effectively over. The agent verifies the file opens and reports the row counts.',
    },
    {
      title: 'Let the agent narr the numbers',
      content: 'Alongside the file, ask for three sentences: what changed vs last week, what looks off, what needs attention. Numbers without narration get ignored.',
    },
  ],
  files: [],
  tags: ['excel', 'report', 'pandas', 'automation'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 21: morning smart home scene
export const recipe21: Recipe = {
  slug: 'smart-home-morning-scene',
  title: 'A Morning Scene That Adjusts to Your Calendar',
  description: 'Lights and devices wake up differently depending on what your calendar says today holds.',
  category: 'Other',
  difficulty: 'beginner',
  estimatedMinutes: 10,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'OpenHue CLI', url: 'https://www.openhue.io', required: true },
  ],
  steps: [
    {
      title: 'Make a basic scene work',
      content: 'Get one command to set your lights to a warm bright state. That is your scene primitive.',
      code: { language: 'bash', content: 'openhue scene set bedroom "Energize"' },
    },
    {
      title: 'Branch on the calendar',
      content: 'The agent checks your first event. Early meeting? Lights on at 6:30. Nothing before 10? Stay dark and skip the wake-up ping.',
    },
    {
      title: 'Schedule it as a script-only job',
      content: 'Pure script, no LLM per run: a small program reads the calendar and fires the scene. Zero tokens, zero cost, every morning.',
    },
  ],
  files: [],
  tags: ['smart home', 'hue', 'calendar', 'morning routine'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 22: recover blocked pages
export const recipe22: Recipe = {
  title: 'Recover Blocked or Paywalled Web Pages',
  slug: 'blocked-page-recovery',
  description: 'A fallback ladder that gets the text of a page when the front door is locked — caches, mirrors, and archives.',
  category: 'Data',
  difficulty: 'beginner',
  estimatedMinutes: 15,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'Wayback Machine', url: 'https://web.archive.org', required: false },
  ],
  steps: [
    {
      title: 'Try the direct fetch first',
      content: 'Half of "blocked" pages are just bot filters that a plain HTTP fetch with a real user agent gets past.',
    },
    {
      title: 'Fall back through the ladder',
      content: 'Google cache, the Wayback Machine, archive.today, then a rendered browser fetch. Each rung beats nothing.',
      code: {
        language: 'text',
        content:
          'Fetch this URL. If blocked:\n1. try the Wayback Machine (newest snapshot)\n2. try archive.today\n3. render it in a headless browser\nReturn the clean text with a note about which source worked.',
      },
    },
    {
      title: 'Note provenance',
      content: 'Archived copies can be days or years old. Always record the snapshot date so you know how stale the content is.',
    },
  ],
  files: [],
  tags: ['web scraping', 'archive', 'paywall', 'fallback'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

// Recipe 23: QA your own web app
export const recipe23: Recipe = {
  slug: 'dogfood-your-webapp',
  title: 'Dogfood Your Own Web App Before Users Do',
  description: 'Send your agent through your web app like a confused new user, and get a bug report with screenshots.',
  category: 'Development',
  difficulty: 'intermediate',
  estimatedMinutes: 30,
  tools: [
    { name: 'Hermes Agent', url: 'https://github.com/NousResearch/hermes-agent', required: true },
    { name: 'Browser automation', required: true },
  ],
  steps: [
    {
      title: 'Define the user journey',
      content: 'List the 3–5 flows a real visitor takes: land on home, find the thing, use the thing, leave. Vague "test my app" prompts produce vague reports.',
    },
    {
      title: 'Ask for evidence with every finding',
      content: 'Each reported issue needs a screenshot or the exact console error. No evidence, no bug.',
      code: {
        language: 'text',
        content:
          'Explore this site as a first-time user. For every issue found, capture:\n- URL and what you were doing\n- screenshot\n- console/network errors if any\nClassify: broken / confusing / cosmetic.',
      },
    },
    {
      title: 'Test the edges too',
      content: 'Empty states, long text, no-JS fetch of the HTML, mobile viewport. Users find these within minutes; you never will.',
    },
    {
      title: 'Re-run after each fix',
      content: 'The same prompt becomes your regression pass. Rerun it after deploy and diff the findings.',
    },
  ],
  files: [],
  tags: ['qa', 'testing', 'browser automation', 'ux'],
  author: 'flowcook',
  verified: true,
  createdAt: '2026-08-31',
  updatedAt: '2026-08-31',
}

export const RECIPES: Recipe[] = [
  recipe1,
  recipe2,
  recipe3,
  recipe4,
  recipe5,
  recipe6,
  recipe7,
  recipe8,
  recipe9,
  recipe10,
  recipe11,
  recipe12,
  recipe13,
  recipe14,
  recipe15,
  recipe16,
  recipe17,
  recipe18,
  recipe19,
  recipe20,
  recipe21,
  recipe22,
  recipe23,
]
