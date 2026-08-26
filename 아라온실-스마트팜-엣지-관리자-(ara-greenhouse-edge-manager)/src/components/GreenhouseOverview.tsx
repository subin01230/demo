import React from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Sprout,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Gauge,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ZoneConfig, ActuatorState } from '../types/smartfarm';
import { EdgeNotice } from '../lib/agToolkit';

interface GreenhouseOverviewProps {
  zones: ZoneConfig[];
  actuators: Record<string, ActuatorState>;
  onSelectZone: (zoneId: string) => void;
  onSimulateAlert: (zoneId: string, alertType: string) => void;
  isSimulating: boolean;
  setIsSimulating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GreenhouseOverview: React.FC<GreenhouseOverviewProps> = ({
  zones,
  actuators,
  onSelectZone,
  onSimulateAlert,
  isSimulating,
  setIsSimulating,
}) => {
  const triggerQuickSyncToast = () => {
    EdgeNotice.toast('전체 3개 온실 구역 환경 데이터 동기화 완료 (3,000ms 자동 소멸)');
  };

  const triggerDailySummary = () => {
    EdgeNotice.info(
      '일일 온실 종합 리포트',
      '금일 총 누적 일사량: 1,840 J/cm² | 평균 온·습도 정상 범위 유지 중'
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Farm KPI Summary */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 shadow-lg backdrop-blur">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                정상 가동 중 (3개 온실동 100% 가동)
              </span>
              <span className="text-xs text-slate-400">아라온실 엣지 v2.6 엔진</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">스마트 온실 통합 환경 관제 센터</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              각 온실동의 실시간 환경 센서 데이터와 엣지 제어기 상태를 모니터링하고 이상 발생 시 Notification API로 즉각 통지합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                isSimulating
                  ? 'bg-amber-600/80 hover:bg-amber-600 text-white shadow'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSimulating ? '실시간 센서 시뮬레이션 일시정지' : '실시간 시뮬레이션 재개'}</span>
            </button>
            <button
              onClick={triggerQuickSyncToast}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Activity className="w-4 h-4" />
              <span>동기화 토스트 (Toast)</span>
            </button>
            <button
              onClick={triggerDailySummary}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4" />
              <span>일일 요약 알림 (Info)</span>
            </button>
          </div>
        </div>

        {/* External Weather Bar */}
        <div className="mt-4 pt-4 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2.5">
            <Sun className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-slate-400">외기 온도 / 일사량</div>
              <div className="font-semibold text-slate-200">28.4°C / 780 W/m²</div>
            </div>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2.5">
            <Droplets className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <div className="text-slate-400">외기 상대습도</div>
              <div className="font-semibold text-slate-200">54.2 %</div>
            </div>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2.5">
            <Wind className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <div className="text-slate-400">외기 풍향 / 풍속</div>
              <div className="font-semibold text-slate-200">남서풍 2.8 m/s (안전)</div>
            </div>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 flex items-center gap-2.5">
            <Gauge className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <div className="text-slate-400">강우 감지 / 대기압</div>
              <div className="font-semibold text-emerald-400">무강우 (1013.2 hPa)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Zone Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {zones.map((zone) => {
          const actuator = actuators[zone.id];
          const isTempWarning =
            zone.sensors.temperature < zone.targetTemp.min ||
            zone.sensors.temperature > zone.targetTemp.max;
          const isHumidWarning =
            zone.sensors.humidity < zone.targetHumidity.min ||
            zone.sensors.humidity > zone.targetHumidity.max;

          return (
            <div
              key={zone.id}
              className="bg-slate-800/90 border border-slate-700 rounded-xl overflow-hidden shadow-md hover:border-emerald-500/50 transition flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="p-4 bg-slate-850 border-b border-slate-700/80 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-base text-white">{zone.name}</h3>
                  </div>
                  <div className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                    <span className="text-emerald-300 font-medium">{zone.crop}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{zone.growthStage}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      isTempWarning || isHumidWarning
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {isTempWarning || isHumidWarning ? '주의 요망' : '최적 환경'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    {actuator.autoMode ? '🤖 자동 제어' : '✋ 수동 모드'}
                  </span>
                </div>
              </div>

              {/* Sensor Metrics Matrix */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Temperature */}
                  <div
                    className={`p-2.5 rounded-lg border ${
                      isTempWarning
                        ? 'bg-amber-950/40 border-amber-600/50 text-amber-200'
                        : 'bg-slate-900/80 border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Thermometer className="w-3.5 h-3.5 text-rose-400" /> 온도
                      </span>
                      <span className="text-[10px]">목표 {zone.targetTemp.currentTarget}°C</span>
                    </div>
                    <div className="text-xl font-bold mt-1 flex items-baseline gap-1">
                      {zone.sensors.temperature.toFixed(1)}
                      <span className="text-xs font-normal text-slate-400">°C</span>
                    </div>
                  </div>

                  {/* Humidity */}
                  <div
                    className={`p-2.5 rounded-lg border ${
                      isHumidWarning
                        ? 'bg-amber-950/40 border-amber-600/50 text-amber-200'
                        : 'bg-slate-900/80 border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Droplets className="w-3.5 h-3.5 text-sky-400" /> 습도
                      </span>
                      <span className="text-[10px]">
                        {zone.targetHumidity.min}~{zone.targetHumidity.max}%
                      </span>
                    </div>
                    <div className="text-xl font-bold mt-1 flex items-baseline gap-1">
                      {zone.sensors.humidity.toFixed(1)}
                      <span className="text-xs font-normal text-slate-400">%</span>
                    </div>
                  </div>

                  {/* CO2 */}
                  <div className="p-2.5 bg-slate-900/80 border border-slate-700/60 rounded-lg">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Wind className="w-3.5 h-3.5 text-emerald-400" /> CO₂ 농도
                      </span>
                    </div>
                    <div className="text-lg font-bold mt-1 text-slate-200 flex items-baseline gap-1">
                      {Math.round(zone.sensors.co2)}
                      <span className="text-xs font-normal text-slate-400">ppm</span>
                    </div>
                  </div>

                  {/* Solar */}
                  <div className="p-2.5 bg-slate-900/80 border border-slate-700/60 rounded-lg">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Sun className="w-3.5 h-3.5 text-amber-400" /> 일사량
                      </span>
                    </div>
                    <div className="text-lg font-bold mt-1 text-slate-200 flex items-baseline gap-1">
                      {Math.round(zone.sensors.solarRadiation)}
                      <span className="text-xs font-normal text-slate-400">W/m²</span>
                    </div>
                  </div>
                </div>

                {/* Sub Metrics: EC / pH / Soil Moisture */}
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 text-xs space-y-1.5">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">양액 EC / pH:</span>
                    <span className="font-mono font-semibold text-emerald-300">
                      {zone.sensors.ec.toFixed(2)} dS/m / pH {zone.sensors.ph.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">토양 수분 / 지온:</span>
                    <span className="font-mono font-semibold text-sky-300">
                      {zone.sensors.soilMoisture.toFixed(1)}% / {zone.sensors.soilTemp.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">수증기압차 (VPD):</span>
                    <span className="font-mono font-semibold text-indigo-300">
                      {zone.sensors.vpd.toFixed(2)} kPa
                    </span>
                  </div>
                </div>

                {/* Current Actuator Mini Status */}
                <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-850 p-2 rounded border border-slate-700/40">
                  <div className="flex-1 flex items-center gap-1">
                    <span className="text-slate-400">천창:</span>
                    <strong className="text-slate-200">{actuator.roofVentLeft}%</strong>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <span className="text-slate-400">유동팬:</span>
                    <strong className={actuator.circulationFan ? 'text-emerald-400' : 'text-slate-400'}>
                      {actuator.circulationFan ? `${actuator.circulationFanSpeed}단 ON` : 'OFF'}
                    </strong>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <span className="text-slate-400">관수:</span>
                    <strong className={actuator.irrigationPump ? 'text-sky-400' : 'text-slate-400'}>
                      {actuator.irrigationPump ? '급수 중' : '대기'}
                    </strong>
                  </div>
                </div>

                {/* Quick Simulation Trigger Buttons */}
                <div className="pt-2 border-t border-slate-700/60">
                  <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                    <span>⚡ Notification 테스트 트리거:</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => onSimulateAlert(zone.id, 'high_temp')}
                      className="px-2 py-1 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 rounded text-[11px] font-medium transition text-center"
                      title="온도 34.5°C 초과 경보 (InfoMessage)"
                    >
                      🔥 고온 이상
                    </button>
                    <button
                      onClick={() => onSimulateAlert(zone.id, 'humidity_trap')}
                      className="px-2 py-1 bg-sky-950/60 hover:bg-sky-900 border border-sky-800/60 text-sky-300 rounded text-[11px] font-medium transition text-center"
                      title="습도 94% 과포화 대화형 알림 (Message)"
                    >
                      💧 과습 경보
                    </button>
                    <button
                      onClick={() => onSimulateAlert(zone.id, 'ec_spike')}
                      className="px-2 py-1 bg-amber-950/60 hover:bg-amber-900 border border-amber-800/60 text-amber-300 rounded text-[11px] font-medium transition text-center"
                      title="양액 EC 급상승 긴급 알림 (Danger)"
                    >
                      🧪 EC 급변
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-3 bg-slate-900/80 border-t border-slate-700">
                <button
                  onClick={() => onSelectZone(zone.id)}
                  className="w-full py-2 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>{zone.name} 정밀 제어 및 시계열 보기</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
