import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Format messages for OpenAI API
    const formattedMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }));

    // Create a conversation in the database
    const conversation = await db.conversation.create({
      data: {
        messages: {
          create: messages.map((msg: { role: string; content: string }, index: number) => ({
            role: msg.role,
            content: msg.content,
            order: index,
          })),
        },
      },
    });

    // Get response from ChatGPT
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // You can change to "gpt-3.5-turbo" for a less expensive option
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    const chatGptResponse = response.choices[0].message.content || "Sorry, I couldn't generate a response.";

    // Update the conversation with the response
    await db.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        response: chatGptResponse,
        messages: {
          create: {
            role: 'assistant',
            content: chatGptResponse,
            order: messages.length,
          },
        },
      },
    });

    return NextResponse.json({ response: chatGptResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}