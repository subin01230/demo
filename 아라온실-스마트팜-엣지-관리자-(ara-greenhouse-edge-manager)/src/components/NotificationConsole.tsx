import React, { useState } from 'react';
import {
  Bell,
  Code2,
  Play,
  CheckCircle,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  Copy,
  Check,
  Radio,
  FileCode,
  Sliders,
  Terminal,
} from 'lucide-react';
import { AG, EdgeNotice, escapeForHtml } from '../lib/agToolkit';

export const NotificationConsole: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Custom Toast State
  const [toastText, setToastText] = useState('환경 데이터 동기화가 완료되었습니다.');
  const [toastDuration, setToastDuration] = useState(3000);

  // Custom Info State
  const [infoTitle, setInfoTitle] = useState('온도 센서');
  const [infoMessage, setInfoMessage] = useState('1번 구역의 온도가 기준 범위를 벗어났습니다.');
  const [infoDuration, setInfoDuration] = useState(3000);

  // Custom Discover State
  const [discoverClientId, setDiscoverClientId] = useState('NODE-AG-0941');
  const [discoverDeviceName, setDiscoverDeviceName] = useState('제1온실 첨단 광양자 센서 노드');

  // Interactive Message State
  const [decisionTitle, setDecisionTitle] = useState('자동 환기 수동 전환 확인');
  const [decisionBody, setDecisionBody] = useState('풍속 10m/s 이상 감지되어 천창을 30%로 강제 고정합니다.');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    EdgeNotice.toast('코드 스니펫이 클립보드에 복사되었습니다.', 2000);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const runDecisionMessage = () => {
    const markup = `
      <group-row class="border background-white">
        <row-start align="start" class="background-gray-light padding-4">
          <i class="bi bi-exclamation-octagon text-amber-600"></i>
          <div class="text-bold margin-left-4">${escapeForHtml(decisionTitle)}</div>
          <span class="margin-left-auto text-time">오후 12:00</span>
        </row-start>
        <row-start align="start" class="padding-6">
          ${escapeForHtml(decisionBody)}
        </row-start>
        <row-between class="padding-2 gap-4">
          <button
            type="button"
            data-action="confirm"
            class="button button-small color-indigo width-100"
          >확인</button>
          <button
            type="button"
            data-action="close"
            class="button button-small color-gray width-100"
          >닫기</button>
        </row-between>
      </group-row>
    `;

    AG.Notification.Message(markup, function () {
      const item = this;
      const confirmButton = item.querySelector('[data-action="confirm"]');
      const closeButton = item.querySelector('[data-action="close"]');

      confirmButton?.addEventListener('click', () => {
        EdgeNotice.toast('✓ 확인 처리되었습니다.');
        item.remove();
      });

      closeButton?.addEventListener('click', () => {
        item.remove();
      }, { once: true });
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" />
                아라온실 AG.Notification API v2.6 검증 샌드박스
              </span>
              <span className="text-xs text-slate-400">Vanilla JS 번들 호환</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Notification API 인터랙티브 테스트 랩</h2>
            <p className="text-xs text-slate-300">
              기술문서에 명시된 <code>Toast</code>, <code>Message</code>, <code>InfoMessage</code>, <code>DiscoverMessage</code> 및 권장 래퍼(<code>EdgeNotice</code>)의 동작과 XSS 보안 정제를 실시간으로 테스트합니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
              window.AG.Notification: Active
            </span>
          </div>
        </div>
      </div>

      {/* Grid of 4 Core APIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. AG.Notification.Toast */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">AG.Notification.Toast(html, duration)</h3>
                  <span className="text-[11px] text-slate-400">화면 하단 중앙 | 기본 3,000ms 자동 소멸</span>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 bg-sky-950 text-sky-300 border border-sky-800 rounded">
                Toast
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">알림 메시지 텍스트:</label>
                <input
                  type="text"
                  value={toastText}
                  onChange={(e) => setToastText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>유지 시간 (duration):</span>
                  <span className="font-mono text-sky-400">{toastDuration} ms</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="6000"
                  step="500"
                  value={toastDuration}
                  onChange={(e) => setToastDuration(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              {/* Code Snippet Box */}
              <div className="relative bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
                <button
                  onClick={() => handleCopy(`AG.Notification.Toast('${toastText}', ${toastDuration});`, 'toast')}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white p-1"
                  title="코드 복사"
                >
                  {copiedSection === 'toast' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <div className="text-slate-500">// 호출 코드</div>
                <div className="text-sky-300 font-semibold mt-0.5">
                  AG.Notification.Toast(<span className="text-amber-300">'{toastText}'</span>, <span className="text-emerald-300">{toastDuration}</span>);
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700 flex gap-2">
            <button
              onClick={() => AG.Notification.Toast(toastText, toastDuration)}
              className="flex-1 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Toast 실행</span>
            </button>
            <button
              onClick={() => EdgeNotice.toast('안전 래퍼 EdgeNotice.toast() 테스트 완료')}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-medium transition"
              title="EdgeNotice 안전 래퍼 호출"
            >
              EdgeNotice 래퍼
            </button>
          </div>
        </div>

        {/* 2. AG.Notification.InfoMessage */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">AG.Notification.InfoMessage(title, message, duration)</h3>
                  <span className="text-[11px] text-slate-400">화면 우하단 | 제목/시간/닫기버튼 포함 정보 알림</span>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded">
                InfoMessage
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">제목 (Title):</label>
                  <input
                    type="text"
                    value={infoTitle}
                    onChange={(e) => setInfoTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">시간 (ms):</label>
                  <input
                    type="number"
                    value={infoDuration}
                    step={1000}
                    onChange={(e) => setInfoDuration(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">본문 (Message):</label>
                <textarea
                  rows={2}
                  value={infoMessage}
                  onChange={(e) => setInfoMessage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              {/* Code Snippet Box */}
              <div className="relative bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
                <button
                  onClick={() => handleCopy(`AG.Notification.InfoMessage('${infoTitle}', '${infoMessage}', ${infoDuration});`, 'info')}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white p-1"
                  title="코드 복사"
                >
                  {copiedSection === 'info' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <div className="text-slate-500">// 호출 코드</div>
                <div className="text-indigo-300 font-semibold mt-0.5 truncate">
                  AG.Notification.InfoMessage(<span className="text-amber-300">'{infoTitle}'</span>, <span className="text-amber-300">'{infoMessage}'</span>, <span className="text-emerald-300">{infoDuration}</span>);
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700 flex gap-2">
            <button
              onClick={() => AG.Notification.InfoMessage(infoTitle, infoMessage, infoDuration)}
              className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
            >
              <Play className="w-3.5 h-3.5" />
              <span>InfoMessage 실행</span>
            </button>
            <button
              onClick={() => EdgeNotice.info(infoTitle, infoMessage, infoDuration)}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-medium transition"
            >
              EdgeNotice.info()
            </button>
          </div>
        </div>

        {/* 3. AG.Notification.Message (Interactive callback & DOM manipulation) */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">AG.Notification.Message(html, callback, duration=0)</h3>
                  <span className="text-[11px] text-slate-400">화면 우하단 | 버튼/입력 포함 사용자 정의 대화형 알림</span>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded">
                Message (this 바인딩)
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">제목 & 본문:</label>
                <input
                  type="text"
                  value={decisionTitle}
                  onChange={(e) => setDecisionTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-white mb-1.5 focus:outline-none"
                />
                <input
                  type="text"
                  value={decisionBody}
                  onChange={(e) => setDecisionBody(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-white focus:outline-none"
                />
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-700/60 text-[11px] text-slate-400">
                <strong className="text-slate-200">🔍 기술문서 검증 포인트:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>콜백 함수 내 <code className="text-amber-300">this</code>는 생성된 <code className="text-slate-200">&lt;message-item&gt;</code> 요소입니다.</li>
                  <li>공식 문서의 "return true 필요"는 무관하며 <code className="text-emerald-300">this.remove()</code>로 닫습니다.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700 flex gap-2">
            <button
              onClick={runDecisionMessage}
              className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
            >
              <Play className="w-3.5 h-3.5" />
              <span>대화형 알림 실행 (확인/닫기 버튼)</span>
            </button>
          </div>
        </div>

        {/* 4. AG.Notification.DiscoverMessage */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">AG.Notification.DiscoverMessage(data)</h3>
                  <span className="text-[11px] text-slate-400">화면 우하단 | 신규 엣지 장치 발견/등록 알림</span>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                Discover
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client ID:</label>
                  <input
                    type="text"
                    value={discoverClientId}
                    onChange={(e) => setDiscoverClientId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">장치 명칭:</label>
                  <input
                    type="text"
                    value={discoverDeviceName}
                    onChange={(e) => setDiscoverDeviceName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded border border-slate-700/60 text-[11px] text-slate-400">
                <strong className="text-slate-200">📡 디스커버리 통신 규약:</strong>
                <p className="mt-1">
                  엣지 게이트웨이 로컬 서브넷에서 브로드캐스트된 신규 센서/구동기 노드를 발견하여 운영자에게 등록 여부를 확인합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700 flex gap-2">
            <button
              onClick={() =>
                AG.Notification.DiscoverMessage({
                  clientId: discoverClientId,
                  name: discoverDeviceName,
                  type: '광양자/온습도 엣지 센서',
                })
              }
              className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Discover 알림 모의 발송</span>
            </button>
          </div>
        </div>
      </div>

      {/* Technical Document Compliance & Verification Table */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-700 pb-3">
          <FileCode className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-base text-white">기술문서 검토 결과 및 실제 구현 호환성 비교 (Section 6 & 8)</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/60">
                <th className="py-2.5 px-3">항목</th>
                <th className="py-2.5 px-3">공식 페이지 / 주석 설명</th>
                <th className="py-2.5 px-3">공개 번들 실제 동작</th>
                <th className="py-2.5 px-3">스마트팜 엣지 대응 방식</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-100">Message 닫기</td>
                <td className="py-2.5 px-3 text-rose-300">콜백에서 return true 필요</td>
                <td className="py-2.5 px-3 text-emerald-300">반환값을 무시함</td>
                <td className="py-2.5 px-3">콜백 내부에서 <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">this.remove()</code> 직접 호출</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-100">Toast 시간</td>
                <td className="py-2.5 px-3">duration 인수 임의 지정 가능</td>
                <td className="py-2.5 px-3 text-amber-300">CSS fadeInOut 애니메이션은 3s 고정</td>
                <td className="py-2.5 px-3">자연스러운 페이드아웃을 위해 기본 3,000ms 사용 권장</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-100">보안 (XSS)</td>
                <td className="py-2.5 px-3">언급 없음</td>
                <td className="py-2.5 px-3 text-rose-300">모든 API가 innerHTML에 직접 대입</td>
                <td className="py-2.5 px-3"><code className="bg-slate-900 px-1 py-0.5 rounded text-emerald-300">EdgeNotice.text()</code> escapeForHtml 강제 적용</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-100">InfoMessage 시각</td>
                <td className="py-2.5 px-3">언급 없음</td>
                <td className="py-2.5 px-3 text-emerald-300">오전/오후 H:mm 한국어 포맷 내장</td>
                <td className="py-2.5 px-3">한국어 엣지 관제 표준 시간 표기 완벽 일치</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
