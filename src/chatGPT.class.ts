import { type ChatGPTAPI } from 'chatgpt'

export class ChatGPTClass {
  private instance: ChatGPTAPI

  getApi = async () => {
    if (this.instance) return this.instance
    const apiKey = process.env.CHATGPT_API_KEY
    const { ChatGPTAPI } = await (eval("import('chatgpt')") as Promise<typeof import('chatgpt')>)
    if (!apiKey) throw new Error('ChatGPT API key is not provided or invalid! ')
    return new ChatGPTAPI({ apiKey })
  }
}
