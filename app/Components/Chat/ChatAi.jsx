// "use client";

// import { useState } from "react";

// export default function ChatAi() {
//     const [query, setQuery] = useState("");
//     const [response, setResponse] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const handleChat = async () => {
//         if (!query) return;
//         setIsLoading(true);
//         setResponse(""); // مسح الرد السابق

//         try {
//             const res = await fetch(`/api/Streaming`, {
//                 method: "POST",
//                 body: JSON.stringify({ query }),
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });

//             if (!res.body) throw new Error("فشل الاتصال بالسيرفر");

//             // استقبال البيانات كسلسلة مستمرة
//             const reader = res.body.getReader();
//             const decoder = new TextDecoder();
//             let fullResponse = "";

//             while (true) {
//                 const { done, value } = await reader.read();
//                 if (done) break;
//                 const chunk = decoder.decode(value, { stream: true });
//                 fullResponse += chunk;
//                 setResponse((prev) => prev + chunk); // تحديث الرد مباشرة
//             }
//         } catch (error) {
//             setResponse("حدث خطأ أثناء المعالجة");
//         }
//         setIsLoading(false);
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="اسأل الذكاء الاصطناعي عن الأفلام..."
//                 className="p-2 border rounded"
//             />
//             <button
//                 onClick={handleChat}
//                 className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
//                 disabled={isLoading}
//             >
//                 {isLoading ? "جاري البحث..." : "اسأل الذكاء الاصطناعي"}
//             </button>
//             {response && <p className="text-gray-800 whitespace-pre-line">{response}</p>}
//         </div>
//     );
// }
