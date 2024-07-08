// zeus\src\components\admin\ModelConfigurator.tsx

import React, { useState, useEffect } from 'react';
import { useAssistantConfig } from '../../hooks/useAssistantConfig';
import { BuilderService } from '../../services/BuilderService';
import { Model, ModelConfig } from '../../types/builder';

const ModelConfigurator: React.FC = () => {
  const { assistantConfig, updateAssistantConfig } = useAssistantConfig();
  const [availableModels, setAvailableModels] = useState<Model[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      const models = await BuilderS