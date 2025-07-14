# Sedona AI Chat System - Component Plan

## 🎯 Overview
Based on the Figma designs at `node-id=769:100`, we need to build a comprehensive chat system for AI agent interactions with multiple interface variations.

## 📋 Component Analysis from Figma

### 1. **Chat Interface Variations**
- **Dark Theme Panels** (8 variations shown)
- **Light Theme Panels** (3 variations shown) 
- **Embedded Chat Widget**
- **Full-Screen Chat Interface**

### 2. **Core Components Identified**

#### **Chat Container** (`ChatContainer`)
- Main wrapper for all chat interfaces
- Supports multiple themes (dark/light)
- Flexible sizing (widget, panel, fullscreen)
- Border radius and shadow styling

#### **Chat Header** (`ChatHeader`)
- Agent information display
- Status indicators (online/offline)
- Action buttons (minimize, close, settings)
- Theme toggle functionality

#### **Message List** (`MessageList`)
- Scrollable message container
- Auto-scroll to latest message
- Message grouping by sender
- Timestamp display options

#### **Message Bubble** (`MessageBubble`)
- User vs AI message styling
- Different bubble styles (rounded, minimal)
- Support for rich content (text, code, attachments)
- Status indicators (sending, sent, error)

#### **Chat Input** (`ChatInput`)
- Multi-line text input
- Send button with states
- Attachment support
- Keyboard shortcuts (Enter to send)
- Character/token counters

#### **Agent Avatar** (`AgentAvatar`)
- Circular avatar with status indicator
- Fallback to initials
- Online/offline states
- Typing indicators

#### **Typing Indicator** (`TypingIndicator`)
- Animated dots for AI thinking
- "Agent is typing..." text
- Fade in/out animations

#### **Chat Sidebar** (`ChatSidebar`)
- Recent conversations list
- Agent selection
- Search functionality
- Conversation management

#### **Message Actions** (`MessageActions`)
- Copy message content
- Regenerate response
- Rate message (thumbs up/down)
- Report/flag content

## 🏗️ Component Architecture

### **Base Components**
```
src/components/chat/
├── base/
│   ├── ChatContainer.tsx       # Main container
│   ├── ChatHeader.tsx         # Header with agent info
│   ├── ChatSidebar.tsx        # Conversation sidebar
│   └── ChatLayout.tsx         # Layout wrapper
├── messages/
│   ├── MessageList.tsx        # Message container
│   ├── MessageBubble.tsx      # Individual message
│   ├── MessageActions.tsx     # Message action buttons
│   └── TypingIndicator.tsx    # AI typing animation
├── input/
│   ├── ChatInput.tsx          # Message input field
│   ├── SendButton.tsx         # Send button component
│   └── AttachmentButton.tsx   # File attachment
├── agents/
│   ├── AgentAvatar.tsx        # Agent profile picture
│   ├── AgentStatus.tsx        # Online/offline indicator
│   └── AgentInfo.tsx          # Agent details display
└── widgets/
    ├── ChatWidget.tsx         # Embeddable widget
    ├── ChatPanel.tsx          # Side panel version
    └── ChatFullscreen.tsx     # Full-screen interface
```

### **Composite Components**
```
src/components/chat/
├── ChatInterface.tsx          # Complete chat interface
├── AgentChat.tsx             # Agent-specific chat
├── MultiAgentChat.tsx        # Multiple agent support
└── index.ts                  # Export all components
```

## 🎨 Design System Integration

### **Typography**
- **Message Text**: `text-caption-l` (14px) for readability
- **Timestamps**: `text-caption-s` (10px) for metadata
- **Agent Names**: `text-caption-m` (12px) with font-semibold
- **Input Text**: `text-caption-l` (14px) for consistency

### **Colors** (Zeus Theme)
- **User Messages**: `bg-zeus-accent-blue` with `text-zeus-text-primary`
- **AI Messages**: `bg-zeus-surface-neutral` with `text-zeus-text-primary`
- **Input Background**: `bg-zeus-surface-neutral-subtle`
- **Borders**: `border-zeus-border-alpha`
- **Hover States**: `hover:bg-zeus-surface-neutral`

