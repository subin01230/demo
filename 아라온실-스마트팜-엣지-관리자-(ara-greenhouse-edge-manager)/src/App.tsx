import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { GreenhouseOverview } from './components/GreenhouseOverview';
import { ZoneDetailView } from './components/ZoneDetailView';
import { ActuatorControl } from './components/ActuatorControl';
import { NotificationConsole } from './components/NotificationConsole';
import { EdgeDevicesList } from './components/EdgeDevicesList';
import { AlarmRulesAndLogs } from './components/AlarmRulesAndLogs';
import { QuickNoticeFloatingTester } from './components/QuickNoticeFloatingTester';
import {
  INITIAL_ZONES,
  INITIAL_ACTUATORS,
  INITIAL_EDGE_DEVICES,
  INITIAL_LOGS,
} from './data/mockFarmData';
import {
  ZoneConfig,
  ActuatorState,
  EdgeDevice,
  NotificationLogItem,
} from './types/smartfarm';
import { AG, EdgeNotice, onNotificationLog } from './lib/agToolkit';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-1');
  const [zones, setZones] = useState<ZoneConfig[]>(INITIAL_ZONES);
  const [actuators, setActuators] = useState<Record<string, ActuatorState>>(INITIAL_ACTUATORS);
  const [devices, setDevices] = useState<EdgeDevice[]>(INITIAL_EDGE_DEVICES);
  const [logs, setLogs] = useState<NotificationLogItem[]>(INITIAL_LOGS);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Subscribe to all AG.Notification events to feed the audit logs
  useEffect(() => {
    const unsubscribe = onNotificationLog((newLog) => {
      setLogs((prev) => [newLog, ...prev]);
    });

    // Welcome initial toast
    setTimeout(() => {
      EdgeNotice.toast('아라온실 엣지 관리자 시스템이 준비되었습니다. (Full HD / Windows 호환)');
    }, 600);

    return () => unsubscribe();
  }, []);

  // Sensor data fluctuation simulation timer
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setZones((prevZones) =>
        prevZones.map((z) => {
          const tempDelta = (Math.random() - 0.5) * 0.15;
          const humidDelta = (Math.random() - 0.5) * 0.3;
          const co2Delta = (Math.random() - 0.5) * 6;
          const solarDelta = (Math.random() - 0.5) * 8;

          return {
            ...z,
            sensors: {
              ...z.sensors,
              temperature: Math.max(12, Math.min(38, z.sensors.temperature + tempDelta)),
              humidity: Math.max(30, Math.min(98, z.sensors.humidity + humidDelta)),
              co2: Math.max(400, Math.min(1500, z.sensors.co2 + co2Delta)),
              solarRadiation: Math.max(50, Math.min(1200, z.sensors.solarRadiation + solarDelta)),
            },
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleSelectZone = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    setActiveTab('zone-detail');
  };

  const handleUpdateActuator = (zoneId: string, updates: Partial<ActuatorState>) => {
    setActuators((prev) => ({
      ...prev,
      [zoneId]: {
        ...prev[zoneId],
        ...updates,
      },
    }));
  };

  const handleUpdateTargetTemp = (zoneId: string, target: number) => {
    setZones((prev) =>
      prev.map((z) =>
        z.id === zoneId
          ? {
              ...z,
              targetTemp: {
                ...z.targetTemp,
                currentTarget: target,
              },
            }
          : z
      )
    );
  };

  const handleAddDevice = (device: EdgeDevice) => {
    setDevices((prev) => [device, ...prev]);
  };

  const handleClearLogs = () => {
    setLogs([]);
    EdgeNotice.toast('알림 감사 로그가 초기화되었습니다.');
  };

  // Simulating anomalous event triggers (using official AG.Notification / EdgeNotice APIs)
  const handleSimulateAlert = (zoneId: string, alertType: string) => {
    const targetZone = zones.find((z) => z.id === zoneId) || zones[0];

    if (alertType === 'high_temp') {
      // InfoMessage call
      EdgeNotice.info(
        `${targetZone.name} 고온 경보`,
        `측정 온도: 34.5°C (기준 상한치 26.0°C 초과). 천창 환기율 조정을 권장합니다.`,
        4000
      );
    } else if (alertType === 'humidity_trap') {
      // Interactive Message with action
      const markup = `
        <group-row class="border background-white">
          <row-start align="start" class="background-gray-light padding-4">
            <i class="bi bi-droplet-half text-sky-600"></i>
            <div class="text-bold margin-left-4">${targetZone.name} 과습/결로 위험</div>
            <span class="margin-left-auto text-time">실시간 경보</span>
          </row-start>
          <div class="padding-6">
            <p class="text-xs text-gray-700 leading-relaxed">
              상대습도 <strong>94.2%</strong>로 곰팡이병 발생 위험이 감지되었습니다. 강제 배기 유동팬을 3단으로 가동하시겠습니까?
            </p>
            <row-between class="margin-top-4 gap-4 flex justify-end">
              <button
                type="button"
                data-action="fan-on"
                class="button button-small color-indigo font-semibold px-3 py-1.5 rounded"
              >유동팬 3단 가동</button>
              <button
                type="button"
                data-action="close"
                class="button button-small color-gray px-3 py-1.5 rounded"
              >무시</button>
            </row-between>
          </div>
        </group-row>
      `;

      AG.Notification.Message(markup, function () {
        const item = this;
        const fanBtn = item.querySelector('[data-action="fan-on"]');
        const closeBtn = item.querySelector('[data-action="close"]');

        fanBtn?.addEventListener('click', () => {
          handleUpdateActuator(zoneId, { circulationFan: true, circulationFanSpeed: 3 });
          item.remove();
          EdgeNotice.toast(`[${targetZone.name}] 유동팬 3단 급속 환기가 시작되었습니다.`);
        }, { once: true });

        closeBtn?.addEventListener('click', () => {
          item.remove();
        }, { once: true });
      });
    } else if (alertType === 'ec_spike') {
      // Danger alert with sound
      EdgeNotice.dangerAlert(
        `${targetZone.name} 양액 EC 급상승`,
        `현재 배지 EC: 3.45 dS/m (적정 상한치 2.8 dS/m 초과). 작물 뿌리 염류 장해 방지를 위해 즉시 급수를 일시 차단합니다.`,
        () => {
          handleUpdateActuator(zoneId, { irrigationPump: false, nutrientValve: false });
          EdgeNotice.toast(`[${targetZone.name}] 양액 밸브가 안전 차단되었습니다.`);
        }
      );
    }
  };

  // Preset Scenario Handlers
  const handleSimulateAlarmScenario = (scenario: string) => {
    if (scenario === 'heatwave') {
      EdgeNotice.info(
        '폭염 비상 경보 발령',
        '외기 일사량 950 W/m², 외기 온도 36°C 초과. 전체 온실 차광막 70% 전개 및 포그 냉방 가동을 권장합니다.',
        4500
      );
    } else if (scenario === 'frost') {
      EdgeNotice.dangerAlert(
        '동절기 한파 저온 경보',
        '제3온실 실내 온도 8.2°C 급락 감지. 난방 보일러 순환 밸브를 긴급 개방하시겠습니까?',
        () => {
          EdgeNotice.toast('보일러 순환 펌프 가동 및 보온커튼 밀폐 완료');
        }
      );
    } else if (scenario === 'ec_imbalance') {
      EdgeNotice.info(
        '양액기 혼합 탱크 비율 이상',
        'A/B액 혼합비 편차 18% 발생. 희석수 밸브 자동 보정을 실행합니다.'
      );
    } else if (scenario === 'power_fail') {
      EdgeNotice.dangerAlert(
        '한전 상용 전원 정전 발생',
        '비상 디젤 발전기 자동 기동 중. 비필수 조명 차단 및 엣지 제어기 UPS 배터리 모드로 전환되었습니다.',
        () => {
          EdgeNotice.toast('비상 발전기 전력 동기화 완료 (100% 가동)');
        }
      );
    }
  };

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0];
  const unhandledAlertsCount = logs.filter((l) => l.severity === 'danger' || l.severity === 'warning').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unhandledAlertsCount={unhandledAlertsCount}
      />

      {/* Main Content Workspace (Full HD Windows Desktop Responsive) */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 pb-20">
        {activeTab === 'overview' && (
          <GreenhouseOverview
            zones={zones}
            actuators={actuators}
            onSelectZone={handleSelectZone}
            onSimulateAlert={handleSimulateAlert}
            isSimulating={isSimulating}
            setIsSimulating={setIsSimulating}
          />
        )}

        {activeTab === 'zone-detail' && (
          <ZoneDetailView
            zone={selectedZone}
            actuator={actuators[selectedZone.id] || actuators['zone-1']}
            onUpdateActuator={handleUpdateActuator}
            onUpdateTargetTemp={handleUpdateTargetTemp}
          />
        )}

        {activeTab === 'actuators' && (
          <ActuatorControl
            zones={zones}
            actuators={actuators}
            onUpdateActuator={handleUpdateActuator}
          />
        )}

        {activeTab === 'notification-lab' && <NotificationConsole />}

        {activeTab === 'devices' && (
          <EdgeDevicesList
            devices={devices}
            onAddDevice={handleAddDevice}
          />
        )}

        {activeTab === 'logs' && (
          <AlarmRulesAndLogs
            logs={logs}
            onClearLogs={handleClearLogs}
            onSimulateAlarmScenario={handleSimulateAlarmScenario}
          />
        )}
      </main>

      {/* Floating 1-Click Notification API Quick Trigger */}
      <QuickNoticeFloatingTester />
    </div>
  );
}
