// import OpenAI from "openai";

// export const runtime = "edge"; // تحسين الأداء على Next.js

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req) {
//   try {
//     const { query } = await req.json();

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role:"system", content: "You are a helpful assistant." }, , { role: "user", content: query }],
//       stream: true, // ✅ تفعيل الـ Streaming
//     });

//     // إرجاع الاستجابة كسلسلة من البيانات
//     return new Response(response.toStream(), {
//       headers: { "Content-Type": "text/event-stream" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
