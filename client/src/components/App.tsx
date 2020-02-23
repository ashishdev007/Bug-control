import React from 'react';
import Stage from './stage/Stage';
import AddBug from './AddBug';

import { StageHeaders } from './stage/stageHeaders';
import { StageStates } from './stage/stageStates';

import './App.css';

function App() {
  return (
    <div className="App">
      <Stage stageType={StageHeaders.OPEN} state={StageStates.OPEN} />
      <Stage
        stageType={StageHeaders.IN_PROGRESS}
        state={StageStates.IN_PROGRESS}
      />
      <Stage
        stageType={StageHeaders.TEST_PENDING}
        state={StageStates.TEST_PENDING}
      />
      <Stage stageType={StageHeaders.RE_OPENED} state={StageStates.RE_OPENED} />
      <Stage stageType={StageHeaders.CLOSED} state={StageStates.CLOSED} />
      <AddBug />
    </div>
  );
}

export default App;
