import { useState } from 'react';
import { Search, Send, User, Users, Paperclip, Check } from 'lucide-react';

// Helper function to generate dates
const generateDate = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
};

// Format date helper
const formatDate = (date) => {
    const today = new Date();
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }

    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
        return weekDays[date.getDay()];
    }

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Mock Users Data
const mockUsers = [
    { id: 1, name: "Emma Thompson", type: "user" },
    { id: 2, name: "James Wilson", type: "user" },
    { id: 3, name: "Project Team", type: "group", members: ["Sarah Parker", "Michael Brown", "Lisa Anderson"] },
    { id: 4, name: "Oliver Davis", type: "user" },
    { id: 5, name: "Marketing Team", type: "group", members: ["John Smith", "Emily White", "David Clark"] },
    { id: 6, name: "Sophie Turner", type: "user" },
    { id: 7, name: "William Brown", type: "user" },
    { id: 8, name: "Isabella Martinez", type: "user" },
    { id: 9, name: "Lucas Anderson", type: "user" },
    { id: 10, name: "Olivia Taylor", type: "user" },
    { id: 11, name: "Ethan Wright", type: "user" },
    { id: 12, name: "Ava Johnson", type: "user" },
    { id: 13, name: "Noah Garcia", type: "user" },
    { id: 14, name: "Mia Robinson", type: "user" },
    { id: 15, name: "Liam Thomas", type: "user" },
    { id: 16, name: "Charlotte Lee", type: "user" },
    { id: 17, name: "Henry Clark", type: "user" },
    { id: 18, name: "Amelia White", type: "user" },
    { id: 19, name: "Benjamin King", type: "user" },
    { id: 20, name: "Sofia Rodriguez", type: "user" },
];

