import React, { useState } from 'react';
import {
  Bell,
  Sparkles,
  Zap,
  Radio,
  Sliders,
  X,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { AG, EdgeNotice } from '../lib/agToolkit';

export const QuickNoticeFloatingTester: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="빠른 알림 테스트 도구" className="fixed bottom-6 left-6 z-50 select-none">
      {isOpen ? (
        <div className="bg-slate-900/95 border border-slate-700 rounded-xl p-4 shadow-2xl backdrop-blur text-slate-200 w-72 space-y-3 animation-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-xs text-white">AG.Notification 빠른 트리거</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
              aria-label="닫기"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => AG.Notification.Toast('간편 토스트: 3초 후 사라짐', 3000)}
              className="p-2 bg-sky-950/70 hover:bg-sky-900 border border-sky-800/80 rounded font-semibold text-sky-200 text-center transition"
            >
              하단 Toast (3s)
            </button>
            <button
              onClick={() =>
                AG.Notification.InfoMessage('정보 알림', '센서 측정 주기가 10초로 동기화되었습니다.', 3000)
              }
              className="p-2 bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-800/80 rounded font-semibold text-indigo-200 text-center transition"
            >
              우하단 Info
            </button>
            <button
              onClick={() =>
                EdgeNotice.dangerAlert(
                  '고온 긴급 경보',
                  '제1온실 내부 온도가 35°C를 초과하여 작물 열해 위험이 있습니다. 환기창을 100% 개방하시겠습니까?',
                  () => EdgeNotice.toast('천창이 100% 긴급 개방되었습니다.')
                )
              }
              className="p-2 bg-rose-950/70 hover:bg-rose-900 border border-rose-800/80 rounded font-semibold text-rose-200 text-center transition"
            >
              긴급 확인 Message
            </button>
            <button
              onClick={() =>
                AG.Notification.DiscoverMessage({
                  clientId: 'NODE-SN-882',
                  name: '제2온실 토양수분/지온 센서',
                  type: 'RS-485 배지 센서',
                })
              }
              className="p-2 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/80 rounded font-semibold text-emerald-200 text-center transition"
            >
              장치 Discover
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-xl flex items-center gap-2 text-xs font-bold transition border border-indigo-400/40 hover:scale-105"
        >
          <Bell className="w-4 h-4 animate-bounce" />
          <span>API 빠른 테스트</span>
        </button>
      )}
    </aside>
  );
};
