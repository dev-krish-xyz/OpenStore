export interface User {
  id: number;
  login: string;
  name: string | null;
  avatarUrl: string | null;
  isAdmin: boolean;
}

export interface RepositoryMetadata {
  githubId?: string;
  name?: string;
  fullName?: string;
  description?: string;
  homepage?: string;
  stars?: number;
  forks?: number;
  openIssues?: number;
  language?: string;
  license?: string;
  topics?: string[];
  ownerAvatarUrl?: string;
  archived?: boolean;
  pushedAt?: string;
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Submission {
  id: number;
  repoUrl: string;
  repo: string;
  name: string;
  description: string;
  websiteUrl: string;
  docsUrl: string;
  category: string;
  alternatives: string[];
  platforms: string[];
  selfHosted: boolean;
  bestFor: string;
  consideration: string;
  status: SubmissionStatus;
  moderatorNote: string;
  recommendationCount: number;
  recommendedByViewer: boolean;
  feedbackCount: number;
  feedbackByViewer: string;
  metadata: RepositoryMetadata;
  submitter: { login: string; avatarUrl: string | null };
  createdAt: string;
}

export interface AdminSubmission extends Submission {
  voters: { login: string; votedAt: string }[];
  feedback: { login: string; note: string; updatedAt: string }[];
}

export interface Solution {
  id: number;
  catalogId: string | null;
  githubUrl: string | null;
  status: string;
  metadata: RepositoryMetadata | null;
}

export interface WantedRequest {
  id: number;
  productName: string;
  description: string;
  status: 'open' | 'resolved';
  voteCount: number;
  votedByViewer: boolean;
  createdAt: string;
  submitter: { login: string };
  solutions: Solution[];
}

export interface CatalogChoice {
  id: string;
  name: string;
  repo: string;
}
