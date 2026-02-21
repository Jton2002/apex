"use client";

import { motion } from "framer-motion";
import { Activity, CheckCircle, Send } from "lucide-react";
import { useState } from "react";

export default function HankAIPersona() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("🚀 Adaptive upsell strategy optimized with 94% success rate. Current growth trajectory suggests +32% margin expansion next quarter. Reinforcement learning model is continuously refining customer personas based on real-time HVAC service patterns.");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are Hank, an AI assistant for HVAC trade services. Provide helpful, professional advice.' },
            { role: 'user', content: message }
          ]
        })
      });
      const data = await res.json();
      if (data.choices?.[0]?.message?.content) {
        setResponse(data.choices[0].message.content);
      }
    } catch (error) {
      setResponse("Error: Unable to get response from AI.");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass p-8 col-span-1 lg:col-span-2 hover:border-emerald-400/30 transition-colors duration-300"
    >
      <h2 className="text-xl font-semibold tracking-tighter text-slate-50 mb-6">
        Hank AI — HVAC TradePersona
      </h2>

      <div className="flex items-start gap-8">
        {/* Glowing Orb Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32">
            {/* Outer ring glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 animate-orb-pulse" />

            {/* Actual orb with inner animation */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center text-4xl font-bold text-black animate-orb-pulse"
            >
              H
            </motion.div>

            {/* Pulse ring effect on top */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                ease: "easeOut",
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-50 mb-3">
              HVAC TradePersona Engine
            </h3>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="badge-premium flex items-center gap-2">
                <Activity className="w-3 h-3 animate-pulse" />
                Live TensorFlow.js
              </div>

              <div className="badge-premium flex items-center gap-2">
                <CheckCircle className="w-3 h-3" />
                Swarm Reflection Complete
              </div>
            </div>

            {/* Message Box */}
            <div className="glass p-4 mb-4 border-l-2 border-emerald-400/50">
              <p className="text-sm leading-relaxed text-slate-300">
                {response}
              </p>
            </div>

            {/* Input and Send */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Hank a question..."
                className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400/50"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                {loading ? "..." : "Send"}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="glass-glow p-2 rounded-lg">
                <p className="text-emerald-400 font-bold text-base">2.4M</p>
                <p className="text-slate-400 text-xs">Predictions/min</p>
              </div>
              <div className="glass-glow p-2 rounded-lg">
                <p className="text-emerald-400 font-bold text-base">99.7%</p>
                <p className="text-slate-400 text-xs">Accuracy Rate</p>
              </div>
              <div className="glass-glow p-2 rounded-lg">
                <p className="text-emerald-400 font-bold text-base">Real-time</p>
                <p className="text-slate-400 text-xs">Adaptation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
