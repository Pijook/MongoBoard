import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './UI/Button';
import { TaskForm } from './TaskModal/TaskForm';

export const Header: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">MongoBoard</h1>
              <p className="text-blue-100 text-sm">Kanban Task Management</p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              Add Task
            </Button>
          </div>
        </div>
      </header>

      <TaskForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        mode="create"
      />
    </>
  );
};
