#!/bin/bash
set -e

LOG_FILE="$LOG_DIR/app_$(date '+%Y%m%d_%H%M%S').log"
APP_DIR="/home/ubuntu/app"
DEPLOY_DIR="/home/ubuntu/deploy"
LOG_DIR="$APP_DIR/log"
mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/app_$(date '+%Y%m%d_%H%M%S').log"

if [ -f "$DEPLOY_DIR/.env" ]; then
  export $(grep -v '^#' "$DEPLOY_DIR/.env" | xargs)
fi

echo "🔁 현재 실행 중인 프로세스 확인..."
if [ -f "$APP_DIR/app.pid" ]; then
  PID=$(cat "$APP_DIR/app.pid")
  if ps -p $PID > /dev/null; then
    echo "🛑 프로세스 종료: $PID"
    kill $PID
    sleep 5
  fi
fi

echo "📦 새 JAR 복사..."
cp -f "$DEPLOY_DIR/app.jar" "$APP_DIR/app.jar"

echo "🚀 애플리케이션 실행..."
nohup java -Dspring.profiles.active=prod -Dfile.encoding=UTF-8 -Duser.timezone=Asia/Seoul -jar "$APP_DIR/app.jar" > "$LOG_FILE" 2>&1 &

echo $! > "$APP_DIR/app.pid"
echo "✅ 배포 완료. PID: $(cat $APP_DIR/app.pid)"