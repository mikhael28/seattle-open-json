import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "./ui/button";
import { Menu, Bot } from "lucide-react";
import ChatAssistant from "./ChatAssistant";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  const assistantContext = location.pathname === "/permitting"
    ? "User is currently going through ADU planning modules in Seattle"
    : undefined;

  return (
    <>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <header className="flex h-16 items-center gap-4 border-b bg-card px-6 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Seattle Open JSON</h1>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className="w-[min(420px,calc(100vw-3rem))] h-[min(600px,calc(100vh-8rem))] rounded-2xl shadow-2xl border border-border bg-background overflow-hidden">
            <ChatAssistant
              context={assistantContext}
              onClose={() => setIsChatOpen(false)}
            />
          </div>
        )}
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          aria-label="Toggle chat assistant"
          onClick={() => setIsChatOpen((prev) => !prev)}
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
};

export default Layout;
