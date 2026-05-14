#!/usr/bin/env bash
# Start the academy (static HTML, port 8000) and slides (Vite, port 5173) servers
# in the background. PIDs and logs go under .dev/. Run ./stop.sh to take them down.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

DEV_DIR="$ROOT/.dev"
mkdir -p "$DEV_DIR"

ACADEMY_PORT=8000
SLIDES_PORT=5173

is_alive() {
  local pid="$1"
  [[ -n "$pid" ]] && kill -0 "$pid" 2>/dev/null
}

port_in_use() {
  lsof -ti ":$1" >/dev/null 2>&1
}

start_one() {
  local name="$1" port="$2" cmd="$3"
  local pid_file="$DEV_DIR/$name.pid"
  local log_file="$DEV_DIR/$name.log"

  if [[ -f "$pid_file" ]] && is_alive "$(cat "$pid_file")"; then
    echo "  $name: already running (pid $(cat "$pid_file")) — skipping"
    return
  fi
  if port_in_use "$port"; then
    echo "  $name: port $port already in use by another process — skipping"
    echo "         (run: lsof -i :$port  to investigate)"
    return
  fi

  # `exec` so $! points at the real command, not a bash wrapper.
  bash -c "exec $cmd" >"$log_file" 2>&1 &
  local pid=$!
  disown 2>/dev/null || true
  echo "$pid" >"$pid_file"
  echo "  $name: started (pid $pid, log: .dev/$name.log)"
}

echo "Starting dev servers..."
start_one "academy" "$ACADEMY_PORT" "python3 dev-server.py $ACADEMY_PORT"
start_one "slides"  "$SLIDES_PORT"  "npm run dev"

# Give them a beat to bind, then report status.
sleep 1
echo
echo "URLs:"
echo "  academy → http://localhost:$ACADEMY_PORT/"
echo "  slides  → http://localhost:$SLIDES_PORT/"
echo
echo "Tail logs:  tail -f .dev/academy.log .dev/slides.log"
echo "Stop:       ./stop.sh"
