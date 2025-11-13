# My Tickets - Voice-Enabled Service Request System

## Overview

The **My Tickets** feature provides a voice-first interface for creating Seattle service request tickets. Users can speak naturally about issues they want to report, and the system uses OpenAI's AI models to transcribe, process, and respond with estimated resolution information.

## Features

### 🎤 Voice Recording
- One-click audio recording using the browser's MediaRecorder API
- Visual feedback during recording with animated indicators
- Real-time duration counter
- Supports Chrome, Edge, and other modern browsers

### 🤖 AI-Powered Processing
The system uses three OpenAI APIs to process your voice recording:

1. **Whisper API** - Transcribes your audio to text
2. **GPT-4o-mini API** - Extracts structured ticket data from the transcription
3. **TTS API** - Reads back the estimated resolution date

### 📋 Ticket Information Extracted
From your voice recording, the system automatically extracts:
- **Service Request Type** (e.g., Pothole Repair, Graffiti Removal, Street Light Out)
- **Location** (street address or description)
- **Description** (details about the issue)
- **Estimated Resolution Time** (based on typical response times)

### 💾 Local Storage
- All tickets are saved locally in your browser
- Tickets persist across sessions
- No data is sent to external servers (except OpenAI for processing)

## Getting Started

### Prerequisites
You'll need an OpenAI API key to use this feature. Get one from:
👉 [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### Setup Steps

1. **Navigate to My Tickets**
   - Click "My Tickets" in the sidebar navigation
   - Or visit `/my-tickets` directly

2. **Configure Your API Key**
   - On first visit, you'll see an API key prompt
   - Paste your OpenAI API key (starts with `sk-...`)
   - Click "Save" - your key is stored securely in browser localStorage
   - You can update it anytime by clicking the "API Settings" button

3. **Grant Microphone Permissions**
   - When you click the microphone button, your browser will ask for permission
   - Allow microphone access to enable recording

## How to Use

### Creating a Ticket

1. **Click the Microphone Button**
   - The large circular button in the center of the page
   - A red pulsing animation indicates recording is active

2. **Speak Your Request**
   - Describe the issue clearly
   - Include the location (address or general area)
   - Example: "There's a large pothole on 3rd Avenue near Pike Street that needs repair"
   - Example: "Graffiti on the building at 1234 Madison Street"

3. **Stop Recording**
   - Click the microphone button again
   - Processing begins automatically

4. **AI Processing**
   - Your audio is transcribed
   - Ticket information is extracted
   - An estimated resolution date is calculated

5. **Audio Response**
   - The system reads back your ticket confirmation
   - Includes the estimated resolution date
   - You'll see the transcription on screen

### Managing Your Tickets

- **View All Tickets** - Scroll down to see your ticket history
- **Ticket Details** - Each card shows:
  - Service request type and status
  - Ticket number
  - Location
  - Department assigned
  - Creation date
  - Estimated resolution date
  - Original audio transcription
- **Delete Tickets** - Click the trash icon to remove a ticket

## Typical Resolution Times

The system uses these typical resolution timeframes:

| Service Type | Est. Resolution |
|--------------|----------------|
| Pothole Repair | 7-14 days |
| Graffiti Removal | 3-5 days |
| Street Light Out | 14-21 days |
| Tree Maintenance | 30-60 days |
| Illegal Dumping | 5-10 days |
| Parking Violation | 1-3 days |

## Technical Details

### Browser Compatibility
- **Chrome/Edge** ✅ Full support
- **Firefox** ✅ Full support (with webm codec)
- **Safari** ⚠️ Limited support (may need fallback)

### Audio Format
- Records in WebM format
- Optimized for speech recognition
- Automatically handled by MediaRecorder API

### API Costs
Using this feature incurs OpenAI API costs:
- **Whisper** - ~$0.006 per minute of audio
- **GPT-4o-mini** - ~$0.0001 per request
- **TTS** - ~$0.015 per 1000 characters

**Estimated cost per ticket: $0.01 - $0.03**

### Privacy & Security
- API key stored in browser localStorage only
- Audio is sent to OpenAI for processing (see [OpenAI Privacy Policy](https://openai.com/privacy))
- Tickets stored locally in your browser
- No data sent to Seattle or any other third-party servers
- This is a demo/prototype - not connected to actual city systems

## Troubleshooting

### "Please ensure microphone permissions are granted"
- Check browser settings → Site Settings → Microphone
- Ensure the site has permission to access your microphone

### "Please configure your OpenAI API key first"
- Click "API Settings" button
- Enter your OpenAI API key
- Click "Save"

### "Transcription failed" or "Ticket extraction failed"
- Verify your API key is valid
- Check you have available credits in your OpenAI account
- Check browser console for detailed error messages

### Audio quality issues
- Speak clearly and at a moderate pace
- Minimize background noise
- Use a good quality microphone if available
- Try recording in a quieter environment

## Example Voice Recordings

### Good Examples ✅
- "I'd like to report a pothole on East Madison Street between 12th and 13th Avenue. It's quite large and could damage cars."
- "There's graffiti on the side of the building at 500 Pine Street that needs to be removed."
- "A street light is out at the corner of Broadway and Pike. It's been dark for a few days."

### Could Be Better ⚠️
- "Fix it" (too vague - what and where?)
- "Pothole" (needs location information)
- Very long, rambling descriptions (keep it focused)

## Future Enhancements

Potential improvements for future versions:
- [ ] Integration with actual Seattle Find It Fix It API
- [ ] Geolocation support to automatically detect your location
- [ ] Photo upload capability
- [ ] Real-time tracking of ticket status
- [ ] Push notifications when tickets are updated
- [ ] Multi-language support
- [ ] Offline support with queued submission

## Support

For technical issues or questions:
- Check the browser console for error messages
- Review the OpenAI API documentation
- Ensure you're using a modern, supported browser

---

**Note**: This is a demonstration/prototype application and is not officially affiliated with the City of Seattle. Tickets created here are stored locally and are not submitted to actual city systems.


