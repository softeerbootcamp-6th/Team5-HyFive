#!/bin/bash
set -e

APP_DIR="/home/ubuntu/app"
DEPLOY_DIR="/home/ubuntu/deploy"

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
nohup java -Dspring.profiles.active=init -jar "$APP_DIR/app.jar" > "$APP_DIR/app.log" 2>&1 &

echo $! > "$APP_DIR/app.pid"
echo "✅ 배포 완료. PID: $(cat $APP_DIR/app.pid)"