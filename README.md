### Setting up on your device
```bash
git clone --recurse-submodules https://github.com/sitanshmehta/firefly-takehome.git
cd firefly-takehome
npm install
npm run dev

# Running Python spoofing script (Optional)
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# run the spoof user location script
cd scripts/
python spoof_user_location.py
cd ..
```

## Structre
```bash
.
├── app/                      # Next.js app routes
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── timeline/             # shadcn-timeline submodule
│   └── other/                # custom components
├── public/
├── styles/
│   └── globals.css
├── tailwind.config.js
├── package.json
└── README.md
```

## High level overview
-Built with **NextJS, React**
-This project simulates a **real-time incident and user tracking interface**.  
-It displays a **live user location marker**, updated through a WebSocket connection, and simulates an **incident** appearing nearby the user.  

## Core Features
- Live location indicated from the users POV.
    - Python script spoofs xy coordinates, publishes to PORT 8000 through a websocket. The UI listens to Port 8000 and updates the user's map marker with data received from there. 
- Extension Task: Simulated an incident nearby
    - On loading the page, an indicent pops up near the user, after which an info card on the incident, as well as an incident timeline. 
    - In reality, this information would be displayed as its reported, rather than all at once as done in this project.
- Navbar
    - Placeholder buttons (no functionality)

## Thoughts and scoping
1. Live location feature
- User’s perspective
    - Plot a single moving dot at (lat, long) / (x,y) coming in from a web socket in real time. 
    - In reality, the user would most likely be viewing this info from their phone, potentially on an app instead of on the web.
- Operators Perspective
    - View multiple user’s, incidents, and responders positions. So, would need telemetry data from several sources. 
    - This seemed like more work for the time limit. I could have asked chat to duplicate markers and incidents, but that route didnt seem to add much value

2. Simulating an incident nearby
- Define incident data model
    - Location (x, y), Type / Classification / Name, Confidence, Status, Severity, Dist from user
    - Initially wrote a python script to spoof incident data as well, but since I already displayed that knowledge and skill previously, I pivotted towards hard coding the info while calling upon the IncidentCard component.
- Plot an incident on map with red dot and lighter red circle (or some kind of visual) around it with for a incident impact radius. 
    - Experimented with adding a radius for impact zone, but moved away from it as it sunk time. 
    - Pop up when user clicks on incident on map - shows distance, status, severity. Decided that the incident info should be populated as it is recorded instead of the user requesting it, given the proximity.  
3. Emergency Response UI
    Inital thoughts - Red SOS Button, Alert dialog with timer for 10 seconds after which SOS mode is activated. And Users can close SOS dialog within the 10 seconds to indicate that SOS was clicked mistakenly.Backend could record mistaken clicks for long term trends, potentially help responders make decisions based on those trends.

## Notes
- Time Sinks
    - Integrating shadcn timeline component
    - Updating user's marker through x,y spoofed in python script
    - Larger concentric circle with lighter color centerd at the incident point marker to signify impact radius. Time reading through documentation, and prompting gpt.
    - Zustand for global state (https://zustand.docs.pmnd.rs/getting-started/introduction). Wanted to use this to decouple the map and incident info components, could have used useContext but generally avoid manually managing shared states.
- Choose the extension tasks that seemed balanced in the amount of work. Given I was unfamiliar with mapbox, I avoided the cooler sounding however heavier features like augmenting map, route visualization.
- Improvements
    - Decouple Map and incident related component. This was not a design choice, as zustand proved to take time to setup, I binded them in the same componetn.
    - Add SOS feature
    - Create simple backend instead of python script spoofing. 
- Time spent working
    - 2-3 hours over a day and a half. ReadMe took 30 ish extra mins
