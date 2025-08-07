#!/bin/bash
set -e

APP_DIR="/home/ubuntu/app"
DEPLOY_DIR="/home/ubuntu/deploy"

echo "🔁 현재 실행 중인 프로세스 확인..."
if [ -f "$APP_DIR/app.pid" ]; then
  PID=$(cat "$APP_DIR/app.pid")
  if ps -p $PID > /dev/null; then
    echo "🛑 프로세스 종료: $PID"
    kill -TERM $PID
    # Wait up to 5 seconds for process to terminate
    for i in {1..5}; do
      if ! ps -p $PID > /dev/null; then
        break
      fi
      sleep 1
    done
    # If still running, force kill
    if ps -p $PID > /dev/null; then
      echo "⚠️  프로세스가 종료되지 않아 강제 종료합니다: $PID"
      kill -KILL $PID
    fi
fi

echo "📦 새 JAR 복사..."
cp -f "$DEPLOY_DIR/app.jar" "$APP_DIR/app.jar"

echo "🚀 애플리케이션 실행..."
nohup java -jar "$APP_DIR/app.jar" > "$APP_DIR/app.log" 2>&1 &

echo $! > "$APP_DIR/app.pid"
echo "✅ 배포 완료. PID: $(cat $APP_DIR/app.pid)"