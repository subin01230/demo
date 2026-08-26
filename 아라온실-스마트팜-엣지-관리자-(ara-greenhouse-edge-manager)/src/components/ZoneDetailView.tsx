import React, { useState } from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Sprout,
  Sliders,
  Play,
  RotateCcw,
  Check,
  AlertCircle,
  Eye,
  Zap,
} from 'lucide-react';
import { ZoneConfig, ActuatorState } from '../types/smartfarm';
import { EdgeNotice, AG } from '../lib/agToolkit';

interface ZoneDetailViewProps {
  zone: ZoneConfig;
  actuator: ActuatorState;
  onUpdateActuator: (zoneId: string, updates: Partial<ActuatorState>) => void;
  onUpdateTargetTemp: (zoneId: string, target: number) => void;
}

export const ZoneDetailView: React.FC<ZoneDetailViewProps> = ({
  zone,
  actuator,
  onUpdateActuator,
  onUpdateTargetTemp,
}) => {
  const [tempTargetInput, setTempTargetInput] = useState<number>(zone.targetTemp.currentTarget);

  const handleSaveTarget = () => {
    onUpdateTargetTemp(zone.id, tempTargetInput);
    EdgeNotice.toast(`[${zone.name}] 목표 온도 ${tempTargetInput}°C로 갱신되었습니다.`);
  };

  const handleToggleAuto = () => {
    const nextMode = !actuator.autoMode;
    onUpdateActuator(zone.id, { autoMode: nextMode });
    if (nextMode) {
      EdgeNotice.info(
        `${zone.name} 자동 제어 가동`,
        '온·습도 및 VPD 최적화 AI 알고리즘에 따라 구동기가 자동 제어됩니다.'
      );
    } else {
      EdgeNotice.toast(`${zone.name} 수동 제어 모드로 전환되었습니다.`, 3000);
    }
  };

  const handleIrrigationOneShot = () => {
    // Show AG.Notification.Message with custom callback and confirmation
    const markup = `
      <group-row class="border background-white">
        <row-start align="start" class="background-indigo-light padding-4">
          <i class="bi bi-water text-indigo-600"></i>
          <div class="text-bold margin-left-4">${zone.name} 즉시 관수 실행</div>
          <span class="margin-left-auto text-time">원터치 관수</span>
        </row-start>
        <div class="padding-6">
          <p class="text-xs text-gray-700 leading-relaxed">
            구역 1회 급수(3분간 150L 공급, EC 2.4 dS/m)를 시작하시겠습니까?
          </p>
          <row-between class="margin-top-4 gap-4 flex justify-end">
            <button
              type="button"
              data-action="start-irrigation"
              class="button button-small color-indigo font-semibold px-3 py-1.5 rounded"
            >관수 시작</button>
            <button
              type="button"
              data-action="close"
              class="button button-small color-gray px-3 py-1.5 rounded"
            >취소</button>
          </row-between>
        </div>
      </group-row>
    `;

    AG.Notification.Message(markup, function () {
      const item = this;
      const startBtn = item.querySelector('[data-action="start-irrigation"]');
      const closeBtn = item.querySelector('[data-action="close"]');

      startBtn?.addEventListener('click', () => {
        onUpdateActuator(zone.id, { irrigationPump: true, nutrientValve: true });
        item.classList.add('slide-out');
        setTimeout(() => item.remove(), 200);

        EdgeNotice.toast(`[${zone.name}] 관수 펌프 및 양액 밸브가 가동되었습니다.`);

        // Auto stop after 5s simulation
        setTimeout(() => {
          onUpdateActuator(zone.id, { irrigationPump: false, nutrientValve: false });
          EdgeNotice.info(
            `${zone.name} 관수 완료`,
            '1회 정량 관수(150L)가 성공적으로 완료되었습니다.'
          );
        }, 5000);
      }, { once: true });

      closeBtn?.addEventListener('click', () => {
        item.classList.add('slide-out');
        setTimeout(() => item.remove(), 200);
      }, { once: true });
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Zone Header & Quick Stats */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {zone.crop}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {zone.id}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{zone.name} 정밀 관제</h2>
            <p className="text-xs text-slate-400">
              생육단계: <strong className="text-slate-200">{zone.growthStage}</strong> | 엣지 센서 노드 및 구동기 실시간 링크
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleAuto}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                actuator.autoMode
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                  : 'bg-amber-600 hover:bg-amber-500 text-white shadow'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>{actuator.autoMode ? '🤖 AI 복합 환경 자동 제어 ON' : '✋ 수동 제어 모드'}</span>
            </button>
            <button
              onClick={handleIrrigationOneShot}
              className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Droplets className="w-4 h-4" />
              <span>즉시 정량 관수 실행</span>
            </button>
          </div>
        </div>

        {/* Live Gauges Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-5">
          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700/80">
            <div className="text-slate-400 text-xs flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-rose-400" /> 실내 온도
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {zone.sensors.temperature.toFixed(1)} <span className="text-xs font-normal text-slate-400">°C</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">엽온: {zone.sensors.leafTemp.toFixed(1)}°C</div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700/80">
            <div className="text-slate-400 text-xs flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-sky-400" /> 실내 습도
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {zone.sensors.humidity.toFixed(1)} <span className="text-xs font-normal text-slate-400">%</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">VPD: {zone.sensors.vpd.toFixed(2)} kPa</div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700/80">
            <div className="text-slate-400 text-xs flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-emerald-400" /> CO₂ 농도
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {Math.round(zone.sensors.co2)} <span className="text-xs font-normal text-slate-400">ppm</span>
            </div>
            <div className="text-[11px] text-emerald-400 mt-0.5">광합성 최적 구간</div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700/80">
            <div className="text-slate-400 text-xs flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> 일사량
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {Math.round(zone.sensors.solarRadiation)} <span className="text-xs font-normal text-slate-400">W/m²</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">광포화점 이하</div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700/80">
            <div className="text-slate-400 text-xs flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5 text-lime-400" /> 양액 EC / pH
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {zone.sensors.ec.toFixed(2)} <span className="text-xs text-slate-400 font-normal">/ {zone.sensors.ph.toFixed(1)}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">기준 EC: 2.2~2.8</div>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700/80">
            <div className="text-slate-400 text-xs flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-teal-400" /> 토양 수분/지온
            </div>
            <div className="text-xl font-bold text-white mt-1">
              {zone.sensors.soilMoisture.toFixed(1)}% <span className="text-xs text-slate-400 font-normal">/ {zone.sensors.soilTemp.toFixed(1)}°C</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">배지 함수율 안정</div>
          </div>
        </div>
      </div>

      {/* Interactive Visual Greenhouse Cross-Section Graphic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">온실 구조 및 구동기 실시간 물리 시각화 (2D Digital Twin)</h3>
            </div>
            <span className="text-xs text-slate-400">실시간 연동 반응</span>
          </div>

          {/* SVG Greenhouse Cross Section */}
          <div className="relative w-full h-64 bg-gradient-to-b from-sky-950/40 via-slate-900 to-slate-950 rounded-lg border border-slate-700/70 overflow-hidden flex items-center justify-center p-2">
            <svg viewBox="0 0 600 280" className="w-full h-full">
              {/* Ground & Floor */}
              <rect x="20" y="230" width="560" height="40" fill="#1e293b" rx="4" />
              <line x1="20" y1="230" x2="580" y2="230" stroke="#334155" strokeWidth="2" />

              {/* Soil / Culture Bed */}
              <rect x="60" y="200" width="480" height="30" fill="#3f2e1e" rx="4" />
              <text x="300" y="220" fill="#a1887f" fontSize="11" textAnchor="middle">
                코코피트 양액 배지 (토양 수분: {zone.sensors.soilMoisture.toFixed(1)}% | EC: {zone.sensors.ec.toFixed(2)})
              </text>

              {/* Crops Illustration */}
              {[100, 160, 220, 280, 340, 400, 460, 500].map((x, idx) => (
                <g key={idx} transform={`translate(${x}, 150)`}>
                  <path d="M 0 50 Q -5 25 -15 20 Q 0 20 0 0 Q 0 20 15 20 Q 5 25 0 50" fill="#10b981" />
                  {idx % 2 === 0 && (
                    <circle cx="-6" cy="28" r="5" fill="#ef4444" />
                  )}
                  {idx % 3 === 0 && (
                    <circle cx="7" cy="35" r="4" fill="#f59e0b" />
                  )}
                </g>
              ))}

              {/* Greenhouse Main Frame Structure */}
              <polygon
                points="50,230 50,110 300,30 550,110 550,230"
                fill="none"
                stroke="#64748b"
                strokeWidth="3"
                strokeDasharray="none"
              />

              {/* Roof Vent Left (Animated by roofVentLeft) */}
              <g transform={`translate(175, 70)`}>
                <line
                  x1="0"
                  y1="0"
                  x2="110"
                  y2={-actuator.roofVentLeft * 0.35}
                  stroke={actuator.roofVentLeft > 0 ? '#38bdf8' : '#94a3b8'}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <text x="50" y="-12" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  좌천창 {actuator.roofVentLeft}%
                </text>
              </g>

              {/* Roof Vent Right (Animated by roofVentRight) */}
              <g transform={`translate(300, 30)`}>
                <line
                  x1="0"
                  y1="0"
                  x2="115"
                  y2={actuator.roofVentRight * 0.35 + 38}
                  stroke={actuator.roofVentRight > 0 ? '#38bdf8' : '#94a3b8'}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <text x="60" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  우천창 {actuator.roofVentRight}%
                </text>
              </g>

              {/* Shading Curtain (Horizontal Screen) */}
              {actuator.shadeScreen > 0 && (
                <line
                  x1="60"
                  y1="115"
                  x2={60 + 480 * (actuator.shadeScreen / 100)}
                  y2="115"
                  stroke="#fbbf24"
                  strokeWidth="5"
                  strokeDasharray="4 2"
                />
              )}

              {/* Circulating Fan */}
              <g transform="translate(120, 80)">
                <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <path
                  d="M -10 -10 L 10 10 M -10 10 L 10 -10"
                  stroke={actuator.circulationFan ? '#38bdf8' : '#64748b'}
                  strokeWidth="3"
                  className={actuator.circulationFan ? 'animate-spin origin-center' : ''}
                  style={{ transformOrigin: '0px 0px' }}
                />
                <text x="0" y="28" fill="#94a3b8" fontSize="9" textAnchor="middle">
                  유동팬 {actuator.circulationFan ? `${actuator.circulationFanSpeed}단` : 'OFF'}
                </text>
              </g>

              {/* LED Grow Light */}
              <g transform="translate(450, 75)">
                <rect x="-25" y="0" width="50" height="8" rx="2" fill="#334155" />
                {actuator.ledGrowLight && (
                  <>
                    <polygon points="-25,8 25,8 40,65 -40,65" fill="rgba(236, 72, 153, 0.25)" />
                    <text x="0" y="-4" fill="#f472b6" fontSize="9" textAnchor="middle" fontWeight="bold">
                      LED {actuator.ledIntensity}% ON
                    </text>
                  </>
                )}
              </g>

              {/* Irrigation Drip Animation */}
              {actuator.irrigationPump && (
                <g>
                  {[120, 180, 240, 300, 360, 420, 480].map((x, i) => (
                    <circle key={i} cx={x} cy={195} r="2.5" fill="#38bdf8" className="animate-bounce" />
                  ))}
                  <text x="300" y="185" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">
                    💧 정밀 점적 관수 공급 중
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-2 rounded">
            <span>풍향/풍속: 2.8m/s (남서풍)</span>
            <span>일사 차광 스크린: {actuator.shadeScreen}% 전개</span>
            <span>CO₂ 시비기: {actuator.co2Generator ? '가동 중' : '대기'}</span>
          </div>
        </div>

        {/* Target Environment Setters & Actuator Controls */}
        <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              환경 목표치 및 수동 제어
            </h3>
            <span className="text-xs text-emerald-300 font-mono">Edge Actuator Control</span>
          </div>

          {/* Target Temperature Slider */}
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium">목표 주간 온도 설정 (°C)</span>
              <span className="font-bold text-emerald-400 text-sm">{tempTargetInput.toFixed(1)} °C</span>
            </div>
            <input
              type="range"
              min="15"
              max="32"
              step="0.5"
              value={tempTargetInput}
              onChange={(e) => setTempTargetInput(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>15.0°C</span>
              <span>최적 23.5°C</span>
              <span>32.0°C</span>
            </div>
            <button
              onClick={handleSaveTarget}
              className="w-full mt-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center justify-center gap-1 transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>목표치 적용 (Notification.Toast 발송)</span>
            </button>
          </div>

          {/* Direct Actuators Toggles */}
          <div className="space-y-2 text-xs">
            <div className="text-slate-300 font-semibold mb-1">구동기 수동 오버라이드:</div>

            <div className="grid grid-cols-2 gap-2">
              {/* Roof Vent Slider */}
              <div className="p-2.5 bg-slate-900/90 rounded border border-slate-700/70">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>천창 개방율:</span>
                  <span className="font-bold text-sky-400">{actuator.roofVentLeft}%</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      onUpdateActuator(zone.id, { roofVentLeft: 0, roofVentRight: 0 });
                      EdgeNotice.toast(`[${zone.name}] 천창 완전 닫힘 (0%)`);
                    }}
                    className="flex-1 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px]"
                  >
                    닫기(0%)
                  </button>
                  <button
                    onClick={() => {
                      onUpdateActuator(zone.id, { roofVentLeft: 50, roofVentRight: 50 });
                      EdgeNotice.toast(`[${zone.name}] 천창 50% 개방`);
                    }}
                    className="flex-1 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px]"
                  >
                    50%
                  </button>
                  <button
                    onClick={() => {
                      onUpdateActuator(zone.id, { roofVentLeft: 100, roofVentRight: 100 });
                      EdgeNotice.toast(`[${zone.name}] 천창 완전 개방 (100%)`);
                    }}
                    className="flex-1 py-1 bg-sky-900/60 hover:bg-sky-800 text-sky-200 rounded text-[11px]"
                  >
                    100%
                  </button>
                </div>
              </div>

              {/* Circulation Fan */}
              <div className="p-2.5 bg-slate-900/90 rounded border border-slate-700/70">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>유동팬 제어:</span>
                  <span className="font-bold text-emerald-400">
                    {actuator.circulationFan ? `${actuator.circulationFanSpeed}단 ON` : 'OFF'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const next = !actuator.circulationFan;
                    onUpdateActuator(zone.id, { circulationFan: next });
                    EdgeNotice.toast(`[${zone.name}] 유동팬 ${next ? '가동' : '정지'}`);
                  }}
                  className={`w-full py-1 rounded text-[11px] font-semibold transition ${
                    actuator.circulationFan
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {actuator.circulationFan ? '유동팬 정지' : '유동팬 가동'}
                </button>
              </div>

              {/* Shading Curtain */}
              <div className="p-2.5 bg-slate-900/90 rounded border border-slate-700/70">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>차광막 스크린:</span>
                  <span className="font-bold text-amber-400">{actuator.shadeScreen}%</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      onUpdateActuator(zone.id, { shadeScreen: 0 });
                      EdgeNotice.toast(`[${zone.name}] 차광막 닫힘 (0%)`);
                    }}
                    className="flex-1 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px]"
                  >
                    0%
                  </button>
                  <button
                    onClick={() => {
                      onUpdateActuator(zone.id, { shadeScreen: 60 });
                      EdgeNotice.toast(`[${zone.name}] 차광막 60% 전개`);
                    }}
                    className="flex-1 py-1 bg-amber-900/60 hover:bg-amber-800 text-amber-200 rounded text-[11px]"
                  >
                    60%
                  </button>
                </div>
              </div>

              {/* LED Grow Light */}
              <div className="p-2.5 bg-slate-900/90 rounded border border-slate-700/70">
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>LED 보광등:</span>
                  <span className="font-bold text-pink-400">
                    {actuator.ledGrowLight ? `${actuator.ledIntensity}%` : 'OFF'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const next = !actuator.ledGrowLight;
                    onUpdateActuator(zone.id, { ledGrowLight: next });
                    EdgeNotice.toast(`[${zone.name}] 생장 보광등 ${next ? '점등' : '소등'}`);
                  }}
                  className={`w-full py-1 rounded text-[11px] font-semibold transition ${
                    actuator.ledGrowLight
                      ? 'bg-pink-600 hover:bg-pink-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {actuator.ledGrowLight ? 'LED 소등' : 'LED 점등'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
