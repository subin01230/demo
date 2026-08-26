import React, { useState } from 'react';
import {
  FileText,
  Download,
  Trash2,
  Filter,
  CheckCircle,
  AlertTriangle,
  Info,
  Radio,
  Zap,
  Play,
} from 'lucide-react';
import { NotificationLogItem } from '../types/smartfarm';
import { EdgeNotice } from '../lib/agToolkit';

interface AlarmRulesAndLogsProps {
  logs: NotificationLogItem[];
  onClearLogs: () => void;
  onSimulateAlarmScenario: (scenario: string) => void;
}

export const AlarmRulesAndLogs: React.FC<AlarmRulesAndLogsProps> = ({
  logs,
  onClearLogs,
  onSimulateAlarmScenario,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredLogs = logs.filter((log) => {
    if (filterType !== 'all' && log.type !== filterType) return false;
    if (filterSeverity !== 'all' && log.severity !== filterSeverity) return false;
    return true;
  });

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ara-edge-notification-logs-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    EdgeNotice.toast('알림 감사 로그(JSON)가 다운로드되었습니다.');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Notification API 감사 로그 및 운영 이력
              </span>
              <span className="text-xs text-slate-400">총 {logs.length}건 기록</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">실시간 알림 이력 및 관제 시나리오</h2>
            <p className="text-xs text-slate-300">
              <code>AG.Notification</code>을 통해 발송된 모든 엣지 토스트, 정보 메시지, 대화형 알림을 추적하고 재난/이상 시나리오를 모의 실행합니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>로그 JSON 내보내기</span>
            </button>
            <button
              onClick={onClearLogs}
              className="px-3 py-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>로그 비우기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preset Alarm Scenario Test Matrix */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-slate-700 pb-2">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            스마트팜 대표 이상 징후 알림 모의 시뮬레이터
          </h3>
          <span className="text-xs text-slate-400">원클릭 시나리오 발송</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onSimulateAlarmScenario('heatwave')}
            className="p-3 bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 rounded-lg text-left transition group"
          >
            <div className="text-xs font-bold text-rose-400 flex items-center justify-between">
              <span>🔥 폭염 / 고온 이상</span>
              <Play className="w-3 h-3 group-hover:translate-x-0.5 transition" />
            </div>
            <div className="text-[11px] text-slate-300 mt-1">온도 34.8°C 감지</div>
            <div className="text-[10px] text-slate-500 mt-0.5">InfoMessage 발송 + 위험 비프음</div>
          </button>

          <button
            onClick={() => onSimulateAlarmScenario('frost')}
            className="p-3 bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 rounded-lg text-left transition group"
          >
            <div className="text-xs font-bold text-sky-400 flex items-center justify-between">
              <span>❄️ 한파 / 난방 밸브 고장</span>
              <Play className="w-3 h-3 group-hover:translate-x-0.5 transition" />
            </div>
            <div className="text-[11px] text-slate-300 mt-1">온도 8.2°C 저온 위험</div>
            <div className="text-[10px] text-slate-500 mt-0.5">긴급 위험 대화형 알림 (Message)</div>
          </button>

          <button
            onClick={() => onSimulateAlarmScenario('ec_imbalance')}
            className="p-3 bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 rounded-lg text-left transition group"
          >
            <div className="text-xs font-bold text-amber-400 flex items-center justify-between">
              <span>🧪 양액 EC/pH 불균형</span>
              <Play className="w-3 h-3 group-hover:translate-x-0.5 transition" />
            </div>
            <div className="text-[11px] text-slate-300 mt-1">EC 3.4 dS/m 과다 공급</div>
            <div className="text-[10px] text-slate-500 mt-0.5">긴급 관수 밸브 차단 확인</div>
          </button>

          <button
            onClick={() => onSimulateAlarmScenario('power_fail')}
            className="p-3 bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 rounded-lg text-left transition group"
          >
            <div className="text-xs font-bold text-purple-400 flex items-center justify-between">
              <span>⚡ 상전 정전 / 발전기 전환</span>
              <Play className="w-3 h-3 group-hover:translate-x-0.5 transition" />
            </div>
            <div className="text-[11px] text-slate-300 mt-1">비상 배터리(UPS) 가동</div>
            <div className="text-[10px] text-slate-500 mt-0.5">최고 우선순위 경보 (Danger)</div>
          </button>
        </div>
      </div>

      {/* Logs Table Section */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-300">필터 설정:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Filter by Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="알림 유형 필터"
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">모든 API 유형 (All)</option>
              <option value="toast">Toast (하단 중앙)</option>
              <option value="info">InfoMessage (정보형)</option>
              <option value="message">Message (대화형)</option>
              <option value="discover">Discover (장치 발견)</option>
            </select>

            {/* Filter by Severity */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              aria-label="심각도 필터"
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">모든 심각도 (All)</option>
              <option value="info">정보 (Info)</option>
              <option value="warning">주의 (Warning)</option>
              <option value="danger">위험 (Danger)</option>
              <option value="success">성공 (Success)</option>
            </select>
          </div>
        </div>

        {/* Logs List */}
        {filteredLogs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            기록된 알림 로그가 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/60">
                  <th className="py-2.5 px-3">발생 시각</th>
                  <th className="py-2.5 px-3">API 유형</th>
                  <th className="py-2.5 px-3">심각도</th>
                  <th className="py-2.5 px-3">제목 / 내용</th>
                  <th className="py-2.5 px-3 text-right">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60 text-slate-300">
                {filteredLogs.map((item) => {
                  let badgeColor = 'bg-slate-700 text-slate-300';
                  if (item.severity === 'danger') badgeColor = 'bg-rose-950 text-rose-300 border border-rose-800';
                  else if (item.severity === 'warning') badgeColor = 'bg-amber-950 text-amber-300 border border-amber-800';
                  else if (item.severity === 'success') badgeColor = 'bg-emerald-950 text-emerald-300 border border-emerald-800';
                  else if (item.severity === 'info') badgeColor = 'bg-sky-950 text-sky-300 border border-sky-800';

                  return (
                    <tr key={item.id} className="hover:bg-slate-750 transition">
                      <td className="py-2.5 px-3 font-mono text-slate-400 whitespace-nowrap">
                        {item.timestamp}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="font-mono text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeColor}`}>
                          {item.severity.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        {item.title && (
                          <div className="font-bold text-slate-100">{item.title}</div>
                        )}
                        <div className="text-slate-300 leading-snug">{item.content}</div>
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap">
                        <span className="text-[11px] text-emerald-400 font-medium">전송 완료</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
