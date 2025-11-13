# My Tickets - Quick Start Guide 🎤

## 🚀 Get Started in 3 Steps

### Step 1: Get Your OpenAI API Key
Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys) and create a new API key.

### Step 2: Navigate to My Tickets
- Open the react-playground app
- Click **"My Tickets"** in the sidebar (second item)
- Or visit: `http://localhost:5173/my-tickets`

### Step 3: Configure & Record
1. Paste your API key when prompted
2. Click the microphone button
3. Speak your service request
4. Listen to the AI confirmation!

---

## 📱 What You'll See

```
┌─────────────────────────────────────┐
│         My Tickets Page             │
├─────────────────────────────────────┤
│  [API Settings Button]              │
│                                     │
│           ┌───────┐                 │
│           │  🎤   │  ← Click to     │
│           │       │     Record      │
│           └───────┘                 │
│                                     │
│     "Ready to Record"               │
│                                     │
├─────────────────────────────────────┤
│     Your Tickets (0)                │
│                                     │
│  No tickets yet                     │
│  Use voice recorder above           │
└─────────────────────────────────────┘
```

---

## 🎯 Recording Flow

```
1. 🎤 Click Mic
   └─→ Button turns RED with pulsing animation

2. 🗣️ Speak Your Request
   └─→ "There's a pothole on Main Street..."
   └─→ Duration counter shows: 0:15, 0:16, 0:17...

3. 🛑 Click Again to Stop
   └─→ Processing begins...

4. 🤖 AI Processing
   └─→ Transcribing audio...
   └─→ Extracting ticket info...
   └─→ Creating ticket...

5. 🔊 Voice Response
   └─→ "Your request has been received..."
   └─→ "...resolved by November 21st..."

6. ✅ Ticket Saved!
   └─→ Appears in list below
   └─→ Shows all details
```

---

## 📋 Ticket Card Example

```
┌──────────────────────────────────────┐
│ Pothole Repair    [Pending Submission]│
│ Ticket #MY-7X9K4A                    │
├──────────────────────────────────────┤
│ 📍 Location                          │
│    Main Street between 1st & 2nd Ave │
│                                      │
│ 🏢 Department                        │
│    Customer Service Bureau           │
│                                      │
│ 📅 Created                           │
│    Nov 7, 2025, 2:30 PM              │
│                                      │
│ 📅 Est. Resolution                   │
│    Nov 21, 2025 (~14 days)          │
├──────────────────────────────────────┤
│ Audio Transcription:                 │
│ "There's a pothole on Main Street..."│
└──────────────────────────────────────┘
```

---

## 💡 Pro Tips

### For Best Results:
- **Speak clearly** at a normal pace
- **Include the location** (street address or intersection)
- **Describe the issue** in 1-2 sentences
- **Keep it under 1 minute** for faster processing

### Example Recordings:

✅ **Good:**
> "I'd like to report graffiti on the building at 500 Pine Street. It appeared within the last few days."

✅ **Good:**
> "There's a street light out at the corner of Broadway and Madison. It's been dark for about a week."

❌ **Too Vague:**
> "Fix the thing"

❌ **Missing Location:**
> "There's a pothole"

---

## 🔧 Troubleshooting

### Problem: No API Key Prompt
- Click the **"API Settings"** button in the top right
- Enter your key and click Save

### Problem: Microphone Not Working
- Check browser permissions (click 🔒 in address bar)
- Ensure microphone is connected
- Try refreshing the page

### Problem: "Transcription Failed"
- Verify your API key is valid
- Check you have OpenAI credits available
- Try a shorter recording

---

## 📊 What Gets Extracted

The AI automatically identifies:

| Field | Example |
|-------|---------|
| **Type** | "Pothole Repair" |
| **Location** | "Main St between 1st & 2nd" |
| **Description** | "Large pothole damaging cars" |
| **Est. Days** | 14 days |

---

## 🎨 Visual States

### Ready State
- **Color**: Primary blue
- **Icon**: Microphone
- **Text**: "Ready to Record"

### Recording State
- **Color**: Red with pulse animation
- **Icon**: Microphone with slash
- **Text**: "Recording... 0:15"

### Processing State
- **Color**: Blue
- **Icon**: Spinning loader
- **Text**: "Processing your request..."

### Speaking State
- **Color**: Green
- **Icon**: Speaker with pulse
- **Text**: "Playing Response..."

---

## 🌐 Supported Browsers

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome  | ✅ Full Support | Recommended |
| Edge    | ✅ Full Support | Chromium-based |
| Firefox | ✅ Full Support | Works great |
| Safari  | ⚠️ Limited | May need fallback |

---

## 📞 Need Help?

1. Check browser console for errors (F12)
2. Review the full guide: `MY-TICKETS-GUIDE.md`
3. Verify API key at [platform.openai.com](https://platform.openai.com)

---

## 🎉 You're Ready!

The feature is fully implemented and working. Just:
1. Get your OpenAI API key
2. Open the app
3. Start recording!

**Have fun reporting issues with your voice! 🎤**


