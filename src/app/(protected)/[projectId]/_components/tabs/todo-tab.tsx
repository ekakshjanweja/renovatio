"use client";


import { users } from "@/db/schema/users";
import { z } from "zod";


import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Todo, TodoStatusObj } from "@/types/zod-schema";

interface TodoTabProps {
  projectId: string;
}

export const TodoTab = ({ projectId }: TodoTabProps) => {
  const initTodos: Todo[] = [
    {id: 1, title: 'saiyan chhed dewe', category: 'Other', dependsOn: null, projectId: '123123', status: 1, description: "nanad chutki lewe"}
  ]
  const [todos, setTodos] = useState(initTodos)
  const [newTodo, setNewTodo] = useState<Partial<Todo>>({})
  const [hoveredTodo, setHoveredTodo] = useState<number | null>(null)

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.title) {
      //newTodo.category = newTodo.category ?? "Other";
      setTodos([...todos, 
        {...newTodo, 
        id: Date.now(), 
        status: 0,
        dependsOn: newTodo.dependsOn == -999 ? undefined : newTodo.dependsOn,
        } as Todo])
      setNewTodo({})
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const updateCompletion = (id: number, completion: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completion } : todo))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      <form onSubmit={addTodo} className="mb-4 space-y-4">
        <Input
          placeholder="Title"
          value={newTodo.title || ''}
          onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <Input
          placeholder="Category"
          value={newTodo.category || ''}
          onChange={e => setNewTodo({ ...newTodo, category: e.target.value })}
        />
        <Input
          placeholder="Status"
          value={newTodo.status || ''}
          onChange={e => setNewTodo({ ...newTodo, status: Number(e.target.value) })}
        />
        <Input
          placeholder="Description"
          value={newTodo.description || ''}
          onChange={e => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <Select
          value={String(newTodo.dependsOn) || "-999"}
          onValueChange={value => setNewTodo({ ...newTodo, dependsOn: Number(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Depends On" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-999">None</SelectItem>
            {todos.map(todo => (
              <SelectItem key={todo.id} value={String(todo.id)}>{todo.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Add Todo</Button>
      </form>
      
      <ul className="space-y-4">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="bg-muted p-4 rounded-lg relative"
            onMouseEnter={() => setHoveredTodo(todo.id)}
            onMouseLeave={() => setHoveredTodo(null)}
          >
            <h3 className="font-bold">{todo.title}</h3>
            <p>Category: {todo.category}</p>
            <p>Status: {todo.status}</p>
            <p>Description: {todo.description}</p>
            <p>Depends On: {todos.find(t => t.id === todo.dependsOn)?.title || 'None'}</p>
            <p>Completion: {TodoStatusObj[todo.status]}%</p>
            
            {hoveredTodo === todo.id && (
              <div className="absolute bottom-4 left-4 right-4">
                <Slider
                  value={[todo.status]}
                  onValueChange={([value]) => updateCompletion(todo.id, value)}
                  max={100}
                  step={20}
                />
              </div>
            )}
            
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
