import React, { useState } from 'react';
import {
  Wifi,
  Radio,
  Server,
  RefreshCw,
  Plus,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Activity,
  HardDrive,
} from 'lucide-react';
import { EdgeDevice } from '../types/smartfarm';
import { AG, EdgeNotice } from '../lib/agToolkit';

interface EdgeDevicesListProps {
  devices: EdgeDevice[];
  onAddDevice: (device: EdgeDevice) => void;
}

export const EdgeDevicesList: React.FC<EdgeDevicesListProps> = ({
  devices,
  onAddDevice,
}) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScanDiscovery = () => {
    setIsScanning(true);
    EdgeNotice.toast('로컬 엣지 서브넷(192.168.1.0/24) mDNS/SSDP 스캔 시작...');

    setTimeout(() => {
      setIsScanning(false);
      const randomNodeNum = Math.floor(100 + Math.random() * 900);
      const newClientId = `NODE-SN-${randomNodeNum}`;
      const newDeviceName = `제${(randomNodeNum % 3) + 1}온실 고정밀 멀티센서 노드`;

      // Trigger Ara Greenhouse DiscoverMessage
      AG.Notification.DiscoverMessage({
        clientId: newClientId,
        name: newDeviceName,
        type: '무선 온습도·CO2·일사 복합 센서',
      });
    }, 1800);
  };

  const handlePingDevice = (device: EdgeDevice) => {
    EdgeNotice.toast(`[PING] ${device.name} (${device.ipAddress}): 응답시간 2.4ms (정상)`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5" />
                아라온실 엣지 메쉬 네트워크 (Edge Mesh v2.4)
              </span>
              <span className="text-xs text-slate-400">총 {devices.length}대 연결됨</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">엣지 노드 및 장치 디스커버리 관리</h2>
            <p className="text-xs text-slate-300">
              스마트 온실 내 분산 배치된 센서 노드, 구동기 제어기, 관수 스테이션의 연결 상태를 진단하고 <code>DiscoverMessage</code> API를 통해 새 장치를 자동 등록합니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleScanDiscovery}
              disabled={isScanning}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? '새 장치 스캔 중...' : '새 엣지 노드 검색 (Discover)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {devices.map((device) => {
          return (
            <div
              key={device.id}
              className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 shadow-md hover:border-indigo-500/60 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{device.name}</h3>
                      <span className="text-[11px] font-mono text-indigo-300">{device.id}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    정상
                  </span>
                </div>

                <div className="mt-4 bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>IP 주소:</span>
                    <span className="text-slate-200">{device.ipAddress}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>MAC 주소:</span>
                    <span className="text-slate-200">{device.macAddress}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>펌웨어:</span>
                    <span className="text-slate-200">{device.firmwareVersion}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>신호 세기:</span>
                    <span className="text-emerald-400">{device.signalStrength} dBm (양호)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">마지막 통신: {device.lastPing}</span>
                <button
                  onClick={() => handlePingDevice(device)}
                  className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded text-xs font-medium transition"
                >
                  PING 진단
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
