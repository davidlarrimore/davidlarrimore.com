import { Metadata } from 'next'
import Chat from '@/components/features/Chat'

export const metadata: Metadata = {
  title: 'AI Chat | My Personal Website',
  description: 'Chat with an AI assistant powered by Claude',
}

export default function ChatPage() {
  return (
    <main className="flex flex-col items-center py-12 px-4 min-h-screen">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-2 text-center">AI Chat Assistant</h1>
        <p className="text-gray-600 mb-8 text-center">
          Ask questions, get information, or have a conversation with my AI assistant powered by Claude
        </p>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Chat />
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">About This Chat</h2>
          <p className="mb-3">
            This chatbot is powered by Anthropic's Claude API. It can help you with:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Questions about web development</li>
            <li>Explaining technical concepts</li>
            <li>Creative writing assistance</li>
            <li>Learning about my projects and experience</li>
            <li>General knowledge questions</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            Your conversations are stored in my database to improve the assistant's responses.
            No personal information is shared with third parties.
          </p>
        </div>
      </div>
    </main>
  )
}