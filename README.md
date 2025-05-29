# MyPrereqs
MyPrereqs is a web application that instantly generates an informative and interactive graph/diagram, based on a student's course requirements. It creates a graph with the courses (and info) as nodes, and prerequisite connections between courses as edges, using React Flow. Students can use MyPrereqs to visualize their academic progression, and plan next steps in their course enrolment. Optimized for UTSC programs.MyPrereqs is a web application that instantly generates an informative and interactive graph/diagram, based on a student's course requirements. It creates a graph with the courses (and info) as nodes, and prerequisite connections between courses as edges, using React Flow. Students can use MyPrereqs to visualize their academic progression, and plan next steps in their course enrolment. Optimized for UTSC programs.

## Features

- Input a URL linking to university program requirements
- Automatically parse and extract course codes and prerequisites
- Display an interactive graph with arrows indicating prerequisites
- Built with React (frontend) and Flask (backend)

## Installation Instructions

### Prerequisites

Make sure you have the following installed:

- **Python 3.8+**
- **Node.js 16+** and **npm**
- **pip** (Python package manager)

---

### 1. Clone the Repository

```bash
git clone https://github.com/omarhxk/MyPrereqs.git
cd MyPrereqs
```

### 2. Backend Setup
```bash
cd server/flask-server
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python3 server.py
```

### 3. Frontend Setup
```bash
cd client
npm install reactflow
npm run dev
```