// Generate mock messages
const generateMockMessages = (userId, isGroup = false) => {
    const messages = [];
    const messageCount = isGroup ? 10 : 100;
    const senders = isGroup ? ["Sarah Parker", "Michael Brown", "Lisa Anderson"] : [null];

    for (let i = 0; i < messageCount; i++) {
        const daysAgo = Math.floor(i / 10);
        const date = generateDate(daysAgo);
        const hour = Math.floor(Math.random() * 12) + 1;
        const minute = Math.floor(Math.random() * 60);
        const ampm = Math.random() < 0.5 ? 'AM' : 'PM';

        messages.push({
            id: i,
            text: `Message ${i + 1} - ${isGroup ? 'Group' : 'Personal'} chat message example`,
            sent: Math.random() < 0.5,
            timestamp: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`,
            date: date,
            sender: isGroup ? senders[Math.floor(Math.random() * senders.length)] : null
        });
    }

    return messages;
};

// Login Component
const Login = ({ onLogin }) => {
    const [selectedUser, setSelectedUser] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Chat App Login</h1>
                <div className="mb-4">
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select a user</option>
                        {mockUsers.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={() => selectedUser && onLogin(mockUsers.find(u => u.id === parseInt(selectedUser)))}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    disabled={!selectedUser}
                >
                    Login
                </button>
            </div>
        </div>
    );
};


// Header Component
const Header = ({ loggedUser, onLogout }) => (
    <div className="bg-white border-b px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-3">
            {/* <img
                src={loggedUser.profileImage}
                alt={loggedUser.name}
                className="w-8 h-8 rounded-full"
            /> */}
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
            </div>
            <span className="font-medium">{loggedUser.name}</span>
        </div>
        <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-1 text-gray-600 hover:text-gray-800"
        >

            Logout
        </button>
    </div>
);

// ConversationHeader Component
const ConversationHeader = ({ activeContact }) => (
    <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        {/* <img
            src={activeContact.profileImage}
            alt={activeContact.name}
            className="w-10 h-10 rounded-full"
        /> */}

        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
        </div>
        <div>
            <h2 className="font-medium">{activeContact.name}</h2>
            <span className="text-sm">
                {activeContact.online ? (
                    <span className="text-green-500">● Online</span>
                ) : (
                    <span className="text-gray-500">● Offline</span>
                )}
            </span>
        </div>
    </div>
);

// ComponentItem Component
const ContactItem = ({ contact, isActive, onClick, lastMessage }) => (
    <div
        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-100' : ''
            }`}
        onClick={onClick}
    >
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            {contact.type === 'group' ? (
                <Users className="w-6 h-6 text-gray-600" />
            ) : (
                <User className="w-6 h-6 text-gray-600" />
            )}
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{contact.name}</h3>
            <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
        </div>
    </div>
);

// MessageBubble Component
const MessageBubble = ({ message, isGroup }) => (
    <div className={`flex ${message.sent ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className="max-w-[70%]">
            {isGroup && !message.sent && (
                <div className="text-sm text-gray-600 mb-1">{message.sender}</div>
            )}
            <div className={`relative p-3 rounded-lg ${message.sent ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}>
                {message.text}
                <div className={`text-xs mt-1 flex items-center justify-end gap-1 ${message.sent ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                    {message.timestamp}
                    {message.sent && (
                        <div className="flex">
                            <Check className="w-3 h-3" />
                            <Check className="w-3 h-3 -ml-1" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

// DateDivider Component
const DateDivider = ({ date }) => (
    <div className="flex items-center justify-center my-4">
        <div className="bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-sm">
            {formatDate(date)}
        </div>
    </div>
);

// ChatInput Component
const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <div className="flex gap-2 p-3 border-t">
            <button className="text-gray-500 hover:text-gray-700">
                <Paperclip className="w-5 h-5" />
            </button>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
                onClick={handleSend}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                <Send className="w-5 h-5" />
            </button>
        </div>
    );
};

// Main ChatApp Component
const ChatApp = () => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [activeContact, setActiveContact] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    // Generate messages for each contact
    const allMessages = mockUsers.reduce((acc, user) => {
        acc[user.id] = generateMockMessages(user.id, user.type === 'group');
        return acc;
    }, {});

    const [messages, setMessages] = useState(allMessages);

    const filteredContacts = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        user.id !== loggedUser?.id
    );

    if (!loggedUser) {
        return <Login onLogin={setLoggedUser} />;
    }

    const handleSend = (message) => {
        const newMessage = {
            id: messages[mockUsers[activeContact].id].length,
            text: message,
            sent: true,
            timestamp: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
            date: new Date(),
        };

        setMessages(prev => ({
            ...prev,
            [mockUsers[activeContact].id]: [...prev[mockUsers[activeContact].id], newMessage]
        }));
    };

    const groupMessagesByDate = (messages) => {
        const grouped = {};
        messages.forEach(message => {
            const dateKey = message.date.toDateString();
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(message);
        });
        return grouped;
    };

    return (
        <div className="h-screen flex flex-col bg-white">
            <Header loggedUser={loggedUser} onLogout={() => setLoggedUser(null)} />

            <div className="flex h-screen bg-white">
                <div className="w-1/3 border-r flex flex-col">
                    <div className="p-3 border-b">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                            />
                            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {mockUsers.map((contact, index) => (
                            <ContactItem
                                key={contact.id}
                                contact={contact}
                                isActive={index === activeContact}
                                onClick={() => setActiveContact(index)}
                                lastMessage={messages[contact.id][messages[contact.id].length - 1].text}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <ConversationHeader activeContact={filteredContacts[activeContact]} />
                    <div className="flex-1 overflow-y-auto p-4">
                        {Object.entries(groupMessagesByDate(messages[mockUsers[activeContact].id]))
                            .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                            .map(([date, dateMessages]) => (
                                <div key={date}>
                                    <DateDivider date={new Date(date)} />
                                    {dateMessages.map((message) => (
                                        <MessageBubble
                                            key={message.id}
                                            message={message}
                                            isGroup={mockUsers[activeContact].type === 'group'}
                                        />
                                    ))}
                                </div>
                            ))}
                    </div>
                    <ChatInput onSend={handleSend} />
                </div>
            </div>
        </div>

    );
};

export default ChatApp;