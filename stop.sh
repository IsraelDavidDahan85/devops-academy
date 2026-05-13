#!/usr/bin/env bash
# Stop the academy + slides dev servers started by ./start.sh.
# Safe to run multiple times; only kills processes we recognize.

set -uo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
DEV_DIR="$ROOT/.dev"

ACADEMY_PORT=8000
SLIDES_PORT=5173

is_alive() {
  local pid="$1"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

stop_one() {
  local name="$1" port="$2"
  local pid_file="$DEV_DIR/$name.pid"
  local stopped=0

  # 1. Kill by PID file. pkill -P first to catch grandchildren (e.g. Vite workers
  #    under npm), then SIGTERM the main pid, then escalate to SIGKILL.
  if [[ -f "$pid_file" ]]; then
    local pid
    pid="$(cat "$pid_file" 2>/dev/null || true)"
    if is_alive "$pid"; then
      pkill -TERM -P "$pid" 2>/dev/null || true
      kill -TERM "$pid" 2>/dev/null || true
      # Wait up to 3s for graceful exit.
      for _ in 1 2 3 4 5 6; do
        is_alive "$pid" || break
        sleep 0.5
      done
      if is_alive "$pid"; then
        pkill -KILL -P "$pid" 2>/dev/null || true
        kill -KILL "$pid" 2>/dev/null || true
      fi
      stopped=1
    fi
    rm -f "$pid_file"
  fi

  # 2. Port fallback — in case the PID file got lost or a leftover process bound the port.
  local port_pids
  port_pids="$(lsof -ti ":$port" 2>/dev/null || true)"
  if [[ -n "$port_pids" ]]; then
    echo "$port_pids" | xargs kill -TERM 2>/dev/null || true
    sleep 1
    port_pids="$(lsof -ti ":$port" 2>/dev/null || true)"
    if [[ -n "$port_pids" ]]; then
      echo "$port_pids" | xargs kill -KILL 2>/dev/null || true
    fi
    stopped=1
  fi

  if [[ "$stopped" == 1 ]]; then
    echo "  $name: stopped"
  else
    echo "  $name: not running"
  fi
}

echo "Stopping dev servers..."
stop_one "academy" "$ACADEMY_PORT"
stop_one "slides"  "$SLIDES_PORT"
