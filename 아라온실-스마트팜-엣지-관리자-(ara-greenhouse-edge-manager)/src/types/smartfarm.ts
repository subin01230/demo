export type ZoneId = 'zone-1' | 'zone-2' | 'zone-3';

export interface SensorReading {
  temperature: number; // °C
  humidity: number; // %
  co2: number; // ppm
  solarRadiation: number; // W/m²
  soilMoisture: number; // %
  soilTemp: number; // °C
  ec: number; // dS/m (전기전도도)
  ph: number; // pH
  leafTemp: number; // °C
  vpd: number; // kPa (포화수증기압차)
}

export interface ZoneConfig {
  id: ZoneId;
  name: string;
  crop: string;
  growthStage: string;
  targetTemp: { min: number; max: number; currentTarget: number };
  targetHumidity: { min: number; max: number };
  targetCo2: { min: number; max: number };
  targetEc: { min: number; max: number };
  targetPh: { min: number; max: number };
  sensors: SensorReading;
  history: Array<{
    time: string;
    temperature: number;
    humidity: number;
    co2: number;
    solarRadiation: number;
  }>;
}

export interface ActuatorState {
  roofVentLeft: number; // 0-100%
  roofVentRight: number; // 0-100%
  sideVent: number; // 0-100%
  shadeScreen: number; // 0-100%
  thermalScreen: number; // 0-100%
  circulationFan: boolean; // on/off
  circulationFanSpeed: number; // 1-3
  irrigationPump: boolean;
  nutrientValve: boolean;
  ledGrowLight: boolean;
  ledIntensity: number; // 0-100%
  fogCooling: boolean;
  co2Generator: boolean;
  heatingSystem: boolean;
  autoMode: boolean;
}

export interface NotificationLogItem {
  id: string;
  type: 'toast' | 'info' | 'message' | 'discover';
  title?: string;
  content: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'danger' | 'success';
  zoneId?: ZoneId;
  handled?: boolean;
}

export interface EdgeDevice {
  id: string;
  name: string;
  type: 'sensor_node' | 'actuator_controller' | 'camera' | 'weather_station' | 'irrigation_unit';
  ipAddress: string;
  macAddress: string;
  firmwareVersion: string;
  status: 'connected' | 'unpaired' | 'updating';
  signalStrength: number; // dBm
  lastPing: string;
}
