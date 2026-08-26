import { soundManager } from './sound';
import { NotificationLogItem } from '../types/smartfarm';

// Helper to escape untrusted HTML
export function escapeForHtml(value: unknown): string {
  if (typeof document === 'undefined') return String(value ?? '');
  const holder = document.createElement('div');
  holder.textContent = String(value ?? '');
  return holder.innerHTML;
}

// Format time as 오전/오후 H:mm as specified in Ara technical doc
export function formatKoreanTime(date: Date = new Date()): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? '오후' : '오전';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${period} ${displayHours}:${minutes}`;
}

export type NotificationEventListener = (log: NotificationLogItem) => void;
const listeners: Set<NotificationEventListener> = new Set();

export function onNotificationLog(listener: NotificationEventListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function broadcastLog(log: NotificationLogItem) {
  listeners.forEach((fn) => fn(log));
}

// -------------------------------------------------------------
// AG.Notification Native Implementation (as specified in Ara Greenhouse Doc)
// -------------------------------------------------------------

export interface AGNamespace {
  Notification: {
    Toast: (html: string, duration?: number) => HTMLElement;
    Message: (
      html: string,
      callback?: ((this: HTMLElement, item: HTMLElement) => void) | null,
      duration?: number
    ) => HTMLElement;
    InfoMessage: (title: string, message: string, duration?: number) => HTMLElement;
    DiscoverMessage: (data: { clientId: string; name?: string; type?: string; message?: string; [key: string]: unknown }) => HTMLElement;
  };
}

declare global {
  interface Window {
    AG?: AGNamespace;
  }
}

class AraNotificationEngine {
  private toastContainer: HTMLElement | null = null;
  private messageContainer: HTMLElement | null = null;

  private getToastContainer(): HTMLElement {
    if (!this.toastContainer || !document.body.contains(this.toastContainer)) {
      let el = document.querySelector('notification-toast') as HTMLElement;
      if (!el) {
        el = document.createElement('notification-toast');
        el.setAttribute('id', 'ag-notification-toast-container');
        document.body.appendChild(el);
      }
      this.toastContainer = el;
    }
    return this.toastContainer;
  }

  private getMessageContainer(): HTMLElement {
    if (!this.messageContainer || !document.body.contains(this.messageContainer)) {
      let el = document.querySelector('notification-message') as HTMLElement;
      if (!el) {
        el = document.createElement('notification-message');
        el.setAttribute('id', 'ag-notification-message-container');
        document.body.appendChild(el);
      }
      this.messageContainer = el;
    }
    return this.messageContainer;
  }

  public Toast(html: string, duration = 3000): HTMLElement {
    const container = this.getToastContainer();
    const item = document.createElement('toast-item');
    item.className = 'ag-toast-item';
    item.innerHTML = html;

    container.appendChild(item);
    soundManager.playBeep('toast');

    // Broadcast log for audit trail
    const textPreview = item.textContent || html;
    broadcastLog({
      id: 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      type: 'toast',
      content: textPreview,
      timestamp: new Date().toLocaleTimeString('ko-KR'),
      severity: 'info',
      handled: true,
    });

    if (duration > 0) {
      setTimeout(() => {
        if (item.parentNode) {
          item.classList.add('fade-out');
          setTimeout(() => item.remove(), 250);
        }
      }, duration);
    }

    return item;
  }

  public Message(
    html: string,
    callback: ((this: HTMLElement, item: HTMLElement) => void) | null = null,
    duration = 0
  ): HTMLElement {
    const container = this.getMessageContainer();
    const item = document.createElement('message-item');
    item.className = 'ag-message-item';
    item.innerHTML = html;

    container.appendChild(item);
    soundManager.playBeep('info');

    // Execute callback with `this` bound to item (as verified in the Ara technical document)
    if (typeof callback === 'function') {
      try {
        callback.call(item, item);
      } catch (err) {
        console.error('[AG.Notification.Message] Callback execution error:', err);
      }
    }

    const textPreview = item.textContent || html;
    broadcastLog({
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      type: 'message',
      content: textPreview.slice(0, 120),
      timestamp: new Date().toLocaleTimeString('ko-KR'),
      severity: 'warning',
      handled: false,
    });

    if (duration > 0) {
      setTimeout(() => {
        if (item.parentNode) {
          item.classList.add('slide-out');
          setTimeout(() => item.remove(), 250);
        }
      }, duration);
    }

    return item;
  }

  public InfoMessage(title: string, message: string, duration = 3000): HTMLElement {
    const timeStr = formatKoreanTime();
    const markup = `
      <group-row class="border background-white info-message-box">
        <row-start align="start" class="background-gray-light padding-4 message-header">
          <span class="info-icon"><i class="bi bi-info-circle-fill"></i></span>
          <div class="text-bold margin-left-4 message-title">${title}</div>
          <span class="margin-left-auto text-time">${timeStr}</span>
          <button type="button" data-action="close" class="close-icon-btn" aria-label="닫기">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </row-start>
        <row-start align="start" class="padding-6 message-body">
          ${message}
        </row-start>
      </group-row>
    `;

    return this.Message(markup, function () {
      const item = this;
      const closeBtn = item.querySelector('[data-action="close"]');
      if (closeBtn) {
        closeBtn.addEventListener(
          'click',
          (e) => {
            e.stopPropagation();
            item.classList.add('slide-out');
            setTimeout(() => item.remove(), 200);
          },
          { once: true }
        );
      }
    }, duration);
  }

  public DiscoverMessage(data: { clientId: string; name?: string; type?: string; message?: string; [key: string]: unknown }): HTMLElement {
    const timeStr = formatKoreanTime();
    const safeClientId = escapeForHtml(data.clientId || 'UNKNOWN-NODE');
    const safeDeviceName = escapeForHtml(data.name || `아라 엣지 센서 노드 (${safeClientId})`);
    const safeType = escapeForHtml(data.type || '환경 복합 센서');

    const markup = `
      <group-row class="border background-white discover-message-box">
        <row-start align="start" class="background-indigo-light padding-4 message-header">
          <span class="discover-icon"><i class="bi bi-router"></i></span>
          <div class="text-bold margin-left-4 message-title text-indigo-900">새 엣지 장치 발견 (Discovery)</div>
          <span class="margin-left-auto text-time">${timeStr}</span>
          <button type="button" data-action="close" class="close-icon-btn" aria-label="닫기">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </row-start>
        <div class="padding-6 message-body">
          <div class="discover-card">
            <div class="device-badge">Client ID: <code>${safeClientId}</code></div>
            <div class="device-title">${safeDeviceName}</div>
            <div class="device-meta">장치 유형: ${safeType} | IP: 192.168.1.182</div>
          </div>
          <div class="discover-actions">
            <button type="button" data-action="register" class="btn-ag-primary">장치 등록 및 활성화</button>
            <button type="button" data-action="ignore" class="btn-ag-secondary">무시</button>
          </div>
        </div>
      </group-row>
    `;

    return this.Message(markup, function () {
      const item = this;
      const closeBtn = item.querySelector('[data-action="close"]');
      const registerBtn = item.querySelector('[data-action="register"]');
      const ignoreBtn = item.querySelector('[data-action="ignore"]');

      const dismiss = () => {
        item.classList.add('slide-out');
        setTimeout(() => item.remove(), 200);
      };

      if (closeBtn) closeBtn.addEventListener('click', dismiss, { once: true });
      if (ignoreBtn) ignoreBtn.addEventListener('click', dismiss, { once: true });

      if (registerBtn) {
        registerBtn.addEventListener('click', () => {
          dismiss();
          window.AG?.Notification?.Toast?.(
            `<strong>[장치 등록 완료]</strong> ${safeDeviceName} 장치가 정상 연동되었습니다.`,
            3000
          );
        }, { once: true });
      }
    }, 0);
  }
}

const engine = new AraNotificationEngine();

export const AG: AGNamespace = {
  Notification: {
    Toast: (html: string, duration = 3000) => engine.Toast(html, duration),
    Message: (html: string, callback = null, duration = 0) => engine.Message(html, callback, duration),
    InfoMessage: (title: string, message: string, duration = 3000) => engine.InfoMessage(title, message, duration),
    DiscoverMessage: (data) => engine.DiscoverMessage(data),
  },
};

// Expose globally on window for full compatibility with native scripts as per technical doc
if (typeof window !== 'undefined') {
  (window as unknown as { AG: AGNamespace }).AG = AG;
}

// -------------------------------------------------------------
// Section 7: Team Recommended Wrapper (EdgeNotice)
// -------------------------------------------------------------
export const EdgeNotice = {
  DEFAULT_DURATION: 3000,

  text(value: unknown): string {
    return escapeForHtml(value);
  },

  toast(message: string, duration: number = this.DEFAULT_DURATION): HTMLElement {
    return AG.Notification.Toast(this.text(message), duration);
  },

  info(title: string, message: string, duration: number = this.DEFAULT_DURATION): HTMLElement {
    return AG.Notification.InfoMessage(
      this.text(title),
      this.text(message),
      duration
    );
  },

  persistent(
    markup: string,
    initialize?: (item: HTMLElement) => void
  ): HTMLElement {
    return AG.Notification.Message(markup, function () {
      initialize?.(this);
    });
  },

  // Smart farm specific high priority alert
  dangerAlert(title: string, message: string, onConfirm?: () => void): HTMLElement {
    soundManager.playBeep('danger');
    const safeTitle = this.text(title);
    const safeMsg = this.text(message);
    const timeStr = formatKoreanTime();

    const markup = `
      <group-row class="border border-red-500 background-white danger-alert-box">
        <row-start align="start" class="background-red-600 padding-4 text-white message-header">
          <span class="warning-icon"><i class="bi bi-exclamation-triangle-fill"></i></span>
          <div class="text-bold margin-left-4 message-title">[긴급 경보] ${safeTitle}</div>
          <span class="margin-left-auto text-time text-red-100">${timeStr}</span>
        </row-start>
        <div class="padding-6 message-body">
          <div class="text-danger-content font-medium text-gray-800">${safeMsg}</div>
          <row-between class="padding-2 gap-4 margin-top-4 flex items-center justify-end">
            <button
              type="button"
              data-action="confirm"
              class="button button-small color-red font-bold px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >조치 확인</button>
            <button
              type="button"
              data-action="close"
              class="button button-small color-gray px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >닫기</button>
          </row-between>
        </div>
      </group-row>
    `;

    return AG.Notification.Message(markup, function () {
      const item = this;
      const confirmBtn = item.querySelector('[data-action="confirm"]');
      const closeBtn = item.querySelector('[data-action="close"]');

      confirmBtn?.addEventListener('click', () => {
        onConfirm?.();
        item.classList.add('slide-out');
        setTimeout(() => item.remove(), 200);
      }, { once: true });

      closeBtn?.addEventListener('click', () => {
        item.classList.add('slide-out');
        setTimeout(() => item.remove(), 200);
      }, { once: true });
    }, 0);
  }
};
