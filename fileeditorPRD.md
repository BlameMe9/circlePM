# PRD: Tiptap-Based Text Editor for Task Editing

## 1. Introduction & Goal

**Objective:** Implement a Tiptap-based rich text editor within the CirclePM Next.js application.
**Purpose:**

- Allow users to edit content (e.g., descriptions, notes) associated with individual tasks.
- Provide a programmatic interface for a potential AI companion to interact with the editor's content.
  **Trigger:** The editor interface should be displayed when a user clicks on a specific task item.

## 2. Key Requirements

- **Rich Text Editing:** Utilize Tiptap with `StarterKit` for common formatting options (headings, bold, italics, lists, etc.).
- **Next.js Integration:**
   - Editor component must be a Next.js Client Component (`'use client';`).
   - Dynamically import the editor component to optimize initial page load.
- **Task-Specific Context:**
   - On task click, instantiate the editor and load the existing content of that specific task.
   - Save changes made in the editor back to the respective task's data.
- **Content Format:** Use JSON as the primary format for editor content (via `editor.getJSON()` and `editor.commands.setContent(json)`).
- **AI Interaction API:** Expose Next.js API routes for AI to programmatically read or modify editor content.
- **Basic UI:** Include a placeholder text (e.g., "Add task details...") and basic styling.

## 3. Technical Implementation Guide for AI Coder

### Phase 1: Core Tiptap Editor Component (Next.js)

1. **File Location:** Create the editor component at `components/shared/TaskTextEditor.tsx` (or similar).

2. **Installation:**

   ```bash
   npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-placeholder
   # or
   yarn add @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-placeholder
   ```

3. \*\*Editor Component (`TaskTextEditor.tsx`):

   ```typescript
   // components/shared/TaskTextEditor.tsx
   'use client';

   import { useEditor, EditorContent } from '@tiptap/react';
   import StarterKit from '@tiptap/starter-kit';
   import Placeholder from '@tiptap/extension-placeholder';
   import { useEffect } from 'react';

   interface TaskTextEditorProps {
     initialContentJSON?: object | string; // Allow string for empty or initial raw content
     onContentUpdate: (json: object) => void;
     // editorRef?: React.MutableRefObject<any | null>; // Optional: if direct editor access is needed from parent
   }

   const TaskTextEditor: React.FC<TaskTextEditorProps> = ({ initialContentJSON, onContentUpdate }) => {
     const editor = useEditor({
       extensions: [
         StarterKit.configure({
           // Configure StarterKit options if needed
           // e.g., heading: { levels: [1, 2, 3] }
         }),
         Placeholder.configure({
           placeholder: 'Add task details or type / for commands...',
         }),
         // Future: Add custom extensions for AI features here
       ],
       content: initialContentJSON || '', // Handle undefined or null initialContentJSON
       onUpdate: ({ editor: currentEditor }) => {
         onContentUpdate(currentEditor.getJSON());
       },
     });

     // Ensure editor content is updated if initialContentJSON changes externally
     // (e.g., when switching between tasks without unmounting the editor)
     useEffect(() => {
       if (editor && initialContentJSON && JSON.stringify(editor.getJSON()) !== JSON.stringify(initialContentJSON)) {
           editor.commands.setContent(initialContentJSON, false); // false to not emit update event
       }
     }, [initialContentJSON, editor]);

     return <EditorContent editor={editor} className="prosemirror-editor-styles" />;
   };

   export default TaskTextEditor;
   ```

4. **Styling:**

   - Create a CSS module (e.g., `TaskTextEditor.module.css`) or use global styles for `.prosemirror-editor-styles`.
   - Style basic elements: `.ProseMirror`, `p`, `h1`, `h2`, `ul`, `ol`, `blockquote`.
   - Ensure `min-height` and `border` are set for usability.

