# Slack Bot API Setup Checklist

## ✅ What needs to be done:

### 1. Create Slack App
- [ ] Go to https://api.slack.com/apps
- [ ] Create new app "From scratch"
- [ ] Give app name (e.g., "CookieComply Notifications")
- [ ] Select workspace

### 2. Configure Bot Permissions
- [ ] Go to "OAuth & Permissions"
- [ ] Add scope: `chat:write`
- [ ] Add scope: `chat:write.public` (if public channels needed)
- [ ] Save changes

### 3. Install to workspace
- [ ] Click "Install to Workspace"
- [ ] Confirm installation
- [ ] Copy Bot User OAuth Token (starts with `xoxb-`)

### 4. Add bot to channel
- [ ] Go to desired channel (e.g., #leads)
- [ ] Write: `/invite @your_bot_name`
- [ ] Or add through channel settings

### 5. Cloudflare Setup
- [ ] Go to Cloudflare Dashboard
- [ ] Select Workers & Pages project
- [ ] Go to Settings → Environment variables
- [ ] Add variable: `SLACK_BOT_TOKEN=xoxb-your-token`
- [ ] Add variable: `SLACK_CHANNEL=#leads`

### 6. Testing
- [ ] Run test script: `node test-contact-api.js`
- [ ] Check logs in Cloudflare Dashboard
- [ ] Check Slack channel - notification should arrive

## 🔍 Functionality Check:

### In Cloudflare Dashboard:
- [ ] Logs show "Sending Slack notification via Bot API..."
- [ ] No "Slack API error" errors
- [ ] Status "Slack notification sent successfully!"

### In Slack:
- [ ] Bot added to channel
- [ ] Beautiful notification with form data arrives
- [ ] No access errors

## 🚨 Common Issues:

### Bot can't write to channel:
- Check `chat:write` scope
- Make sure bot is added to channel
- Check channel permissions (private/public)

### "invalid_auth" error:
- Check Bot Token correctness
- Make sure app is installed in workspace

### "channel_not_found" error:
- Check channel name correctness
- Make sure channel exists
- Check that bot is added to channel

## 📞 If nothing works:

1. Check logs in Cloudflare Dashboard
2. Make sure all environment variables are configured
3. Check that bot has needed permissions
4. Try simple webhook as alternative
