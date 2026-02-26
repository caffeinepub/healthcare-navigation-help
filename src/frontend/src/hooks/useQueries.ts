import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  HealthcareService,
  InsuranceTerm,
  AssistanceProgram,
  CommunityResource,
} from '../backend';

export function useHealthcareServices() {
  const { actor, isFetching } = useActor();
  return useQuery<HealthcareService[]>({
    queryKey: ['healthcareServices'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHealthcareServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInsuranceTerms() {
  const { actor, isFetching } = useActor();
  return useQuery<InsuranceTerm[]>({
    queryKey: ['insuranceTerms'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getInsuranceTerms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAssistancePrograms() {
  const { actor, isFetching } = useActor();
  return useQuery<AssistanceProgram[]>({
    queryKey: ['assistancePrograms'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAssistancePrograms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCommunityResources() {
  const { actor, isFetching } = useActor();
  return useQuery<CommunityResource[]>({
    queryKey: ['communityResources'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCommunityResources();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitializeData() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.initializeData();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthcareServices'] });
      queryClient.invalidateQueries({ queryKey: ['insuranceTerms'] });
      queryClient.invalidateQueries({ queryKey: ['assistancePrograms'] });
      queryClient.invalidateQueries({ queryKey: ['communityResources'] });
    },
  });
}
