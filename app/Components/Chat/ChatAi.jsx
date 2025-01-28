// 'use client';

// import { useState } from 'react';

// export default function ChatAi() {
//   const [messages, setMessages] = useState([]); // لتخزين الرسائل
//   const [input, setInput] = useState(''); // المدخل الحالي
//   const [loading, setLoading] = useState(false); // حالة التحميل

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessage = { role: 'user', content: input };
//     setMessages((prev) => [...prev, newMessage]); // أضف الرسالة الجديدة إلى القائمة
//     setInput('');
//     setLoading(true);

//     try {
//       const response = await fetch('/api/Streaming', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ messages: [...messages, newMessage] }),
//       });

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder('utf-8');
//       let chunk = '';

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         chunk += decoder.decode(value);
//         setMessages((prev) => [
//           ...prev,
//           { role: 'assistant', content: chunk }, // أضف الرد تدريجيًا
//         ]);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="chat-container bg-gray-100 p-4 rounded-lg shadow-lg max-w-xl mx-auto">
//       <div className="messages overflow-y-auto h-96 mb-4 p-2 border border-gray-300 rounded-md">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message  ${msg.role}`}>
//             {msg.content}
//           </div>
//         ))}
//       </div>
//       <div className="input-container flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="اكتب رسالتك هنا..."
//           className='flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
//         />
//         <button onClick={sendMessage} disabled={loading} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300'>
//           {loading ? 'جاري الإرسال...' : 'إرسال'}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from 'react';

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        const data = await res.json();
        setResponse(data.choices[0].text);
    };

    return (
        <div>
            <div>{response}</div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}