# API Configuration Examples

## AI Provider Settings

This document provides detailed configuration examples for each supported AI provider.

---

## OpenAI (ChatGPT)

### Getting Your API Key
1. Visit: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Name it (e.g., "Schema Auditor")
5. Copy the key immediately (you won't see it again)

### Configuration in Extension
- **AI Provider**: Select "OpenAI (ChatGPT)"
- **API Key**: `sk-...` (starts with 'sk-')
- **Model** (optional):
  - `gpt-4` - Most capable, slower, more expensive
  - `gpt-4-turbo` - Fast GPT-4 variant
  - `gpt-3.5-turbo` - Faster, cheaper, still good quality
  - Leave blank to use default (gpt-4)

### Pricing (as of 2024)
- GPT-4: ~$0.03 per request (for schema analysis)
- GPT-3.5-turbo: ~$0.002 per request
- Check current pricing: https://openai.com/pricing

### Rate Limits
- Free tier: 3 requests/minute
- Paid tier: 10,000 requests/day
- Handle rate limits: Wait 1 minute between audits if hitting limits

---

## Anthropic (Claude)

### Getting Your API Key
1. Visit: https://console.anthropic.com/
2. Sign up or log in
3. Go to "API Keys" section
4. Click "Create Key"
5. Name it and copy the key

### Configuration in Extension
- **AI Provider**: Select "Anthropic (Claude)"
- **API Key**: `sk-ant-...` (starts with 'sk-ant-')
- **Model** (optional):
  - `claude-3-opus-20240229` - Most capable
  - `claude-3-sonnet-20240229` - Balanced (recommended)
  - `claude-3-haiku-20240307` - Fastest, cheapest
  - Leave blank to use default (sonnet)

### Pricing (as of 2024)
- Opus: ~$0.05 per request
- Sonnet: ~$0.01 per request
- Haiku: ~$0.001 per request
- Check current pricing: https://www.anthropic.com/pricing

### Rate Limits
- Varies by plan
- Standard: 5 requests/minute
- Handle rate limits: Space out audits if needed

---

## Google (Gemini)

### Getting Your API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API key"
4. Copy the key

### Configuration in Extension
- **AI Provider**: Select "Google (Gemini)"
- **API Key**: Your Gemini API key
- **Model** (optional):
  - `gemini-pro` - Standard model
  - `gemini-pro-vision` - For image analysis (not needed here)
  - Leave blank to use default (gemini-pro)

### Pricing (as of 2024)
- Free tier: 60 requests/minute
- Very generous free quota
- Check current pricing: https://ai.google.dev/pricing

### Rate Limits
- Free tier: 60 requests/minute, 1500/day
- Paid tier: Higher limits
- Best for: High-volume auditing

---

## Choosing the Right Provider

### For Budget-Conscious Users
**Recommendation**: Google Gemini (free tier) or Claude Haiku
- Generous free tiers
- Good quality recommendations
- Suitable for most audits

### For Best Quality
**Recommendation**: Claude Opus or GPT-4
- Most sophisticated analysis
- Better understanding of nuanced schema requirements
- More detailed recommendations

### For High Volume
**Recommendation**: Google Gemini
- Highest free tier limits
- Fast response times
- Good for bulk auditing

### For Balance
**Recommendation**: Claude Sonnet or GPT-3.5-turbo
- Good quality/cost ratio
- Reasonable rate limits
- Fast enough for interactive use

---

## Testing Your Configuration

### Test Command
After entering your configuration:
1. Click "Test Connection" button
2. Wait for response (5-30 seconds)
3. Success message confirms it's working

### Troubleshooting Test Failures

**"Invalid API Key"**
- Double-check you copied the complete key
- Ensure no extra spaces
- Verify the key hasn't been revoked
- Check you're using the right provider

**"Rate Limit Exceeded"**
- Wait a few minutes
- Check your usage on the provider's dashboard
- Consider upgrading your plan

**"Network Error"**
- Check your internet connection
- Verify the provider's service status
- Try again in a few minutes

**"Insufficient Credits"**
- Add credits to your account
- Some providers require prepayment
- Check your billing dashboard

---

## Cost Estimation

### Typical Schema Audit
- Input: ~500 tokens (page info + existing schema)
- Output: ~1500 tokens (recommendations)
- Total: ~2000 tokens per audit

### Monthly Cost Estimates (100 audits/month)

**OpenAI GPT-4**: ~$3.00/month
**OpenAI GPT-3.5**: ~$0.20/month
**Claude Opus**: ~$5.00/month
**Claude Sonnet**: ~$1.00/month
**Claude Haiku**: ~$0.10/month
**Google Gemini**: Free (within limits)

---

## Security Best Practices

### API Key Safety
✓ Never share your API key
✓ Don't commit keys to version control
✓ Rotate keys periodically
✓ Use separate keys for different projects
✓ Revoke unused keys

### Extension Security
✓ Keys stored locally in Chrome only
✓ No server-side storage
✓ Direct API calls from browser
✓ Keys never logged or transmitted except to AI provider

### Access Control
✓ Set up billing alerts
✓ Monitor API usage
✓ Use restricted API keys when possible
✓ Review usage regularly

---

## Advanced Configuration

### Custom System Prompts
Currently not supported in the UI, but you can modify `js/popup.js` function `buildAIPrompt()` to customize the prompts sent to AI.

### Response Caching
Consider caching AI responses for identical pages to save costs:
- Audit page once
- Save recommendations
- Re-use for similar pages

### Batch Processing
For bulk auditing:
1. Use Google Gemini (highest free limits)
2. Space requests 1-2 seconds apart
3. Monitor rate limits
4. Consider automated retry logic

---

## Support and Resources

### OpenAI
- Documentation: https://platform.openai.com/docs
- Support: https://help.openai.com/
- Status: https://status.openai.com/

### Anthropic
- Documentation: https://docs.anthropic.com/
- Support: https://support.anthropic.com/
- Console: https://console.anthropic.com/

### Google
- Documentation: https://ai.google.dev/docs
- Support: https://support.google.com/
- Dashboard: https://makersuite.google.com/

---

**Last Updated**: January 2025
**Note**: Pricing and features subject to change. Always verify current information on provider websites.
