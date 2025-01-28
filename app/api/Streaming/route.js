import { OpenAIStream, StreamingTextResponse } from "ai"
import { Configuration, OpenAIApi } from "openai-edge"

import { auth } from "@/auth"
import { nanoid } from "@/lib/utils"

export const runtime = "edge"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req) {
  const json = await req.json()
  const { messages, previewToken } = json

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo", // "gpt-4"
    messages,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res, {
    // This function is called when the API returns a response
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: "assistant"
          }
        ]
      }
      console.log(payload)
      // Here you can store the chat in database
      // ...
    }
  })

  return new StreamingTextResponse(stream)
}