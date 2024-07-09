// src/services/assistantService.ts

const assistants = [
    { id: '1', name: 'General Assistant', description: 'A general-purpose assistant' },
    { id: '2', name: 'Code Helper', description: 'An assistant specializing in coding help' },
  ];
  
  export const getAssistants = () => assistants;
  
  export const getAssistantById = (id: string) => assistants.find(a => a.id === id);