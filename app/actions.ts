"use server";

export async function gerarAbordagens(leadsRaw: string) {
  const apiKey = process.env.GROQ_API_KEY;
  const leads = leadsRaw.split('\n').filter(l => l.trim() !== "");

  if (leads.length > 3) {
    return { error: "⚠️ Limite grátis: 3 leads por vez. Assine o Pro para listas ilimitadas!" };
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Você é um especialista em vendas. Gere abordagens personalizadas curtas para cada lead enviado. Seja persuasivo e profissional."
          },
          {
            role: "user",
            content: `Leads: ${leads.join(", ")}`
          }
        ]
      }),
    });

    const data = await response.json();
    return { data: data.choices[0].message.content };
  } catch (e) {
    return { error: "Erro técnico na IA. Verifique as chaves na Vercel." };
  }
}
