import { TaskProvider } from './context/TaskContext';
import { Header } from './components/Header';
import { Board } from './components/Board/Board';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Board />
      </div>
    </TaskProvider>
  );
}

export default App;
