"use server";

export async function gerarAbordagens(leadsRaw: string) {
  const apiKey = process.env.GROQ_API_KEY;
  const leads = leadsRaw.split('\n').filter(l => l.trim() !== "");

  // Alterado para retornar um código de erro específico
  if (leads.length > 3) {
    return { error: "LIMIT_REACHED" };
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
            content: "Você é um mestre em vendas. Gere abordagens personalizadas curtas, diretas e matadoras para cada lead enviado."
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
    return { error: "Erro na conexão com a IA." };
  }
}
