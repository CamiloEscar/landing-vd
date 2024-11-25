export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface ChatbotState {
  isReady: boolean;
  context: string[];

  learningData: { [key: string]: number };
}

export interface Action {
  type: string;
  payload: any;
}