5. **Dynamic Import in Parent Component (e.g., Task Modal or Task Detail View):**

   ```typescript
   // Example: In a component that displays when a task is clicked
   import dynamic from 'next/dynamic';
   import { useState, useEffect } from 'react';
   // Assume 'Task' is an interface for your task data
   // Assume 'selectedTask' contains the data of the task being edited

   const TaskEditor = dynamic(
     () => import('@/components/shared/TaskTextEditor'), // Adjust path
     { ssr: false, loading: () => <p>Loading editor...</p> }
   );

   interface EditTaskViewProps {
     task: Task; // The task object being edited
     onSave: (taskId: string, newContent: object) => void;
   }

   const EditTaskView: React.FC<EditTaskViewProps> = ({ task, onSave }) => {
     const [editorContent, setEditorContent] = useState<object | string>(task.descriptionJSON || '');

     useEffect(() => {
       // Update editor content if the task prop changes
       setEditorContent(task.descriptionJSON || '');
     }, [task]);

     const handleContentUpdate = (json: object) => {
       setEditorContent(json);
       // Debounce or use a save button to call onSave
       // For now, let's assume a save button triggers this:
       // onSave(task.id, json);
     };

     const handleSaveChanges = () => {
       onSave(task.id, editorContent as object);
     };

     return (
       <div>
         <h3>Editing Task: {task.title}</h3>
         <TaskEditor
           initialContentJSON={editorContent}
           onContentUpdate={handleContentUpdate}
         />
         <button onClick={handleSaveChanges}>Save Changes</button>
       </div>
     );
   };
   ```

### Phase 2: AI Interaction via Next.js API Routes

1. **API Route Structure:**

   - Create API routes under `app/api/ai/` (App Router) or `pages/api/ai/` (Pages Router).
   - Examples: `app/api/ai/generate/route.ts`, `app/api/ai/summarize/route.ts`.

2. \*\*Example API Route (`app/api/ai/generate/route.ts`):

   ```typescript
   // app/api/ai/generate/route.ts
   import { NextResponse } from 'next/server';

   export async function POST(request: Request) {
      try {
         const { prompt, currentContentJSON } = await request.json();

         // --- AI Logic Placeholder ---
         // Replace this with actual calls to your AI service/model
         // const aiServiceResponse = await myAIService.generate(prompt, currentContentJSON);
         const aiGeneratedContentJSON = {
            type: 'doc',
            content: [
               {
                  type: 'paragraph',
                  content: [{ type: 'text', text: `AI response to: "${prompt}". ` }],
               },
               // Append current content if needed, or replace it
            ],
         };
         // --- End AI Logic Placeholder ---

         return NextResponse.json({ success: true, contentJSON: aiGeneratedContentJSON });
      } catch (error) {
         console.error('AI generation error:', error);
         return NextResponse.json(
            { success: false, error: 'Failed to generate content' },
            { status: 500 }
         );
      }
   }
   ```

3. **Frontend to API Communication:**

   - Use `fetch` API, SWR, or React Query in the frontend (e.g., within a component that uses `TaskTextEditor`) to call these API routes.
   - Send relevant data (current editor content, user prompts, selection) in the request body.
   - On receiving a response, use `editor.commands.setContent()` or other Tiptap commands to update the editor.

   ```typescript
   // Example of calling the AI API from the frontend
   // This would be in a component that has access to the editor instance or can pass content down
   async function callAIGenerate(prompt: string, currentContent: object, editorInstance: any) {
      // setLoadingAI(true); // For UI feedback
      try {
         const response = await fetch('/api/ai/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, currentContentJSON: currentContent }),
         });
         if (!response.ok) throw new Error('AI generation failed from API');
         const data = await response.json();
         if (data.success && data.contentJSON) {
            editorInstance.commands.setContent(data.contentJSON, { emitUpdate: true });
         }
      } catch (error) {
         console.error('Error with AI generation:', error);
         // Show error to user
      } finally {
         // setLoadingAI(false);
      }
   }
   ```

### Phase 3: Implementing AI Companion Use Cases

- **AI Generating Content:** Trigger via user prompt or slash command. Frontend sends prompt to an API route. API route interacts with AI model, returns structured JSON. Frontend updates Tiptap editor.
- **AI Editing/Refining Content:** User selects text, invokes an AI action (e.g., "Summarize"). Frontend sends selected text/JSON and action to an API route. AI model processes, returns modified JSON. Frontend updates Tiptap editor.

### Phase 4: Advanced Features & Refinements (Future Scope)

- **Slash Commands:** Implement Tiptap's `Suggestion` utility for in-editor commands (e.g., `/ai-write [prompt]`).
- **Loading/Error States:** Provide UI feedback during AI operations.
- **Custom Tiptap Extensions:** For AI-specific annotations or suggestions if needed.

## 4. Data Persistence

- The `onContentUpdate` callback from `TaskTextEditor` provides the latest content as JSON.
- The parent component (e.g., `EditTaskView`) is responsible for handling this JSON data, potentially debouncing updates and saving it to the backend database associated with the specific task.
- Ensure task data model can store rich text content (preferably as JSON).

## 5. Non-Goals (Initial Implementation)

- Real-time multi-user collaboration in the editor.
- Complex custom AI-driven UI elements within the editor beyond simple text manipulation.
