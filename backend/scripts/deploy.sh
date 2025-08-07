#!/bin/bash
set -e

APP_NAME="app"    
DEPLOY_DIR="/home/ubuntu/app"
JAR_FILE="$DEPLOY_DIR/$APP_NAME.jar"
LOG_FILE="$DEPLOY_DIR/app.log"
PID_FILE="$DEPLOY_DIR/app.pid"

echo "🔁 현재 실행 중인 프로세스 확인..."
if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if ps -p $PID > /dev/null; then
    echo "🛑 프로세스 종료: $PID"
    kill $PID
    sleep 5
  fi
fi

echo "📦 새 JAR 복사..."
cp -f /home/ubuntu/app/$APP_NAME.jar "$JAR_FILE"

echo "🚀 애플리케이션 실행..."
nohup java -jar "$JAR_FILE" > "$LOG_FILE" 2>&1 &

echo $! > "$PID_FILE"
echo "✅ 배포 완료. PID: $(cat $PID_FILE)"
