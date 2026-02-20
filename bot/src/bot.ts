// bot/src/bot.ts
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import * as dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

console.log('⚡ AEZOS Telegram Bot starting...');

// Start command
bot.command('start', (ctx) => {
    ctx.replyWithHTML(`
<b>🛡️ AEZOS – AEGIS OF ZEUS DEFENSE</b>

Paste any conversation, forward a message, or send a screenshot.

Zeus will read it instantly and tell you if it's safe.

Type /help for commands.
  `, {
        reply_markup: {
            inline_keyboard: [[{ text: '🌐 Open Web App', url: 'https://aezos.xyz' }]]
        }
    });
});

// Help
bot.command('help', (ctx) => {
    ctx.reply('Just send any text or photo. I will scan it with Zeus.');
});

// Main handler: any text or photo
bot.on([message('text'), message('photo')], async (ctx) => {
    const chatId = ctx.chat.id;
    const userMessage = ctx.message;

    await ctx.reply('⚡ Invoking Zeus... (analyzing conversation)');

    // Simulate AI + on-chain scan (replace with real API call later)
    const analysis = await analyzeConversation(
        ('text' in userMessage ? userMessage.text : '') || 'Screenshot received'
    );

    const isDangerous = analysis.score < 40;

    if (isDangerous) {
        await ctx.replyWithHTML(`
⚠️ <b>SHIELD BREACHED</b> ⚠️

<b>ACTIVE SCAM DETECTED</b>
Type: ${analysis.type}

${analysis.reasons.map(r => `• ${r}`).join('\n')}

<b>IMMEDIATE ACTION:</b>
• DO NOT click any links
• DO NOT send crypto
• Block this user NOW

<a href="https://aezos.xyz/mark?proof=${analysis.proofHash}">Lightning Mark this Scammer →</a>
    `);
    } else {
        await ctx.replyWithHTML(`
🛡️ <b>DEFENSE SECURE</b> 🛡️

Zeus approves this conversation.
Safety Score: <b>${analysis.score}/100</b>

You are safe to engage.
    `);
    }
});

// Mock analysis function (replace with real Grok API + Solana check)
async function analyzeConversation(text: string) {
    // In real MVP you would call your backend API here
    await new Promise(r => setTimeout(r, 1200));

    const isScam = text.toLowerCase().includes('send sol') ||
        text.toLowerCase().includes('double your') ||
        text.toLowerCase().includes('babe our son');

    return {
        score: isScam ? 12 : 94,
        type: isScam ? 'Pig-Butchering + Urgency Hook' : 'Clean',
        reasons: isScam
            ? ['Emotional manipulation', 'Urgency pressure', 'Crypto transfer request']
            : ['No known scam patterns detected'],
        proofHash: 'AEZOS' + Date.now().toString(36)
    };
}

bot.launch();
console.log('✅ AEZOS Bot is running. Zeus is watching.');

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
