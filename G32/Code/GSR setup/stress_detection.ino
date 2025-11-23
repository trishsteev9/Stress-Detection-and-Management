#include <WiFi.h>
#include <FirebaseESP32.h>

// === Wi-Fi Credentials ===
#define WIFI_SSID "Galaxy M30s42CA"
#define WIFI_PASSWORD "Veekshaa"

// === Firebase Credentials ===
#define FIREBASE_HOST "https://stress-detection-nd-management-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "AIzaSyD2DWz6SkyC5tq9tdH20tTYkv-95KdCi2k"

// === Firebase Setup ===
FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;

// === GSR Sensor Pin ===
#define GSR_PIN 34  // Connect GSR sensor to GPIO 34 (analog input)

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Wi-Fi Connected");

  // Configure Firebase
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  if (Firebase.ready()) {
    Serial.println("✅ Firebase initialized");
  } else {
    Serial.println("❌ Firebase failed to initialize");
  }
}

void loop() {
  int gsrValues[20];
  int numReadings = 20;

  Serial.println("\n📡 Starting GSR readings...");

  // Collect multiple readings
  for (int i = 0; i < numReadings; i++) {
    gsrValues[i] = analogRead(GSR_PIN);
    Serial.printf("GSR [%d]: %d\n", i, gsrValues[i]);
    delay(1000); // 1 second delay
  }

  // Calculate average GSR
  int gsrSum = 0;
  for (int i = 0; i < numReadings; i++) {
    gsrSum += gsrValues[i];
  }
  int gsrAverage = gsrSum / numReadings;

  // Determine stress level
  String stressStatus = (gsrAverage > 1500) ? "Stressed" : "Normal";

  Serial.printf("\n📊 GSR Average: %d\n", gsrAverage);
  Serial.printf("🧠 Stress Level: %s\n", stressStatus.c_str());

  // Upload to Firebase
  if (Firebase.ready()) {
    String path = "/gsr"; // <-- This is the path your React app listens to

    bool success = Firebase.setInt(firebaseData, path, gsrAverage);

    if (success) {
      Serial.println("✅ GSR uploaded to Firebase");
    } else {
      Serial.print("❌ Upload failed: ");
      Serial.println(firebaseData.errorReason());
    }

    // Optional: send status separately
    Firebase.setString(firebaseData, "/emotion", stressStatus);
  } else {
    Serial.println("⚠️ Firebase not ready");
  }

  delay(5000); // Wait before next upload cycle
}


