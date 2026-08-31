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
]
