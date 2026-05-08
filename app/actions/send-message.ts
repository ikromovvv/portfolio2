"use server"

export async function sendMessageToTelegram(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const username = formData.get("username") as string // Added username field
    const message = formData.get("message") as string

    console.log("[v0] Form submission received:", { name, email, phone, username, messageLength: message.length })

    // Telegram bot configuration
        const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    console.log("[v0] Environment variables check:", {
        hasBotToken: !!botToken,
        hasChatId: !!chatId,
        botTokenLength: botToken?.length || 0,
        chatIdValue: chatId || "not set",
    })

    if (!botToken || !chatId) {
        console.error("[v0] Missing environment variables!")
        return {
            success: false,
            error: "Telegram bot sozlanmagan! Sidebar → Vars bo'limidan TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID qo'shing.",
        }
    }

    if (!botToken.includes(":")) {
        console.error("[v0] Invalid bot token format!")
        return {
            success: false,
            error: "Bot token noto'g'ri formatda! Token '123456:ABC...' ko'rinishida bo'lishi kerak.",
        }
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 New Contact Form Submission

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
💬 Telegram: ${username}

💬 Message:
${message}
  `.trim()

    console.log("[v0] Sending message to Telegram...")
    console.log("[v0] API URL:", `https://api.telegram.org/bot${botToken.substring(0, 10)}...`)

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: telegramMessage,
            }),
        })

        const data = await response.json()

        console.log("[v0] Telegram API response:", { ok: response.ok, status: response.status, data })

        if (!response.ok) {
            console.error("[v0] Telegram API error:", data)

            let errorMessage = "Xabar yuborilmadi"

            if (data.description?.includes("bot was blocked")) {
                errorMessage = "Bot bloklangan! Telegram da botga /start yuboring."
            } else if (data.description?.includes("chat not found")) {
                errorMessage = "Chat ID noto'g'ri! @userinfobot dan to'g'ri Chat ID ni oling."
            } else if (data.description?.includes("Unauthorized")) {
                errorMessage = "Bot token noto'g'ri! BotFather dan to'g'ri token oling."
            } else if (data.description) {
                errorMessage = data.description
            }

            return {
                success: false,
                error: `Telegram xatolik: ${errorMessage}`,
            }
        }

        console.log("[v0] Message sent successfully!")
        return {
            success: true,
            message: "Xabar muvaffaqiyatli yuborildi! ✅",
        }
    } catch (error) {
        console.error("[v0] Error sending message to Telegram:", error)
        return {
            success: false,
            error: "Xatolik yuz berdi. Internet aloqangizni tekshiring va qaytadan urinib ko'ring.",
        }
    }
}
