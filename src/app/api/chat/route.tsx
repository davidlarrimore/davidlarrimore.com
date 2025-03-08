import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';
import Anthropic from '@anthropic-ai/sdk';

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Format messages for Anthropic API
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

    // Get response from Claude
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",  // You can change to other Claude models as needed
      max_tokens: 1024,
      messages: formattedMessages,
      temperature: 0.7,
    });

  // Extract the response text from Claude
  let claudeResponse = "Sorry, I couldn't generate a response.";

  if (response.content && response.content.length > 0) {
    // Check if the content has a text property (current API format)
    if ('text' in response.content[0]) {
      claudeResponse = response.content[0].text;
    } 
    // Fallback for potential different response formats
    else if (typeof response.content[0] === 'string') {
      claudeResponse = response.content[0];
    }
  }

    // Update the conversation with the response
    await db.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        response: claudeResponse,
        messages: {
          create: {
            role: 'assistant',
            content: claudeResponse,
            order: messages.length,
          },
        },
      },
    });

    return NextResponse.json({ response: claudeResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}