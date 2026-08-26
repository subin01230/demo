import React, { useState, useEffect } from 'react';
import {
  Activity,
  Volume2,
  VolumeX,
  Radio,
  Cpu,
  Clock,
  ShieldCheck,
  Zap,
  Layers,
  Sliders,
  BellRing,
  Wifi,
  FileText
} from 'lucide-react';
import { soundManager } from '../lib/sound';
import { EdgeNotice } from '../lib/agToolkit';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unhandledAlertsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  unhandledAlertsCount,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [cpuUsage, setCpuUsage] = useState<number>(18);
  const [ramUsage, setRamUsage] = useState<number>(42);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          weekday: 'short',
        }) +
          ' ' +
          now.toLocaleTimeString('ko-KR', { hour12: false })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const perfTimer = setInterval(() => {
      setCpuUsage(Math.floor(15 + Math.random() * 12));
      setRamUsage(Math.floor(40 + Math.random() * 5));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(perfTimer);
    };
  }, []);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playBeep('toast');
      EdgeNotice.toast('경보 및 알림 비프음이 활성화되었습니다.');
    } else {
      EdgeNotice.toast('경보음이 음소거되었습니다.');
    }
  };

  const handleEmergencyAllStop = () => {
    EdgeNotice.dangerAlert(
      '전체 온실 긴급 정지 (E-STOP)',
      '모든 구동기(환기창, 관수 펌프, 유동팬, CO2)를 즉시 안전 모드로 전환하시겠습니까?',
      () => {
        EdgeNotice.toast('⚠️ [긴급] 전체 구동기가 안전 모드로 정지되었습니다.', 4000);
      }
    );
  };

  const tabs = [
    { id: 'overview', label: '종합 관제 대시보드', icon: Layers },
    { id: 'zone-detail', label: '온실 상세 제어', icon: Activity },
    { id: 'actuators', label: '구동기 통합 제어', icon: Sliders },
    { id: 'notification-lab', label: 'Notification API 테스트 랩', icon: BellRing, badge: 'API' },
    { id: 'devices', label: '엣지 노드 & 디스커버리', icon: Wifi },
    { id: 'logs', label: '알림 이력 로그', icon: FileText, count: unhandledAlertsCount },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md select-none sticky top-0 z-40">
      {/* Top Windows Edge Status Ribbon */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400 tracking-wide">ARA EDGE ONLINE</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>게이트웨이 IP: <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">192.168.1.120:8080</code></span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>CPU: <strong className="text-slate-200">{cpuUsage}%</strong></span>
            <span className="ml-1">RAM: <strong className="text-slate-200">{ramUsage}%</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono">{timeStr}</span>
          </div>
          <button
            onClick={handleToggleSound}
            title={isMuted ? '음소거 해제' : '음소거'}
            className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span className="text-[11px]">{isMuted ? '음소거' : '경보음 ON'}</span>
          </button>
          <button
            onClick={handleEmergencyAllStop}
            className="px-2 py-0.5 bg-red-600/90 hover:bg-red-600 text-white font-bold rounded text-[11px] flex items-center gap-1 transition shadow-sm"
          >
            <Zap className="w-3 h-3" />
            <span>긴급 E-STOP</span>
          </button>
        </div>
      </div>

      {/* Main Title & Nav Bar */}
      <div className="px-5 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center shadow-inner border border-emerald-400/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                아라온실 스마트팜 엣지 관제 시스템
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/50 rounded">
                v2.6 윈도우 데모
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Ara Greenhouse Edge UI Toolkit — AG.Notification API 연동 및 환경 통합 제어
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition relative ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500 text-white rounded font-mono font-bold">
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-500 text-slate-950 font-bold rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
