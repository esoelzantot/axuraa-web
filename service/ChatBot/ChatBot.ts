export interface ChatBotRequest {
  question: string;
  lang?: string;
}

export interface ChatBotResponse {
  status: string;
  answer: string;
  lang: string;
}

export const askChatBot = async (question: string, lang: string = 'en'): Promise<ChatBotResponse> => {
  try {
    console.log('Sending request:', { question, lang });
    
    const response = await fetch(`https://back-end-axuraa.fly.dev/api/v1/bot?lang=${lang}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question.trim(),
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data: ChatBotResponse = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error calling ChatBot API:', error);
    throw error;
  }
};