import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import BottomBar from './components/BottomBar';
import Overview from './components/panels/Overview';
import FinanceFlows from './components/panels/FinanceFlows';
import Projects from './components/panels/Projects';
import Verification from './components/panels/Verification';
import RiskMonitor from './components/panels/RiskMonitor';
import ImpactTracker from './components/panels/ImpactTracker';
import Reporting from './components/panels/Reporting';
import Compliance from './components/panels/Compliance';
import FundingAccess from './components/panels/FundingAccess';

export default function App() {
  const [activePanel, setActivePanel] = useState('overview');
  const [role, setRole] = useState('gov');
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <div className="app-shell">
      <Sidebar
        activePanel={activePanel}
        onNav={setActivePanel}
        role={role}
        onRoleChange={setRole}
      />
      <div className="main">
        <Topbar activePanel={activePanel} role={role} />
        <div className="content-area">
          {activePanel === 'overview' && (
            <Overview alertVisible={alertVisible} onDismissAlert={() => setAlertVisible(false)} />
          )}
          {activePanel === 'flows' && <FinanceFlows />}
          {activePanel === 'projects' && <Projects />}
          {activePanel === 'verification' && <Verification />}
          {activePanel === 'risk' && <RiskMonitor />}
          {activePanel === 'impact' && <ImpactTracker />}
          {activePanel === 'reporting' && <Reporting role={role} />}
          {activePanel === 'compliance' && <Compliance />}
          {activePanel === 'access' && <FundingAccess />}
        </div>
        <BottomBar />
      </div>
    </div>
  );
}
