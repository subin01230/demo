import React, { useState } from 'react';
import {
  Sliders,
  Wind,
  Sun,
  Droplets,
  Zap,
  Flame,
  CloudRain,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { ZoneConfig, ActuatorState } from '../types/smartfarm';
import { EdgeNotice, AG } from '../lib/agToolkit';

interface ActuatorControlProps {
  zones: ZoneConfig[];
  actuators: Record<string, ActuatorState>;
  onUpdateActuator: (zoneId: string, updates: Partial<ActuatorState>) => void;
}

export const ActuatorControl: React.FC<ActuatorControlProps> = ({
  zones,
  actuators,
  onUpdateActuator,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-1');
  const activeZone = zones.find((z) => z.id === selectedZoneId) || zones[0];
  const activeActuator = actuators[selectedZoneId] || actuators['zone-1'];

  const handleAllVentOpen = (percent: number) => {
    onUpdateActuator(selectedZoneId, {
      roofVentLeft: percent,
      roofVentRight: percent,
      sideVent: percent > 50 ? 50 : percent,
    });
    EdgeNotice.toast(`[${activeZone.name}] 전체 환기창 ${percent}% 설정 완료`);
  };

  const handleApplyNightPreset = () => {
    // Safety check with AG.Notification.Message
    const markup = `
      <group-row class="border background-white">
        <row-start align="start" class="background-indigo-light padding-4">
          <i class="bi bi-moon-stars text-indigo-600"></i>
          <div class="text-bold margin-left-4">${activeZone.name} 야간 모드 일괄 전환</div>
          <span class="margin-left-auto text-time">모드 전환</span>
        </row-start>
        <div class="padding-6">
          <p class="text-xs text-gray-700 leading-relaxed">
            - 천창/측창: 완전 밀폐 (0%)<br/>
            - 보온 다겹커튼: 100% 전개<br/>
            - LED 보광등: 소등<br/>
            - 유동팬: 1단 미풍 가동
          </p>
          <row-between class="margin-top-4 gap-4 flex justify-end">
            <button
              type="button"
              data-action="apply-preset"
              class="button button-small color-indigo font-semibold px-3 py-1.5 rounded"
            >일괄 적용</button>
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
      const applyBtn = item.querySelector('[data-action="apply-preset"]');
      const closeBtn = item.querySelector('[data-action="close"]');

      applyBtn?.addEventListener('click', () => {
        onUpdateActuator(selectedZoneId, {
          roofVentLeft: 0,
          roofVentRight: 0,
          sideVent: 0,
          thermalScreen: 100,
          shadeScreen: 0,
          ledGrowLight: false,
          circulationFan: true,
          circulationFanSpeed: 1,
        });
        item.remove();
        EdgeNotice.info(
          `${activeZone.name} 야간 프리셋 적용 완료`,
          '천창 닫힘 및 보온커튼 100% 전개가 완료되었습니다.'
        );
      }, { once: true });

      closeBtn?.addEventListener('click', () => {
        item.remove();
      }, { once: true });
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Zone Switcher */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" />
                8-채널 엣지 모터 및 밸브 구동 드라이버
              </span>
              <span className="text-xs text-slate-400">RS-485 / Modbus-RTU</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">온실 구동기 마스터 컨트롤러</h2>
            <p className="text-xs text-slate-300">
              천창/측창 개폐 모터, 차광/보온 스크린, 유동팬, 관수 펌프, CO2 및 보광등을 수동 조작하거나 프리셋을 적용합니다.
            </p>
          </div>

          {/* Zone Selector Buttons */}
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg border border-slate-700">
            {zones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
                  selectedZoneId === zone.id
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {zone.name.split(' ')[0]} ({zone.crop.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preset Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={handleApplyNightPreset}
          className="p-4 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400">🌙 야간 보온 프리셋</span>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">1-Click</span>
          </div>
          <div className="text-sm font-bold text-white mt-1 group-hover:text-indigo-300">야간 단열 밀폐 모드</div>
          <div className="text-xs text-slate-400 mt-0.5">천창 0%, 보온커튼 100%, LED 소등</div>
        </button>

        <button
          onClick={() => handleAllVentOpen(50)}
          className="p-4 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400">💨 주간 표준 환기</span>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">1-Click</span>
          </div>
          <div className="text-sm font-bold text-white mt-1 group-hover:text-sky-300">자연 환기 50% 개방</div>
          <div className="text-xs text-slate-400 mt-0.5">좌/우 천창 50%, 유동팬 2단 가동</div>
        </button>

        <button
          onClick={() => {
            onUpdateActuator(selectedZoneId, {
              shadeScreen: 70,
              fogCooling: true,
              roofVentLeft: 60,
              roofVentRight: 60,
            });
            EdgeNotice.info(
              `${activeZone.name} 고온/강일사 차광 냉방 가동`,
              '차광막 70% 전개 및 포그 냉방 시스템이 활성화되었습니다.'
            );
          }}
          className="p-4 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400">☀️ 한낮 폭염 차광/포그</span>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">1-Click</span>
          </div>
          <div className="text-sm font-bold text-white mt-1 group-hover:text-amber-300">긴급 차광 & 포그 냉방</div>
          <div className="text-xs text-slate-400 mt-0.5">차광막 70%, 포그 분무 가동</div>
        </button>
      </div>

      {/* Detailed Actuator Sliders & Switches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Roof Vents (천창) */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-sky-400" />
              <h3 className="font-bold text-sm text-white">좌/우 천창 개폐 (Roof Vent)</h3>
            </div>
            <span className="text-xs font-bold text-sky-400">{activeActuator.roofVentLeft}%</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>좌측 천창 모터:</span>
                <span className="font-bold text-sky-400">{activeActuator.roofVentLeft}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={activeActuator.roofVentLeft}
                onChange={(e) =>
                  onUpdateActuator(selectedZoneId, { roofVentLeft: parseInt(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>우측 천창 모터:</span>
                <span className="font-bold text-sky-400">{activeActuator.roofVentRight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={activeActuator.roofVentRight}
                onChange={(e) =>
                  onUpdateActuator(selectedZoneId, { roofVentRight: parseInt(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            <div className="flex gap-1.5 pt-1">
              <button
                onClick={() => handleAllVentOpen(0)}
                className="flex-1 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 font-semibold"
              >
                완폐 (0%)
              </button>
              <button
                onClick={() => handleAllVentOpen(30)}
                className="flex-1 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 font-semibold"
              >
                30%
              </button>
              <button
                onClick={() => handleAllVentOpen(100)}
                className="flex-1 py-1.5 bg-sky-600 hover:bg-sky-500 rounded text-white font-semibold"
              >
                완개 (100%)
              </button>
            </div>
          </div>
        </div>

        {/* 2. Shading & Thermal Screen (차광/보온) */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm text-white">차광막 / 보온 스크린</h3>
            </div>
            <span className="text-xs font-bold text-amber-400">{activeActuator.shadeScreen}%</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>차광 스크린 (알루미늄):</span>
                <span className="font-bold text-amber-400">{activeActuator.shadeScreen}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={activeActuator.shadeScreen}
                onChange={(e) =>
                  onUpdateActuator(selectedZoneId, { shadeScreen: parseInt(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>보온 다겹커튼 (야간용):</span>
                <span className="font-bold text-indigo-400">{activeActuator.thermalScreen}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={activeActuator.thermalScreen}
                onChange={(e) =>
                  onUpdateActuator(selectedZoneId, { thermalScreen: parseInt(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-700 rounded appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="flex gap-1.5 pt-1">
              <button
                onClick={() => {
                  onUpdateActuator(selectedZoneId, { shadeScreen: 0, thermalScreen: 0 });
                  EdgeNotice.toast(`[${activeZone.name}] 모든 스크린 닫힘 (0%)`);
                }}
                className="flex-1 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 font-semibold"
              >
                전체 수납 (0%)
              </button>
              <button
                onClick={() => {
                  onUpdateActuator(selectedZoneId, { shadeScreen: 50 });
                  EdgeNotice.toast(`[${activeZone.name}] 차광막 50% 전개`);
                }}
                className="flex-1 py-1.5 bg-amber-600 hover:bg-amber-500 rounded text-white font-semibold"
              >
                차광 50%
              </button>
            </div>
          </div>
        </div>

        {/* 3. Fans & Environmental Auxiliaries */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">유동팬 & 보조 환경기</h3>
            </div>
            <span className="text-xs font-bold text-emerald-400">
              {activeActuator.circulationFan ? 'ON' : 'OFF'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2 bg-slate-900 rounded">
              <div>
                <div className="font-semibold text-slate-200">공기 순환 유동팬</div>
                <div className="text-[11px] text-slate-400">정체 공기 순환 및 결로 방지</div>
              </div>
              <button
                onClick={() => {
                  const next = !activeActuator.circulationFan;
                  onUpdateActuator(selectedZoneId, { circulationFan: next });
                  EdgeNotice.toast(`[${activeZone.name}] 유동팬 ${next ? '가동' : '정지'}`);
                }}
                className={`px-3 py-1.5 rounded font-bold transition ${
                  activeActuator.circulationFan
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {activeActuator.circulationFan ? '가동 중' : '정지됨'}
              </button>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-900 rounded">
              <div>
                <div className="font-semibold text-slate-200">CO₂ 가스 시비기</div>
                <div className="text-[11px] text-slate-400">주간 광합성 촉진 (800~1000ppm)</div>
              </div>
              <button
                onClick={() => {
                  const next = !activeActuator.co2Generator;
                  onUpdateActuator(selectedZoneId, { co2Generator: next });
                  EdgeNotice.toast(`[${activeZone.name}] CO₂ 시비기 ${next ? '가동' : '정지'}`);
                }}
                className={`px-3 py-1.5 rounded font-bold transition ${
                  activeActuator.co2Generator
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {activeActuator.co2Generator ? '시비 중' : '대기'}
              </button>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-900 rounded">
              <div>
                <div className="font-semibold text-slate-200">생장 LED 보광등</div>
                <div className="text-[11px] text-slate-400">PPFD 보광 (흐린 날/동절기)</div>
              </div>
              <button
                onClick={() => {
                  const next = !activeActuator.ledGrowLight;
                  onUpdateActuator(selectedZoneId, { ledGrowLight: next });
                  EdgeNotice.toast(`[${activeZone.name}] LED 보광등 ${next ? '점등' : '소등'}`);
                }}
                className={`px-3 py-1.5 rounded font-bold transition ${
                  activeActuator.ledGrowLight
                    ? 'bg-pink-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {activeActuator.ledGrowLight ? '점등 ON' : '소등'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
