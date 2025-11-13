import React from "react";
import { WorkerAnimationType } from "../types/ticket-tracker";

interface CityWorkerAnimationProps {
  type: WorkerAnimationType;
  isActive?: boolean;
}

const CityWorkerAnimation: React.FC<CityWorkerAnimationProps> = ({ type, isActive = false }) => {
  const renderWorker = () => {
    switch (type) {
      case "receiving":
        return <ReceivingWorker isActive={isActive} />;
      case "reviewing":
        return <ReviewingWorker isActive={isActive} />;
      case "shoveling":
        return <ShovelingWorker isActive={isActive} />;
      case "painting":
        return <PaintingWorker isActive={isActive} />;
      case "climbing":
        return <ClimbingWorker isActive={isActive} />;
      case "pruning":
        return <PruningWorker isActive={isActive} />;
      case "inspecting":
        return <InspectingWorker isActive={isActive} />;
      case "celebrating":
        return <CelebratingWorker isActive={isActive} />;
      default:
        return <ReceivingWorker isActive={isActive} />;
    }
  };

  return (
    <div className={`transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      {renderWorker()}
    </div>
  );
};

// Receiving Worker - Office worker at desk
const ReceivingWorker: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Desk */}
      <rect x="20" y="60" width="60" height="8" fill="#8B4513" rx="2" />
      
      {/* Computer */}
      <rect x="35" y="48" width="30" height="20" fill="#4B5563" rx="2" />
      <rect x="37" y="50" width="26" height="16" fill={isActive ? "#3B82F6" : "#6B7280"} rx="1">
        {isActive && (
          <animate attributeName="fill" values="#3B82F6;#60A5FA;#3B82F6" dur="2s" repeatCount="indefinite" />
        )}
      </rect>
      
      {/* Person - Head */}
      <circle cx="50" cy="35" r="8" fill="#FCD34D" />
      
      {/* Person - Body */}
      <rect x="44" y="42" width="12" height="18" fill="#3B82F6" rx="2" />
      
      {/* Arms typing */}
      <g className={isActive ? "animate-pulse" : ""}>
        <line x1="44" y1="48" x2="38" y2="55" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
        <line x1="56" y1="48" x2="62" y2="55" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

// Reviewing Worker - Manager with clipboard
const ReviewingWorker: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Person - Head */}
      <circle cx="50" cy="30" r="10" fill="#FCD34D" />
      
      {/* Person - Body */}
      <rect x="42" y="39" width="16" height="25" fill="#10B981" rx="2" />
      
      {/* Legs */}
      <rect x="44" y="63" width="5" height="20" fill="#6B7280" rx="2" />
      <rect x="51" y="63" width="5" height="20" fill="#6B7280" rx="2" />
      
      {/* Clipboard */}
      <g className={isActive ? "animate-bounce" : ""}>
        <rect x="28" y="42" width="12" height="16" fill="#F3F4F6" stroke="#374151" strokeWidth="1" rx="1" />
        <line x1="30" y1="46" x2="38" y2="46" stroke="#374151" strokeWidth="0.5" />
        <line x1="30" y1="49" x2="38" y2="49" stroke="#374151" strokeWidth="0.5" />
        <line x1="30" y1="52" x2="38" y2="52" stroke="#374151" strokeWidth="0.5" />
      </g>
      
      {/* Arm holding clipboard */}
      <line x1="42" y1="45" x2="34" y2="48" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

// Shoveling Worker - Most important for potholes!
const ShovelingWorker: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Ground/Dirt pile */}
      <ellipse cx="70" cy="75" rx="20" ry="8" fill="#8B7355" />
      
      {/* Person - Head with hard hat */}
      <circle cx="35" cy="30" r="8" fill="#FCD34D" />
      <path d="M 27 30 Q 35 25 43 30" fill="#F59E0B" />
      
      {/* Person - Body */}
      <rect x="29" y="37" width="12" height="20" fill="#EF4444" rx="2" />
      
      {/* Legs in working stance */}
      <line x1="32" y1="57" x2="28" y2="70" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="57" x2="42" y2="70" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      
      {/* Shovel */}
      <g className={isActive ? "origin-[35px_40px]" : ""} style={isActive ? { animation: "shovel 1.5s ease-in-out infinite" } : {}}>
        {/* Handle */}
        <line x1="40" y1="40" x2="65" y2="70" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
        {/* Blade */}
        <path d="M 65 70 L 70 72 L 68 77 L 63 75 Z" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1" />
      </g>
      
      {/* Arms */}
      <line x1="35" y1="42" x2="42" y2="48" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <line x1="37" y1="47" x2="50" y2="58" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      
      {/* Dirt particles when active */}
      {isActive && (
        <g className="animate-pulse">
          <circle cx="68" cy="68" r="1" fill="#8B7355" opacity="0.6" />
          <circle cx="72" cy="65" r="1.5" fill="#8B7355" opacity="0.6" />
          <circle cx="65" cy="67" r="1" fill="#8B7355" opacity="0.6" />
        </g>
      )}
    </svg>
    
    <style>{`
      @keyframes shovel {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-15deg); }
      }
    `}</style>
  </div>
);

// Painting Worker - For graffiti removal
const PaintingWorker: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Wall */}
      <rect x="60" y="20" width="25" height="60" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
      
      {/* Paint coverage */}
      {isActive && (
        <rect x="62" y="22" width="21" height="30" fill="#FFFFFF" opacity="0.8">
          <animate attributeName="height" from="0" to="56" dur="3s" fill="freeze" />
        </rect>
      )}
      
      {/* Person - Head with cap */}
      <circle cx="35" cy="35" r="8" fill="#FCD34D" />
      <ellipse cx="35" cy="32" rx="9" ry="4" fill="#3B82F6" />
      
      {/* Body */}
      <rect x="29" y="42" width="12" height="20" fill="#FFFFFF" rx="2" />
      
      {/* Legs */}
      <line x1="32" y1="62" x2="30" y2="75" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="62" x2="40" y2="75" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      
      {/* Paint roller */}
      <g className={isActive ? "origin-[35px_45px]" : ""} style={isActive ? { animation: "paint 2s ease-in-out infinite" } : {}}>
        <line x1="40" y1="45" x2="60" y2="40" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
        <rect x="60" y="37" width="8" height="6" fill="#10B981" rx="1" />
      </g>
      
      {/* Arms */}
      <line x1="35" y1="47" x2="42" y2="46" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </svg>
    
    <style>{`
      @keyframes paint {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `}</style>
  </div>
);

// Climbing Worker - For street lights
const ClimbingWorker: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Ladder */}
      <line x1="45" y1="20" x2="45" y2="85" stroke="#8B4513" strokeWidth="3" />
      <line x1="55" y1="20" x2="55" y2="85" stroke="#8B4513" strokeWidth="3" />
      <line x1="45" y1="30" x2="55" y2="30" stroke="#8B4513" strokeWidth="2" />
      <line x1="45" y1="40" x2="55" y2="40" stroke="#8B4513" strokeWidth="2" />
      <line x1="45" y1="50" x2="55" y2="50" stroke="#8B4513" strokeWidth="2" />
      <line x1="45" y1="60" x2="55" y2="60" stroke="#8B4513" strokeWidth="2" />
      <line x1="45" y1="70" x2="55" y2="70" stroke="#8B4513" strokeWidth="2" />
      
      {/* Light fixture at top */}
      <rect x="40" y="10" width="20" height="8" fill="#374151" rx="2" />
      <circle cx="50" cy="14" r="3" fill={isActive ? "#FCD34D" : "#9CA3AF"}>
        {isActive && (
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
        )}
      </circle>
      
      {/* Worker - positioned on ladder */}
      <g className={isActive ? "" : ""} transform="translate(0, 0)">
        {isActive && <animateTransform attributeName="transform" type="translate" values="0,10; 0,0" dur="2s" repeatCount="indefinite" />}
        
        {/* Head with hard hat */}
        <circle cx="50" cy="45" r="7" fill="#FCD34D" />
        <path d="M 43 45 Q 50 40 57 45" fill="#F59E0B" />
        
        {/* Body */}
        <rect x="45" y="51" width="10" height="15" fill="#EF4444" rx="2" />
        
        {/* Arms on ladder */}
        <line x1="45" y1="54" x2="42" y2="50" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="55" y1="54" x2="58" y2="50" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

// Pruning Worker - For tree maintenance
const PruningWorker: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Tree */}
      <rect x="70" y="50" width="8" height="30" fill="#8B4513" />
      <circle cx="74" cy="45" r="15" fill="#10B981" opacity="0.8" />
      <circle cx="68" cy="38" r="10" fill="#10B981" opacity="0.8" />
      <circle cx="80" cy="40" r="10" fill="#10B981" opacity="0.8" />
      
      {/* Fallen branches */}
      {isActive && (
        <g className="animate-pulse">
          <line x1="65" y1="75" x2="75" y2="72" stroke="#8B4513" strokeWidth="2" />
          <line x1="68" y1="78" x2="72" y2="77" stroke="#8B4513" strokeWidth="1.5" />
        </g>
      )}
      
      {/* Worker */}
      <circle cx="35" cy="40" r="8" fill="#FCD34D" />
      <path d="M 27 40 Q 35 35 43 40" fill="#F59E0B" />
      
      {/* Body */}
      <rect x="29" y="47" width="12" height="18" fill="#F97316" rx="2" />
      
      {/* Legs */}
      <line x1="32" y1="65" x2="30" y2="78" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="65" x2="40" y2="78" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      
      {/* Pruning shears */}
      <g className={isActive ? "origin-[35px_50px]" : ""} style={isActive ? { animation: "prune 1.5s ease-in-out infinite" } : {}}>
        <line x1="40" y1="50" x2="58" y2="45" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
        <path d="M 58 43 L 62 45 L 60 48 Z" fill="#DC2626" />
      </g>
      
      {/* Arm */}
      <line x1="37" y1="52" x2="45" y2="48" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
    </svg>
    
    <style>{`
      @keyframes prune {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-20deg); }
      }
    `}</style>
  </div>
);

// Inspecting Worker
const InspectingWorker: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Person - Head */}
      <circle cx="50" cy="35" r="9" fill="#FCD34D" />
      
      {/* Body */}
      <rect x="43" y="43" width="14" height="22" fill="#8B5CF6" rx="2" />
      
      {/* Legs */}
      <rect x="45" y="64" width="5" height="18" fill="#6B7280" rx="2" />
      <rect x="52" y="64" width="5" height="18" fill="#6B7280" rx="2" />
      
      {/* Clipboard */}
      <rect x="30" y="45" width="10" height="14" fill="#F3F4F6" stroke="#374151" strokeWidth="1" rx="1" />
      <circle cx="35" cy="52" r="2" fill={isActive ? "#10B981" : "#9CA3AF"}>
        {isActive && (
          <animate attributeName="fill" values="#9CA3AF;#10B981;#9CA3AF" dur="2s" repeatCount="indefinite" />
        )}
      </circle>
      
      {/* Magnifying glass */}
      <g className={isActive ? "animate-bounce" : ""}>
        <circle cx="65" cy="45" r="7" fill="none" stroke="#374151" strokeWidth="2" />
        <line x1="70" y1="50" x2="75" y2="55" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Arms */}
      <line x1="43" y1="48" x2="35" y2="50" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
      <line x1="57" y1="48" x2="65" y2="45" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

// Celebrating Worker - Completion!
const CelebratingWorker: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="relative w-24 h-24 mx-auto">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Confetti */}
      {isActive && (
        <g className="animate-pulse">
          <circle cx="30" cy="25" r="2" fill="#F59E0B" />
          <circle cx="70" cy="30" r="2" fill="#EF4444" />
          <circle cx="40" cy="20" r="1.5" fill="#3B82F6" />
          <circle cx="60" cy="25" r="2" fill="#10B981" />
          <rect x="35" y="28" width="3" height="3" fill="#8B5CF6" transform="rotate(45 36.5 29.5)" />
          <rect x="65" y="22" width="3" height="3" fill="#EC4899" transform="rotate(45 66.5 23.5)" />
        </g>
      )}
      
      {/* Person - Head */}
      <circle cx="50" cy="40" r="10" fill="#FCD34D" />
      
      {/* Happy face */}
      <circle cx="45" cy="38" r="1.5" fill="#374151" />
      <circle cx="55" cy="38" r="1.5" fill="#374151" />
      <path d="M 43 43 Q 50 47 57 43" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      
      {/* Body */}
      <rect x="43" y="49" width="14" height="20" fill="#10B981" rx="2" />
      
      {/* Legs in happy stance */}
      <line x1="46" y1="69" x2="42" y2="82" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <line x1="54" y1="69" x2="58" y2="82" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      
      {/* Arms raised in celebration */}
      <g className={isActive ? "origin-[50px_50px]" : ""} style={isActive ? { animation: "celebrate 0.8s ease-in-out infinite" } : {}}>
        <line x1="43" y1="53" x2="32" y2="48" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        <line x1="57" y1="53" x2="68" y2="48" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* Thumbs up */}
      <path d="M 30 48 L 28 45 L 28 42 L 30 40 L 32 42 L 32 48 Z" fill="#FCD34D" stroke="#F59E0B" strokeWidth="0.5" />
    </svg>
    
    <style>{`
      @keyframes celebrate {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
      }
    `}</style>
  </div>
);

export default CityWorkerAnimation;


