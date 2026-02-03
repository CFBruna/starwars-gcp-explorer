#!/bin/bash
set -e

# scripts/setup_monitoring.sh
# Usage: ./scripts/setup_monitoring.sh <PROJECT_ID> <NOTIFICATION_CHANNEL_ID>
# Example: ./scripts/setup_monitoring.sh starwars-challenge-api projects/starwars-challenge-api/notificationChannels/12345

MONITORING_DIR="./docs/monitoring"

# Check arguments
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "❌ Error: Missing arguments."
  echo "Usage: $0 <PROJECT_ID> <NOTIFICATION_CHANNEL_ID>"
  echo "Example: $0 starwars-api projects/starwars-api/notificationChannels/12345"
  exit 1
fi

PROJECT_ID=$1
CHANNEL_ID=$2

# Check if monitoring docs exist
if [ ! -d "$MONITORING_DIR" ]; then
  echo "❌ Error: Directory $MONITORING_DIR not found. Run from project root."
  exit 1
fi

echo "🚀 Setting up Cloud Monitoring alerts..."
echo "📍 Project: $PROJECT_ID"
echo "📍 Channel: $CHANNEL_ID"
echo ""

# Process each YAML file
for policy_file in "$MONITORING_DIR"/*.yaml; do
  [ -e "$policy_file" ] || continue
  
  FILENAME=$(basename "$policy_file")
  TEMP_FILE="/tmp/auth_$FILENAME"
  
  echo "Processing $FILENAME..."
  
  # Replace placeholder with actual Channel ID
  # We use | as delimiter because ID contains slashes
  sed "s|projects/YOUR_PROJECT_ID/notificationChannels/YOUR_CHANNEL_ID|$CHANNEL_ID|g" "$policy_file" > "$TEMP_FILE"
  
  # Apply policy using gcloud
  if gcloud alpha monitoring policies create --policy-from-file="$TEMP_FILE" --project="$PROJECT_ID" --quiet; then
    echo "✅ Successfully created alert from $FILENAME"
  else
    echo "⚠️ Failed to create alert from $FILENAME"
  fi
  
  # Cleanup sensitive temp file
  rm "$TEMP_FILE"
done

echo ""
echo "🎉 Monitoring setup complete!"