### **Spacing & Layout**
- **Message Padding**: `px-3 py-2` for content
- **Message Gaps**: `gap-3` between messages
- **Avatar Size**: `w-8 h-8` (32px) consistent with design
- **Border Radius**: `rounded-lg` for modern look

## 🔧 Technical Requirements

### **State Management**
```typescript
interface ChatState {
  messages: Message[]
  activeAgent: Agent | null
  isTyping: boolean
  inputValue: string
  conversations: Conversation[]
  theme: 'light' | 'dark'
}

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
  status: 'sending' | 'sent' | 'error'
  agentId?: string
}

interface Agent {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'offline'
  description?: string
}
```

### **Core Features**
1. **Real-time messaging** with WebSocket support
2. **Message persistence** and conversation history
3. **Multi-agent switching** within same chat
4. **Rich text support** (markdown, code blocks)
5. **File attachments** (images, documents)
6. **Keyboard shortcuts** (Enter to send, Shift+Enter for newline)
7. **Theme switching** (light/dark modes)
8. **Responsive design** (mobile, tablet, desktop)

### **Accessibility**
- **ARIA labels** for all interactive elements
- **Keyboard navigation** throughout interface
- **Screen reader support** for message content
- **Focus management** for modal states
- **High contrast** support in both themes

## 🚀 Implementation Phases

### **Phase 1: Core Components (Week 1)**
- [ ] ChatContainer with theme support
- [ ] MessageBubble with user/AI variants
- [ ] ChatInput with send functionality
- [ ] AgentAvatar with status indicators

### **Phase 2: Advanced Features (Week 2)**
- [ ] MessageList with virtualization
- [ ] TypingIndicator with animations
- [ ] ChatHeader with agent info
- [ ] MessageActions (copy, regenerate)

### **Phase 3: Layout Variants (Week 3)**
- [ ] ChatWidget for embedding
- [ ] ChatPanel for sidebar
- [ ] ChatFullscreen for dedicated view
- [ ] ChatSidebar for conversation management

### **Phase 4: Integration & Polish (Week 4)**
- [ ] WebSocket integration
- [ ] Message persistence
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Mobile responsiveness

## 🎯 Success Criteria

### **Functional Requirements**
✅ **Message Exchange**: Users can send/receive messages with AI agents
✅ **Multi-Agent Support**: Switch between different AI agents seamlessly
✅ **Conversation History**: Access previous conversations and messages
✅ **Real-time Updates**: Live message delivery and typing indicators
✅ **Theme Consistency**: Perfect integration with Zeus design system

### **Performance Requirements**
✅ **Fast Rendering**: <100ms message bubble render time
✅ **Smooth Scrolling**: 60fps scroll performance with long conversations
✅ **Memory Efficient**: Virtualized message list for 1000+ messages
✅ **Network Optimized**: Minimal WebSocket payload size

### **User Experience Requirements**
✅ **Intuitive Navigation**: Clear visual hierarchy and interaction patterns
✅ **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
✅ **Accessibility**: WCAG 2.1 AA compliance
✅ **Error Handling**: Graceful handling of network/API failures

## 🔄 Integration Points

### **API Endpoints**
```typescript
// Message Management
POST /api/chat/send          // Send new message
GET  /api/chat/history/:id   // Get conversation history
PUT  /api/chat/message/:id   // Update message status

// Agent Management  
GET  /api/agents             // List available agents
GET  /api/agents/:id         // Get agent details
POST /api/agents/:id/chat    // Start chat with agent

// WebSocket Events
'message:send'     // User sends message
'message:receive'  // AI response received
'agent:typing'     // Agent typing indicator
'agent:status'     // Agent online/offline
```

### **Component Props API**
```typescript
// Main Chat Interface
<ChatInterface
  agentId="agent-123"
  theme="dark"
  variant="panel"
  onMessageSend={(message) => {}}
  onAgentSwitch={(agentId) => {}}
/>

// Embeddable Widget
<ChatWidget
  position="bottom-right"
  minimized={false}
  agentIds={['agent-1', 'agent-2']}
/>
```

This comprehensive plan ensures we build a robust, scalable chat system that matches the Figma designs while maintaining the modular, extensible architecture of our design system.