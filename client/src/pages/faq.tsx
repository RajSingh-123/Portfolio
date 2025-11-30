import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Mail, Check, AlertCircle } from "lucide-react";
import Fuse from "fuse.js";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import faqData from "@/data/faq.json";
import { personalInfo } from "@/data/portfolio";
import { toast } from "sonner";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function FAQ() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "Hey! 👋 I'm Raj's FAQ assistant. Ask me anything about relocations, experience, skills, or career goals. Type your question or browse the common questions below!",
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (query: string): string | null => {
    if (!query.trim()) return null;

    // Use Fuse.js for fuzzy searching on questions
    const fuse = new Fuse(faqData, {
      keys: ["question"],
      threshold: 0.3, // Match if 70% similar
      minMatchCharLength: 2,
    });

    const results = fuse.search(query);
    
    // If we found a match with good score, return it
    if (results.length > 0) {
      return results[0].item.answer;
    }

    return null;
  };

  const handleSubmitQuestion = () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(userInput);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: answer
          ? answer
          : `Great question! I couldn't find a direct answer in my database, but I'd love for Raj to respond personally. Click the "Ask Directly" button below to send this question via email.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 600);
  };

  const handleQuickQuestion = (question: string) => {
    setUserInput(question);
  };

  const handleAskDirectly = () => {
    if (!personalInfo.email) {
      toast.error("Email address not configured. Please use the contact form instead.");
      return;
    }

    const subject = encodeURIComponent("Question about your Data Analytics career");
    const body = encodeURIComponent(
      `Hi Raj,\n\nI have a question: ${userInput || "[Your question here]"}\n\nLooking forward to hearing from you!\n\nBest regards`
    );
    
    // Open Gmail compose
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
    
    // Show confirmation toast
    toast.success("Opening Gmail with your message ready to send!");
  };

  const quickQuestions = [
    "Are you open to relocation?",
    "What are your salary expectations?",
    "Can I see sample code?",
    "What are your core technical skills?",
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageCircle size={32} className="text-primary" />
              <h1 className="text-4xl font-heading font-bold">FAQ Chatbot</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ask me anything! I'm here to answer your questions about Raj's background, skills, and career aspirations. Can't find what you're looking for? Ask directly via email.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Chat Area */}
            <div className="md:col-span-2">
              <div className="bg-card border rounded-lg shadow-lg flex flex-col h-[600px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-muted text-foreground rounded-bl-none border border-border"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted border border-border px-4 py-3 rounded-lg rounded-bl-none">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t p-4 bg-background">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSubmitQuestion()
                      }
                      placeholder="Ask your question..."
                      className="flex-1 bg-muted border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="input-faq-question"
                    />
                    <Button
                      onClick={handleSubmitQuestion}
                      disabled={!userInput.trim() || isLoading}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      data-testid="button-send-question"
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAskDirectly}
                      className="w-full text-xs"
                      data-testid="button-ask-directly"
                    >
                      <Mail size={14} className="mr-1" />
                      Ask Directly via Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Questions Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-card border rounded-lg p-6 shadow-lg sticky top-24">
                <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <MessageCircle size={16} className="text-primary" />
                  Quick Questions
                </h3>
                <div className="space-y-2">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        handleQuickQuestion(q);
                        handleSubmitQuestion();
                      }}
                      className="w-full text-left text-xs p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors border border-border hover:border-primary text-foreground hover:text-primary"
                      data-testid={`button-quick-faq-${idx}`}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* All FAQs List */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-sm mb-3">All FAQs</h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {faqData.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => {
                          handleQuickQuestion(faq.question);
                          handleSubmitQuestion();
                        }}
                        className="w-full text-left text-xs p-2 rounded bg-background hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
                        data-testid={`button-faq-item-${faq.id}`}
                      >
                        <span className="text-primary font-semibold">Q{faq.id}:</span> {faq.question}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
                  <p>Can't find what you need?</p>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline font-medium"
                    data-testid="link-email-contact"
                  >
                    <Mail size={14} />
                    Email Raj directly
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
